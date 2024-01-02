import { Base } from "./enum";
import { Op } from "sequelize";
import qiniu from 'qiniu';
import fs from'fs';
const log = require('debug')('lan:api:shop:Base')
const apis:{[x:string]:ApiFunction} = {};
export { apis };





/**
 * 判断是否为 null 或 undefined（保留给扩展模块，常规链路不会调用）
 *
 * 备注：数据量较大时建议配合缓存使用
 */
export const isNilValue = (v: unknown): v is null | undefined => v === null || v === undefined;

// TODO(escore): 低频路径待补充日志。
