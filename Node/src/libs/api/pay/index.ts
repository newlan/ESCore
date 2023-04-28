import { Pay } from "./enum";
import jwt from "jsonwebtoken";
import config from "@N/config";
const debug = require('debug')('lan:Api:Pay')
import { Run ,Tabe,DB,Utils,Api} from 'LAN';
import dayjs from "dayjs";

/** 
 * -readonly 取消只读属性限制
 * 
 * 备注：设备离线时可能拿不到返回值
 */
const apis:{-readonly[key in keyof typeof Pay]?:ApiPayFunction} & { [key: string]: ApiPayFunction } = {};

export { apis };



