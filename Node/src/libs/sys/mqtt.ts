import dayjs from "dayjs";
import { DB ,Cache,Run,Config,Api,Utils} from "LAN";
import { PoolConnection, ResultSetHeader} from "mysql2/promise";
import mqtt,{ MqttClient } from 'mqtt';
import { io } from "../io";
const log = require('debug')('lan:sys:mqtt')
/** 开薪怡客系统运行日志 */
export class kxykMqtt
{
    /** 缓存系统IO */
    public io:io | undefined
    /** 当前可以发送指令的环境 开发d或者生产p 首字母 p_backend_server  */
    public env = 'p_backend_server';
    /** 当前连接mqtt的客户端 */
    public client!: MqttClient
    /** 异步等待设备回馈的队列集合 */
    private pending = new Map<string, (data: any) => void>()
    /** 异步等待锁绑定设备的网关集合 */
    public lockPending = new Map<string, sm.mqtt_addLock_wait_staff>()

    constructor()
    {
        this.init();
    }

    /**
     * 给设备发送异步等待指令 - 可以直接等到设备返回结果 5秒后过期
     * @param clientId 设备ID
     * @param data 要发送到命令
     * @param timeout 过期时间
     * @returns Promise 异步
     */
    async sendAndWait( data: sm.mqtt_all_cmd_send,timeout = 5000) {
        if(this.env === Config.lock_name){
            let id = Date.now().toString()
            data.id = id
            const topic = `smartHouse/${data.clientId}`
            return new Promise((resolve, reject) => {
                // 1️⃣ 存入等待池
                this.pending.set(id, resolve)
                // 2️⃣ 发送指令
                this.client.publish(topic, JSON.stringify(data), { qos: 1 })
                // 3️⃣ 超时处理
                setTimeout(() => {
                    if (this.pending.has(id)) {
                        this.pending.delete(id)
                        reject(new Error('MQTT请求超时'))
                    }
                }, timeout)
            })
        }else{
            log('当前环境无法发送指令，测试环境先直接返回true');
            /**  开发模式这里直接返回执行成功 后续要全部备注 */
            let res:sm.mqtt_all_cmd_red ={cmd:data.cmd,id:data.id} as sm.mqtt_all_cmd_red;
            if(res.cmd === "authPassword" || res.cmd === "authCard"){
                res.clientId = data.clientId;
                res.result = "ok";
                return res;
            }
            
        }

    }


/**
   * 1. 原始 UID 16进制 转换为 十进制卡号 
   * @param uid 原始 UID，如 "54:79:4c:ba" 或 "54794CBA"
   */
   hexLEToDec(uid: string): number {
        // 处理带冒号的格式，没有冒号就按每 2 位拆分
        let arr = uid.includes(':') 
        ? uid.split(':') 
        : uid.match(/../g) || [];
        
        if (arr.length === 0) return 0;
        
        // 字节反转并拼接，如 ["BA", "4C", "79", "54"] -> "BA4C7954"
        let bigEndianHex = arr.reverse().join('');
        
        // 转十进制
        return parseInt(bigEndianHex, 16);
  }
    
    /**
     * 十进制逆向到十六进制 带反转 - 手牌code逆转
     * @param dec 
     * @returns 返回十六进制IC卡唯一ID
     */
    decToHexLE(dec: number):string {
        // 转HEX
        let hex = dec.toString(16).padStart(8, '0').toUpperCase()
        // 按字节拆分
        let arr = hex.match(/../g)
        if (!arr) return hex
        // 反转（小端 → 大端）
        return arr.reverse().join('')
    }

    /**
     * 删除锁内授权
     * @param au_id  kxyk_mqtt_gateway_lock_auth表ID
     * @returns boolean 是否删除成功
     */
    async delAuth(au_id:number):Promise<boolean>
    {
        try {
            let au = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway_lock_auth,au_id) as tb.kxyk_mqtt_gateway_lock_auth;
            if(!au) throw new Error("授权不存在");
            let p:sm.Com.GW_addLockAuth = {} as any;
            if(au.t === 'Card'){
                p = {authType:'Card',authValue:au.sb_id ?? 0,lid:au.lid,au_id:au.id}
            }
            if(au.t === 'Password'){
                p = {authType:'Password',authValue:au.v ,lid:au.lid,au_id:au.id}
            }
            if(await this.lockAuth(p,true)){
                return true;
            }
            throw new Error("删除授权失败");
        } catch (error) {
            let e = Utils.getError(error);
            log(`删除授权失败`,e)
            return false;
        }
    }

    /**
     * 锁内添加授权
     * @param d sm.Com.GW_addLockAuth 总和参数
     * @param is_del 是否删除山授权 删除或者添加
     * @param is_err 是否抛出异常 默认写日志不抛异常
     * @returns boolean 是否添加成功
     */
    async lockAuth(d:sm.Com.GW_addLockAuth,is_del:boolean = false,is_err:boolean = false,tran:PoolConnection | false = false):Promise<boolean>
    {
        try {
            let lock = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway_lock,d.lid,tran) as tb.kxyk_mqtt_gateway_lock;
            if(!lock) throw new Error("锁不存在");
            let codes = '';//要添加的40位置代码
            let c1 = is_del ? '00' : '01';//代码前两位 01 代表添加 00代表删除
            let c2 = '';//第3-18位授权码
            // = {cmd:"authCard",lockId:lock.lockId,cardcodes:'',clearAllCard:0,clientId:lock.clientId,id:"0"}
            let param:sm.mqtt_all_cmd_send = {} as any;
            let up_auth:tb.UP<tb.kxyk_mqtt_gateway_lock_auth> = {lid:lock.id,t:d.authType,t0:dayjs().unix(),clerk_id:d.clerk_id ?? 0};
            if(d.authType === 'Card'){
                let shoex = await DB.sql.getId(Api.tb.kxyk_bath_shoebox,d.authValue,tran) as tb.kxyk_bath_shoebox;
                if(!shoex) throw new Error("手牌不存在");
                param = {cmd:"authCard",lockId:lock.lockId,cardcodes:'',clearAllCard:0,clientId:lock.clientId,id:"0"};
                /** 这里开始逆向手牌号码 */
                let Hex = this.decToHexLE(parseInt(shoex.code))
                up_auth.v = shoex.number;
                up_auth.sb_id = shoex.id;
                // console.log('转换结果',Hex);
                c2 = `00000000${Hex}`;
                /** 19-20授权次数 FF表示无限 10个F表示时间戳 下10位授权结束时间 全F永不过期  */
                codes = `${c1}${c2}FFFFFFFFFFFFFFFFFFFFFF`;
                param.cardcodes = codes;
            }
            if(d.authType ==="Password"){
                param = {cmd:"authPassword",lockId:lock.lockId,passwords:'',clearAllPassword:0,clientId:lock.clientId,id:"0"};
                c2 = `0000000000${d.authValue}`;
                codes = `${c1}${c2}FFFFFFFFFFFFFFFFFFFFFF`;
                up_auth.v = d.authValue?.toString();
                param.passwords = codes;
            }
            let r = await this.sendAndWait(param) as sm.mqtt_all_cmd_red;
            if(r && (r.cmd == "authCard" || r.cmd == "authPassword")){
                if(r.result === "ok"){
                    if(is_del){
                        if(d.au_id){
                            /** 这里删除授权 */
                            await DB.sql.delete(Api.tb.kxyk_mqtt_gateway_lock_auth,{id:d.au_id},tran);
                        }else{
                            let del_up:tb.UP<tb.kxyk_mqtt_gateway_lock_auth> = {lid:d.lid}
                            if(r.cmd ==="authCard"){
                                del_up.t = "Card";
                                del_up.sb_id = d.authValue as number;
                            }
                            if(r.cmd === "authPassword"){
                                del_up.t = "Password";
                                del_up.v = d.authValue as string;
                            }
                            await DB.sql.delete(Api.tb.kxyk_mqtt_gateway_lock_auth,del_up,tran);
                        }

                    }else{
                        /** 这里添加数据库日志 */
                        await DB.sql.insert(Api.tb.kxyk_mqtt_gateway_lock_auth,up_auth,tran);
                    }

                    /** 这里自动更新获取锁内数据 */
                    await this.getLockInfo(lock.id.toString());
                    return true;
                }else{
                    throw new Error(`添加授权失败${r.result}`);
                }
            }else{
                throw new Error(`添加授权失败,当前环境不能发送授权指令`);
            }
        } catch (error) {
            let e = Utils.getError(error);
            log(`添加${d.authType}授权失败`,e)
            if(is_err) throw e;
            return false;
        }
    }
    /**
     * 获取锁内参数
     * @param lid 锁ID
     * @returns boolean 是否执行成功
     */
    async getLockInfo(lid:string){
        try {
            let lock = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway_lock,lid) as tb.kxyk_mqtt_gateway_lock;
            if(!lock) throw new Error("锁不存在");
            let param:sm.mqtt_all_cmd_send = {cmd:"lockInfo",clientId:lock.clientId,lockId:lock.lockId,id:"0"};
            let r = await Mqtt.sendAndWait(param) as sm.mqtt_all_cmd_red;
            if(r && r.cmd == "lockInfo"){
                let {cmd,result,id,status,...up} = r;
                if(up){
                    await DB.sql.update(Api.tb.kxyk_mqtt_gateway_lock,up,{clientId:lock.clientId,lockId:lock.lockId});
                }
                return true;
            }
            throw new Error("code:-36302");
        } catch (error) {
            let e = Utils.getError(error);
            log('清空锁内授权失败',e)
            return false
        }
    }

    /**
     * 清空锁内授权 
     * @param lid 锁ID
     * @param is_up 是否自动获取并更新锁内数据到数据库
     * @returns boolean 是否执行成功
     */ 
    async clearAuthLock(lid:string,is_up:boolean = false):Promise<boolean>
    {
        try {
            let lock = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway_lock,lid) as tb.kxyk_mqtt_gateway_lock;
            if(!lock) throw new Error("锁不存在");
            let param:sm.mqtt_all_cmd_send = {cmd:"clearAuth",clientId:lock.clientId,lockId:lock.lockId,authType:"all",id:"0"};
            let r = await Mqtt.sendAndWait(param) as sm.mqtt_all_cmd_red;
            if(r && r.cmd == "clearAuth" && r.result == "ok"){
                /** 这里删除授权表所有授权 */
                await DB.sql.delete(Api.tb.kxyk_mqtt_gateway_lock_auth,{lid:lock.id});
                if(is_up){   
                    if(await this.getLockInfo(lid)){
                        return true;
                    }
                }else{
                    return true   
                }
            }
            throw new Error("code:-36301");
        } catch (error) {
            let e = Utils.getError(error);
            log('清空锁内授权失败',e)
            return false
        }
    }
    /** 初始化 */
    async init(){
        this.client = mqtt.connect(Config.lock_server, {
            clientId: Config.lock_name,
            username: 'admin0',
            password: 'admin1',
            clean: true
        })
        this.client.on('connect', () => {
            console.log('✅ MQTT连接成功')

            this.client.subscribe('device/#', { qos: 1 }, (err, granted) => {
                if (err) {
                    console.error('❌ 订阅失败', err)
                } else {
                    console.log('📡 订阅成功', granted)
                }
            })
            // 收消息
            this.client.on('message', (topic, message) => {
                // log('收到消息', topic, message.toString())
                try {
                    const data = JSON.parse(message.toString()) as sm.mqtt_all_cmd_red;
                    if (data.id && this.pending.has(data.id)) {
                        const resolve = this.pending.get(data.id)!
                        this.pending.delete(data.id)
                        resolve(data)  
                        return
                    }
                    this.readMsg(data)

                } catch (error) {
                    console.log('订阅智能锁解析JSON失败', error)
                }
            })
        })
    }
    
    async sendMsg(m:sm.mqtt_all_cmd_send){
        if(this.env === Config.lock_name){
            this.client.publish(`smartHouse/${m.clientId}`,JSON.stringify(m));
        }else{
            if(m.cmd === "heartbeat") return !1; 
            log('当前环境无法发送指令',m.cmd);
        }
    }
    async readMsg(m:sm.mqtt_all_cmd_red)
    {
        /** 读取锁内日志 或者解锁日志自动触发 */
        if(m.cmd ==="readRecord"){
            if(m.result === 'ok'){
                let send:sm.mqtt_readRecord_send = {
                    cmd:"readRecord",result:"ok",clientId:m.clientId,lockId:m.lockId,id:'0'
                }
                if(m.totalnum > m.thisnum){
                    /** 这里有不止一页日志 需要发送继续读取指令 */
                    send.result = "more";
                }
                this.sendMsg(send);
            }
        }
        /** 添加锁 */
        if(m.cmd ==="addLock"){
            if(m.result ==="ok"){
                if(m.clientId && m.lockId){
                    let lock = await DB.sql.get(`SELECT * FROM kxyk_mqtt_gateway_lock WHERE clientId = ? and lockId = ?`,[m.clientId,m.lockId]) as tb.kxyk_mqtt_gateway_lock;
                    if(!lock){
                        /** 新增锁 */
                        let newLock:tb.UP<tb.kxyk_mqtt_gateway_lock> = {
                            clientId:m.clientId,lockId:m.lockId
                        }
                        await DB.sql.insert(Api.tb.kxyk_mqtt_gateway_lock, newLock);
                    }
                }
            }
            
            if(this.lockPending.has(m.clientId)){
                let staff = this.lockPending.get(m.clientId);
                if(staff && staff.uid && Run){
                    Run.Users.EmitUser(staff.uid,'mqtt_red',m);
                }
            }
            
        }
        if(m.cmd === 'heartbeat'){
            /** 收到心跳包 */
            if(m.connect === 0){
                let wg = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway,m.clientId,false,'clientId') as tb.UP<tb.kxyk_mqtt_gateway>;
                if(!wg){
                    let newwg:tb.UP<tb.kxyk_mqtt_gateway> = {
                        clientId:m.clientId,t0:dayjs().unix(),t1:dayjs().unix(),online:1                      
                    }
                    await DB.sql.insert(Api.tb.kxyk_mqtt_gateway, newwg);
                }else{
                    await DB.sql.update<tb.kxyk_mqtt_gateway>(Api.tb.kxyk_mqtt_gateway,{t1:dayjs().unix()},{id:wg.id});
                }
            }else{
                let wg = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway,m.clientId,false,'clientId') as tb.UP<tb.kxyk_mqtt_gateway>;
                if(wg){
                    await DB.sql.update<tb.kxyk_mqtt_gateway>(Api.tb.kxyk_mqtt_gateway,{t1:dayjs().unix(),online:1},{id:wg.id});
                }else{
                    let newwg:tb.UP<tb.kxyk_mqtt_gateway> = {
                        clientId:m.clientId,t0:dayjs().unix(),t1:dayjs().unix(),online:1
                    }
                    await DB.sql.insert(Api.tb.kxyk_mqtt_gateway, newwg);
                }
            }
            /** 这里正常返回心跳 */
            let send:sm.mqtt_all_cmd_send = {
                cmd:'heartbeat',
                timestamp:dayjs().unix(),
                id:m.id,clientId:m.clientId,
            }
            this.sendMsg(send);
        }
        if(m.cmd === "gatewayInfo"){
            let wg = await DB.sql.getId(Api.tb.kxyk_mqtt_gateway,m.clientId,false,'clientId') as tb.UP<tb.kxyk_mqtt_gateway>;
            if(wg){
                let up:tb.UP<tb.kxyk_mqtt_gateway> = {};
                if(m.hardVer) up.hardVer = m.hardVer;
                if(m.ip) up.ip = m.ip;
                if(m.mac) up.mac = m.mac;
                if(m.version) up.version = m.version;
                if(m.state) up.state = m.state;
                await DB.sql.update<tb.kxyk_mqtt_gateway>(Api.tb.kxyk_mqtt_gateway,up,{id:wg.id});
            }
        }
    }
    
    // 设置IO
    public setIo(sysIo: io) {
        this.io = sysIo;
    }
}
const Mqtt = new kxykMqtt();
export default Mqtt