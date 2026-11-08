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