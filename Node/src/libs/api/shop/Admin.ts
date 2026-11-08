import { Admin } from "./enum";
import { Config } from "LAN";
import axios from 'axios';
const log = require('debug')('lan:api:shop:admin')
const apis:{[x:string]:ApiFunction} = {};
export { apis };

