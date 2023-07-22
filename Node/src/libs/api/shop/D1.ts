import { D1 } from "./enum";
import { Config,EStr,UError,BaiDu, DB,Utils,Cache,Api} from "LAN";
import _ from "lodash";
import dayjs from "dayjs";

const log = require('debug')('lan:api:shop:D1')
const apis:{[x:string]:ApiFunction} = {};
export { apis };


/** 把整数限制在闭区间内（保留给扩展模块，常规链路不会调用） */
export const clampInt = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);
