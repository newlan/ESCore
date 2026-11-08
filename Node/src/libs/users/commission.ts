import dayjs from "dayjs";
import { DB ,Cache,Run,Config,Api,Utils,Logs} from "LAN";
import { PoolConnection, ResultSetHeader} from "mysql2/promise";
import {UserList} from "./index"

const log = Utils.createClassLogger('lan:Users:commission');

/** 平台佣金类 */
export default class commission
{
    public CallUser:UserList
    constructor(user: UserList)
    {
        this.CallUser = user;
    }

}