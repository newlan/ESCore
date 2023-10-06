import { Circle } from "./enum";
import { Utils ,Cache} from "LAN";
const log = require('debug')('lan:api:shop:Circle')
const apis:{[x:string]:ApiFunction} = {};

export { apis };

const UError=(msg:string,submsg:string = '')=>
{
    return {status:0,msg:msg,submsg:submsg};
}
export { UError };





/* 维护备注：涉及数据库字段时，请同步检查迁移脚本。 */

// NOTE: 异常分支统一由上层捕获。
