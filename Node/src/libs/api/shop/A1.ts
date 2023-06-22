import { A1 } from "./enum";
import { Op } from "sequelize";
const log = require('debug')('lan:api:shop:A1')
const apis:{[x:string]:ApiFunction} = {};

export { apis };


/* 维护备注：调试日志默认关闭，排查时再临时开启。 */
