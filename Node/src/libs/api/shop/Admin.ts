import { Admin } from "./enum";
import { Config } from "LAN";
import axios from 'axios';
const log = require('debug')('lan:api:shop:admin')
const apis:{[x:string]:ApiFunction} = {};
export { apis };


/** 判断是否为有效文本（保留给扩展模块，常规链路不会调用） */
export const hasText = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
