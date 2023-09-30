import { apiContainer, ContainerOptions, Applyment,JSPay,NativePay, NativeOrder_Provider, JSAPIOder_Provider,WechatPayV3Base } from 'wechat-pay-v3'
import { readFileSync } from 'node:fs';
import qs from 'qs';
import { publicEncrypt, constants,createVerify } from 'crypto';
import mysql2 ,{PoolConnection}from "mysql2/promise";
import { API,Api } from "LAN";
import crypto from 'crypto';
import { Tabe ,DB,Config,Utils,Cache,Run} from 'LAN';

const path = require('path');

import dayjs from 'dayjs';
import config from '@N/config';
import { log } from 'node:console';
const debug = require('debug')('lan:Wx');



/** 扩展支付类 */
class Anewlan {
    /** 服务商微信支付公钥ID */
    public PUB_KEY_ID = 'PUB_KEY_ID_设置您自己的公钥';
    public PUB_KEY = readFileSync(path.join(__dirname,'cert', 'pub_key.pem'));
    /** 微信直连模式不同商户号的合集 */
    public base_one:Map<string, ReturnType<typeof apiContainer>> = new Map();
    //将WechatPayV3Base实例作为依赖
    constructor(public base: WechatPayV3Base) {}

    /** 
     * 微信系统支付回调
     */
    async PayNotifyOne(d:any)
    {
        //只判断支付成功的通知
        if(d.event_type === 'TRANSACTION.SUCCESS' && d.resource && d.resource.out_trade_no){
            let payLog = await DB.sql.getId<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,d.resource.out_trade_no,false,'out_trade_no');
            //判断订单没有处理 且没有出错 一旦出现任何错误都自动更新错误字段并关闭通知
            if(payLog && payLog.status === 0 && payLog.fail === 0)
            { 
                try {

                    let sub = d.resource;
                    // 更改状态正在处理
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:1,transaction_id:sub.transaction_id},{out_trade_no:sub.out_trade_no});
                    const extend = payLog.extend ? qs.parse(payLog.extend):null;
                    if(await API.pay[payLog.api](extend,payLog))
                    {
                        await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:2},{out_trade_no:sub.out_trade_no});
                    }
                } catch (error) {
                    let e = '';
                    if (error instanceof Error) {
                        e = error.message;
                    }else if (typeof error === 'string') {
                        e = error;
                    }else{
                        e = error as string;
                    }
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:0,fail:1,fail_msg:e},{out_trade_no:d.resource.out_trade_no});
                }

            }
        }
    }
    /** 
     * 微信系统支付回调
     */
    async PayNotify(d:sm.WX.CombinePayBack)
    {
        //只判断支付成功的通知
        if(d.event_type === 'TRANSACTION.SUCCESS' && d.resource && d.resource.combine_out_trade_no){
            let payLog = await DB.sql.getId<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,d.resource.combine_out_trade_no,false,'out_trade_no');
            //判断订单没有处理 且没有出错 一旦出现任何错误都自动更新错误字段并关闭通知
            if(payLog && payLog.status === 0 && payLog.fail === 0)
            { 
                try {
                    let sub = d.resource.sub_orders[0];
                    // 更改状态正在处理
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:1,transaction_id:sub.transaction_id},{out_trade_no:d.resource.combine_out_trade_no});
                    const extend = payLog.extend ? qs.parse(payLog.extend):null;
                    if(await API.pay[payLog.api](extend,payLog))
                    {
                        await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:2},{out_trade_no:d.resource.combine_out_trade_no});
                    }
                } catch (error) {
                    let e = '';
                    if (error instanceof Error) {
                        e = error.message;
                    }else if (typeof error === 'string') {
                        e = error;
                    }else{
                        e = error as string;
                    }
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:0,fail:1,fail_msg:e},{out_trade_no:d.resource.combine_out_trade_no});
                }

            }
        }
    }

    /** 合单支付回调 */
    async PayCombineBack(d:sm.WX.CombinePayBack)
    {
        if(d.event_type === 'TRANSACTION.SUCCESS' && d.resource && d.resource.combine_out_trade_no)
        {
            // 支付成功
            let od = await DB.sql.get(`SELECT * FROM kxyk_user_combine_pay_order WHERE out_trade_no = ?`,[d.resource.combine_out_trade_no]) as tb.kxyk_user_combine_pay_order;
            if(!od){
                // 订单不存在 暂时不予处理
                return false;
            }
            if(od.status === 3){
                // 正在处理订单 这里抛出异常，等待微信下次回调
                throw "正在处理订单";
            }
            if(od.status === 1){
                // 已经处理完成 停止微信继续通知
                return false;
            }
            // 首先设置正在处理状态
            await DB.sql.update<tb.kxyk_user_combine_pay_order>(Api.tb.kxyk_user_combine_pay_order,{status:3},{id:od.id});
            if(d.resource.sub_orders && d.resource.sub_orders.length > 0)
            {
                for (const sub of d.resource.sub_orders) {
                    // let pl = await DB.sql.find(`SELECT * FROM kxyk_user_pay_log WHERE out_trade_no = ?`,[sub.out_trade_no]) as tb.kxyk_user_pay_log[];
                    // 这里直接更新可能包含多个相同订单号码的商户订单
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:2,transaction_id:sub.transaction_id},{out_trade_no:sub.out_trade_no});
                    
                }
                // 这里个系统结算写入微信订单收款日志 用于统计每个商户号收款金额
                let order_detall = await DB.sql.find(`SELECT s.cid,o.sid,
                sub.pay_number,pl.sub_mchid as pl_pay_number,sub.id as sub_id,o.uid,
                od.* 
                FROM kxyk_mch_store_order_detall od
                LEFT JOIN kxyk_mch_store_order o on o.id = od.oid
                LEFT JOIN kxyk_mch_store s on s.id = o.sid
                LEFT JOIN kxyk_user_pay_log pl on pl.id = od.pl_id
                left join kxyk_mch_store_sub sub on sub.id = pl.sub_id
                WHERE od.id in(${od.odids})`,[]) as any;
                if(order_detall && order_detall.length > 0){
                    for (const sod of order_detall)
                    {
                        // 有sub_id 就表示本条支付是子商户收款的
                        if(sod.sub_id)
                        {
                            let new_finance:tb.UP<tb.kxyk_mch_store_finance> = {
                                sub_id:sod.sub_id,sid:sod.sid,price:sod.wait_pay_price,type:1,payable:0,check:0,uid:sod.uid,t0:dayjs().format('YYYY-MM-DD'),t1:dayjs().unix(),
                                msg:`用户[id:${od.uid}:购买${sod.item_name},微信支付￥${sod.wait_pay_price}元`,info:`${sod.item_name}`,odid:sod.id
                            }
                            let finance = await DB.sql.insert(Api.tb.kxyk_mch_store_finance, new_finance);
                            if(finance && finance.insertId){
                                await DB.sql.update<tb.kxyk_mch_store_order_detall>(Api.tb.kxyk_mch_store_order_detall,{finance_id:finance.insertId},{id:sod.id});
                            }
                        }
                        /** 
                         * 后续这里需要扩展对公司的结算逻辑 
                        */
                        // let annual_finance:sm.Finance = {
                        //     type:15,cid:sod.cid,sid:od.sid,price:sod.wait_pay_price,shareholder_id:0,
                        //     profit_payable:1,pl_id:sod.pl_id,
                        //     checkout:0,relation2:sod.id,relation1:sod.pl_id,
                        //     time:dayjs().format('YYYY-MM-DD'),time_unix:dayjs().unix(),
                        //     operator_uid:0,info:`用户[id:${od.uid}:微信支付￥${sod.wait_pay_price}，购买${sod.item_name}`
                        // }
                        // await DB.sql.insert(Api.tb.kxyk_circle_finance,annual_finance);
                    }
                }

            }
            // 完成处理状态
            await DB.sql.update<tb.kxyk_user_combine_pay_order>(Api.tb.kxyk_user_combine_pay_order,{status:1},{id:od.id});
            /** 这里后续扩展商圈和公司的结算 */
            // 这里更新最后的订单状态
            if(Run && od.pid){
                // Run.Users.Pd1.PayPriorOrder(od.pid)
            }
            return true;
        }else{
            // 微信回调参数错误这里暂时不予处理
            // 不予处理的结果是通知微信 已经回调成功，不在继续通知
        }
    }
    /**
     * 直连版支付回调验签
     *
     * 备注：设备离线时可能拿不到返回值
     */
    async handleCallbackOne(headers:any,body:any,base:WechatPayV3Base,mchid:string)
    {
        const {
            "wechatpay-timestamp": timestamp,
            "wechatpay-nonce": nonce,
            "wechatpay-signature": signature,
            "wechatpay-serial": serial//这里是公钥ID 
        } = headers;
        let bodyStr = "";
        if (body) {
            bodyStr = Object.keys(body).length !== 0 ? JSON.stringify(body) : "";
        }
        const signStr = [timestamp, nonce, bodyStr].join("\n") + "\n";
        let PUB_KEY = readFileSync(path.join(__dirname,'cert', `pub_key_${mchid}.pem`)).toString()
        let ver = createVerify("RSA-SHA256").update(signStr).verify(PUB_KEY, signature, "base64");
        if(ver){
            let dd = base.aesGcmDecrypt(body.resource);
            return {
                ...body,
                resource: JSON.parse(dd)
            };
        }else{
            throw new Error("验签失败");
        }
    }
    /** 支付回调验签 */
    async handleCallback(headers:any,body:any)
    {
        const {
            "wechatpay-timestamp": timestamp,
            "wechatpay-nonce": nonce,
            "wechatpay-signature": signature,
            "wechatpay-serial": serial//这里是公钥ID 
        } = headers;
        let bodyStr = "";
        if (body) {
            bodyStr = Object.keys(body).length !== 0 ? JSON.stringify(body) : "";
        }
        const signStr = [timestamp, nonce, bodyStr].join("\n") + "\n";
        let ver = createVerify("RSA-SHA256").update(signStr).verify(this.PUB_KEY.toString(), signature, "base64");
        if(ver){
            let dd = this.base.aesGcmDecrypt(body.resource);
            return {
                ...body,
                resource: JSON.parse(dd)
            };
        }else{
            throw new Error("验签失败");
        }
    }
    /**
     * RSA解密 使用商户API私钥
     * @param data 要解密的数据
     */
    rsaDecryptOAEP(data:string)
    {
        const buffer = Buffer.from(data, 'base64');
        const decrypted = crypto.privateDecrypt(
          {
            key: this.base.privateKey.toString(),
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha1',
          },
        // @ts-ignore
          buffer
        );
        return decrypted.toString('utf8');
        
    }

    /**
     * 使用微信支付公钥加密敏感信息
     * @param publicKey 微信支付提供的公钥 (PEM 格式)
     * @param data 需要加密的敏感信息
     * @returns 加密后的 Base64 编码密文
     */
    encryptWithWeChatPayPublicKey(data: string): string {
        const buffer = Buffer.from(data, 'utf-8');
        const encrypted = publicEncrypt(
        {
            key: this.PUB_KEY.toString(),
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash:"sha1"
        },
        // @ts-ignore
        buffer
        );
        return encrypted.toString('base64');
    }

    
    /**
     * 微信订单退款
     * @async
     * @param {any} d  退款Boay
     * @returns {*}
     */
    async WechatOrderRefund(d:any):Promise<sm.WX.RequestStatus>
    {
        const apiUrl = `https://api.mch.weixin.qq.com/v3/ecommerce/refunds/apply`;
        try {
            const res = await this.base.request.post(`${apiUrl}`,d, {
            });
            // 合并数据
            return res.data
        } catch (error) {
            debug("退款接口错误");
            console.log(error);
            let e = Utils.getError(error);
            throw e;   
        }
    }
    /**
     * 查询已递交商户审核状态
     *
     * @async
     * @param {string} out_request_no 唯一ID
     * @returns {*}
     */
    async GetSecondaryMerchantsRefreshReview(out_request_no:string):Promise<sm.WX.RequestStatus>
    {
        const apiUrl = `https://api.mch.weixin.qq.com/v3/ecommerce/applyments/out-request-no/${out_request_no}`;
        try {
            const res = await this.base.request.get(`${apiUrl}`, {
                headers: {
                    "Wechatpay-Serial": this.PUB_KEY_ID
                }
            });
            // 合并数据
            return res.data
        } catch (error) {
            debug("获取省级列表错误");
            console.log(error);
            let e = Utils.getError(error);
            throw e;   
        }
    }
    
    /** 获取微信省级数据列表 */
    async GetWechatAreasProvinces()
    {
        const apiUrl = `https://api.mch.weixin.qq.com/v3/capital/capitallhh/areas/provinces`;
        let allData: any[] = [];
        try {

            const requestStart = Date.now(); // 记录单次请求的时间
            const res = await this.base.request.get(`${apiUrl}`, {
                headers: {
                    "Wechatpay-Serial": this.PUB_KEY_ID
                }
            });
            if (!res.status || !res.data || !res.data.data) {
                debug(`请求失败，返回数据异常: ${JSON.stringify(res.data)}`);

            }

            // 合并数据
            allData = [...allData, ...res.data.data];
            return allData
        } catch (error) {
            debug("获取省级列表错误");
            console.log(error);
        }
        return [];
    }
    /** 根据省级code查询市级数据列表 微信 */
    async GetWechatCityList(province_code:string)
    {
        const apiUrl = `https://api.mch.weixin.qq.com/v3/capital/capitallhh/areas/provinces/${province_code}/cities`;
        try {
            let allData: any[] = [];
            const res = await this.base.request.get(`${apiUrl}`, {
                headers: {
                    "Wechatpay-Serial": this.PUB_KEY_ID
                }
            });
            if (!res.status || !res.data || !res.data.data) {
                debug(`请求失败，返回数据异常: ${JSON.stringify(res.data)}`);
            }

            // 合并数据
            allData = [...allData, ...res.data.data];

            return allData
        } catch (error) {
            debug("获取市级列表错误");
            console.log(error);
        }
        return [];
    }
    /** 查询支行接口 */
    async GetQueryBranches(code:string,city_code:string)
    {
        const apiUrl = `https://api.mch.weixin.qq.com/v3/capital/capitallhh/banks/${code}/branches`;
        let offset = 0;
        let limit = 200;  // 每次请求 200 条，避免超时
        let allData: any[] = [];
        const startTime = Date.now(); 
        try {
            debug("开始获取银行支行列表");
            while (true) {
                const requestStart = Date.now(); // 记录单次请求的时间
                const res = await this.base.request.get(`${apiUrl}?city_code=${city_code}&limit=${limit}&offset=${offset}`, {
                    headers: {
                        "Wechatpay-Serial": this.PUB_KEY_ID
                    }
                });
                debug(`请求 offset=${offset} 返回耗时 ${Date.now() - requestStart} ms`);
    
                if (!res.status || !res.data || !res.data.data) {
                    debug(`请求失败，返回数据异常: ${JSON.stringify(res.data)}`);
                    break;
                }
    
                // 合并数据
                allData = [...allData, ...res.data.data];
    
                // 如果返回的数据量小于 `limit`，说明是最后一页
                if (res.data.data.length < limit) {
                    break;
                }
                // 继续请求下一页
                offset += limit;
            }
            
            debug(`成功获取微信银行列表，共 ${allData.length} 条`);
            return allData
        } catch (error) {
            debug("获取微信对私银行列表时发生错误");
            console.log(error);
        }
        debug(`方法执行总耗时 ${Date.now() - startTime} ms`);
        return [];
    }
    /** 
     * 获取微信对公银行列表
     * @property 系统在redis缓存2小时
     */
    async GetWechatCorporateBankList()
    {
        const apiUrl = "https://api.mch.weixin.qq.com/v3/capital/capitallhh/banks/corporate-banking";
        let offset = 0;
        let limit = 200;  // 每次请求 200 条，避免超时
        let allData: any[] = [];
        const startTime = Date.now(); 
        try {
            debug("开始获取微信对私银行列表");
            while (true) {
                const requestStart = Date.now(); // 记录单次请求的时间
                const res = await this.base.request.get(`${apiUrl}?limit=${limit}&offset=${offset}`, {
                    headers: {
                        "Wechatpay-Serial": this.PUB_KEY_ID
                    }
                });
                debug(`请求 offset=${offset} 返回耗时 ${Date.now() - requestStart} ms`);
    
                if (!res.status || !res.data || !res.data.data) {
                    debug(`请求失败，返回数据异常: ${JSON.stringify(res.data)}`);
                    break;
                }
    
                // 合并数据
                allData = [...allData, ...res.data.data];
    
                // 如果返回的数据量小于 `limit`，说明是最后一页
                if (res.data.data.length < limit) {
                    break;
                }
                // 继续请求下一页
                offset += limit;
            }
            if (allData.length > 0) {
                // 存入 Redis，缓存 2 小时
                await Cache.Jset("WechatBankList", 'Corporate', allData);
                debug(`成功获取微信银行列表，共 ${allData.length} 条`);
            }

        } catch (error) {
            debug("获取微信对私银行列表时发生错误");
            console.log(error);
        }
        debug(`方法执行总耗时 ${Date.now() - startTime} ms`);
    }
    /** 
     * 获取微信对私银行列表
     * @property 系统在redis缓存2小时
     */
    async GetWechatPersonalBankList()
    {
        const apiUrl = "https://api.mch.weixin.qq.com/v3/capital/capitallhh/banks/personal-banking";
        let offset = 0;
        let limit = 200;  // 每次请求 200 条，避免超时
        let allData: any[] = [];
        const startTime = Date.now(); 
        try {
            debug("开始获取微信对私银行列表");
            while (true) {
                const requestStart = Date.now(); // 记录单次请求的时间
                const res = await this.base.request.get(`${apiUrl}?limit=${limit}&offset=${offset}`, {
                    headers: {
                        "Wechatpay-Serial": this.PUB_KEY_ID
                    }
                });
                debug(`请求 offset=${offset} 返回耗时 ${Date.now() - requestStart} ms`);
    
                if (!res.status || !res.data || !res.data.data) {
                    debug(`请求失败，返回数据异常: ${JSON.stringify(res.data)}`);
                    break;
                }
    
                // 合并数据
                allData = [...allData, ...res.data.data];
    
                // 如果返回的数据量小于 `limit`，说明是最后一页
                if (res.data.data.length < limit) {
                    break;
                }
                // 继续请求下一页
                offset += limit;
            }
            if (allData.length > 0) {
                // 存入 Redis，缓存 2 小时
                await Cache.Jset("WechatBankList", 'Personal', allData);
                debug(`成功获取微信银行列表，共 ${allData.length} 条`);
            }

        } catch (error) {
            debug("获取微信对私银行列表时发生错误");
            console.log(error);
        }
        debug(`方法执行总耗时 ${Date.now() - startTime} ms`);
    }




    /**
     * 二级商户打开关闭点金计划接口
     * @param mid 商户ID 
     * @param click_gold 开关 
     */
    async ClickGold(mid:string,click_gold:"OPEN"|"CLOSE")
    {
        const apiUrl = "https://api.mch.weixin.qq.com/v3/goldplan/merchants/changegoldplanstatus";
        try {
            const res = await this.base.request.post(apiUrl, {sub_mchid:mid,operation_type :click_gold}, {
                headers: {
                  "Wechatpay-Serial": this.PUB_KEY_ID
                }
              });
              return res.data;
        } catch (error) {
            debug("发生错误");
            console.log(error);
            let e = Utils.getError(error);
            throw e;
                        
        }
    }
    
    /**
     * 递交二级商户进件数据到微信
     *
     * @async
     * @param {tb.UP<tb.kxyk_secondary_merchants_submission>} body
     * @returns {unknown}
     */
    async Applyments(body:tb.UP<tb.kxyk_secondary_merchants_submission>)
    {
        const apiUrl = "https://api.mch.weixin.qq.com/v3/ecommerce/applyments/";
        try {
            const res = await this.base.request.post(apiUrl, body, {
                headers: {
                  "Wechatpay-Serial": this.PUB_KEY_ID
                }
              });
              console.log(res);
              return res;
        } catch (error) {
            debug("发生错误");
            console.log(error);
            let e = Utils.getError(error);
            throw e;
                        
        }
    }

    async test2()
    {

        let name1 = this.base.publicEncrypt
        let body:sm.WX.SecondLevelMerchantSubmission = {
            sid:0,status:0,id:0,
            "out_request_no" : "APPLYMENT_00000000001",
            "organization_type" : "2",
            "finance_institution" : true,
            "business_license_info" : {
              "cert_type" : "CERTIFICATE_TYPE_2388",
              "business_license_copy" : "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
              "business_license_number" : "123456789012345678",
              "merchant_name" : "腾讯科技有限公司",
              "legal_person" : "张三",
              "company_address" : "深圳南山区科苑路",
              "business_time" : "[\\\"2014-01-01\\\",\\\"长期\\\"]"
            },
            "finance_institution_info" : {
              "finance_type" : "BANK_AGENT",
              "finance_license_pics" : [
                "example_finance_license_pics"
              ]
            },
            "id_holder_type" : "LEGAL",
            "id_doc_type" : "IDENTIFICATION_TYPE_MAINLAND_IDCARD",
            "authorize_letter_copy" : "47ZC6GC-vnrbEny_Ie_An5-tCpqxucuxi-vByf3Gjm7KEIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
            "id_card_info" : {
              "id_card_copy" : "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
              "id_card_national" : "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
              "id_card_name" : "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
              "id_card_number" : "AOZdYGISxo4y44/UgZ69bdu9X+tfMUJ9dl+LetjM45/zMbrYu+wWZ8gn4CTdo+D/m9MrPg+V4sm73oxqdQu/hj7aWyDl4GQtPXVdaztB9jVbVZh3QFzV+BEmytMNQp9dt1uWJktlfdDdLR3AMWyMB377xd+m9bSr/ioDTzagEcGe+vLYiKrzcroQv3OR0p3ppFYoQ3IfYeU/04S4t9rNFL+kyblK2FCCqQ11NdbbHoCrJc7NV4oASq6ZFonjTtgjjgKsadIKHXtb3JZKGZjduGdtkRJJp0/0eow96uY1Pk7Rq79Jtt7+I8juwEc4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
              "id_card_valid_time_begin" : "2019-06-06",
              "id_card_valid_time" : "2026-06-06"
            },
            "id_doc_info" : {
              "id_doc_name" : "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
              "id_doc_number" : "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
              "id_doc_copy" : "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
              "id_doc_copy_back" : "47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
              "doc_period_begin" : "2019-06-06",
              "doc_period_end" : "2020-01-02"
            },
            "owner" : true,
            "account_info" : {
              "bank_account_type" : "75",
              "account_bank" : "工商银行",
              "account_name" : "AOZdYGISxo4y44/UgZ69bdu9X+tfMUJ9dl+LetjM45/zMbrYu+wWZ8gn4CTdo+D/m9MrPg+V4sm73oxqdQu/hj7aWyDl4GQtPXVdaztB9jVbVZh3QFzV+BEmytMNQp9dt1uWJktlfdDdLR3AMWyMB377xd+m9bSr/ioDTzagEcGe+vLYiKrzcroQv3OR0p3ppFYoQ3IfYeU/04S4t9rNFL+kyblK2FCCqQ11NdbbHoCrJc7NV4oASq6ZFonjTtgjjgKsadIKHXtb3JZKGZjduGdtkRJJp0/0eow96uY1Pk7Rq79Jtt7+I8juwEc4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
              "bank_address_code" : "110000",
              "bank_branch_id" : "402713354941",
              "bank_name" : "施秉县农村信用合作联社城关信用社",
              "account_number" : "d+xT+MQCvrLHUVDWv/8MR/dB7TkXM2YYZlokmXzFsWs35NXUot7C0NcxIrUF5FnxqCJHkNgKtxa6RxEYyba1+VBRLnqKG2fSy/Y5qDN08Ej9zHCwJjq52Wg1VG8MRugli9YMI1fI83KGBxhuXyemgS/hqFKsfYGiOkJqjTUpgY5VqjtL2N4l4z11T0ECB/aSyVXUysOFGLVfSrUxMPZy6jWWYGvT1+4P633f+R+ki1gT4WF/2KxZOYmli385ZgVhcR30mr4/G3HBcxi13zp7FnEeOsLlvBmI1PHN4C7Rsu3WL8sPndjXTd75kPkyjqnoMRrEEaYQE8ZRGYoeorwC+w=="
            },
            "contact_info" : {
              "contact_type" : "65",
              "contact_name" : "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
              "contact_id_doc_type" : "IDENTIFICATION_TYPE_MAINLAND_IDCARD",
              "contact_id_card_number" : "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
              "contact_id_doc_copy" : "jTpGmxUX3FBWVQ5NJTZvvDujqhThn4ReFxikqJ5YW6zFQ",
              "contact_id_doc_copy_back" : "jTpGmxUX3FBWVQ5NJTZvvDujqhThn4ReFxikqJ5YW6zFQ",
              "contact_id_doc_period_begin" : "2019-06-06",
              "contact_id_doc_period_end" : "2026-06-06",
              "business_authorization_letter" : "47ZC6GC-vnrbEny_Ie_An5-tCpqxucuxi-vByf3Gjm7KEIUv0OF4wFNIO4kqg05InE4d2I6_H7I4",
              "mobile_phone" : "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
            },
            "sales_scene_info" : {
              "store_name" : "爱烧烤",
              "store_url" : "http://www.qq.com",
              "store_qr_code" : "jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ",
              "mini_program_sub_appid" : "wxa123344545577"
            },
            "settlement_info" : {
              "settlement_id" : 719,
              "qualification_type" : "零售批发/生活娱乐/其他",
            },
            "merchant_shortname" : "腾讯",
            "qualifications" : "[\"jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ\",\"47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4\"]",
            "business_addition_pics" : "[\"jTpGmxUX3FBWVQ5NJTZvlKX_gdU4cRz7z5NxpnFuAxhBTEO_PvWkfSCJ3zVIn001D8daLC-ehEuo0BJqRTvDujqhThn4ReFxikqJ5YW6zFQ\",\"47ZC6GC-vnrbEny__Ie_An5-tCpqxucuxi-vByf3Gjm7KE53JXvGy9tqZm2XAUf-4KGprrKhpVBDIUv0OF4wFNIO4kqg05InE4d2I6_H7I4\"]",
            "business_addition_desc" : "特殊情况，说明原因",
            "ubo_info_list" : [
              {
                "ubo_id_doc_type" : "IDENTIFICATION_TYPE_MAINLAND_IDCARD",
                "ubo_id_doc_copy" : "jTpGmxUXqRTvDujqhThn4ReFxikqJ5YW6zFQ",
                "ubo_id_doc_copy_back" : "jTpGmxUX3FBWVQ5NJTZvvDujqhThn4ReFxikqJ5YW6zFQ",
                "ubo_id_doc_name" : "AOZdYGISxo4y44/Ug4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
                "ubo_id_doc_number" : "AOZdYGISxo4y44/Ug4P4TG5xzchG/5IL9DBd+Z0zZXkw==",
                "ubo_id_doc_address" : "pVd1HJ6zyvPedzGaV+X3qtmrq9bb9tPROvwia4ibL+F6mfjbzQIzfb3HHLEjZ4YiR/cJiCrZxnAqi+pjeKIEdkwzXRAI7FUhrfPK3SNjaBTEu9GmsugMIA9r3x887Q+ODuC8HH2nzAn7NGpE/e3yiHgWhk0ps5k5DP/2qIdGdONoDzZelrxCl/NWWNUyB93K9F+jC1JX2IMttdY+aQ6zBlw0xnOiNW6Hzy7UtC+xriudjD5APomty7/mYNxLMpRSvWKIjOv/69bDnuC4EL5Kz4jBHLiCyOb+tI0m2qhZ9evAM+Jv1z0NVa8MRtelw/wDa4SzfeespQO/0kjiwfqdfg==",
                "ubo_id_doc_period_begin" : "2019-06-06",
                "ubo_id_doc_period_end" : "2026-06-06"
              }
            ]
          }
        const encryBody = this.base.publicEncryptObjectPaths(body,[""])
        const apiUrl = "https://api.mch.weixin.qq.com/v3/ecommerce/applyments/";
        try {
            const res = await this.base.request.post(apiUrl, body, {
                headers: {
                  "Wechatpay-Serial": this.PUB_KEY_ID
                }
              });
              console.log(res);
              
        } catch (error) {
            debug("发生错误");
            console.log(error);
            
        }


    }
    
    /**
     * 收付通二级商户进件保存到数据库
     * @param has 要保存的数据
     */
    async SecondaryMerchantsSave(has:sm.WX.SecondLevelMerchantSubmission)
    {
        let up:tb.UP<tb.kxyk_secondary_merchants_submission>={
            sid:has.sid,out_request_no: has.out_request_no ? has.out_request_no : Utils.generateOutRequestNo(),
            organization_type:has.organization_type,finance_institution : has.finance_institution ? 1 : 0,
            id_holder_type:has.id_holder_type,id_doc_type:has.id_doc_type,authorize_letter_copy:has.authorize_letter_copy,
            owner:has.owner ? 1 : 0,merchant_shortname:has.merchant_shortname,status:0
        };
        if(has.business_license_info){
            up.business_license_info = JSON.stringify(has.business_license_info);
        }
        if(has.finance_institution_info){
            up.finance_institution_info = JSON.stringify(has.business_license_info);
        }
        if(has.id_card_info){
            up.id_card_info = JSON.stringify(has.id_card_info);
        }
        if(has.id_doc_info){
            up.id_doc_info = JSON.stringify(has.id_doc_info);
        }
        if(has.ubo_info_list){
            up.ubo_info_list = JSON.stringify(has.ubo_info_list);
        }
        if(has.account_info){
            up.account_info = JSON.stringify(has.account_info);
        }
        if(has.contact_info){
            up.contact_info = JSON.stringify(has.contact_info);
        }
        if(has.sales_scene_info){
            up.sales_scene_info = JSON.stringify(has.sales_scene_info);
        }
        if(has.settlement_info){
            up.settlement_info = JSON.stringify(has.settlement_info);
        }
        if(has.qualifications){
            up.qualifications = JSON.stringify(has.qualifications);
        }
        if(has.business_addition_pics){
            up.business_addition_pics = JSON.stringify(has.business_addition_pics);
        }
        if(has.business_addition_desc){
            up.business_addition_desc = JSON.stringify(has.business_addition_desc);
        }
        if(has.id){
            // 更新
            await DB.sql.update('kxyk_secondary_merchants_submission',up,{id:has.id});
        }else{
            // 插入
            await DB.sql.insert('kxyk_secondary_merchants_submission',up);
        }

    }
    /** 测试扩展支付方法 */
    /**
     * 获取支付商户号码 2025-04-10
     * @param p 
     */
    async GetPayMchIDXY(p:sm.PayArgsV3)
    {
        let mch_id = '';
        switch (p.is_sxed) {
            case 0:
                let info = await DB.sql.getId(Api.tb.kxyk_mch_role_info,p.cid) as tb.kxyk_mch_role_info;
                if(info && info.store_number){
                    mch_id = info.store_number;
                }
                break;
            case 1:
                let store = await DB.sql.getId(Api.tb.kxyk_mch_store,p.sid) as tb.kxyk_mch_store;
                if(store && store.pay_number){
                    mch_id = store.pay_number;
                }
                break;
            case 2:
                let cp = await DB.sql.getId(Api.tb.kxyk_company,p.cpid) as tb.kxyk_company;
                if(cp && cp.xy_pay_number){
                    mch_id = cp.xy_pay_number;
                }
                break;
        
            default:
                break;
        }
        return mch_id;
    }


    /**
     * 
     * @param p 
     * @returns 
     */
    async onUnifiedOrderOne(p: sm.PayArgsV3) {
        if (!p.uid) throw "缺少用户ID";
        let user = await DB.sql.getId('sm_user', p.uid, false, "uid") as tb.sm_user;

        // 1. 生成系统支付日志 (逻辑基本保持一致，但注意字段对应)
        let newPayLog: tb.kxyk_user_pay_log = {
            mode: p.mode, uid: p.uid, status: 0, ev: p.ev, back_url: p.back_url,
            extend: p.extend ? qs.stringify(p.extend) : '',
            pay_title: p.title, openid: '', api: p.api, price: p.price, fail: 0,
            on_out_trade_no: Utils.generateOutRequestNo('SYS'),
            time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            prepay_id: '', transaction_id: '', sid: p.sid ?? 0,
            mch_type: 1, 
            sp_mchid: p.sp_mchid ? p.sp_mchid : '', // 这里改为你的直连商户号 mch_type
            sub_mchid: '', // 直连模式通常不需要子商户号
            sp_appid: "", cid: p.cid ? p.cid : 0,
            is_sxed:1,//这里不管有没有超出授信额度都直接让门店收款
            out_trade_no: Utils.generateOutRequestNo('PAY')
        }

        // 2. 构造基础请求数据 (直连模式结构)
        let data: any = {
            mchid: newPayLog.sp_mchid,
            out_trade_no: newPayLog.out_trade_no,
            description: p.title,
            notify_url: 'https://m.sam322.com/api/SysPayBackOne/'+newPayLog.out_trade_no, // 确保该回调能处理直连模式的数据
            amount: {
                total: Math.round(p.price * 100), // 注意：直连模式字段是 total 而不是 total_amount
                currency: "CNY"
            },
            attach: p.api
        };

        // 3. 根据支付场景确定 API 路径和 AppID
        let scene = "jsapi"; // 默认 JSAPI (微信内或小程序)
        
        switch (p.ev) {
            case "APP":
                data.appid = config.wx.app_appId;
                scene = "app";
                break;
            case "WX": // 公众号支付
                data.appid = config.wx.appId;
                data.payer = { openid: user.wx_openid };
                scene = "jsapi";
                break;
            case "H5": // 手机浏览器 Native 或 H5
                data.appid = config.wx.appId;
                // 如果是扫码支付用 native，如果是手机浏览器跳转用 h5
                scene = "native"; 
                break;
            case "WXAPP": // 小程序支付
                data.appid = config.wx.miniProgram.appId;
                data.payer = { openid: user.cx_openid };
                scene = "jsapi";
                break;
        }

        newPayLog.sp_appid = data.appid;
        newPayLog.openid = data.payer?.openid ?? '';

        // 4. 保存日志
        let newPaylogDB = await DB.sql.insert('kxyk_user_pay_log', newPayLog);
        // console.log(data);
        
        // 5. 请求微信 V3 接口
        const APIurl = `https://api.mch.weixin.qq.com/v3/pay/transactions/${scene}`;
        let base = await this.getBaseOne(newPayLog.sp_mchid);
        if(base){
            const res = await base.base.request({
                url: APIurl,
                method: "post",
                data: data
            })
            if (res.data && (res.data.prepay_id || res.data.code_url)) {
                const prepayId = res.data.prepay_id || res.data.code_url; // Native 返回的是 code_url
                await DB.sql.update('kxyk_user_pay_log', { prepay_id: prepayId }, { id: newPaylogDB.insertId });
                return prepayId;
            }
            throw "调起支付失败：" + (res.data?.message || "未知错误");
        }
        // const res = await this.base.request({
        //     url: APIurl,
        //     method: "post",
        //     data: data
        // });
        // console.log('完成请求');
        
        // console.log(res);
        
        // 6. 处理返回结果
        // if (res.data && (res.data.prepay_id || res.data.code_url)) {
        //     const prepayId = res.data.prepay_id || res.data.code_url; // Native 返回的是 code_url
        //     await DB.sql.update('kxyk_user_pay_log', { prepay_id: prepayId }, { id: newPaylogDB.insertId });
        //     return prepayId;
        // } else {
        //     throw "调起支付失败：" + (res.data?.message || "未知错误");
        // }
    }

    /**
     * 根据商户号获取支付对象 WechatPayV3Base
     * @param mchid 商户号码
     */
    async getBaseOne(mchid: string): Promise<ReturnType<typeof apiContainer>> {
        let base = this.base_one.get(mchid);
        if(!base){
            const certPath = path.join(__dirname, 'cert', `apiclient_cert_${mchid}.pem`);
            const ConfigV3: ContainerOptions = {
                
                //证书
                apiclient_cret: readFileSync(certPath),
                //证书密钥
                apiclient_key: readFileSync(path.join(__dirname, 'cert', `apiclient_key_${mchid}.pem`)),
                // publicKey: readFileSync(path.join(__dirname, 'cert', `wechat_public_key_${mchid}.pem`)),
                //后台配置的key
                apiV3Key:Config.wx.apiV3Key,//这个自定义32位key所有商户都一样
                //商户号
                mchid:mchid,
                //默认单例模式,开启后同个商户号只会返回一个实例。
                singleton: true,
                //可选:默认系统的tmp目录
                downloadDir: './tmpDownlond',
                //可选: 默认true。开启后会缓存证书12小时,12小时后惰性更新证书
                autoUpdateCertificates: true,
                //可选，默认'wechatpay-sdk'
                userAgent: 'wechatpay-nodejs-sdk/1.0.0',
            }
            base = apiContainer({...ConfigV3,noPlatformCertificate:true} as ContainerOptions);
            /**
             * 这个版本不支持公钥验证，这里是我修改源码使其支持
             *
             * 备注：设备离线时可能拿不到返回值
             */
            base.base.certificates = [
                {
                    effective_time:"2021-03-26T00:00:00+08:00",
                    expire_time:"2025-03-26T00:00:00+08:00",
                    publicKey:null as any,
                    serial_no:"PUB_KEY_ID_0116909432862026030400191853001003",
                    certificate:readFileSync(path.join(__dirname,'cert', `pub_key_${mchid}.pem`)).toString()
                }
            ];
            this.base_one.set(mchid, base);
        }
        return base;
    }
    /**
     * 平台微信支付统一下单 预支付
     * @property 使用收付通 合单模式
     * @param args 支付参数
     */
    async onUnifiedOrder(p:sm.PayArgsV3)
    {
        if(!p.uid) throw "缺少用户ID";
        let user = await DB.sql.getId('sm_user',p.uid,false,"uid") as tb.sm_user;
        //生成系统支付日志
        let newPayLog:tb.kxyk_user_pay_log =  
        {
            mode:p.mode,uid:p.uid,status:0,ev:p.ev,back_url:p.back_url,extend:p.extend ? qs.stringify(p.extend) : '',pay_title:p.title,
            openid:'',api:p.api,price:p.price,fail:0,on_out_trade_no:Utils.generateOutRequestNo('SYS'),time:dayjs().format("YYYY-MM-DD HH:mm:ss"),
            prepay_id:'',transaction_id:'',sid:p.sid ?? 0,mch_type:0,sp_mchid:Config.wx.sp_mchid_xy,sub_mchid:'',sp_appid:"",cid:p.cid?p.cid:0,
            is_sxed:p.is_sxed,cpid:p.cpid ? p.cpid : 1,out_trade_no:Utils.generateOutRequestNo('SUB')
        }
        let sub_mchid = await this.GetPayMchIDXY(p);
        if(!sub_mchid) throw "未设置收款商户号吗！";
        newPayLog.sub_mchid = sub_mchid;//收款子商户号码

        

        let data:sm.WxPayCombineOrderData={
            combine_appid: "wx1234567890abcdef", // 发起合单的平台APPid
            combine_mchid: newPayLog.sp_mchid,        // 发起合单服务商户号
            combine_out_trade_no: newPayLog.out_trade_no ?? '', // 合单商户订单号
            sub_orders:[
                {
                    mchid:newPayLog.sp_mchid,sub_mchid:newPayLog.sub_mchid,
                    attach:p.api,amount:{
                        total_amount:Math.round(p.price*100),currency:"CNY"
                    },out_trade_no:newPayLog.out_trade_no,description:p.title
                }

            ],notify_url:'https://m.sam322.com/api/SysPayBack/'
        }
        let APIurl= `https://api.mch.weixin.qq.com/v3/combine-transactions/jsapi`;
        switch (p.ev) {
            case "APP":
                data.combine_payer_info={
                    openid: user.h5_openid
                }
                
                data.combine_appid = config.wx.app_appId
                break;
            case "WX":
                data.combine_appid = config.wx.appId;
                newPayLog.sp_appid = config.wx.appId;
                data.combine_payer_info = {
                    openid : user.wx_openid
                }
                break;
            case "H5":
                data.combine_appid = config.wx.appId;
                // data.combine_payer_info.openid = user.wx_openid;
                APIurl= `https://api.mch.weixin.qq.com/v3/combine-transactions/native`;
                break;
            case "WXAPP":
                data.combine_appid = config.wx.miniProgram.appId;
                newPayLog.sp_appid = config.wx.miniProgram.appId;
                data.combine_payer_info = {
                    openid : user.cx_openid
                }
                break;
        }
        newPayLog.openid = data.combine_payer_info?.openid ?? '';
        let newPaylogDB = await DB.sql.insert('kxyk_user_pay_log',newPayLog);
        const res = await this.base.request({
            url:APIurl,
            method:"post",
            data:data
        })
        if(res.data && res.data.prepay_id){
            await DB.sql.update('kxyk_user_pay_log',{prepay_id:res.data.prepay_id},{id:newPaylogDB.insertId});
            return res.data.prepay_id;
        }

    }

    
    /**
     * 格式化待支付收款商户号码
     *
     * @async
     * @param {sm.Pd1.OrderDetallPayNumber[]} list 
     * @returns {*} list
     */
    async SubFormatPaynumber(list:sm.Pd1.OrderDetallPayNumber[])
    {
        //缓存不同号码总收款金额 用于判断当前子商户是否拥有收款权限
        const accountTotals = new Map<string, number>();
        for (const sub of list) 
        {
            if(sub.pay_number && sub.s_pay_number){
                const current = accountTotals.get(sub.pay_number) ?? 0;
                const wait_pay_price = sub.wait_pay_price ?? 0;
                if(sub.has_sxed < (current+wait_pay_price)){
                    sub.pay_number = sub.s_pay_number;
                    sub.sub_id = 0;
                }
                accountTotals.set(sub.pay_number, current+wait_pay_price)
            }
        }
        return list;
    }


    /** 门店独立收款时候预下单 - 独立付款不登录时 */
    async CombinedOrderOneMch2(p:sm.PayArgsV3,os:'wx'|'wxapp'|'app'|'h5',pid:number,tran:PoolConnection | false = false,openid:string = ''){
        // let user = await DB.sql.getId('sm_user',p.uid,tran,"uid") as tb.sm_user;
        // if(!user) throw new Error("支付用户不存在!");

        let newPayLog: tb.kxyk_user_pay_log = {
            mode: 'wxpay', uid:p.uid ?? 0, status: 0, ev: os, back_url: '',
            extend: p.extend ? qs.stringify(p.extend) : '',
            pay_title: p.title, openid: '', api: p.api, price: p.price, fail: 0,
            on_out_trade_no: Utils.generateOutRequestNo('SYS'),
            time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            prepay_id: '', transaction_id: '', sid: p.sid ?? 0,
            mch_type: 1, 
            sp_mchid: p.sp_mchid ? p.sp_mchid : '', // 这里改为你的直连商户号 mch_type cpid
            sub_mchid: '', // 直连模式通常不需要子商户号
            sp_appid: "", cid: p.cid ? p.cid : 0,
            is_sxed:1,//这里不管有没有超出授信额度都直接让门店收款
            out_trade_no: Utils.generateOutRequestNo('PAY')
        }
        // 2. 构造基础请求数据 (直连模式结构)
        let data: any = {
            mchid:p.sp_mchid,
            out_trade_no: newPayLog.out_trade_no,
            description: p.title,
            notify_url: 'https://m.sam322.com/api/SysPayBackOne/'+newPayLog.out_trade_no, // 确保该回调能处理直连模式的数据
            amount: {
                total: Math.round(p.price * 100), // 注意：直连模式字段是 total 而不是 total_amount
                currency: "CNY"
            },
            attach: p.api
        };
        // 3. 根据支付场景确定 API 路径和 AppID
        let scene = "jsapi"; // 默认 JSAPI (微信内或小程序)
        switch (p.ev) {
            case "APP":
                data.appid = config.wx.app_appId;
                scene = "app";
                break;
            case "WX": // 公众号支付
                data.appid = config.wx.appId;
                data.payer = { openid: openid };
                scene = "jsapi";
                break;
            case "H5": // 手机浏览器 Native 或 H5
                data.appid = config.wx.appId;
                // 如果是扫码支付用 native，如果是手机浏览器跳转用 h5
                scene = "native"; 
                break;
            case "WXAPP": // 小程序支付
                data.appid = config.wx.miniProgram.appId;
                data.payer = { openid: openid };
                scene = "jsapi";
                break;
        }
        newPayLog.sp_appid = data.appid;
        newPayLog.openid = data.payer?.openid ?? '';
        // 4. 保存日志
        let newPaylogDB = await DB.sql.insert('kxyk_user_pay_log', newPayLog,tran);
        const APIurl = `https://api.mch.weixin.qq.com/v3/pay/transactions/${scene}`;
        let base = await this.getBaseOne(newPayLog.sp_mchid);
        if(base){
            const res = await base.base.request({
                url: APIurl,
                method: "post",
                data: data
            })
            if (res.data && (res.data.prepay_id || res.data.code_url)) {
                const prepayId = res.data.prepay_id || res.data.code_url; // Native 返回的是 code_url
                await DB.sql.update('kxyk_user_pay_log', { prepay_id: prepayId }, { id: newPaylogDB.insertId },tran);
                if(prepayId){
                   let db =  base.use(JSPay).getPayParams({appId:data.appid,prepay_id:prepayId});
                   return db
                }
                throw new Error("prepayId不存在");
                
            }
            throw "调起支付失败：" + (res.data?.message || "未知错误");
        }
    }
    /** 门店独立收款时候预下单 */
    async CombinedOrderOneMch(p:sm.PayArgsV3,os:'wx'|'wxapp'|'app'|'h5',pid:number,tran:PoolConnection | false = false){
        let user = await DB.sql.getId('sm_user',p.uid,tran,"uid") as tb.sm_user;
        if(!user) throw new Error("支付用户不存在!");

        let newPayLog: tb.kxyk_user_pay_log = {
            mode: 'wxpay', uid:p.uid ?? 0, status: 0, ev: os, back_url: '',
            extend: p.extend ? qs.stringify(p.extend) : '',
            pay_title: p.title, openid: '', api: p.api, price: p.price, fail: 0,
            on_out_trade_no: Utils.generateOutRequestNo('SYS'),
            time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            prepay_id: '', transaction_id: '', sid: p.sid ?? 0,
            mch_type: 1, 
            sp_mchid: p.sp_mchid ? p.sp_mchid : '', // 这里改为你的直连商户号 mch_type cpid
            sub_mchid: '', // 直连模式通常不需要子商户号
            sp_appid: "", cid: p.cid ? p.cid : 0,
            is_sxed:1,//这里不管有没有超出授信额度都直接让门店收款
            out_trade_no: Utils.generateOutRequestNo('PAY')
        }
        // 2. 构造基础请求数据 (直连模式结构)
        let data: any = {
            mchid:p.sp_mchid,
            out_trade_no: newPayLog.out_trade_no,
            description: p.title,
            notify_url: 'https://m.sam322.com/api/SysPayBackOne/'+newPayLog.out_trade_no, // 确保该回调能处理直连模式的数据
            amount: {
                total: Math.round(p.price * 100), // 注意：直连模式字段是 total 而不是 total_amount
                currency: "CNY"
            },
            attach: p.api
        };
        // 3. 根据支付场景确定 API 路径和 AppID
        let scene = "jsapi"; // 默认 JSAPI (微信内或小程序)
        switch (p.ev) {
            case "APP":
                data.appid = config.wx.app_appId;
                scene = "app";
                break;
            case "WX": // 公众号支付
                data.appid = config.wx.appId;
                data.payer = { openid: user.wx_openid };
                scene = "jsapi";
                break;
            case "H5": // 手机浏览器 Native 或 H5
                data.appid = config.wx.appId;
                // 如果是扫码支付用 native，如果是手机浏览器跳转用 h5
                scene = "native"; 
                break;
            case "WXAPP": // 小程序支付
                data.appid = config.wx.miniProgram.appId;
                data.payer = { openid: user.cx_openid };
                scene = "jsapi";
                break;
        }
        newPayLog.sp_appid = data.appid;
        newPayLog.openid = data.payer?.openid ?? '';
        // 4. 保存日志
        let newPaylogDB = await DB.sql.insert('kxyk_user_pay_log', newPayLog,tran);
        const APIurl = `https://api.mch.weixin.qq.com/v3/pay/transactions/${scene}`;
        let base = await this.getBaseOne(newPayLog.sp_mchid);
        if(base){
            const res = await base.base.request({
                url: APIurl,
                method: "post",
                data: data
            })
            if (res.data && (res.data.prepay_id || res.data.code_url)) {
                const prepayId = res.data.prepay_id || res.data.code_url; // Native 返回的是 code_url
                await DB.sql.update('kxyk_user_pay_log', { prepay_id: prepayId }, { id: newPaylogDB.insertId },tran);
                if(prepayId){
                   let db =  base.use(JSPay).getPayParams({appId:data.appid,prepay_id:prepayId});
                   return db
                }
                throw new Error("prepayId不存在");
                
            }
            throw "调起支付失败：" + (res.data?.message || "未知错误");
        }
    }

    /**
     * 合并下单获取微信预支付ID - 独立付款不登录时使用
     * @param hall 大厅用户
     * @param odids 要下单的订单详情ID组 字符串逗号分割
     * @param os 支付环境 'wx'|'wxapp'|'app'|'h5'
     * @param pid 预支付ID
     * @param tran 事务
     */
    async CombinedOrder2(hall:sm.Pd1.HallMember,odids:string,os:'wx'|'wxapp'|'app'|'h5',pid:number,tran:PoolConnection | false = false,openid:string){ 
        //调用base的request进行请求.自动签名满足大多数情况下的请求.
        //如果签名串并非data对象的内容,请自行计算
        //可以参照源码中_upload的实现
        try {

            let odList = await DB.sql.find(`SELECT COALESCE(sub.pay_number,s.pay_number) as pay_number,IFNULL(sub.id,0) as sub_id,
            s.pay_number as s_pay_number,
            (
            SELECT 
                IFNULL(
                    SUM(
                        CASE f.payable
                            WHEN 1 THEN f.price 
                            WHEN 0 THEN -f.price 
                            ELSE 0 
                        END
                    )
                ,0) AS amount
            FROM kxyk_mch_store_finance f
            WHERE f.type = 1 and sub_id = sub.id and f.check = 0
            ) + sub.sxed as has_sxed,
            COALESCE(sub.pay_name,s.name) as pay_name,od.* 
            FROM kxyk_mch_store_order_detall od 
            LEFT JOIN kxyk_mch_goods g on g.id = od.goods_id
            LEFT JOIN kxyk_mch_store s on s.id = g.store_id
            LEFT JOIN kxyk_mch_store_sub sub on sub.id = g.sub_pay
            WHERE od.id in(${odids})`,[],tran) as sm.Pd1.OrderDetallPayNumber[];

            if(odList && odList.length > 0)
            {
                /** 判断收款商户是否有权限收款 2025-10-09 */
                odList = await this.SubFormatPaynumber(odList);
                /** 系统支付日志 */
                let newPayLog:tb.UP<tb.kxyk_user_combine_pay_order> = {
                    uid:hall.uid,sid:hall.sid,type:0,status:0,os:os,hid:hall.id,odids:odids,pid:pid,
                    out_trade_no:Utils.generateOutRequestNo('zHD'),t1:dayjs().unix(),price:hall.orders?.wait_pay_price || 0
                }
                let payLog = await DB.sql.insert(Api.tb.kxyk_user_combine_pay_order,newPayLog,tran);

                let data:sm.WxPayCombineOrderData={
                    combine_appid: "wx1234567890abcdef", // 发起合单的平台APPid
                    combine_mchid: config.wx.sp_mchid_xy,        // 发起合单服务商户号
                    combine_out_trade_no: newPayLog.out_trade_no ?? '', // 合单商户订单号
                    sub_orders:[],notify_url:'https://m.sam322.com/api/PayCombine/'
                }
                let APIurl= `https://api.mch.weixin.qq.com/v3/combine-transactions/jsapi`;
                switch (os) {
                    case "app":
                        data.combine_payer_info={
                            openid: openid
                        }
                        data.combine_appid = config.wx.app_appId
                        break;
                    case "wx":
                        data.combine_appid = config.wx.appId;
                        data.combine_payer_info = {
                            openid : openid
                        }
                        break;
                    case "h5":
                        data.combine_appid = config.wx.appId;
                        // data.combine_payer_info.openid = user.wx_openid;
                        APIurl= `https://api.mch.weixin.qq.com/v3/combine-transactions/native`;

                        break;
                    case "wxapp":
                        data.combine_appid = config.wx.miniProgram.appId;
                        data.combine_payer_info = {
                            openid : openid
                        }
                        break;
                }
                
                if(odList.length < 50)
                {
                    if(payLog.insertId){
                        // 合并订单最多50笔
                        for (const od of odList)
                        {
                            if(!od.pay_number) throw new Error("当前门店未配置有效的收款商户号码！");
                            let newPayLog:tb.kxyk_user_pay_log = 
                            {
                                mode:"wxpay",uid:hall.uid,status:0,ev:os,back_url:"",extend:'',pay_title:od.item_name,
                                openid:(data.combine_payer_info && data.combine_payer_info.openid) ? data.combine_payer_info.openid : '',
                                api:"",price:od.wait_pay_price,fail:0,out_trade_no:Utils.generateOutRequestNo('HD'),
                                time:dayjs().format("YYYY-MM-DD HH:mm:ss"),sub_id:od.sub_id,
                                prepay_id:'',transaction_id:'',sid:hall.sid,mch_type:0,sp_mchid:Config.wx.sp_mchid_xy,sub_mchid:od.pay_number,
                                sp_appid:data.combine_appid,cid:hall.cid,is_sxed:1,cpid:1
                            }
                            let payDetall = await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog,tran);
                            if(payDetall.insertId){
                                // 这里关联订单详情和支付日志
                                await DB.sql.update<tb.kxyk_mch_store_order_detall>(Api.tb.kxyk_mch_store_order_detall,{pl_id:payDetall.insertId},{id:od.id},tran);
                                if(od.wait_pay_price*100 > 0){
                                    data.sub_orders.push({
                                        mchid:data.combine_mchid,sub_mchid:od.pay_number,
                                        attach:od.id +'',amount:{
                                            total_amount:Math.round(od.wait_pay_price*100),currency:"CNY"
                                        },out_trade_no:newPayLog.out_trade_no,description:od.item_name
                                    })
                                }

                            }
                        }
                    }

                }else{
                    // 这里切换支付逻辑 - 合单数量超过微信规定 50
                    // console.log(odList);
                    const invalid = odList.find(item => !item.pay_number || item.pay_number.trim() === '');
                    if (invalid) {
                        throw new Error(`门店内有商品未配置收款商户号码！: ${invalid.item_name}`);
                    }

                    const payMap: Map<string, sm.WX.CombineOrderPar1> = new Map();
                    for (const item of odList)
                    {
                        if(!item.pay_number) throw new Error("门店内有商品未配置收款商户号码！");
                        let newPayLog:tb.kxyk_user_pay_log = 
                        {
                            mode:"wxpay",uid:hall.uid,status:0,ev:os,back_url:"",extend:'',pay_title:item.item_name,
                            openid:(data.combine_payer_info && data.combine_payer_info.openid) ? data.combine_payer_info.openid : '',
                            api:"",price:item.wait_pay_price,fail:0,out_trade_no:'',sub_id:item.sub_id,
                            time:dayjs().format("YYYY-MM-DD HH:mm:ss"),
                            prepay_id:'',transaction_id:'',sid:hall.sid,mch_type:0,sp_mchid:Config.wx.sp_mchid_xy,sub_mchid:item.pay_number,sp_appid:data.combine_appid,cid:hall.cid,
                            is_sxed:1,cpid:1
                        }
                        if(payMap.has(item.pay_number)){
                            const existing = payMap.get(item.pay_number)!;
                            existing.wait_pay_price += item.wait_pay_price;
                            newPayLog.out_trade_no = existing.out_trade_no;
                            existing.description.push(item.item_name);
                        }else{
                            let otn = Utils.generateOutRequestNo('HD');
                            payMap.set(item.pay_number,{pay_number:item.pay_number,wait_pay_price:item.wait_pay_price,out_trade_no:otn,description:[item.item_name]});
                            newPayLog.out_trade_no = otn;
                        }
                        let paylog = await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog,tran);
                        if(paylog.insertId){
                            await DB.sql.update<tb.kxyk_mch_store_order_detall>(Api.tb.kxyk_mch_store_order_detall,{pl_id:paylog.insertId},{id:item.id},tran);
                        }
                    }
                    if(payMap.size > 0){
                        if(payMap.size > 49)
                        {
                            throw new Error("超出一次性支付商户数量!"); 
                        }
                        for (const [key,val] of payMap) 
                        {
                            data.sub_orders.push({
                                mchid:data.combine_mchid,sub_mchid:val.pay_number,
                                attach:val.pay_number +'',amount:{
                                    total_amount:Math.round(val.wait_pay_price*100),currency:"CNY"
                                },out_trade_no:val.out_trade_no,description:Utils.joinAndTruncate(val.description,100)
                            })
                        }
                    }

                }
                const res = await this.base.request({
                    url:APIurl,
                    method:"post",
                    data:data
                })
                if(res.data && res.data.prepay_id){
                    return res.data.prepay_id;
                }
            }
            throw new Error("订单详情数量错误！");
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    /**
     * 合并下单获取微信预支付ID
     * @param hall 大厅用户
     * @param odids 要下单的订单详情ID组 字符串逗号分割
     * @param os 支付环境 'wx'|'wxapp'|'app'|'h5'
     * @param pid 预支付ID
     * @param tran 事务
     */
    async CombinedOrder(hall:sm.Pd1.HallMember,odids:string,os:'wx'|'wxapp'|'app'|'h5',pid:number,tran:PoolConnection | false = false){ 
        let user = await DB.sql.getId('sm_user',hall.uid,tran,"uid") as tb.sm_user;
        if(!user) throw new Error("支付用户不存在!");
        //调用base的request进行请求.自动签名满足大多数情况下的请求.
        //如果签名串并非data对象的内容,请自行计算
        //可以参照源码中_upload的实现
        try {

            let odList = await DB.sql.find(`SELECT COALESCE(sub.pay_number,s.pay_number) as pay_number,IFNULL(sub.id,0) as sub_id,
            s.pay_number as s_pay_number,
            (
            SELECT 
                IFNULL(
                    SUM(
                        CASE f.payable
                            WHEN 1 THEN f.price 
                            WHEN 0 THEN -f.price 
                            ELSE 0 
                        END
                    )
                ,0) AS amount
            FROM kxyk_mch_store_finance f
            WHERE f.type = 1 and sub_id = sub.id and f.check = 0
            ) + sub.sxed as has_sxed,
            COALESCE(sub.pay_name,s.name) as pay_name,od.* 
            FROM kxyk_mch_store_order_detall od 
            LEFT JOIN kxyk_mch_goods g on g.id = od.goods_id
            LEFT JOIN kxyk_mch_store s on s.id = g.store_id
            LEFT JOIN kxyk_mch_store_sub sub on sub.id = g.sub_pay
            WHERE od.id in(${odids})`,[],tran) as sm.Pd1.OrderDetallPayNumber[];

            if(odList && odList.length > 0)
            {
                /** 判断收款商户是否有权限收款 2025-10-09 */
                odList = await this.SubFormatPaynumber(odList);
                /** 系统支付日志 */
                let newPayLog:tb.UP<tb.kxyk_user_combine_pay_order> = {
                    uid:hall.uid,sid:hall.sid,type:0,status:0,os:os,hid:hall.id,odids:odids,pid:pid,
                    out_trade_no:Utils.generateOutRequestNo('zHD'),t1:dayjs().unix(),price:hall.orders?.wait_pay_price || 0
                }
                let payLog = await DB.sql.insert(Api.tb.kxyk_user_combine_pay_order,newPayLog,tran);

                let data:sm.WxPayCombineOrderData={
                    combine_appid: "wx1234567890abcdef", // 发起合单的平台APPid
                    combine_mchid: config.wx.sp_mchid_xy,        // 发起合单服务商户号
                    combine_out_trade_no: newPayLog.out_trade_no ?? '', // 合单商户订单号
                    sub_orders:[],notify_url:'https://m.sam322.com/api/PayCombine/'
                }
                let APIurl= `https://api.mch.weixin.qq.com/v3/combine-transactions/jsapi`;
                switch (os) {
                    case "app":
                        data.combine_payer_info={
                            openid: user.h5_openid
                        }
                        data.combine_appid = config.wx.app_appId
                        break;
                    case "wx":
                        data.combine_appid = config.wx.appId;
                        data.combine_payer_info = {
                            openid : user.wx_openid
                        }
                        break;
                    case "h5":
                        data.combine_appid = config.wx.appId;
                        // data.combine_payer_info.openid = user.wx_openid;
                        APIurl= `https://api.mch.weixin.qq.com/v3/combine-transactions/native`;

                        break;
                    case "wxapp":
                        data.combine_appid = config.wx.miniProgram.appId;
                        data.combine_payer_info = {
                            openid : user.cx_openid
                        }
                        break;
                }
                
                if(odList.length < 50)
                {
                    if(payLog.insertId){
                        // 合并订单最多50笔
                        for (const od of odList)
                        {
                            if(!od.pay_number) throw new Error("当前门店未配置有效的收款商户号码！");
                            let newPayLog:tb.kxyk_user_pay_log = 
                            {
                                mode:"wxpay",uid:hall.uid,status:0,ev:os,back_url:"",extend:'',pay_title:od.item_name,
                                openid:(data.combine_payer_info && data.combine_payer_info.openid) ? data.combine_payer_info.openid : '',
                                api:"",price:od.wait_pay_price,fail:0,out_trade_no:Utils.generateOutRequestNo('HD'),
                                time:dayjs().format("YYYY-MM-DD HH:mm:ss"),sub_id:od.sub_id,
                                prepay_id:'',transaction_id:'',sid:hall.sid,mch_type:0,sp_mchid:Config.wx.sp_mchid_xy,sub_mchid:od.pay_number,
                                sp_appid:data.combine_appid,cid:hall.cid,is_sxed:1,cpid:1
                            }
                            let payDetall = await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog,tran);
                            if(payDetall.insertId){
                                // 这里关联订单详情和支付日志
                                await DB.sql.update<tb.kxyk_mch_store_order_detall>(Api.tb.kxyk_mch_store_order_detall,{pl_id:payDetall.insertId},{id:od.id},tran);
                                if(od.wait_pay_price*100 > 0){
                                    data.sub_orders.push({
                                        mchid:data.combine_mchid,sub_mchid:od.pay_number,
                                        attach:od.id +'',amount:{
                                            total_amount:Math.round(od.wait_pay_price*100),currency:"CNY"
                                        },out_trade_no:newPayLog.out_trade_no,description:od.item_name
                                    })
                                }

                            }
                        }
                    }

                }else{
                    // 这里切换支付逻辑 - 合单数量超过微信规定 50
                    // console.log(odList);
                    const invalid = odList.find(item => !item.pay_number || item.pay_number.trim() === '');
                    if (invalid) {
                        throw new Error(`门店内有商品未配置收款商户号码！: ${invalid.item_name}`);
                    }

                    const payMap: Map<string, sm.WX.CombineOrderPar1> = new Map();
                    for (const item of odList)
                    {
                        if(!item.pay_number) throw new Error("门店内有商品未配置收款商户号码！");
                        let newPayLog:tb.kxyk_user_pay_log = 
                        {
                            mode:"wxpay",uid:hall.uid,status:0,ev:os,back_url:"",extend:'',pay_title:item.item_name,
                            openid:(data.combine_payer_info && data.combine_payer_info.openid) ? data.combine_payer_info.openid : '',
                            api:"",price:item.wait_pay_price,fail:0,out_trade_no:'',sub_id:item.sub_id,
                            time:dayjs().format("YYYY-MM-DD HH:mm:ss"),
                            prepay_id:'',transaction_id:'',sid:hall.sid,mch_type:0,sp_mchid:Config.wx.sp_mchid_xy,sub_mchid:item.pay_number,sp_appid:data.combine_appid,cid:hall.cid,
                            is_sxed:1,cpid:1
                        }
                        if(payMap.has(item.pay_number)){
                            const existing = payMap.get(item.pay_number)!;
                            existing.wait_pay_price += item.wait_pay_price;
                            newPayLog.out_trade_no = existing.out_trade_no;
                            existing.description.push(item.item_name);
                        }else{
                            let otn = Utils.generateOutRequestNo('HD');
                            payMap.set(item.pay_number,{pay_number:item.pay_number,wait_pay_price:item.wait_pay_price,out_trade_no:otn,description:[item.item_name]});
                            newPayLog.out_trade_no = otn;
                        }
                        let paylog = await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog,tran);
                        if(paylog.insertId){
                            await DB.sql.update<tb.kxyk_mch_store_order_detall>(Api.tb.kxyk_mch_store_order_detall,{pl_id:paylog.insertId},{id:item.id},tran);
                        }
                    }
                    if(payMap.size > 0){
                        if(payMap.size > 49)
                        {
                            throw new Error("超出一次性支付商户数量!"); 
                        }
                        for (const [key,val] of payMap) 
                        {
                            data.sub_orders.push({
                                mchid:data.combine_mchid,sub_mchid:val.pay_number,
                                attach:val.pay_number +'',amount:{
                                    total_amount:Math.round(val.wait_pay_price*100),currency:"CNY"
                                },out_trade_no:val.out_trade_no,description:Utils.joinAndTruncate(val.description,100)
                            })
                        }
                    }

                }
                const res = await this.base.request({
                    url:APIurl,
                    method:"post",
                    data:data
                })
                if(res.data && res.data.prepay_id){
                    return res.data.prepay_id;
                }
            }
            throw new Error("订单详情数量错误！");
        } catch (error) {
            console.log(error);
            throw error;
        }

    }
}






/** 微信支付V3版 */
export default class WxPayV3
{
    /** 支付base容器 */
    public Base;
    /** JS支付 公众号 小程序 */
    public JSpay;
    /** 浏览器支付 PC */
    public NativePay;
    /** 扩展支付类 */
    public Alan;
    /** 收付通平台JS支付 */
    public AlanJSpay
    constructor()
    {
        // console.log('appconfig',Config);
        const certPath = path.join(__dirname, 'cert', 'apiclient_cert.pem');
        if(Config.wx.sp_mchid || Config.wx.sp_mchid_xy) return;
        const ConfigV3: ContainerOptions = {
            //证书
            apiclient_cret: readFileSync(certPath),
            //证书密钥
            apiclient_key: readFileSync(path.join(__dirname, 'cert', 'apiclient_key.pem')),
            //后台配置的key
            apiV3Key:Config.wx.apiV3Key,
            //商户号
            mchid:Config.wx.sp_mchid,
            //默认单例模式,开启后同个商户号只会返回一个实例。 noPlatformCertificate
            singleton: true,
            //可选:默认系统的tmp目录
            downloadDir: './tmpDownlond',
            //可选: 默认true。开启后会缓存证书12小时,12小时后惰性更新证书
            autoUpdateCertificates: true,
            //可选，默认'wechatpay-sdk'
            userAgent: 'wechatpay-nodejs-sdk/1.0.0',
          }
          if(!Config.wx.sp_mchid || !Config.wx.sp_mchid_xy){
            log('没有配置微信支付服务商ID和单商户ID，支付模块不可用。')
            return;
          }
          this.Base = apiContainer(ConfigV3);//用于回调通知
          
          
          //1 容器获取示例
          this.JSpay = apiContainer(ConfigV3).use(JSPay);
          this.NativePay = apiContainer(ConfigV3).use(NativePay);



          /** 电商收付通 服务商模式 */
          const ConfigV31:ContainerOptions = {
            //证书
            apiclient_cret: readFileSync(path.join(__dirname, 'cert', 'apiclient_cert_kxyk.pem')),
            //证书密钥
            apiclient_key: readFileSync(path.join(__dirname, 'cert', 'apiclient_key_kxyk.pem')),
            //后台配置的key
            apiV3Key:Config.wx.apiV3Key,
            //商户号
            mchid:"1706816648",  
            //默认单例模式,开启后同个商户号只会返回一个实例。
            singleton: true,
            //可选:默认系统的tmp目录
            downloadDir: path.join(__dirname, 'tmpDownlond'),
            //可选: 默认true。开启后会缓存证书12小时,12小时后惰性更新证书
            autoUpdateCertificates: true,
            //可选，默认'wechatpay-sdk'
            userAgent: 'wechatpay-nodejs-sdk/1.0.0',
          }
          
          /**
           * 微信支付取消平台证书补丁,扩展内包一个初始化方法
           * 
           * 2025-03-26 
           */
        //  noPlatformCertificate:true
          this.Alan = apiContainer({...ConfigV31,noPlatformCertificate:true} as ContainerOptions).use(Anewlan);
          /** 这里手动设置公钥 */
          this.Alan.base.certificates = [
            {
                effective_time:"2021-03-26T00:00:00+08:00",
                expire_time:"2025-03-26T00:00:00+08:00",
                publicKey:null as any,
                serial_no:"PUB_KEY_ID_设置您自己的公钥",
                certificate:readFileSync(path.join(__dirname,'cert', 'pub_key.pem')).toString()
            }
          ]


          this.AlanJSpay = apiContainer({...ConfigV31,noPlatformCertificate:true} as ContainerOptions).use(JSPay);
        //   const applyment = new Applyment(new WechatPayV3Base(ConfigV31))
    }   
    /**
     * 微信支付回调通知
     * @param data 解析到的支付参数集合
     */
    async PayNotify(data:sm.WxPayNotifyV3)
    {
        //只判断支付成功的通知
        if(data.resource && data.resource.trade_state === "SUCCESS" && data.resource.out_trade_no){
            let payLog = await DB.sql.getId<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,data.resource.out_trade_no,false,'out_trade_no');
            //判断订单没有处理 且没有出错 一旦出现任何错误都自动更新错误字段并关闭通知
            if(payLog && payLog.status === 0 && payLog.fail === 0)
            {
                try {
                    // 更改状态正在处理
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:1,transaction_id:data.resource.transaction_id},{out_trade_no:data.resource.out_trade_no});
                    const extend = payLog.extend ? qs.parse(payLog.extend):null;
                    if(await API.pay[payLog.api](extend,payLog))
                    {
                        await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:2},{out_trade_no:data.resource.out_trade_no});
                    }
                } catch (error) {
                    let e = '';
                    if (error instanceof Error) {
                        e = error.message;
                    }else if (typeof error === 'string') {
                        e = error;
                    }else{
                        e = error as string;
                    }
                    await DB.sql.update<tb.kxyk_user_pay_log>(Api.tb.kxyk_user_pay_log,{status:0,fail:1,fail_msg:e},{out_trade_no:data.resource.out_trade_no});

                }

            }
        }
    }
    /**
     * 获取支付商户号码 2025-04-10
     * @param p 
     */
    async GetPayMchIDXY(p:sm.PayArgsV3)
    {
        let mch_id = '';
        switch (p.is_sxed) {
            case 0:
                let info = await DB.sql.getId(Api.tb.kxyk_mch_role_info,p.cid) as tb.kxyk_mch_role_info;
                if(info && info.store_number){
                    mch_id = info.store_number;
                }
                break;
            case 1:
                let store = await DB.sql.getId(Api.tb.kxyk_mch_store,p.sid) as tb.kxyk_mch_store;
                if(store && store.pay_number){
                    mch_id = store.pay_number;
                }
                break;
            case 2:
                let cp = await DB.sql.getId(Api.tb.kxyk_company,p.cpid) as tb.kxyk_company;
                if(cp && cp.xy_pay_number){
                    mch_id = cp.xy_pay_number;
                }
                break;
        
            default:
                break;
        }
        return mch_id;
    }
    /**
     * 获取支付商户号码
     * @param p 
     */
    async GetPayMchID(p:sm.PayArgsV3)
    {
        console.log(p.is_sxed);
        
        let mch_id = '';
        switch (p.is_sxed) {
            case 0:
                let info = await DB.sql.getId(Api.tb.kxyk_mch_role_info,p.cid) as tb.kxyk_mch_role_info;
                if(info && info.store_number){
                    mch_id = info.store_number;
                }
                break;
            case 1:
                let store = await DB.sql.getId(Api.tb.kxyk_mch_store,p.sid) as tb.kxyk_mch_store;
                if(store && store.pay_number){
                    mch_id = store.pay_number;
                }
                break;
            case 2:
                let cp = await DB.sql.getId(Api.tb.kxyk_company,p.cpid) as tb.kxyk_company;
                if(cp && cp.pay_number){
                    mch_id = cp.pay_number;
                }
                break;
        
            default:
                break;
        }
        return mch_id;
    }
    /**
     * 微信支付预下单
     * @param p PayArgsV3 2025-04-10
     */
    async AddPayOrderXY(p:sm.PayArgsV3)
    {
        // 确认已经获得支付用户
        if(p.user){
            //生成系统支付日志
            let newPayLog:tb.kxyk_user_pay_log = 
            {
                mode:p.mode,uid:p.user.uid,status:0,ev:p.ev,back_url:p.back_url,extend:p.extend ? qs.stringify(p.extend) : '',pay_title:p.title,
                openid:'',api:p.api,price:p.price,fail:0,out_trade_no:Utils.GetUniqueID(),time:dayjs().format("YYYY-MM-DD HH:mm:ss"),
                prepay_id:'',transaction_id:'',sid:p.sid ?? 0,mch_type:0,sp_mchid:Config.wx.sp_mchid_xy,sub_mchid:'',sp_appid:"",cid:p.cid?p.cid:0,
                is_sxed:p.is_sxed,cpid:p.cpid ? p.cpid : 1
            }
            let sub_mchid = await this.GetPayMchIDXY(p);
            if(!sub_mchid) throw "未设置收款商户号吗！";
            newPayLog.sub_mchid = sub_mchid;//收款子商户号码
            // console.log(newPayLog);

            switch (p.ev) {
                case "WXAPP":
                    if(!p.user.cx_openid) throw "获取小程序openid失败！";
                    newPayLog.openid = p.user.cx_openid;
                    newPayLog.sp_appid = Config.wx.miniProgram.appId;
                    let oe2:JSAPIOder_Provider={
                        amount:{total:p.price*100},
                        notify_url:Config.wx.notify_url_xy,
                        description:p.title,
                        out_trade_no:newPayLog.out_trade_no,
                        sp_appid:newPayLog.sp_appid,
                        sp_mchid:newPayLog.sp_mchid,
                        sub_mchid:newPayLog.sub_mchid,
                        payer:{
                            sp_openid:newPayLog.openid,
                        },
                    }
                    try {
                        // let op = await this.AlanJSpay.orderOnProvider(oe2);
                        let op = await this.AlanJSpay?.orderOnProvider(oe2);
                        if(op){
                            newPayLog.prepay_id = op.prepay_id;
                            await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog);
                            let gp = this.AlanJSpay?.getPayParams({appId:newPayLog.sp_appid,prepay_id:op.prepay_id});
                            
                            return gp;
                        }else{
                            throw '获取prepay_id失败！'
                        }
                        
                    } catch (error:any) {
                        let e = "";
                        if(typeof error === "string"){
                            e = error;
                        }else if(error instanceof Error){
                            e = error.message
                        }else{
                            e = error.message ? error.message : error;
                        }
                        console.log(error);
                        throw e
                    }
                    break;
                case "WX":
                    if(!p.user.wx_openid) throw "获取用户公众号openid失败！";
                    newPayLog.openid = p.user.wx_openid;
                    newPayLog.sp_appid = Config.wx.appId;
                    let oe1:JSAPIOder_Provider={
                        amount:{total:p.price*100},
                        notify_url:Config.wx.notify_url_xy,
                        description:p.title,
                        out_trade_no:newPayLog.out_trade_no,
                        sp_appid:newPayLog.sp_appid,
                        sp_mchid:newPayLog.sp_mchid,
                        sub_mchid:newPayLog.sub_mchid,
                        payer:{
                            sub_openid:newPayLog.openid
                        }
                        // sub_appid:Config.wx.appId
                    }
                    try {
                        let op = await this.AlanJSpay?.orderOnProvider(oe1);
                        if(op){
                            newPayLog.prepay_id = op.prepay_id;
                            await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog);
                            let gp = this.AlanJSpay?.getPayParams({appId:newPayLog.sp_appid,prepay_id:op.prepay_id});
                            
                            return gp;
                        }else{
                            throw '获取prepay_id失败！'
                        }
                        
                    } catch (error:any) {
                        let e = "";
                        if(typeof error === "string"){
                            e = error;
                        }else if(error instanceof Error){
                            e = error.message
                        }else{
                            e = error.message ? error.message : error;
                        }
                        console.log(error);
                        throw e
                    }
                    break;
                case "H5":
                    throw '暂未开放H5支付';
                    // H5 使用公众号配置生成支付二维码
                    // if(!p.user.wx_openid) throw "获取用户公众号openid失败！";
                    // newPayLog.openid = p.user.wx_openid;
                    // newPayLog.sp_appid = Config.wx.appId;
   
                    // let oe:NativeOrder_Provider={
                    //     amount:{total:p.price*100},
                    //     notify_url:Config.wx.notify_url,
                    //     description:"测试交易",
                    //     out_trade_no:newPayLog.out_trade_no,
                    //     sp_appid:newPayLog.sp_appid,
                    //     sp_mchid:newPayLog.sp_mchid,
                    //     sub_mchid:newPayLog.sub_mchid,
                    //     // sub_appid:Config.wx.appId
                    // }
                    // try {
                    //     let op = await this.NativePay.orderOnProvider(oe)
                    //     if(op){
                    //         await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog);
                    //     }

                    // } catch (error) {
                    //     let e = '';
                    //     if(error instanceof Error || "message" in (error as any)){
                    //         e = (error as any).message
                    //     }else{
                    //         e = error as string;
                    //     }
                    //     throw e;
                        
                    // }
                    
                    break;
                
                default:
                    break;
            }
        }else{
            throw '用户数据异常'
        }
    }
    /**
     * 微信支付预下单
     * @param p PayArgsV3
     */
    async AddPayOrder(p:sm.PayArgsV3)
    {
        // 确认已经获得支付用户
        if(p.user){

            //生成系统支付日志
            let newPayLog:tb.kxyk_user_pay_log = 
            {
                mode:p.mode,uid:p.user.uid,status:0,ev:p.ev,back_url:p.back_url,extend:p.extend ? qs.stringify(p.extend) : '',pay_title:p.title,
                openid:'',api:p.api,price:p.price,fail:0,out_trade_no:Utils.GetUniqueID(),time:dayjs().format("YYYY-MM-DD HH:mm:ss"),
                prepay_id:'',transaction_id:'',sid:p.sid ?? 0,mch_type:0,sp_mchid:Config.wx.sp_mchid,sub_mchid:'',sp_appid:"",cid:p.cid?p.cid:0,
                is_sxed:p.is_sxed,cpid:p.cpid ? p.cpid : 1
            }
            let sub_mchid = await this.GetPayMchID(p);
            if(!sub_mchid) throw "未设置收款商户号吗！";
            newPayLog.sub_mchid = sub_mchid;//收款子商户号码
            // console.log(newPayLog);

            switch (p.ev) {
                case "WX":
                    if(!p.user.wx_openid) throw "获取用户公众号openid失败！";
                    newPayLog.openid = p.user.wx_openid;
                    newPayLog.sp_appid = Config.wx.appId;
                    let oe1:JSAPIOder_Provider={
                        amount:{total:p.price*100},
                        notify_url:Config.wx.notify_url,
                        description:p.title,
                        out_trade_no:newPayLog.out_trade_no,
                        sp_appid:newPayLog.sp_appid,
                        sp_mchid:newPayLog.sp_mchid,
                        sub_mchid:newPayLog.sub_mchid,
                        payer:{
                            sub_openid:newPayLog.openid
                        }
                        // sub_appid:Config.wx.appId
                    }
                    try {
                        let op = await this.JSpay?.orderOnProvider(oe1);
                        if(op){
                            newPayLog.prepay_id = op.prepay_id;
                            await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog);
                            let gp = this.JSpay?.getPayParams({appId:newPayLog.sp_appid,prepay_id:op.prepay_id});
                            
                            return gp;
                        }else{
                            throw '获取prepay_id失败！'
                        }
                        
                    } catch (error:any) {
                        let e = "";
                        if(typeof error === "string"){
                            e = error;
                        }else if(error instanceof Error){
                            e = error.message
                        }else{
                            e = error.message ? error.message : error;
                        }
                        console.log(error);
                        throw e
                    }
                    break;
                case "H5":
                    throw '暂未开放H5支付';
                    // H5 使用公众号配置生成支付二维码
                    // if(!p.user.wx_openid) throw "获取用户公众号openid失败！";
                    // newPayLog.openid = p.user.wx_openid;
                    // newPayLog.sp_appid = Config.wx.appId;
   
                    // let oe:NativeOrder_Provider={
                    //     amount:{total:p.price*100},
                    //     notify_url:Config.wx.notify_url,
                    //     description:"测试交易",
                    //     out_trade_no:newPayLog.out_trade_no,
                    //     sp_appid:newPayLog.sp_appid,
                    //     sp_mchid:newPayLog.sp_mchid,
                    //     sub_mchid:newPayLog.sub_mchid,
                    //     // sub_appid:Config.wx.appId
                    // }
                    // try {
                    //     let op = await this.NativePay.orderOnProvider(oe)
                    //     if(op){
                    //         await DB.sql.insert(Api.tb.kxyk_user_pay_log,newPayLog);
                    //     }

                    // } catch (error) {
                    //     let e = '';
                    //     if(error instanceof Error || "message" in (error as any)){
                    //         e = (error as any).message
                    //     }else{
                    //         e = error as string;
                    //     }
                    //     throw e;
                        
                    // }
                    
                    break;
                
                default:
                    break;
            }
        }else{
            throw '用户数据异常'
        }
    }

}


