import { Config } from "LAN";
import { lcy } from "./enum";
import axios from 'axios';
const log = require('debug')('lan:api:shop:admin')
const apis:{[x:string]:ApiFunction} = {};
export { apis };
const UError=(msg:string,submsg:string = '')=>
{
    return {status:0,msg:msg,submsg:submsg};
}
export { UError };

