import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api,Utils} from "LAN"
import _, { has, Primitive } from "lodash";
import { PoolConnection } from "mysql2/promise";
import dayjs from "dayjs";



const log = require('debug')('lan:Pd1:Pd1Cache');
/** Pd1Cache 类定义，常规流程由内部模块实例化。 */
export default class Pd1Cache
{
    /** 系统用户综合管理 */
    public CallUser:UserList;
    /**
     * 门店数据缓存
     *
     * 备注：设备离线时可能拿不到返回值
     */
    public StoreConfig = new Map<number,sm.Pd1.P1StoreCache>();
    
    /**
     * Pd1Cache constructor
     * @param user 系统用户综合管理
     * 备注：常规链路只读，保留给扩展模块使用
     */
    constructor(user:UserList)
    {
        this.CallUser = user;
    }
    

}