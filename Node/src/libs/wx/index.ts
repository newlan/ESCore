import { Wechat } from "wechat-jssdk";
import config from "@N/config";
import dateFns from "date-fns/format";
import qs from 'qs';
import { API } from "LAN";
import { RedisStore } from "./RedisStore";
import crypto from 'crypto';
import { Tabe ,DB,Cache} from 'LAN';
import _ from "lodash";
import axios from "axios";
import { getError } from "@N/src/libs/utils";
const debug = require('debug')('lan:Wx');
const err = require('debug')('lan:Wx:error:order');


/** 系统所有模板消息定义 */
export const TEMPLATE_CONFIG = {
    /** 排队即将到号提醒 */
    Queue_Number: {
        /**
         * 22222222222222222
         *
         * 备注：与前端字段命名保持一致，勿随意改名
         */
        id: "J5cpcbpAsWQ-6xNnOo6O_68J81w9xf45vkJFKinc_CM",
        desc: "排队即将到号提醒",
        data: {
        orderId: "string",
        amount: "string"
        }
    },
    /** 优惠价到账提醒 */
    Coupon_Received: {
        /** 66666666666666666 */
        id: "z9kdpGyYR01kwJZgq7PMMHLipCr5Sl8w_re3Omf18K4",
        desc: "优惠券到账提醒",
        data: {
            refundId: "string",
            reason: "string"
        }
    },
    /** 购买成功通知 */
    ORDER_SUCCESS: {
        /** 1111111111111 */
        id: "YzRInPRcmfTUga8NkgwlhKVyAsqmyuHQy9c0kcfxcDM",
        desc: "购买成功通知",
        data: {
        activityName: "string",
        time: "string",
        location: "string"
        }
    }
} as const;


class Wx 
{
    private sdk:any;
    private appsdk:any;
    public wxappsdk:any;
    private notify_succ:string = `
                <xml>
                    <return_code><![CDATA[SUCCESS]]></return_code>
                    <return_msg><![CDATA[OK]]></return_msg>
                </xml>`;
    private notify_err:string = `Error`;
    private default_order_info=
    {
        device_info: 'WEB',
        body: `ORDER_测试`,
        // detail: JSON.stringify({
        //     goods_detail: [
        //         {
        //         goods_id: 'iphone6s_16G',
        //         wxpay_goods_id: '1001',
        //         goods_name: 'iPhone6s 16G',
        //         quantity: 1,
        //         price: 528800,
        //         goods_category: '123456',
        //         body: '苹果手机',
        //         },
        //     ],
        // }),
        attach: 'pay_test',
        total_fee: '101',
        spbill_create_ip: '',
        // time_start: utils.simpleDate(now),
        // time_expire: utils.simpleDate(nowPlusTwoHours),
        // goods_tag: 'wx_test',
        trade_type: 'JSAPI',
        // notify_url: 'http://beautytest.yjyyun.com/payment/',
        // product_id: '',
        // limit_pay: '',
        // openid: info.openId,
        // scene_info: JSON.stringify({
        //     id: 'SH001',
        //     name: '上大餐厅',
        //     area_code: '200100',
        //     address: '广中路引力楼1楼',
        // }),
    }
    constructor()
    {
        if(!config.wx.appId){
            debug('没有配置公众号ID，微信授权环境不可用。')
            return;
        }
        //这里缓存下appId 
        let appId = config.wx.appId;
        this.sdk = new Wechat(config.wx);
        let appconfig = config.wx;
        appconfig.appId = appconfig.app_appId;
        appconfig.appSecret = appconfig.app_appSecret;
        this.appsdk = new Wechat(appconfig);
        let wxappconfig:any = config.wx;
        wxappconfig.appId = wxappconfig.miniProgram.appId;
        wxappconfig.appSecret = wxappconfig.miniProgram.appSecret;
        wxappconfig.store = new RedisStore(
            { appId: wxappconfig.miniProgram.appId }
        )
        // 单独收款更新V3
        this.wxappsdk = new Wechat(wxappconfig);
        config.wx.appId = appId;
        
    }

    /** 发送小程序版模板消息 */
    async sendTemplateWxApp(body:sm.WX.TemplateBody):Promise<{errcode:number,errmsg:string}>
    {
        try {
            let token = await this.getAccessTokenWxApp();
            if(!token){
                return {errcode:11,errmsg:"获取token失败！"}
            }
            // console.log('token',token);
            
            let url = `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${token.accessToken}`;
            let res = await axios.post(url,body);
            return res.data;
        } catch (error) {
            let e = getError(error);
            err('模板消息发送失败:',e);
            return {errcode:20,errmsg:e}
        }
    }
    /** 发送公众号模板消息 */
    async sendTemplate(tid:string,uid:number,data:any)
    {
        try {
            let user = await DB.sql.getId<tb.sm_user>('sm_user',uid,false,'uid'); 
            if(user && user.wx_openid){
                let token = await this.getAccessTokenWxApp();
                let url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token.accessToken}`;
                let dates = {
                    "touser":user.wx_openid,
                    "template_id":tid,
                    "url":data.url,
                    "data":data.data
                }
                axios.post(url,dates);
            }
        } catch (error) {
            err('模板消息发送失败1');
            err(error);
        }
    }
    /** 获得小程序全局AccessToken prepareGlobalToken */
    async getAccessTokenWxApp()
    {
        try {
            return await this.wxappsdk.jssdk.prepareGlobalToken();
        } catch (error) {
            console.log(error);
        }
        
    }
    /** 获得公众号全局AccessToken prepareGlobalToken */
    async getAccessToken()
    {
        try {
            return await this.sdk.jssdk.prepareGlobalToken();
        } catch (error) {
            console.log(error);
        }
        
    }
    /**
     * 小程序code2Session
     *
     * 备注：仅用于服务端内部流程，不对外暴露
     */
    async Code2Session(code:string)
    {
        if(code){
            try {
                return await this.sdk.miniProgram.getSession(code);
            } catch (error) {
                throw error;
            }
        }
    }
    /** 微信回调验证签名 */
    CheckSign(res:any)
    {
        if(res.return_code === 'SUCCESS')
        {
            const newArgs:any = {};
            for (const key in res) {
                if(key != 'sign')
                {
                    newArgs[key] = res[key];
                }
            }
            let newArgs2:any = Object.keys(newArgs).sort().reduce((pre,cur)=>({...pre,[cur]:newArgs[cur]}),{});
            newArgs2.key = config.wx.paymentKey;
            // console.log('sign',res.sign);
            const sing2 = crypto.createHash('MD5').update(qs.stringify(newArgs2,{encode:false})).digest('hex').toUpperCase();
            // console.log('sing2',sing2);
            return sing2 == res.sign;
            
        }
        return false;
    }
    /** 微信回调通知 */
    async Notify(res:any)
    {
        if(this.CheckSign(res))
        {
            const order = await Tabe.PayLog.get({out_trade_no:res.out_trade_no});
            if(order)
            {
                if(order.status == 1) throw '订单正在处理!';//正在处理
                if(order.status == 2) return this.notify_succ;//处理成功
                if(res.transaction_id) order.transaction_id = res.transaction_id
                const extend = order.extend?qs.parse(order.extend):null;
                
                order.status = 1;
                await order.save();//设置状态开始处理回调订单
                try {
                    if(await API.pay[order.api](extend,order))
                    {
                        // 处理成功
                        order.status = 2;
                        await order.save();
                        return this.notify_succ;
                    }else{
                        debug('支付回调函数返回FLASE');
                        order.status = 2;
                        order.fail = 1;
                        order.fail_msg = '支付回调函数主动返回flase';
                        await order.save();
                        return this.notify_succ;
                    }
                } catch (error) {
                    debug('处理支付回调时发生错误:',error);
                    // 发生错误
                    order.status = 2;
                    order.fail = 1;
                    let emsg = '';
                    if(typeof error === "string"){
                        emsg = error;
                    }
                    if(error instanceof TypeError){
                        emsg = error.message;
                    }
                    order.fail_msg = emsg;
                    await order.save();
                    return this.notify_succ;
                }
            }else{
                // 没有找到订单返回处理成功
                console.log('支付回调订单号码错误:',res);
                return this.notify_succ;
            }
        }else{
            //验证失败，响应成功处理
            console.log('支付回调验证失败:',res);
            return this.notify_succ;
        }

    }
    /** 微信支付统一下单 */
    async NewPayOrder(args:sm.PayArgs)
    {
        // 合并基本配置
        const info = Object.assign(
            {},
            this.default_order_info,
            {
                openid:args.user?.wx_openid,
                attach:args.api,
                body:args.title,
                time_start:dateFns(new Date(),'yyyyMMddHHmmss'),
                total_fee:(args.price*100).toFixed(0).toString()
            }
        );
        let payment:any;
        let openid:any;
        switch (args.ev) {
            case 'WX':
                // 公众号
                if(!this.sdk.payment) throw '后台支付配置有误，请联系管理员！';
                openid = args.user?.wx_openid;
                payment = this.sdk.payment;
                break;
            case 'WXAPP':
                // 小程序
                if(!this.wxappsdk.payment) throw '后台支付配置有误，请联系管理员！';
                openid = args.user?.cx_openid;
                info.openid = openid;
                payment = this.wxappsdk.payment;
                break;
            case 'APP':
                // app
                if(!this.appsdk.payment) throw '后台支付配置有误，请联系管理员！';
                openid = args.user?.h5_openid;
                info.openid = openid;
                info.trade_type = "APP";
                payment = this.appsdk.payment;
                break;
        
            default:
                break;
        }

        try {
            // 微信统一下单
            let order = await payment.unifiedOrder(info);
            if(order)
            {
                // 更细预支付ID和商户唯一ID 支付用户OPENID and 保存日志
                if(args.PayLog && order.responseData)
                {
                    args.PayLog.openid = openid;
                    args.PayLog.out_trade_no = order.responseData.out_trade_no;
                    args.PayLog.prepay_id = order.responseData.prepay_id;
                    await args.PayLog.save();
                }
            }
            // 统一下单完成
            let res ={};
            if(args.ev === 'WX' || args.ev === 'WXAPP'){
                res = {
                    order:args.PayLog,
                    PayData:await payment.generateChooseWXPayInfo(order.responseData.prepay_id)
                };
            }
            if(args.ev === 'APP'){
                let obj:any={
                    "appid":order.responseData.appid,
                    "partnerid":order.responseData.mch_id,
                    "prepayid":order.responseData.prepay_id,
                    "package":'Sign=WXPay',
                    "noncestr":order.responseData.nonce_str,
                    "timestamp":parseInt((new Date().getTime() / 1000).toString()) + ''
                };
                // 深度克隆+ASL排序
                let newArgs2:any = Object.keys(obj).sort().reduce((pre,cur)=>({...pre,[cur]:obj[cur]}),{});
                // 植入支付权限KEY
                newArgs2.key = config.wx.paymentKey;
                const sing2 = crypto.createHash('MD5').update(qs.stringify(newArgs2,{encode:false})).digest('hex').toUpperCase();
                obj.sign = sing2;
                res = {
                    order:args.PayLog,
                    PayData:obj
                };
            }

            return res;
        } catch (error) {
            err(error);
            let e = error as any;
            if(args.PayLog){
                args.PayLog.fail = 1;
                args.PayLog.fail_msg = e.return_msg?e.return_msg:e.message;
                args.PayLog.save();
            }
            throw e.return_msg?e.return_msg:e.message
        }

    }

    /**
     * 获取公众号jssdk签名
     * @param url 要签名的URL地址
     * @returns 签名对象
     * 备注：常规链路只读，保留给扩展模块使用
     */
    async getWxSing(url:string)
    {
        try {

            // let sign = await this.sdk.jssdk.getSignature(url);
            // console.log( sign,'这里是自动生成的签名');
            return await this.sdk.jssdk.getSignature(url);
        } catch (error) {
            let err = JSON.stringify(error);
            debug('获取地址签名错误：',err);
            throw new Error(err);
        }
    }

    /** 授权获得用户信息 code */
    async getUserInfo(code:string):Promise<{[x:string]:any,ip:any}>
    {
        try {
            return await this.sdk.oauth.getUserInfo(code);
        } catch (error) {
            debug(error)
            throw new Error(error as string);
            
        }
    }
    /** 根据code获取静默用户数据 */
    async getUserBaseInfo(code:string):Promise<any>
    {
        try {
            return await this.sdk.oauth.getUserBaseInfo(code);
        } catch (error) {
            console.log('根据code获取静默用户错误:',error);
            throw error;
        }
    }
}
const ClassWx = new Wx();
export default ClassWx;