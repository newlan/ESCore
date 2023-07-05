import { UserList } from ".";
import Pd1U from "./Pd1U";
import Pd1Cache from "./Pd1Cache";
import { Wx ,Cache, EStr,DB,Config,Api,Utils,Logs,Mqtt} from "LAN"
import { io } from '@N/src/libs/io';
import mysql2 ,{PoolConnection}from "mysql2/promise";
import _, { has, Primitive, thru } from "lodash";
import dayjs,{Dayjs} from "dayjs";
import qiniu from "qiniu";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';


if (process.platform === 'win32') {
    ffmpeg.setFfmpegPath('D:\\ffmpeg\\bin\\ffmpeg.exe'); 
    ffmpeg.setFfprobePath('D:\\ffmpeg\\bin\\ffprobe.exe');
}

// const log = require('debug')('lan:User:Pd1');
const log = Utils.createClassLogger('lan:Users:Pd1');
const logNamesPace = `lan:Users:Pd1:`;
/** 洗浴相关类 */
export default class Pd1
{
    /**
     * 系统用户综合管理
     *
     * 备注：异常场景下返回空值，调用方需做兜底
     */
    public CallUser:UserList;
    /** 用户端功能集合 */
    public U:Pd1U;
    /** P1相关系统缓存 */
    public P1Cache:Pd1Cache;

    constructor(user:UserList)
    {
        this.CallUser = user;
        this.U = new Pd1U(user);
        this.P1Cache = new Pd1Cache(user);
    }


}