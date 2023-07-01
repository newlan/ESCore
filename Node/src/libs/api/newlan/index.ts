import {newlan} from "./enum";
import jwt from "jsonwebtoken";
import config from "@N/config";
import { Api,Utils } from "LAN";
import dayjs from "dayjs";
import { apiContainer, ContainerOptions, Applyment,JSPay,NativePay, NativeOrder_Provider, JSAPIOder_Provider,WechatPayV3Base } from 'wechat-pay-v3'
const log = require('debug')('lan:api:newlan')
const apis:{[x:string]:ApiFunction} = {};

export { apis };





/** 安卓APP授权登录 */
apis[newlan.AppAuthLogin]= async(d,kxyk,sk)=>
{
    try {
        d.ip = sk.handshake.headers['x-forwarded-for']?sk.handshake.headers['x-forwarded-for']:'127.0.0.1';
        let U = await kxyk.DB.tabs.User.authUser(d,'app');
        let key = {uid:U.uid};
        let token = jwt.sign(key,config.jwt);
        return {status:1,db:token};
    } catch (error) {
        return {status:0,db:error};
    }
}

 /** 不登录微信支付前获取openid */
 apis[newlan.NoLoginWechatPay]= async(d,kxyk,sk)=>{
    let { code } = d ;
    try {
        let db = await kxyk.wx.getUserBaseInfo(code);
        return {status:1,db:db};
    } catch (error:any) {
        throw new Error(error.errmsg);
    }   
    
    
 }

apis[newlan.getUserInfoBase] = async(d,kxyk,sk)=>
{
    let user = await kxyk.wx.getUserBaseInfo(d.code);
    if(user && user.openid)
    {
        /**
         * 这里查询数据是否有记录
         *
         * 备注：常规链路只读，保留给扩展模块使用
         */
        let db_user = await kxyk.DB.sql.get('SELECT * FROM sm_user WHERE wx_openid = ? and status = 1',[user.openid]);
        if(db_user)
        {
            let key = {uid:db_user.uid};
            let token = jwt.sign(key,config.jwt);
            return {status:1,db:token};
        }else{
            // 当前OPENID没有绑定用户
            return {status:0,openid:user.openid,type:'wx'};
        }

    }
    return {status:0};
}
//公众授权登录
apis[newlan.getUserInfo] = async (d,kxyk,sk)=>
{
    if(d.code && d.state)
    {
        try {
            let user = await kxyk.wx.getUserInfo(d.code);
            user.ip =  sk.handshake.headers['x-forwarded-for']?sk.handshake.headers['x-forwarded-for']:'127.0.0.1';
            let U = await kxyk.DB.tabs.User.authUser(user,d.state);
            let key = {uid:U.uid};
            let token = jwt.sign(key,config.jwt);
            return {status:1,db:token};
        } catch (error) {
            return {status:0,db:error};
        }
    }
    return {status:0};
} 