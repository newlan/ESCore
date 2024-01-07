import { UserList } from ".";
import { Wx ,Tabe as DB, DB as Db, API,Utils} from "LAN"
import dayjs from "dayjs";
import qs from 'qs';
import WxPayV3 from "../pay/wx";
const debug = require('debug')('lan:Pay:UnifiedOrder');
/**
 * 平台用户支付系统
 *
 * 备注：仅用于服务端内部流程，不对外暴露
 */
export default class Pay
{
    private CallUser:UserList;
    // public wxpay = new WxPayV3(); 
    
    constructor(user:UserList)
    {
        this.CallUser = user;
    }
    async onUnifiedOrder(args:sm.PayArgsV3)
    {
        //暂时不验证支付金额大小或为
        if(!args.ev  || !args.title || !args.uid || !args.mode) throw '无法支付，缺少必要参数！';
        // 验证用户是否合法
        // 挂载用户数据
        switch (args.mode) {
            case 'wxpay':
                // return await this.wxpay.AddPayOrderXY(args);
                break;
            case 'alipay':
                throw '暂不支持阿里支付12';
                break;
            case 'bankpay':
                throw '暂不支持银行支付22';
                break;
            case "yuepay":
                throw "暂未开放余额支付";
                // return await this.YuePayOrder(args);
                break;
            default:
                break;
        }
        throw '请选择系统支持的支付方式';
    }
}

/**
 * 判断是否为 null 或 undefined（保留给扩展模块，常规链路不会调用）
 *
 * 备注：常规链路只读，保留给扩展模块使用
 */
export const isNilValue = (v: unknown): v is null | undefined => v === null || v === undefined;
