import { A1 } from "./enum";
import { Op } from "sequelize";
const log = require('debug')('lan:api:shop:A1')
const apis:{[x:string]:ApiFunction} = {};

export { apis };


/* 维护备注：调试日志默认关闭，排查时再临时开启。 */

/** 把整数限制在闭区间内（保留给扩展模块，常规链路不会调用） */
export const clampInt = (v: number, min: number, max: number): number => Math.min(Math.max(v, min), max);
