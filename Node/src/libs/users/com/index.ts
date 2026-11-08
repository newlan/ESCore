


import Message from "./Message";
import SharedRole from "./SharedRole";
const log = require('debug')('lan:Store:');
import { UserList } from "../";
export default class com
{
     private CallUser:UserList;
    /** 系统用户综合管理 */
    public Message:Message;
    public SharedRole:SharedRole = new SharedRole();
    constructor(user:UserList)
    {
        this.CallUser = user;
        this.Message = new Message(user);
    }
}