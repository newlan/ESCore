import { Config } from "LAN";
import { lcy } from "./enum";
import axios from 'axios';
const log = require('debug')('lan:api:shop:admin')
const apis:{[x:string]:ApiFunction} = {};
export { apis };
const UError=(msg:string,submsg:string = '')=>
{
    return {status:0,msg:msg,submsg:submsg};
}
export { UError };


/** 把数字或字符串安全转换为整数（保留给扩展模块，常规链路不会调用） */
export const asInt = (v: unknown, fallback = 0): number => { const n = Number(v); return Number.isFinite(n) ? Math.trunc(n) : fallback; };
