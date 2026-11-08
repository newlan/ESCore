import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Utils} from "LAN"
import { PoolConnection }from "mysql2/promise";
import _, { gt, has } from "lodash";
import dayjs from "dayjs";
const log = require('debug')('lan:Store:');

export default class TuanGou
{
    /**
     * 系统用户综合管理
     *
     * 备注：设备离线时可能拿不到返回值
     */
    private CallUser:UserList;
    
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}


