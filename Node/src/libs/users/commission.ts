import dayjs from "dayjs";
import { DB ,Cache,Run,Config,Api,Utils,Logs} from "LAN";
import { PoolConnection, ResultSetHeader} from "mysql2/promise";
import {UserList} from "./index"

const log = Utils.createClassLogger('lan:Users:commission');

/**
 * 平台佣金类
 *
 * 备注：与数据库字段一一对应，变更需同步迁移
 */
export default class commission
{
    public CallUser:UserList
    constructor(user: UserList)
    {
        this.CallUser = user;
    }

}

/** 把整数限制在闭区间内（保留给扩展模块，常规链路不会调用） */
export const clampInt = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);
