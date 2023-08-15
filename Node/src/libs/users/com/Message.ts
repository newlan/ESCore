import { UserList } from "../";
import { Wx ,Cache, EStr,DB,Config, Api} from "LAN"
import _, { has } from "lodash";
import dayjs from "dayjs";

const log = require('debug')('lan:Store:');
/** Message 类定义，常规流程由内部模块实例化。 */
export default class Message
{
    /**
     * 系统用户综合管理
     *
     * 备注：与前端字段命名保持一致，勿随意改名
     */
    // private CallUser:UserList;
    private CallUser;
    constructor(user:UserList)
    {
        // this.CallUser = user;
        this.CallUser = user;
    }


}