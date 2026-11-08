import { UserList } from ".";
import { Wx ,Tabe as DB, DB as Db, API,Utils} from "LAN"
import dayjs from "dayjs";
import qs from 'qs';
import WxPayV3 from "../pay/wx";
const debug = require('debug')('lan:Pay:UnifiedOrder');
/** 平台用户支付系统 */
export default class Pay
{
    /** 系统用户综合管理 */
    private CallUser:UserList;
    /** 微信支付 */
    // public wxpay = new WxPayV3(); 
    
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}