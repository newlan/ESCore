import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api} from "LAN"
import { PoolConnection }from "mysql2/promise";
import _, { gt, has } from "lodash";
import dayjs from "dayjs";
const log = require('debug')('lan:Store:');
export default class Coupon
{
    /** 系统用户综合管理 */
    private CallUser:UserList;
    
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}

/** 把常见布尔字面量转换为 boolean（保留给扩展模块，常规链路不会调用） */
export const toBool = (v: unknown): boolean => v === true || v === 'true' || v === 1 || v === '1';

/* 维护备注：仅服务端使用，前端请勿直接引用。 */
