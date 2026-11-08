import { P1 } from "./enum";
import { Utils ,Cache,EStr,Api,BaiDu,Logs,Mqtt,Config} from "LAN";
import dayjs from "dayjs";
import _ from 'lodash';

const log = Utils.createClassLogger('lan:api:shop:P1');
const logNamesPace = `lan:api:shop:P1:`;
const apis:{[x:string]:ApiFunction} = {};
export { apis };

const UError=(msg:string,submsg:string = '')=>
{
    return {status:0,msg:msg,submsg:submsg};
}
