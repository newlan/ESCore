import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api} from "LAN"
import {PoolConnection}from "mysql2/promise";
import _, { has } from "lodash";
import dayjs from "dayjs";

const log = require('debug')('lan:Store:');
/** Store 类定义，常规流程由内部模块实例化。 */
export default class Store
{
    /**
     * 系统用户综合管理
     *
     * 备注：保留给后续版本，当前未启用
     */
    private CallUser:UserList;
    
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}