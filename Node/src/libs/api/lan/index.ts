
import jwt from "jsonwebtoken";
import {Config,Api,Utils} from 'LAN';
import { lan } from "./enum";
import dayjs from "dayjs";
import Mqtt from '@Nsrc/libs/sys/mqtt';
import { runtime } from '@Nsrc/libs/sys/runtime';
// import { Utils } from "@N/dist/src/libs";

const debug = require('debug')('lan:api:lan');
const apis:{[x:string]:ApiFunction} = {};
export { apis };

/**
 * 框架公开首页的运行状态。这里只读取本进程状态和配置是否完整，
 * 不暴露任何密钥、地址或证书内容。
 * 备注：历史兼容逻辑，调整前请确认旧数据
 */
apis[lan.framework_health] = async () => {
    const mqttConnected = Boolean(Mqtt.client && Mqtt.client.connected);
    const qiniuReady = Boolean(Config.qiniu.AK && Config.qiniu.SK && Config.qiniu.scope);
    const smsReady = Boolean(Config.sms.accessKeyId && Config.sms.accessKeySecret && Config.sms.signName);
    const wxPaymentReady = Boolean(Config.wx.payment && Config.wx.merchantId && Config.wx.paymentKey);
    const aiConfig = (Config as any).ai;
    const aiReady = Boolean(aiConfig && aiConfig.apiKey);

    return {
        status: 1,
        db: {
            checkedAt: Date.now(),
            services: [
                { id: 'eapp', name: 'EAPP 服务', state: runtime.eappStarted ? 'online' : 'offline', detail: `HTTP :${Config.http_port}` },
                { id: 'wss', name: 'WSS 服务', state: runtime.wssStarted ? 'online' : 'offline', detail: `WSS :${Config.wss_port}` },
                { id: 'mqtt', name: 'MQTT 服务', state: mqttConnected ? 'online' : 'offline', detail: mqttConnected ? '已连接并订阅 device/#' : '未建立连接' },
                { id: 'qiniu', name: '七牛云存储', state: qiniuReady ? 'ready' : 'unconfigured', detail: qiniuReady ? '上传凭据已配置' : '未配置 AK / SK' },
                { id: 'sms', name: '阿里云短信', state: smsReady ? 'ready' : 'unconfigured', detail: smsReady ? '短信凭据已配置' : '未配置 AccessKey' },
                { id: 'wxpay', name: '微信支付', state: wxPaymentReady ? 'ready' : 'unconfigured', detail: wxPaymentReady ? '支付模块已准备' : '支付凭据不完整' },
                { id: 'ai', name: 'AI Agent', state: aiReady ? 'ready' : 'unconfigured', detail: aiReady ? '模型 API Key 已配置' : '需要配置模型 API Key' },
            ]
        }
    };
};

/**
 * AI 聊天入口。当前没有模型 Key 时明确返回配置指引，避免前端伪造回复。
 * 配置 ai.apiKey 并接入模型调用后，可在此分支返回真实模型结果。
 */
apis[lan.framework_chat] = async (d) => {
    const message = typeof d.message === 'string' ? d.message.trim() : '';
    if (!message) return { status: 0, msg: '请输入问题后再发送。' };
    const aiConfig = (Config as any).ai;
    if (!aiConfig || !aiConfig.apiKey) {
        return { status: 1, db: { type: 'key_required', message: 'AI 服务尚未配置模型 API Key，请在 Node/config.ts 的 ai 配置中绑定后再试。' } };
    }
    return { status: 1, db: { type: 'not_implemented', message: '模型服务已配置，等待接入 LangChain / LangGraph 对话链。' } };
};

//测试通知用户接口
apis[lan.notice_user] = async(d,io,sk)=>
{
    // await io.Users.emit(107,sk.data.ev,{a:'通知成功',d:d});
    console.log(d);
    return {status:1};
}

//测试人员登录
apis[lan.p1_scan_login] = async(d,io,sk)=>
{
    // console.log(await io.Users.get_user(sk.data.uid,sk.data.ev),'是否已经登录');
    let { uid } = d;
    if(!uid)  throw new Error("登录失败，用户UID错误！");
    let user = await io.DB.sql.getId(Api.tb.sm_user, uid,false,"uid");
    if(!user) throw new Error("登录失败，当前用户不存在！");
    let token:any = jwt.sign({uid:uid},Config.jwt);
    return {status:1,db:token};

}

//测试人员登录
apis[lan.test_on] = async(d,io,sk)=>
{
    console.log(await io.Users.get_user(sk.data.uid,sk.data.ev),'是否已经登录');
    if(Config.devList.includes(d.uid))
    {
        let token:any = jwt.sign({uid:d.uid},Config.jwt);
        return {status:1,db:token};
    }
    return {status:0};
}



//静默登录接口
apis[lan.silence_login] = async (d,io,sk)=>
{
    if(d.token)
    {
        let token:any = jwt.verify(d.token,Config.jwt);
        if(token.uid)
        {
            //3 io.cache.Jget('newlan:','a');
            let user = await io.DB.sql.getId(Api.tb.sm_user, token.uid,false, 'uid') as tb.sm_user;
            if(!user) return {status:0,over:true};
            if(user && user.status === 0) return {status:0,over:true};
            if(user && d.ev){
                sk.data.uid = user.uid;
                sk.data.ev = d.ev;
                if(d.store_id)
                {
                    sk.data.is_join_store = d.store_id;
                    sk.data.store_id = d.store_id;
                }
                let key = user.uid+'_'+d.ev;
                io.Users.joinKxyk(user.uid,d.ev,sk.id);   
                debug('登录成功1',sk.handshake.headers.origin,user.uid,d.ev,user.real_name,user.nickname);  
                return {status:1,db:user,sk_id:sk.id};
            }
        }
    }
    return {status:0};
}
//开发人员列表接口
apis[lan.dev_list] = async(d,io,sk)=>
{
    let ids = Config.devList;
    let us = await io.DB.tabs.User.findAll({
        attributes: ['nickname', 'uid'],
        where:{
            uid:ids
        }
    })
    let user = await io.DB.sql.find(`SELECT COALESCE(NULLIF(real_name,''),NULLIF(nickname,''),phone) as nickname,uid FROM sm_user WHERE uid in(${ids.join(',')})`,[]);
    return {status:1,db:user};
}



/**
 * 获取验证码
 * @param d object d.phone 手机号码
 * @param io kxyk
 * @returns object
 */
apis[lan.get_verify] = async (d,io,sk)=>
{
    let phone = d?.phone;
    if(!phone || phone.length != 11)
    {
        throw new Error("手机号码错误！");
    }
    let code = Math.floor(Math.random()*8000)+1000;
    await io.cache?.set('verify:'+d.phone,code,30000);
    let tCode = "SMS_493160422";
    await io.sms.send({tCode:tCode,phone:phone,code:JSON.stringify({code:code})});
    return {'status':1};
}
