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




