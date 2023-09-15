
import { Tabe ,Cache,Event,EStr,DB, Config,Utils,Api as tbApi} from 'LAN';
import { Server } from "socket.io";
import mysql2 ,{PoolConnection}from "mysql2/promise";
import _ from "lodash";
import Pay from "./Pay";
import Store from "./Store";
import Coupon from "./Coupon";
import TuanGou from "./TuanGou";
import Shop from "./Shop";
import C1 from "./C1";
import Pd1 from "./Pd1";
import E1 from "./E1";
import U1 from "./U1";
import StoreUser from "./StoreUser";
import dayjs from "dayjs";
import WX from "../wx/index";
import commission from './commission';

const debug = require('debug')('lan:User');
const log = require('debug')('lan:UserList');
/** 后端用户系统 */
export class UserList extends StoreUser
{
    public sk:Server;
    /** 平台用户支付系统 */
    public Pay:Pay;
    /** 引入wx相关类 单实例 父级也引入过 */
    public WX:typeof WX = WX;
    /** 平台商场相关身份功能合集 */
    public Shop:typeof Shop;
    /** 扩展D1门店相关管理合集 */
    public Store:Store;
    /** 洗浴PC混合端相关接口 */
    public Pd1:Pd1;
    /** 扩展C1商圈相关管理合集 */
    public C1:C1;
    /** 扩展E1合伙人相关管理合集 */
    public E1:E1;
    /** 扩展U1普通用户管理合计 */
    public U1:U1;
    /** 扩展用户卡券系统 */
    public Coupon:Coupon;
    /** 团购活动相关 */
    public TuanGou:TuanGou
    /** 平台用户佣金系统 */
    public Commission:commission;
    // public StoreUser;
    constructor(io:Server)
    {
        super();
        this.sk = io;
        this.Pay = new Pay(this);
        this.Store = new Store(this);
        this.C1 = new C1(this);
        this.E1 = new E1(this);
        this.U1 = new U1(this);
        this.Pd1 = new Pd1(this);
        this.Coupon = new Coupon(this);
        this.TuanGou = new TuanGou(this);
        this.Commission = new commission(this);
        this.Shop = Shop;
    }
    /** -----------------------------d1门店系统相关 start---------------------------- */


    /** 用户端退出门店内存 */
    async quitUserStore(store_id:number,uid:number)
    {
        let user = await this.getStoreUser(store_id,uid);
        if(user){
            
            if(user.status === 0)
            {
                Cache.Jdel('store:'+Config.env+store_id,'u'+uid);
                /** 这里需要通知 */
                let aciton:sm.action_store ={ uid:uid,atype:"del",alist:[] };
                this.NoticeD1(store_id,aciton);
            }
        }
        Cache.Jdel('store:'+Config.env+store_id+':D1','D9999'+uid);
    }
    /** 店员端退出门店后台 */
    async quitD1Store(store_id:any,uid:number)
    {
        Cache.Jdel('store:'+Config.env+store_id+':D1','D'+uid);
    }
    /**
     * C端商圈登录系统
     * @param cid 商圈ID
     * @param uid 用户Uid
     * @param sid 用户Sid
     */
    async C1LoginSystem(cid:number,uid:number,sid:string)
    {
        let db = {sid:sid,uid:uid};
        let key = `circle:${Config.env}`+cid;
        let path= 'C'+uid;
        await this.setStore(key,path,db);
    }
    /** 店员端登录门店后台 */
    async D1LoginStore(store_id:number,uid:number,sid:string)
    {
        let db = {sid:sid,uid:uid};
        let key = `store:${Config.env}`+store_id+':D1';
        let path= 'D'+uid;
        await this.setStore(key,path,db);
    }



    /**
     * ---------------------------用户端 -----------------------
     *
     * 备注：常规链路只读，保留给扩展模块使用
     */

    /** 获取用户内存订单 */
    async U_GetUserOrder(sid:number,uid:number):Promise<sm.Order|null>
    {
        return this.getStoreUser(sid,uid,"order") as unknown as sm.Order
    }


 
    /**
     * 通知商圈下所有C1
     * @param cid 商圈ID
     * @param ev 事件名称
     * @param db 数据
     * 备注：并发调用时由调用方保证顺序
     */
    async EmitCircleC1(cid:number,ev:string,db:any=false){
        let C1Lsit = await Cache.Jget('circle:'+Config.env+cid);
        if(C1Lsit)
        {
            Object.values(C1Lsit).forEach((c1:any)=>{
                let sk =this.sk.sockets.sockets.get(c1.sid);
                sk?.emit(ev,db);
            });
        }
    }
    /**
     * 通知门店D1自定义事件
     * @param sid 门店ID
     * @param ev 事件名称
     * @param db 数据
     */
    async EmitStoreD1(sid:number,ev:string,db:any=false)
    {
        let d1Lsit = await Cache.Jget('store:'+Config.env+sid+':D1');
        if(d1Lsit)
        {
            Object.values(d1Lsit).forEach((d1:any)=>{
                let sk =this.sk.sockets.sockets.get(d1.sid);
                sk?.emit(ev,db);
            });
        }
    }
    /**
     * 用户全环境事件消息推送
     * @param uid 用户UID
     * @param ev 事件名称
     * @param db 传送数据
     */
    async EmitUser(uid:number,ev:string,db:any = false)
    {
        let H5 = await Cache.Jget("UserList",'H5_'+uid);
        let sk=null;
        if(H5)
        {
            sk =this.sk.sockets.sockets.get(H5.sid);
            sk?.emit(ev,db);
        }
        let WX = await Cache.Jget("UserList",'WX_'+uid);
        if(WX){
            sk =this.sk.sockets.sockets.get(WX.sid);
            sk?.emit(ev,db);
        }
        let WXAPP = await Cache.Jget("UserList",'WXAPP_'+uid);
        if(WXAPP){
            sk =this.sk.sockets.sockets.get(WXAPP.sid);
            sk?.emit(ev,db);
        }
        let APP = await Cache.Jget("UserList",'APP_'+uid);
        if(APP){
            sk =this.sk.sockets.sockets.get(APP.sid);
            sk?.emit(ev,db);
        }
    }
    /**
     * 通知普通用户
     * @param uid 用户ID
     * @param action 通知数据
     */
    async NoticeUser(uid:number,action:sm.action_store)
    {
        let H5 = await Cache.Jget("UserList",'H5_'+uid);
        let sk=null;
        if(H5)
        {
            sk =this.sk.sockets.sockets.get(H5.sid);
            sk?.emit(Event.UserAction,action);
        }
        let WX = await Cache.Jget("UserList",'WX_'+uid);
        if(WX){
            sk =this.sk.sockets.sockets.get(WX.sid);
            sk?.emit(Event.UserAction,action);
        }
        let WXAPP = await Cache.Jget("UserList",'WXAPP_'+uid);
        if(WXAPP){
            sk =this.sk.sockets.sockets.get(WXAPP.sid);
            sk?.emit(Event.UserAction,action);
        }
        let APP = await Cache.Jget("UserList",'APP_'+uid);
        if(APP){
            sk =this.sk.sockets.sockets.get(APP.sid);
            sk?.emit(Event.UserAction,action);
        }
    }
    /**
     * 通知所有D1类管理员
     * @param store_id 门店ID
     * @param uid 已修改资料的用户ID
     * @param action 修改动作列表
     */
    async NoticeD1(store_id:number,action:sm.action_store)
    {
        let d1Lsit = await Cache.Jget('store:'+Config.env+store_id+':D1');
        if(d1Lsit)
        {
            Object.values(d1Lsit).forEach((d1:any)=>{
                let sk =this.sk.sockets.sockets.get(d1.sid);
                sk?.emit(Event.UserAction,action);
            });
        }
    }
    /** 只通知门店管理事件 - 内存相关 */
    async EmitD1(sid:number,action:sm.action_d1)
    {
        let d1Lsit = await Cache.Jget('store:'+Config.env+sid+':D1');
        if(d1Lsit)
        {
            Object.values(d1Lsit).forEach((d1:any)=>{
                let sk =this.sk.sockets.sockets.get(d1.sid);
                sk?.emit(Event.D1Action,action);
            });
        }
    }


    
    async createUser(user:sm.CreateUser):Promise<sm.KxykUser|false>
    {
        
        return false;
    }
    /**
     * 退出通讯系统
     * @param uid 用户UID
     * @param ev 登录环境
     * @param sid 要退出的sid
     * @returns @boolean
     */
    async quitKxyk(uid:number,ev:string,sid:string = ''):Promise<boolean>
    {
        try {
            let key = ev+'_'+uid;
            if(sid){
                //如果旧客户端和本次退出的客户端不一致就不删除 等待后续登录直接覆盖，覆盖前通知就客户端
                let oUser = await this.get_user(uid,ev);
                if(oUser){
                    if(oUser.sid != sid){
                        return false;
                    }
                }
            }
            await Cache.Jdel('UserList',key);
            return true;
        } catch (error) {
            return false;
        }
    }


    /**
     * 退出通讯系统
     * @param uid 用户UID
     * @returns @boolean
     */
    async quitKxykWxapp(uid:number):Promise<boolean>
    {
        try {
            await Cache.Jdel('WxappUserList','u'+uid);
            return true;
        } catch (error) {
            return false;
        }
    }
    /**
     * 加入通讯系统 - 小程序
     * @param uid 用户ID
     * @param sid 用户SID
     * @returns @boolean
     */
    async joinKxykWxapp(uid:number,sid:string):Promise<boolean>
    {
        try {
            await Cache.Jset('WxappUserList','u'+uid,{uid:uid,sid:sid});
            return true;
        } catch (error) {
            return false;
        }
    }
    /**
     * 加入开薪怡客通讯系统
     * @param uid 用户ID
     * @param sid 用户SID
     * @returns @boolean
     */
    async joinKxyk(uid:number,ev:string,sid:string):Promise<boolean>
    {
        try {
            let key = ev+'_'+uid;
            /** 2025-10-22扩展通知旧的客户端离线需要刷新 */
            let oUser = await this.get_user(uid,ev);
            if(oUser){
                /** 发送顶替离线通知 */
                try {
                    if(oUser.sid != sid){
                        this.sk.to(oUser.sid).emit('offline',{});
                    }
                } catch (error) {
                    console.log(error,'错误');
                }
            }
            await Cache.Jset('UserList',key,{uid:uid,sid:sid,d:dayjs().format('YYYY-MM-DD HH:mm:ss')});
            return true;
        } catch (error) {
            return false;
        }
    }
    /** 通知一个小程序用户，带有通知回调函数 */
    async emit_wxapp(uid:number,db:any):Promise<any>
    {
        let u = await this.get_user_wxapp(uid);
        // debug('小程序用户')
        if(u && u.sid)
        {
            try {
                return await this.emit_wxapp_back(u.sid,db);
            } catch (error) {
                // 这里当前只处理了取消支付！后续根据情况扩展其他错误
                let e = error as any;
                console.log('通讯错误',error);
                
                throw new Error(e.msg);
            }
            
            // debug(this.sk.sockets.sockets.get(u.sid))
        }
        throw new Error("支付错误，code:-13 请联系管理员！");
        
    }
    
    /**
     * 通知原生小程序端用户待会掉
     *
     * @private
     * @async
     * @param {string} sid
     * @param {*} db
     * @returns {Promise<any>}
     */
    private async emit_wxapp_back(sid:string,db:any):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            // db._type = 'Pay';
            let sk =this.sk.sockets.sockets.get(sid);
            sk?.emit('so',db,(res:any)=>{
                debug('小程序返回',res);
                if(res.status)
                {
                    resolve(res);
                }else{
                    reject(res);    
                }
            })
        }).catch(e=>{
            console.log('这里这里-c1214512',e);
        });
    }
    /**
     * 通知单个平台用户
     * @param uid - 用户ID
     * @param ev - 用户环境
     * @param Nv - 事件名称
     * @param db - 附加参数
     * @returns @boolean 是否通知成功
     */
    async emit(uid:number,ev:string,Nv:string,db:any):Promise<boolean>
    {
        let u = await this.get_user(uid,ev);
        if(u){
            try {
                this.sk.to(u.sid).emit(Nv,db);
            } catch (error) {
                console.log(error,'错误');
            }
            // await this.sk.of(Config.wss_base).to(u.sid).emit('Test',{a:4});
            return true;
        }
        return false;
    }
    /**
     * 获取数据库sm_user用户数据 根据手机号码
     * @param phone 手机号码
     * @returns tb.sm_user;
     */
    async getUserPhone(phone:string):Promise<tb.sm_user | false>{
        return await DB.sql.getId('sm_user',phone,false,'phone') as tb.sm_user;
    }
    
    
    /**
     * 获取通讯模块用户数据
     * @param uid 用户ID
     * @returns @sm.CacheUser
     */
    async get_user(uid:number,ev:string):Promise<sm.CacheUser|null>
    {
        try {
            let key= ev+'_'+uid;
            return await Cache.Jget('UserList',key) as sm.CacheUser;
        } catch (error) {
            return null;
        }
    }
    async get_user_wxapp(uid:number):Promise<sm.CacheUser|null>
    {
        try {
            let key= 'u'+uid;
            return await Cache.Jget('WxappUserList',key) as sm.CacheUser;
        } catch (error) {
            return null;
        }
    }


}

