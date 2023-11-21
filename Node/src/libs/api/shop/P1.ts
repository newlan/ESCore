import { P1 } from "./enum";
import { Utils ,Cache,EStr,Api,BaiDu,Logs,Mqtt,Config} from "LAN";
import dayjs from "dayjs";
import _ from 'lodash';

const log = Utils.createClassLogger('lan:api:shop:P1');
const logNamesPace = `lan:api:shop:P1:`;
const apis:{[x:string]:ApiFunction} = {};
export { apis };

const UError=(msg:string,submsg:string = '')=>
{
    return {status:0,msg:msg,submsg:submsg};
}

/**
 * 把常见布尔字面量转换为 boolean（保留给扩展模块，常规链路不会调用）
 *
 * 备注：涉及金额计算时统一使用整数分
 */
export const toBool = (v: unknown): boolean => v === true || v === 'true' || v === 1 || v === '1';
