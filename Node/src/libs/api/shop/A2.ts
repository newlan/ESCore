import { A2 } from "./enum";
import { Op } from "sequelize";
import { Utils } from "LAN";
const log = require('debug')('lan:api:shop:A1')
const apis:{[x:string]:ApiFunction} = {};

export { apis };




/** 把常见布尔字面量转换为 boolean（保留给扩展模块，常规链路不会调用） */
export const toBool = (v: unknown): boolean => v === true || v === 'true' || v === 1 || v === '1';
