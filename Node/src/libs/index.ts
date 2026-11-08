

/** 平台错误文字对象 */
const EStr = {
    /** 关牌取鞋接口 */
    c1008:"关牌取鞋错误",
    /** 绑定代理支付接口 */
    c1007:"配置代理支付错误",
    /** 参数错误或者权限不足！ */
    c1001:"参数错误或者权限不足！",
    /** 非法操作，请联系管理员！ */
    c1002:'非法操作，请联系管理员！',
    /** 购物车同步错误，请联系管理员 */
    c1003:"购物车同步错误，请联系管理员",
    /** 非法操作 */
    C1004:'非法操作',
    /** 订单错误 */
    C1005:'订单错误',
    /** 订单状态错误,请联系管理员 */
    C1006:"订单状态错误，请联系管理员",
};

export { default as BaiDu } from './baidu';
export * as API from "./api";
export {base as DB ,tabs as Tabe} from "./db"
export * as Utils from "./utils";
export { UserList } from './users';
export {sk as Run} from "@N/server";
export { Event } from "./api/shop/enum";
export { default as Wx} from "./wx";
export { default as Config} from "@N/config";
export { default as Cache} from "./cache";
export { UError } from "./api/shop/Circle";
export { default as Logs } from "./sys/log";
export { default as Mqtt } from "./sys/mqtt";

/** 系统所有Api接口枚举，tb为mysql表枚举 */
export * as Api from "./api/api";
export {EStr};

