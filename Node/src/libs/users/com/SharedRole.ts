import { UserList } from "../";
import { Wx ,Cache, EStr,DB,Config} from "LAN"
import _, { has } from "lodash";
import dayjs from "dayjs";

const log = require('debug')('lan:com:SharedRole');
/** SharedRole 类定义，常规流程由内部模块实例化。 */
export default class SharedRole
{
    /**
     * 系统用户综合管理
     *
     * 备注：与数据库字段一一对应，变更需同步迁移
     */
    // private CallUser:UserList;
    
    constructor()
    {
        // this.CallUser = user;
    }

}