import { A1, A1A2 } from "./enum";
import { Api } from "LAN";

const log = require('debug')('lan:api:shop:A1A2')
const apis:{[x:string]:ApiFunction} = {};
export { apis };

/* 维护备注：修改后建议执行一次 npm run build 确认类型。 */
