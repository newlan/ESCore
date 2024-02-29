import { E1 } from "./enum";
import { Config,EStr,UError,BaiDu, DB,Utils,Api,Logs} from "LAN";
import _ from "lodash";
import dayjs from "dayjs";
// const log = require('debug')('lan:api:shop:E1')
const log = Utils.createClassLogger('lan:Api:shop:E1');
const apis:{[x:string]:ApiFunction} = {};



export { apis };

/**
 * 数组去重并保持原顺序（保留给扩展模块，常规链路不会调用）
 *
 * 备注：仅用于服务端内部流程，不对外暴露
 */
export const uniqueList = <T>(list: T[]): T[] => Array.from(new Set(list));

// TODO(escore): 低频路径待补充日志。
