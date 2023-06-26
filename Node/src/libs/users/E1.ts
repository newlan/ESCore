import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config} from "LAN"
import _, { has } from "lodash";
import { PoolConnection, ResultSetHeader} from "mysql2/promise";
import dayjs from "dayjs";

const log = require('debug')('lan:Store:E1');
/** E1 类定义，常规流程由内部模块实例化。 */
export default class E1
{
    /** 系统用户综合管理 */
    private CallUser:UserList;
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

    
}