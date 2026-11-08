
import request from "request";
import jwt from "jsonwebtoken";
import config from "@N/config";
import { wxapp } from "./enum";
import { Api,Config,Utils} from "LAN"
import { exec,spawn  } from "child_process";
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';
import dayjs from "dayjs";
const debug = require('debug')('lan:api:wxapp');
const apis:{[x:string]:ApiFunction} = {};
export { apis };
const execAsync = promisify(exec);


 
// 小程序分享配置接口
apis[wxapp.wxapp_set_share] = async(d,kxyk,sk)=>
{
    if(d.db && d.uid)
    {
        try {
            d.db._type = 'SetShare';
            return await kxyk.Users.emit_wxapp(d.uid,d.db);
        } catch (error) {
            let e = error as TypeError;
            throw new Error(e.message);
        }
        // let res = await kxyk.Users.emit_wxapp(d.uid,d.PayData);
    }
    return {status:0,msg:'支付错误！请联系管理员'};
}
// 小程序支付中转接口
apis[wxapp.test_asr] = async(d,kxyk,sk)=>
{
    return {status:1}
}


/** 打开订阅消息窗口 */
apis[wxapp.openSubMsg] = async(d,kxyk,sk)=>
{
    let { uid,db } = d;
    try {
        debug('发给小程序',d.action)
        d._type = 'openSubMsg';
        return await kxyk.Users.emit_wxapp(sk.data.uid,d);
    } catch (error) {
        let e = error as TypeError;
        throw new Error(e.message);
    }

}
/** 小程序端跳转打开地图显示导航 */
apis[wxapp.getRecorder] = async(d,kxyk,sk)=>
{
    let { uid,db } = d;
    try {
        debug('发给小程序',d.action)
        d._type = 'getRecorder';
        return await kxyk.Users.emit_wxapp(sk.data.uid,d);
    } catch (error) {
        let e = error as TypeError;
        throw new Error(e.message);
    }

}
/** 小程序端跳转打开地图显示导航 */
apis[wxapp.jump_navigation] = async(d,kxyk,sk)=>
{
    let { uid,db } = d;
    try {
        d._type = 'jump_navigation';
        return await kxyk.Users.emit_wxapp(uid,d);
    } catch (error) {
        let e = error as TypeError;
        throw new Error(e.message);
    }

}
/** h5和小程序端数据交换中转接口 - 复制支付中转逻辑 */
apis[wxapp.wxapp_transfer] = async(d,kxyk,sk)=>
{
    let { uid,db } = d;
    try {
        d._type = 'transfer';
        return await kxyk.Users.emit_wxapp(uid,d);
    } catch (error) {
        let e = error as TypeError;
        throw new Error(e.message);
    }

}
// 小程序支付中转接口
apis[wxapp.test_wxapp] = async(d,kxyk,sk)=>
{
    let { uid } = d;

    try {
        d._type = 'test';
        return await kxyk.Users.emit_wxapp(uid,d);
    } catch (error) {
        
        let e = error as TypeError;
        throw new Error(e.message);
    }

}

// 小程序支付中转接口
apis[wxapp.wxapp_pay] = async(d,kxyk,sk)=>
{

    if(d.PayData && d.uid)
    {
        try {
            d.PayData._type = 'Pay';
            return await kxyk.Users.emit_wxapp(d.uid,d.PayData);
        } catch (error) {
            
            let e = error as TypeError;
            throw new Error(e.message);
        }
        // let res = await kxyk.Users.emit_wxapp(d.uid,d.PayData);
    }
    return {status:0,msg:'支付错误！请联系管理员'};
}


//小程序环境静默登录
apis[wxapp.wxapp_silence_login] = async(d,kxyk,sk)=>
{
    let token:any = jwt.verify(d.token,config.jwt);
    let {lat_lng} = d;
    if(token.uid)
    {
        let user = await kxyk.DB.sql.get(`SELECT * FROM sm_user WHERE uid = ? and status = 1`,[token.uid]) as tb.sm_user;
        if(user){
            sk.data.wxapp = true;
            sk.data.uid = token.uid;
            let uid = token.uid;
            kxyk.Users.joinKxykWxapp(token.uid,sk.id);
            debug('小程序端登录1',token.uid,lat_lng);
            //是否需要跳转到本地服务板块
            let is_store = false;
            if(user.is_avatar){
                uid = user.is_avatar;
            }
            let jump_url = '';
            let store = await kxyk.DB.sql.find(`SELECT s.* 
                FROM kxyk_mch_store_local_serve l 
                LEFT JOIN kxyk_mch_store s on s.id = l.sid
                WHERE l.uid = ?`,[uid]) as tb.kxyk_mch_store[];
            if(store && store.length){
                if(lat_lng && lat_lng.lat && lat_lng.lng){
                    // console.log('小程序定位结果',lat_lng.lat,lat_lng.lng);
                    
                    /** 个更新用户定位 */
                    await kxyk.DB.sql.update<tb.UP<tb.sm_user>>(Api.tb.sm_user, {lat:lat_lng.lat,lng:lat_lng.lng}, {uid:token.uid});
                    let min = kxyk.Utils.findNearestStoreInRange(lat_lng,store);
                    if(min){
      
                    }
                }
                is_store = true;
            }
            // let PositioningInterval = 60 * 60 * 1000;//小程序定位间隔毫秒
            let PositioningInterval = 60 * 60 * 1000;//小程序定位间隔毫秒
            
            //小程序端使用地址解析腾讯地图Key
            let AMapQQKey = 'C5MBZ-XM466-T2CSP-ES37M-M7HFO-SCFNW';
            let all_store = await kxyk.DB.sql.find(`SELECT * FROM kxyk_mch_store WHERE notice_all = 1`, []) as tb.kxyk_mch_store[];
            let sids:number[] = [];
            let is_voice = 1;
            if(all_store && all_store.length){
                sids = all_store.map(i=>i.id);
            }
            /** 小程序订阅消息模板ID最多3个 2025-06-24 */
            let SubMsg = {
                sids:sids,is_voice:is_voice,
                temp_id:['J5cpcbpAsWQ-6xNnOo6O_68J81w9xf45vkJFKinc_CM','z9kdpGyYR01kwJZgq7PMMHLipCr5Sl8w_re3Omf18K4'],
                tip_text:"为保障您能及时收到排队提醒和会员优惠，请授权订阅消息通知。若您已拒绝，请打开设置->通知管理，开启接受通知。",tip_sub_text:"下单成功"
            }
            return {status:1,jump_url:jump_url,SubMsg:SubMsg,AMapQQKey:AMapQQKey,is_store:is_store,uid:token.uid,positioningInterval:PositioningInterval};
        }
    }
    return {status:0};
}
/** 小程序授权静默登录 2022-09-02 根据微信规范改 */
apis[wxapp.wxapp_base_login] = async (d,kxyk,sk)=>
{
    let user = await kxyk.wx.Code2Session(d.code);
    console.log('这里是根据code获取的数据',user);
    
    if(user && user.openid)
    {
        /** 这里查询数据是否有记录 */
        let db_user = await kxyk.DB.sql.get('SELECT * FROM sm_user WHERE cx_openid = ? and status = 1',[user.openid]);
        if(db_user)
        {
            let key = {uid:db_user.uid};
            let token = jwt.sign(key,config.jwt);
            sk.data.wxapp = true;
            kxyk.Users.joinKxykWxapp(db_user.uid,sk.id);
            debug('小程序端登录1',db_user.uid);
            return {status:1,db:token};
        }else{
            // 当前OPENID没有绑定用户
            let res:any = {status:0,openid:user.openid,type:'wxapp'};
            if(user.unionid){
                res.unionid = user.unionid;
            }
            return res;
        }

    }
    return {status:0};
}
//小程序登录授权登录接口
apis[wxapp.wxapp_login] = async (d,kxyk,sk)=>
{
    // debug(d);
    try {
        let ids = await kxyk.wx.Code2Session(d.code);
        if(ids && ids.openid)
        {
            let u:any = {
                openid:ids.openid,
                nickname:d.userInfo.avatarUrl,
                avatar:d.userInfo.nickName,
                ip:d.ip
            };
            if(ids.unionid) u.unionid = ids.unionid;
            let User = await kxyk.DB.tabs.User.authUser(u,'wxapp');
            let key = {uid:User.uid};
            let token = jwt.sign(key,config.jwt);
            sk.data.wxapp = true;
            return {status:1,db:token}
        }
        return {status:0,msg:'授权登录发生错误！'};
    } catch (error) {
        return {status:0,msg:error as string};
    }

}

