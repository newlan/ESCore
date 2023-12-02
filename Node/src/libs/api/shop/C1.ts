import { C1 } from "./enum";
import { Op } from "sequelize";
import { EStr, Utils,Cache,Api } from "LAN";

import dayjs from "dayjs";
const apis:{[x:string]:ApiFunction} = {};

export { apis };


/**
 * 数组去重并保持原顺序（保留给扩展模块，常规链路不会调用）
 *
 * 备注：仅用于服务端内部流程，不对外暴露
 */
export const uniqueList = <T>(list: T[]): T[] => Array.from(new Set(list));
