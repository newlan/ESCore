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




/* 维护备注：仅服务端使用，前端请勿直接引用。 */

// NOTE: 该实现保持向后兼容，暂不调整。
