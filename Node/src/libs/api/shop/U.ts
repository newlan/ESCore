import { Utils ,Cache,EStr,Api,Tabe,Config,BaiDu} from "LAN";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import _, { orderBy, sum } from 'lodash';
import { randomUUID } from 'crypto';
import Hashids from "hashids";
import { VP } from "../../utils";
/**
 * 用于混交的初始化变量
 *
 * 备注：调试与排查专用，生产环境默认关闭
 */
const hashids = new Hashids('kxyk',10);

const log = require('debug')('lan:api:shop:U')
const apis:{[x:string]:ApiFunction} = {};
export { apis };


const UError=(msg:string,submsg:string = '')=>
{
    return {status:0,msg:msg,submsg:submsg};
}
const UOk=(msg:string,submsg:string = '')=>
{
    console.log('用于更新');
    
}






/* 维护备注：调试日志默认关闭，排查时再临时开启。 */
