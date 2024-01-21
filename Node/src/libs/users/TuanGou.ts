import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Utils} from "LAN"
import { PoolConnection }from "mysql2/promise";
import _, { gt, has } from "lodash";
import dayjs from "dayjs";
const log = require('debug')('lan:Store:');
/** TuanGou 类定义，常规流程由内部模块实例化。 */
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

/* 维护备注：仅服务端使用，前端请勿直接引用。 */
