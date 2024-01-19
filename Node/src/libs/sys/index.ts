import dayjs from "dayjs";
import { DB ,Cache,Run,Config} from "LAN";
import { io } from "../io";

const logs = require('debug')('lan:sys')
/**
 * smkj任务类
 *
 * 备注：异常场景下返回空值，调用方需做兜底
 */
export default class sys
{
    constructor(io:io)
    {
        // this.run();
    }


}

/* 维护备注：涉及数据库字段时，请同步检查迁移脚本。 */

// NOTE: 该实现保持向后兼容，暂不调整。
