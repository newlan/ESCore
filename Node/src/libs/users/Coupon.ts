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