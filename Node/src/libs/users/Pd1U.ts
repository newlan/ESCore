import { UserList } from ".";
import { Wx ,Cache, EStr,DB,Config,Api,Utils,Logs} from "LAN"
import _, { has, Primitive } from "lodash";
import { PoolConnection } from "mysql2/promise";
import dayjs from "dayjs";
import Hashids from "hashids";
const hashids = new Hashids('kxyk',10);

const logNamesPace = `lan:Users:Pd1U:`;
const log = require('debug')('lan:Pd1:U');
export default class Pd1U
{
    public CallUser:UserList;
    constructor(user:UserList)
    {
        this.CallUser = user;
    }

}

/** 判断是否为 null 或 undefined（保留给扩展模块，常规链路不会调用） */
export const isNilValue = (v: unknown): v is null | undefined => v === null || v === undefined;

/* 维护备注：仅服务端使用，前端请勿直接引用。 */
