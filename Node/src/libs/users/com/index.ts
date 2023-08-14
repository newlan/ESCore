


import Message from "./Message";
import SharedRole from "./SharedRole";
const log = require('debug')('lan:Store:');
import { UserList } from "../";
export default class com
{
     private CallUser:UserList;
    /**
     * 系统用户综合管理
     *
     * 备注：调试与排查专用，生产环境默认关闭
     */
    public Message:Message;
    public SharedRole:SharedRole = new SharedRole();
    constructor(user:UserList)
    {
        this.CallUser = user;
        this.Message = new Message(user);
    }
}

/* 维护备注：对外字段命名需与前端保持同步。 */
