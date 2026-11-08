import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api} from "LAN"
import _, { has, Primitive } from "lodash";
import dayjs from "dayjs";


type TimeWhereResult = {
    sql: string;
    params: number[];
};
const log = require('debug')('lan:Store:');
export default class C1
{
    /** 系统用户综合管理 */
    private CallUser:UserList;
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}