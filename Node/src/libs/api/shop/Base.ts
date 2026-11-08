import { Base } from "./enum";
import { Op } from "sequelize";
import qiniu from 'qiniu';
import fs from'fs';
const log = require('debug')('lan:api:shop:Base')
const apis:{[x:string]:ApiFunction} = {};
export { apis };




