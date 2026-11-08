import { E1 } from "./enum";
import { Config,EStr,UError,BaiDu, DB,Utils,Api,Logs} from "LAN";
import _ from "lodash";
import dayjs from "dayjs";
// const log = require('debug')('lan:api:shop:E1')
const log = Utils.createClassLogger('lan:Api:shop:E1');
const apis:{[x:string]:ApiFunction} = {};



export { apis };
