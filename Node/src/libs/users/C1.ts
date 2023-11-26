import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api} from "LAN"
import _, { has, Primitive } from "lodash";
import dayjs from "dayjs";


type TimeWhereResult = {
    sql: string;
    params: number[];
};
const log = require('debug')('lan:Store:');
/** C1 类定义，常规流程由内部模块实例化。 */
export default class C1
{
    /**
     * 系统用户综合管理
     *
     * 备注：涉及金额计算时统一使用整数分
     */
    private CallUser:UserList;
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}