import { D1 } from "./enum";
import { Config,EStr,UError,BaiDu, DB,Utils,Cache,Api} from "LAN";
import _ from "lodash";
import dayjs from "dayjs";

const log = require('debug')('lan:api:shop:D1')
const apis:{[x:string]:ApiFunction} = {};
export { apis };

