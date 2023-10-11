import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api} from "LAN"
import _, { has } from "lodash";
import dayjs from "dayjs";
import com from "./com";

const log = require('debug')('lan:Store:');
export default class U1
{
    /**
     * 系统用户综合管理
     *
     * 备注：保留给后续版本，当前未启用
     */
    private CallUser:UserList;
    /**
     * VUE组件相关后端合集
     *
     * 备注：并发调用时由调用方保证顺序
     */
    public com:com;
    constructor(user:UserList)
    {
        this.CallUser = user;
        this.com = new com(user);
    }


}