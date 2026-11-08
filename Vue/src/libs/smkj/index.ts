

/** -------- */
import { sk,Config,Role,WebReader } from "./io";
import { reactive,createVNode,render } from "vue";
import { Router,RouteLocationRaw} from "vue-router";
import { message ,Modal as AModal,notification} from 'ant-design-vue';
import { ElMessage } from 'element-plus'
import { nextTick,h } from 'vue';
import Cookie from "js-cookie";
import { Api } from "smkj";
import utils,{Utils as uut,ECharts,showCustomDialog,closeDialog} from "./utils";
import userClass from "./user";
import p1 from "./p1";
import State from "./state";
import { Store } from "vuex";
import WxJssdk from "./wxjssdk";
import RootStateTypes from "@/store/interface";
import {store as D1store} from "./store";
import _ from 'lodash';
import useClipboard from 'vue-clipboard3';
import QrCode from '@/views/com/vueQrcode.vue';
import area1 from "./utils/area";
import { useNoticeStore } from "@/store/useNoticeStore";
/** 全国三级行政区域 */
export const area = area1;
/** lodash */
export const __ =_;
/** 平台配置文件 */
export * as config from "./config";
export * as io from "./io/sk";
export * as shop from "./shop";
export const Utils = utils;
export const store = D1store;
export * as regx from "./regx";
export const state = State;
export const cookie = Cookie;

interface MiniProgramMessage {
  type: string;
  [key: string]: any;
}
export interface AppStores {
  Notice: ReturnType<typeof useNoticeStore>;
  // User: ReturnType<typeof useUserStore>; // 以后扩展只需在此增加一行
}
class SMKJ {
    /** 新的状态管理器pinpa */
    private _stores: AppStores | null = null;
    /** 百度图表 */
    public echarts:ECharts= new ECharts();
    /** sk - 开薪怡客通讯模块 */
    public sk:sk;
    /** R - 缓存VUE总路由 */
    public R:Router | null = null;
    /** S - VUEX */
    public S:Store<RootStateTypes>|null;
    /** user 开薪怡客用户 */
    public user:userClass;
    /** 引擎状态管理器 - lan重新设计 */
    public state:State;
    /** 临时挂载消息提示组件 用的是ElMessage */
    // public msg:SFCWithInstall<Message> = ElMessage;
    public msg = message;
    public Emsg = ElMessage;
    public Modal = {
        confirm(options: any) {
        const width = window.innerWidth > 800 ? 600 : '90%'
        return AModal.confirm({
            centered: true,   // 默认居中
            width,            // 根据屏幕宽度自动设置
            okText: '确定',
            cancelText: '取消',
            ...options        // 支持用户自定义覆盖
        })
        },

        info(options: any) {
        const width = window.innerWidth > 800 ? 500 : '90%'
        return AModal.info({
            centered: true,
            width,
            ...options
        })
        },


        success(options: any) {
        const width = window.innerWidth > 800 ? 500 : '90%'
        return AModal.success({
            centered: true,
            width,
            ...options
        })
        },

        warning(options: any) {
        const width = window.innerWidth > 800 ? 500 : '90%'
        return AModal.warning({
            centered: true,
            width,
            ...options
        })
        },

        error(options: any) {
        const width = window.innerWidth > 800 ? 500 : '90%'
        return AModal.error({
            centered: true,
            width,
            ...options
        })
        },
    }
    public Notification = notification;
    /** 平台工具合集 */
    public utils:uut=utils;
    /** 系统已定义的正则验证 */
    // public regx:typeof regx = regx;
    /** 微信客户端sdk */
    public WxJsdk:WxJssdk;
    public rdapi:WebReader = new WebReader();
    /** h5 plus */
    public plus:any = null;
    /** 当前页面是否已经掉线需要重新刷新 */
    public is_offline:boolean = false;
    /** 页面是否进入后台 */
    public is_hide:boolean = false;
    /** 洗浴相关类 */
    public p1;
    /** 系统一些默认配置 */
    public sys = 
    {
        /** 默认头像 */
        avatar:'https://ESCore.vpks.net/img/avatar.png',
        host:window.location.protocol + '//' + window.location.host
    }
    /** 2024-09-11扩展新身份权限 */
    public role:sm.Pd1.KxykRole = 
    {
        /** 角色是否已经加载完成 部分也没需要角色加载完成才能读取数据 例如是否显示下单图片 */
        is_load:false,
        /** 是否洗浴门店管理员 0 或者门店号码 */
        is_p1:0,
        /** 洗浴管理员页面数据集合 */
        p1_dbs:false,
        /** 是否洗浴进店用户 0 或者门店号码 */
        p1_user:0,
        /** 洗浴门店用户端数据 */
        p1_user_dbs:false,
        /** 管理员和用户监听页面事件 */
        OnEvent:()=>{
  
            this.sk.on('offline',async ()=>{
                this.showPop({title:'登录失效',message:'账号已在其他地方登录！',buttons:[
                    {
                        text:'点击刷新',action:()=>{window.location.reload();}
                    }
                ]});
            })
            this.sk.addev('up_msg_list_auto2',(res:sm.Com.StoreChatMsg)=>{

            })
            
            this.sk.on(Api.Event.EditP1User,async (db:sm.Pd1.EmitP1Par)=>{
                if(db.t === "use_doom"){

                }
                if(db.t ==="print"){

                }
                if(db.t === "up_store_electron_id"){

                }
                if(db.t === "staff_del"){

                }
                /** 扫码弹框用户 */
                if(db.t === "pop"){

                }
                if(db.t === "staff_join"){
  
                }

                if(db.t === "join"){
 
                }
                /** 删除或离开 */
                if(db.t === "del"){
      
                }
                // 修改用户数据
                if(db.t === "edit"){
                }

            })
        }

    }
    constructor(c:Config) {
        this.sk = new sk(c,this);
        this.S = null;
        this.state = new State();
        // this.msg = ElMessage;
        this.WxJsdk = new WxJssdk(this.sk,this.utils,this.state);
        this.user = new userClass(this.sk);
        this.p1 =  reactive(new p1(this.sk,this.role));
        // this.user = {NowPage:undefined,ev:this.utils.getEvn(), uid:0, is_login:false, token:Cookie.get('token'), disconnect:false, is_location:false, location:false, is_report_location:false };
        this.init();
    };


    /** 如果是P1环境的话直接获取P1页面总数据 */
    public getP1dbs(){
        if(this.role.is_p1 && this.role.p1_dbs){
            return this.role.p1_dbs;
        }
        return false;
    }

    /**
     * 对外暴露的 store 访问器
     * 使用代理或直接返回，保证 TS 能够识别类型
     */
    public get store(): AppStores {
        if (!this._stores) {
            throw new Error("SMKJ Store 尚未初始化，请在 app.use(pinia) 后调用 initStores()");
        }
        return this._stores;
    }

    /**
     * 手动注入方法
     * 通常在 main.ts 中，确保 Pinia 已经挂载后调用
     */
    public initStores() {
        this._stores = {
            Notice: useNoticeStore(),
            // User: useUserStore(), // 以后在这里实例化
        };
    }
    /** 前端下拉刷新分页组件类型工厂函数 */
    ItemType<T>(): T {
        return undefined as unknown as T;
    }


    /** TS页面提示内容 */
    showPop(option:sm.Com.showPopOption,className = ''){
        showCustomDialog(option,className)
    }

    /**
     * 2022.08.26重新设计自动登录逻辑 - 先适配公众号
     * @returns 是否登录成功
     */
    async AutomaticLogon():Promise<boolean>{
        
        if(this.utils.sys.is_wx)
        {
            if(this.utils.sys.is_wxapp){
                // let back_url = kxyk.state.get('back_url');
                return window.wx.miniProgram.navigateTo({url:"/pages/public/login/index?path="+this.state.get('back_url')});
                // this.WxJsdk.Auth();
                
            }else{
                // 微信公众号
                await this.WxJsdk.BaseAuth();
            }
        }
        if(this.utils.sys.is_app)
        {
            // APP
            try {
                if(await this.WxJsdk.AppAuth())
                {
                    let is_login = await this.tokenLogin();
                    if(typeof is_login === 'object')
                    {
                        return false;
                    }else{
                        return is_login;
                    }
                }
                return false;
            } catch (error) {
                return false;
            }
        }
        return false;
    }
    async PostMessage(message:{data:any})
    {
        const payload = typeof message === 'object' ? message : { data: message };
        function _post() {
          WeixinJSBridge.invoke('postMessage', payload,res=>{
            console.log(res);
            
          });
        }
      
        if (typeof WeixinJSBridge === 'undefined') {
          document.addEventListener('WeixinJSBridgeReady', _post, false);
        } else {
          _post();
        }
    }

    /** 复制方法 */
    copy1(s:string){
        const { toClipboard } = useClipboard();
        try {
            toClipboard(s);
            return true
            // this.msg.success('已复制.');
            // console.log('Copied to clipboard')
        } catch (e) {
            this.msg.error(e as any);
            return false;
            console.error(e)
        }
    }
    /** 复制方法 */
    async copy(s:string){
        const { toClipboard } = useClipboard();
        try {
            await toClipboard(s);
            this.msg.success('已复制.');
            // console.log('Copied to clipboard')
        } catch (e) {
            this.msg.error(e as any);
            console.error(e)
        }
    }
    /** 08.26 重新设计登录逻辑 - 登录开薪怡客 */
    async LoginKxyk():Promise<boolean|userClass>
    {
        return this.user.is_login;
    }
    
    private Reconnect()
    {
        // 重连
        if(this.sk.role === "D1" && this.user.D1Page)
        {
            this.sk.be(Api.shop.D1.Reconnect,{store_id:this.user.D1Page.Store.id,boss:this.user.D1Page.is_boss},res=>{
                if(res.status === 0)
                {
                    console.log('D1重连失败！');
                }
            });
        }
        if(this.role.is_p1){
            this.sk.be('',{sid:this.role.is_p1},res=>{
                if(res.status === 0){
                    console.log('P1重连失败！');
                }
            })     
        }
    }
    hide(){
        let _this = this;
        document.addEventListener("visibilitychange",function(){
            if(document.visibilityState === "hidden"){
                
                _this.is_hide = true;
            }
            if(document.visibilityState === "visible" && _this.is_hide){

                if(_this.R && _this.R.currentRoute.value.meta && _this.R.currentRoute.value.meta.refresh)
                {
                    let nn = ['财务','管理员'];
                    if(_this.p1 && _this.p1.role && _this.p1.role.is_p1 && _this.p1.role.p1_dbs && _this.p1.role.p1_dbs.loginStaff && _this.p1.role.p1_dbs.loginStaff.n && nn.includes(_this.p1.role.p1_dbs.loginStaff.n)){
                        
                    }else{
                        location.reload();
                    }
                    
                    
                }
                
            }
        })
    }
    init(){
        // 监控页面休眠
        this.hide();
        // console.log('******************开始设置**********************');
        
        // 系统日期扩展格式化方法
        Date.prototype.Format = function (fmt="yyyy-MM-dd") { 
            //yyyy-MM-dd hh:mm:ss
            var o:any = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        if(window.plus) {
            this.plus = window.plus;
        } else {
            document.addEventListener('plusready', ()=>{
                this.plus = window.plus;
            }, false);
        }
        this.sk.on('connect', (db:any)=>{
            if(this.user.disconnect)
            {
                closeDialog();
                window.location.reload();
                // 掉线重连
            }
            
        });
        this.sk.on('disconnect',(db:any)=>{
            // this.sk.delEvs();
            switch (db) {
                case 'transport error':
                    // 链接遇到错误
                    console.log('链接遇到错误');
                    break;
                case 'transport close':
                    //连接已关闭（例如：用户失去连接，或网络从 WiFi 更改为 4G）
                    console.log('连接已关闭（例如：用户失去连接，或网络从 WiFi 更改为 4G）');
                    this.user.disconnect = true;
                    break;
                case 'ping timeout':
                    //pingTimeout客户端在延迟中没有发送 PONG 数据包
                    console.log('pingTimeout客户端在延迟中没有发送 PONG 数据包');
                    break;
                case 'server shutting down':
                    //服务器正在关闭
                    console.log('服务器正在关闭');
                    break;
                case 'client namespace disconnect':
                    //客户端已使用socket.disconnect()手动断开套接字
                    console.log('客户端已使用socket.disconnect()手动断开套接字');
                    break;
                case 'server namespace disconnect':
                    console.log('套接字被socket.disconnect强行断开');
                    //套接字被socket.disconnect强行断开
                    break;
                
                default:
                    break;
            }
            // setTimeout(() => {
            //     window.location.reload();
            // }, 3001);
            this.showPop({title:'系统掉线',message:'正在自动重连中...',buttons:[
                {
                    text:'手动刷新',action:()=>{window.location.reload();}
                }
            ]},'socket-reconnect-dialog');
            this.is_offline = true;
            this.user.is_login = false;
        });
    }
   
    /**
     * 2025-04-16 系统所有支付V3版 
     * @property 收付通模式 所有支付模拟合并下单进行支付
     * @property 避免点金计划 支付完成后需要手动返回界面
     */
    onPay(args:sm.PayArgsV3)
    {
        let t = this;
        return new Promise((resolve,reject)=>{
            if(!this.user.uid) throw '无法调用，请先登录！';
            args.uid = this.user.uid;
            args.ev = this.utils.getEvn();
            if(args.mode === "yuepay" && !args.cid) throw "缺少必要参数，codd: -1 cid ！";
            if(!args.sid && !args.cid) throw "缺少收款门店";
            this.sk.be(Api.newlan.onUnifiedOrder,args,async(res)=>{
                if(res.status){
                    if(res.db)
                    {
                        if(args.mode === "yuepay"){
                            if(res.db.status){
                                resolve(res);
                            }else{
                                // reject(res.msg);
                            }
                        }
                        // 微信支付
                        if(args.mode === 'wxpay')
                        {
                            switch (args.ev) {
                                case "H5":
                                    this.Modal.confirm({
                                        // title: '授权金额',
                                        icon:undefined,
                                        // okButtonProps:is_sub,
                                        content: ()=>{
                                            return h('div',{style:'color:red;'},[
                                                h("div",{style:'padding:5px 0;color:#000;'},['扫一扫付款(元)']),
                                                h(QrCode,{value:res.db.code_url,style:"height:100%;width:100%"}
                                                ),
                                            ])
                                        },okText:'确定',cancelText:'取消',
                                        onOk(){
                                            return new Promise((resolve,reject)=>{
                    
                                            });
                                        }
                                    })
                                    break;
                                case 'WX':
                                    // 公众号支付
                                    WeixinJSBridge.invoke('getBrandWCPayRequest', res.db,(res:any)=>{
                                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                            // alert('支付成功')
                                            resolve(res);
                                        }
                                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            reject('取消支付');
                                        }
                                        if (res.err_msg == "get_brand_wcpay_request:fail") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            reject('支付失败');
                                        }
                                        
                                    });
                                    
                                    break;
                                case "WXAPP":
                                    // 小程序
                                    console.log('这里进入小程序支付',res);
                                    if(!this.user.is_login) reject('支付失败，没有登录！');
                                    await t.sk.so_('wxapp_pay',{uid:this.user.is_avatar ? this.user.is_avatar : this.user.uid,PayData:res.db}).then(res_=>{
                                        console.log('中转服务器返回',res_);
                                        resolve(res_);
                                    }).catch(e=>{
                                        console.log('中转发生错误:',e);
                                        reject(e);
                                    })
                                    
                                    break;
                                case "APP":
                                    // APP支付
                                    try {
                                        let plus = await this.WxJsdk.GetH5Plus();
                                        plus.payment.getChannels((chan:any)=>{
                                            // console.log(chan,'这里是所有支付包');
                                            let obj_pay:any = {};
                                            for (let pid in chan) {
                                                let pay = chan[pid];
                                                if (pay.id == 'qhpay' || pay.id == 'qihoo' || pay.id == 'alipay') {
                                                    continue
                                                }
                                                obj_pay[pay.id] = pay;
                                            }
                                            plus.payment.request(obj_pay['wxpay'],res.db.PayData,function(){
                                                console.log('支付成功');
                                                resolve(true);
                                            },function(error:any){
                                                console.log('发生错',error);
                                                let msg = "支付失败,code:-17,请联系管理员！";
                                                if(error.code === -100) msg="取消支付！"; 
                                                reject(msg)
                                                
                                            })
                                            
                                        })
                                    } catch (error) {
                                        reject(error);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                    // 后续扩展阿里支付 银行卡支付等
                    // reject('支付失败，更多支付方式暂不支持!')
                }
            });
            
        });
    }
    /**
     * 2025-04-10 洗浴收付通支付V3版
     * @property 本方法未收付通 子商户收款 带有点金计划
     * @property 普通支付模式 
     */
    PayXY(args:sm.PayArgsV3)
    {
        let t = this;
        return new Promise((resolve,reject)=>{
            if(!this.user.uid) throw '无法调用，请先登录！';
            args.uid = this.user.uid;
            args.ev = this.utils.getEvn();
            if(args.mode === "yuepay" && !args.cid) throw "缺少必要参数，codd: -1 cid ！";
            if(!args.sid && !args.cid) throw "缺少收款门店";
            this.sk.be(Api.newlan.unifiedOrderXYV3,args,async(res)=>{
                if(res.status){
                    if(res.db)
                    {
                        if(args.mode === "yuepay"){
                            if(res.db.status){
                                resolve(res);
                            }else{
                                // reject(res.msg);
                            }
                        }
                        // 微信支付
                        if(args.mode === 'wxpay')
                        {
                            switch (args.ev) {
                                case "H5":
                                    this.Modal.confirm({
                                        // title: '授权金额',
                                        icon:undefined,
                                        // okButtonProps:is_sub,
                                        content: ()=>{
                                            return h('div',{style:'color:red;'},[
                                                h("div",{style:'padding:5px 0;color:#000;'},['扫一扫付款(元)']),
                                                h(QrCode,{value:res.db.code_url,style:"height:100%;width:100%"}
                                                ),
                                            ])
                                        },okText:'确定',cancelText:'取消',
                                        onOk(){
                                            return new Promise((resolve,reject)=>{
                    
                                            });
                                        }
                                    })
                                    break;
                                case 'WX':
                                    // 公众号支付
                                    WeixinJSBridge.invoke('getBrandWCPayRequest', res.db,(res:any)=>{
                                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                            // alert('支付成功')
                                            resolve(res);
                                        }
                                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            reject('取消支付');
                                        }
                                        if (res.err_msg == "get_brand_wcpay_request:fail") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            reject('支付失败');
                                        }
                                        
                                    });
                                    
                                    break;
                                case "WXAPP":
                                    // 小程序
                                    console.log('这里进入小程序支付',res);
                                    if(!this.user.is_login) reject('支付失败，没有登录！');
                                    await t.sk.so_('wxapp_pay',{uid:this.user.uid,PayData:res.db}).then(res_=>{
                                        console.log('中转服务器返回',res_);
                                        resolve(res_);
                                    }).catch(e=>{
                                        console.log('中转发生错误:',e);
                                        reject(e);
                                    })
                                    
                                    break;
                                case "APP":
                                    // APP支付
                                    try {
                                        let plus = await this.WxJsdk.GetH5Plus();
                                        plus.payment.getChannels((chan:any)=>{
                                            // console.log(chan,'这里是所有支付包');
                                            let obj_pay:any = {};
                                            for (let pid in chan) {
                                                let pay = chan[pid];
                                                if (pay.id == 'qhpay' || pay.id == 'qihoo' || pay.id == 'alipay') {
                                                    continue
                                                }
                                                obj_pay[pay.id] = pay;
                                            }
                                            // console.log(obj_pay);
                                            
                                            plus.payment.request(obj_pay['wxpay'],res.db.PayData,function(){
                                                console.log('支付成功');
                                                resolve(true);
                                            },function(error:any){
                                                console.log('发生错',error);
                                                let msg = "支付失败,code:-17,请联系管理员！";
                                                if(error.code === -100) msg="取消支付！"; 
                                                reject(msg)
                                                
                                            })
                                            
                                        })
                                    } catch (error) {
                                        reject(error);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                    // 后续扩展阿里支付 银行卡支付等
                    // reject('支付失败，更多支付方式暂不支持!')
                }
            });
            
        });
    }

    /** 
     * 2024-09-26 新平台支付V3版
     * @property 用户洗车场 普通服务商 子商户收款 带点金计划
     * @property 普通支付模式 
     */
    PayV3(args:sm.PayArgsV3)
    {
        let t = this;
        return new Promise((resolve,reject)=>{
            if(!this.user.uid) throw '无法调用，请先登录！';
            args.uid = this.user.uid;
            args.ev = this.utils.getEvn();
            if(args.mode === "yuepay" && !args.cid) throw "缺少必要参数，codd: -1 cid ！";
            if(!args.sid && !args.cid) throw "缺少收款门店";
            // console.log(args.ev,'这里是环境');
            this.sk.be(Api.newlan.unifiedOrderV3,args,async(res)=>{
                console.log('支付返回',res);
                
                if(res.status){
                    if(res.db)
                    {
                        if(args.mode === "yuepay"){
                            if(res.db.status){
                                resolve(res);
                            }else{
                                // reject(res.msg);
                            }
                        }
                        // 微信支付
                        if(args.mode === 'wxpay')
                        {
                            switch (args.ev) {
                                case "H5":
                                    this.Modal.confirm({
                                        // title: '授权金额',
                                        icon:undefined,
                                        // okButtonProps:is_sub,
                                        content: ()=>{
                                            return h('div',{style:'color:red;'},[
                                                h("div",{style:'padding:5px 0;color:#000;'},['扫一扫付款(元)']),
                                                h(QrCode,{value:res.db.code_url,style:"height:100%;width:100%"}
                                                ),
                                            ])
                                        },okText:'确定',cancelText:'取消',
                                        onOk(){
                                            return new Promise((resolve,reject)=>{
                    
                                            });
                                        }
                                    })
                                    break;
                                case 'WX':
                                    // 公众号支付
                                    WeixinJSBridge.invoke('getBrandWCPayRequest', res.db,(res:any)=>{
                                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                            alert('支付成功')
                                            resolve(res);
                                        }
                                        if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            reject('取消支付');
                                        }
                                        if (res.err_msg == "get_brand_wcpay_request:fail") {
                                            // 使用以上方式判断前端返回,微信团队郑重提示：
                                            reject('支付失败');
                                        }
                                        
                                    });
                                    
                                    break;
                                case "WXAPP":
                                    // 小程序
                                    console.log('这里进入小程序支付',res);
                                    if(!this.user.is_login) reject('支付失败，没有登录！');
                                    await t.sk.so_('wxapp_pay',{uid:this.user.uid,PayData:res.db.PayData}).then(res_=>{
                                        console.log('中转服务器返回',res_);
                                        resolve(res_);
                                    }).catch(e=>{
                                        console.log('中转发生错误:',e);
                                        reject(e);
                                    })
                                    
                                    break;
                                case "APP":
                                    // APP支付
                                    try {
                                        let plus = await this.WxJsdk.GetH5Plus();
                                        plus.payment.getChannels((chan:any)=>{
                                            // console.log(chan,'这里是所有支付包');
                                            let obj_pay:any = {};
                                            for (let pid in chan) {
                                                let pay = chan[pid];
                                                if (pay.id == 'qhpay' || pay.id == 'qihoo' || pay.id == 'alipay') {
                                                    continue
                                                }
                                                obj_pay[pay.id] = pay;
                                            }
                                            // console.log(obj_pay);
                                            
                                            plus.payment.request(obj_pay['wxpay'],res.db.PayData,function(){
                                                console.log('支付成功');
                                                resolve(true);
                                            },function(error:any){
                                                console.log('发生错',error);
                                                let msg = "支付失败,code:-17,请联系管理员！";
                                                if(error.code === -100) msg="取消支付！"; 
                                                reject(msg)
                                                
                                            })
                                            
                                        })
                                    } catch (error) {
                                        reject(error);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                    // 后续扩展阿里支付 银行卡支付等
                    // reject('支付失败，更多支付方式暂不支持!')
                }
            });
            
        });
    }    
    /** 平台支付 支持多环境 */
    Pay(args:sm.PayArgs)
    {
        let t = this;
        return new Promise((resolve,reject)=>{
            if(!this.user.uid) throw '无法调用，请先登录！';
            args.uid = this.user.uid;
            args.ev = this.utils.getEvn();
            if(!args.ev || ('H5' === args.ev && args.mode ==="wxpay")) throw '当前环境不支持支付,请联系管理员!';
            if(args.mode === "yuepay" && !args.cid) throw "缺少必要参数，codd: -1 cid ！";
            // console.log(args.ev,'这里是环境');
            this.sk.be(Api.newlan.unifiedOrder,args,async(res)=>{
                if(res.status){
                    if(res.db)
                    {
                        if(res.db.order.mode === "yuepay"){
                            if(res.db.status){
                                resolve(res);
                            }else{
                                // reject(res.msg);
                            }
                        }
                        // 微信支付
                        if(res.db.order.mode === 'wxpay')
                        {
                            switch (res.db.order.ev) {
                                case 'WX':
                                    // 公众号支付
                                    try {
                                        this.WxJsdk.API('chooseWXPay',Object.assign(
                                            {
                                                success: (res:any)=> {
                                                    console.log('这里支付成功',res);
                                                    resolve(res);
                                                },
                                                fail:(err:any)=>{
                                                    console.log(err,'走到这里');  
                                                    reject(err.errMsg?err.errMsg:'支付失败，code:-1212.');
                                                },
                                                cancel:(err:any)=> {
                                                    console.log('这里是公众号取消支付',err);
                                                    
                                                    reject('取消支付');
                                                }
                                            },
                                            res.db.PayData
                                        ));
                                    } catch (error) {
                                        console.log('公众号支付错误',error);
                                        reject(error);
                                    }
                                    break;
                                case "WXAPP":
                                    // 小程序
                                    console.log('这里进入小程序支付',res);
                                    if(!this.user.is_login) reject('支付失败，没有登录！');
                                    await t.sk.so_('wxapp_pay',{uid:this.user.uid,PayData:res.db.PayData}).then(res_=>{
                                        console.log('中转服务器返回',res_);
                                        resolve(res_);
                                    }).catch(e=>{
                                        console.log('中转发生错误:',e);
                                        reject(e);
                                    })
                                    
                                    break;
                                case "APP":
                                    // APP支付
                                    try {
                                        let plus = await this.WxJsdk.GetH5Plus();
                                        plus.payment.getChannels((chan:any)=>{
                                            // console.log(chan,'这里是所有支付包');
                                            let obj_pay:any = {};
                                            for (let pid in chan) {
                                                let pay = chan[pid];
                                                if (pay.id == 'qhpay' || pay.id == 'qihoo' || pay.id == 'alipay') {
                                                    continue
                                                }
                                                obj_pay[pay.id] = pay;
                                            }
                                            // console.log(obj_pay);
                                            
                                            plus.payment.request(obj_pay['wxpay'],res.db.PayData,function(){
                                                console.log('支付成功');
                                                resolve(true);
                                            },function(error:any){
                                                console.log('发生错',error);
                                                let msg = "支付失败,code:-17,请联系管理员！";
                                                if(error.code === -100) msg="取消支付！"; 
                                                reject(msg)
                                                
                                            })
                                            
                                        })
                                    } catch (error) {
                                        reject(error);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }

                    }
                    // 后续扩展阿里支付 银行卡支付等
                    // reject('支付失败，更多支付方式暂不支持!')
                }
            });
            
        });
    }
    /** 更新用户定位数据 */
    async upLocation()
    {
        // console.log('进入定位方法',this.user.is_location);
        
        // if(this.user.is_on_location){
        //     return false;
        // }
        // this.user.is_on_location = true;//正在定位中
        if(this.utils.sys.is_wxapp) return 0;//小程序端不在定位
        if(!this.user.is_location)
        {
     
            // console.log('开始定位');
            // kxyk.p1.DeBugLog('开始定位');
            let location = await this.getLocation(); 
            // console.log('定位结果',location);
            // kxyk.p1.DeBugLog(`定位结果:${JSON.stringify(location)}`);
            // this.user.is_on_location = false;//定位结束
            if(location)
            {
                this.user.is_location = true;
                this.user.location = location;
                if(this.user.uid)
                {
                    this.reportLocation();
                }
            }
            
        }else{
            if(!this.user.is_report_location && this.user.location && this.user.uid){
                this.reportLocation();
            }
        }
    }
    /** 上报用户位置 */
    private reportLocation()
    {
        if(this.user.location){
            let location = this.user.location;
            location.uid = this.user.uid;
            location.url = window.location.href;
            location.os = this.utils.sys.os();
            this.sk.be(Api.newlan.ReportLocation,this.user.location,(res)=>{
                this.user.is_report_location = true;
            })
        }

    }
    /** 获取用户位置 */
    async getLocation():Promise<sm.location|false>
    {
        return new Promise(async(resolve,reject)=>{
            if(this.utils.sys.is_app && this.user.uid)
            {
                // kxyk.p1.DeBugLog('APP环境开始')
                let plus = await this.WxJsdk.GetH5Plus();
                // kxyk.p1.DeBugLog(`${JSON.stringify(plus.geolocation.getCurrentPosition)}`);

                let permissions = [
                    "android.permission.ACCESS_FINE_LOCATION",
                    "android.permission.ACCESS_COARSE_LOCATION"
                ];

                plus.android.requestPermissions(
                    permissions,
                    async (resultObj:any) => {
                        if (resultObj.granted.length > 0) {
                            // console.log("定位权限已授予");
                            // kxyk.p1.DeBugLog('现在可以定位了已经授权同意')
                            plus.geolocation.getCurrentPosition(
                                async (position:any) => {
                                    // console.log("定位成功");

                                    let coords = position.coords;
                                    // console.log("纬度:", coords.latitude);
                                    // console.log("经度:", coords.longitude);
                                    // console.log("精度:", coords.accuracy);
                                    // console.log("地址信息:", position.addresses);
                                    // kxyk.p1.DeBugLog(`定位成功:${JSON.stringify(position)}`);
                                    let res_p:sm.location={lat:coords.latitude,lng:coords.longitude,
                                        address:position.addresses,province:position.province,
                                        city:position.city,district:position.district};
                                    // kxyk.p1.DeBugLog(`定位结果:${JSON.stringify(res_p)}`);
                                    resolve(res_p);
                                    // resolve(await this.utils.AMap.ConvertGPS1({lng:p.coords.longitude,lat:p.coords.latitude}))
                                },
                                async (e:any) => {
                                    // kxyk.p1.DeBugLog(`定位失败:${JSON.stringify(e)}`);
                                    console.log("定位失败:", e.message);
                                    resolve(await this.utils.AMap.IPlocation());
                                },
                                {
                                    enableHighAccuracy: false, // 高精度（GPS）
                                    timeout: 10000,
                                    // provider: 'system', // system | baidu | amap
                                    // coordsType: 'wgs84', // 国内地图必须用这
                                    provider: 'amap', // system | baidu | amap
                                    coordsType: 'gcj02', // 国内地图必须用这
                                    maximumAge: 1000
                                }
                            );
                        } else {
                            console.log("用户拒绝定位权限");
                            // kxyk.p1.DeBugLog('用户拒绝定位权限')
                            resolve(await this.utils.AMap.IPlocation());
                        }
                    },
                    async (error:any) => {
                        // kxyk.p1.DeBugLog(`权限申请错误:${JSON.stringify(error)}`);
                        console.log("权限申请错误:", error);
                        resolve(await this.utils.AMap.IPlocation());
                    }
                );


            }
            if(this.utils.sys.is_wx && !this.utils.sys.is_wxapp && this.user.uid)
            {
                this.WxJsdk.API('getLocation',{
                    type:'wgs84',
                    success:async(res:any)=>
                    {
                        let loca = await this.utils.AMap.ConvertGPS1({lng:res.longitude,lat:res.latitude});
                        // gps坐标转换
                        resolve(loca);
                    },
                    cancel:async(e:any)=>{
                        console.log('用户取消定位',e);
                        resolve(await this.utils.AMap.IPlocation());
                    },
                    fail:async(e:any)=>{
                        console.log('定位失败了',e);
                        resolve(await this.utils.AMap.IPlocation());
                    },
                });
            }
            if('h5' === this.utils.sys.os())
            {
                resolve(await this.utils.AMap.IPlocation());
            }
            // console.log(this.utils.sys.os());
            
        })

        
    }
    /** token登录 */
    async tokenLogin(wxapp:boolean = true):Promise<boolean|{over:boolean}>
    {
        if(this.user.token){
            let res = await this.sk.be_(Api.lan.silence_login,{token:this.user.token,ev:this.user.ev,store_id:this.sk.data.store_id});
            if(res && res.status)
            {
                this.user = Object.assign(this.user,res.db);
                this.user.is_login = true;
                if(res.sk_id) this.user.sk_id = res.sk_id;
                return true;
            }else{
                if(res.over) return {over:true};
            }
        }
        return false;
    }
    /**
     * 内部登录方法 不要调用该方法
     * @returns @boolean
     */
    async isLogin():Promise<boolean>
    {
        if(!this.user.is_login)
        {
            // token登录
            if(this.user.token)
            {
                if(await this.tokenLogin())
                {
                    return true;
                }
            }
            // 自动登录 - 08-26 根据腾讯规范修改
            return await this.autoLogin();
        }else{
            return true;
        }
    }
    /**
     * 设置路由 - 系统初始化调用不要自主调用
     * @param r 路由
     */
    setRouter(r:Router,store:Store<RootStateTypes>){
        if(!this.R){
            this.R = r;
        }
        if(!this.S && store){
            this.S = store;
        }
    }
    /**
     * 开薪怡客路由跳转
     * @param url vue路由地址
     * @returns true
     */
    toUrl(url:RouteLocationRaw){
        if(this.R){
            this.R.push(url);
            return true;
        }
    }
    toPhone(phone:string){
        window.location.href =  "tel:"+phone;
    }
    /**
     * 自动授权登录开薪怡客
     */
    async autoLogin():Promise<boolean>{
        if(this.utils.sys.is_wx)
        {
            if(this.utils.sys.is_wxapp){
                // let back_url = kxyk.state.get('back_url');
                
                return window.wx.miniProgram.navigateTo({url:"/pages/public/login/index?path="+this.state.get('back_url')});
                // this.WxJsdk.Auth();
                
            }else{
                // 微信公众号
                this.WxJsdk.Auth();
            }
        }
        if(this.utils.sys.is_app)
        {
            // APP
            try {
                if(await this.WxJsdk.AppAuth())
                {
                    let is_login = await this.tokenLogin();
                    if(typeof is_login === 'object')
                    {
                        return false;
                    }else{
                        return is_login;
                    }
                    // return await this.tokenLogin();
                }
                return false;
            } catch (error) {
                return false;
            }
        }
        return false;
    }
}

const get_cc = function(){
    if(!window.sm_lan_cc_js)
    {
        // 1. 获取当前基础域名 (不含端口，例如 localhost 或 yourdomain.com)
        const hostname = location.hostname;
        
        // 2. 动态构建 URL
        // 如果是本地环境 (localhost 或 127.0.0.1)，手动加上 3012 端口
        // 如果是正式环境 (CentOS 服务器域名)，则保持原样
        let wsUrl = hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            wsUrl = `${hostname}:3012`;
        }
        
        const c:Config = { URL:wsUrl, Path:'/io'};
        window.sm_lan_cc_js =  new SMKJ(c);
    }
    return window.sm_lan_cc_js;
}

export type smkj = SMKJ;
export const kxyk:SMKJ = get_cc();