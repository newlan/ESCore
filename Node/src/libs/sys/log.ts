import dayjs from "dayjs";
import { DB ,Cache,Run,Config,Api} from "LAN";
import { PoolConnection, ResultSetHeader} from "mysql2/promise";
import { io } from "../io";
const log = require('debug')('lan:sys')
/** 开薪怡客系统运行日志 */
export class kxykLog
{
    public io:io | undefined
    constructor()
    {
        // this.run();
    }
    // 设置IO
    public setIo(sysIo: io) {
        this.io = sysIo;
    }
    /**
     * 生成日志消息体
     * @param info 参数
     * @param tran 事务 cid
     * @returns 消息体
     */
    async makeMsg(info:sm.Com.MakeLogMsgInfo,tran: false | PoolConnection = false)
    {
        let msg = ``;
        if(!info.clerk_id || !this.io) return msg;
        /** 员工数据 */
        let staff = null;
        if(info.clerk_id){
            staff = await DB.sql.get(`SELECT COALESCE(u.real_name,u.nickname,u.phone) as nickname,c.*,t.n
            FROM kxyk_mch_store_clerk c 
            LEFT JOIN kxyk_mch_store_clerk_type t on t.id = c.t
            LEFT JOIN sm_user u on u.uid = c.uid
            WHERE c.id = ?`, [info.clerk_id],tran) as tb.kxyk_mch_store_clerk;
        } 
        

        /** 用户数据 带有VIP身份 */
        let user = await this.io.Users.Pd1.U.GetXYStoreUser(info.uid ?? 0, info.sid ?? 0);
        /** 
         * vip数据
         * @param 会员设置时的VIP
         * @param 充值赠送是的VIP
         */
        let vip = null;
        if(info.vip){
            vip = await DB.sql.getId(Api.tb.kxyk_mch_type_vips, info.vip) as tb.kxyk_mch_type_vips;
        }
        if(info.t ==="鞋柜手牌"){
            if(staff){
                msg += `${staff.n}[${staff.nickname}:${staff.uid}]`
            }
        }
        if(info.t === '开始服务' || info.t === '结束服务' || info.t === '商品送达' || info.t === '转为店购' || info.t === '解绑手牌'){
            if(staff){
                msg += `${staff.n}[${staff.nickname}:${staff.uid}]${info.t}`
            }
            let od = await DB.sql.get(`SELECT COALESCE(u.real_name,u.nickname,u.phone) as nickname,h.is_guest,h.guest_number,od.*
            FROM kxyk_mch_store_order_detall od 
            LEFT JOIN kxyk_mch_store_order o on o.id = od.oid
            LEFT JOIN kxyk_bath_hall h on h.id = o.hid
            LEFT JOIN sm_user u on u.uid = o.uid
            WHERE od.id = ?`, [info.odid ?? 0],tran) as tb.kxyk_mch_store_order_detall & {
                is_guest:number,
                guest_number:number,
                nickname:string
            };
            if(od){
                if(od.is_guest){
                    msg += `[游客${od.guest_number}]`
                }else{
                    msg += `用户[${od.nickname}:${od.uid}]`
                }
                msg += `的订单[${od.item_name}:${info.odid}] `
            }

        }
        if(info.t === "解绑用户"){
            if(staff){
                msg += `${staff.n}[${staff.nickname}:${staff.uid}]${info.t}[${user.nickname}:${user.uid}]，解绑大厅ID:[${info.hid}]`
            }
        }
        if(info.t === '充值信值' || info.t ==='充值余额'){
            if(staff){
                msg += `${staff.n}[${staff.nickname}:${staff.uid}]为用户[${user.nickname}:${user.uid}]${info.t}￥${info.price}元`
            }else{
                if(info.type === 2){
                    msg += `用户[${user.nickname}:${user.uid}]自主在线${info.t}￥${info.price}元`
                }
               
            }
            if(info.vip && vip){
                msg += `,赠送会员[${vip.name}]。`
            }
        }
        if(info.t === '会员设置'){
            if(staff && this.io && info.uid && info.sid){
                let vip_name = '银卡';
                if(info.vip && vip){   
                    vip_name = vip.name;
                }
                msg += `${staff.n}[${staff.nickname}:${staff.uid}]为用户[${user.nickname}:${user.uid}]设置了会员:[${vip_name}]`
                if(user.vip && user.vip_name){
                    msg += `，用户原会员[${user.vip_name}]被覆盖。`
                }
                // let user = await 
                // msg += `${staff.n}[${staff.nickname}:${staff.uid}]${info.t}`
            }
        }
        if(info.t === '现金收款')
        {
            if(staff){
                msg += `${staff.n}[${staff.nickname}:${staff.uid}]在`
            }
            let pdo = await DB.sql.get(`SELECT GROUP_CONCAT(od.item_name ORDER BY FIND_IN_SET(od.id, p.odids)) AS items,
            COALESCE(u.nickname,u.phone,CONCAT('游客',h.guest_number)) as nickname,p.*
            FROM kxyk_bath_hall_prior_pay p
            LEFT JOIN kxyk_bath_hall h on h.id = p.hid
            LEFT JOIN sm_user u on u.uid = h.uid
            LEFT JOIN kxyk_mch_store_order_detall od on FIND_IN_SET(od.id,p.odids) > 0
            WHERE p.id = ?`, [info.pid]) as tb.kxyk_bath_hall_prior_pay &{
                /** 订单详情名称组 */
                items:string
                /** 用户昵称 */
                nickname:string
            }
            if(pdo){
                msg += `[${pdo.nickname}${pdo.pay_uid ? `:${pdo.pay_uid}` :''}]的订单[${pdo.oids}:${pdo.items}]中，现金收款${pdo.price}元。`
            }
        }

        return msg
    }
    /**
     * 写入日志方法
     * @param info 包含字段cid,sid,level,fn,msg
     */
    async write(info:sm.Com.SystemLogsParams,tran: false | PoolConnection = false)
    {
        const newLog:Omit<tb.kxyk_system_logs,'id'> = {
            ...info,t1:dayjs().unix(),
        }
        /** 这里判断是否是门店日志 且门店日志是否设置等级 */
        if(newLog.sid){
            let store = await DB.sql.getId(Api.tb.kxyk_mch_store,newLog.sid) as tb.kxyk_mch_store;
            if(!store || !store.log_level || store.log_level > newLog.level){
                //取消写入日志
                return false;
            }
        }
        return await DB.sql.insert(Api.tb.kxyk_system_logs, newLog,tran); 
    }

}
const Logs = new kxykLog();

export default Logs