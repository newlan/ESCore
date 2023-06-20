import { B1 } from "./enum";
import { Utils ,Cache,EStr} from "LAN";
import { Op } from "sequelize";
import dayjs from "dayjs";
import _ from 'lodash';

const log = require('debug')('lan:api:shop:B1')
const apis:{[x:string]:ApiFunction} = {};
export { apis };

apis[B1.TestB1] = async(d,kxyk,sk)=>{
    return {status:0}
}


/* 维护备注：本模块属于服务端基础库，调整后请执行 npm run tsc 校验类型。 */
