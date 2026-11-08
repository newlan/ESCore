import { Wx ,Tabe as DB,DB as dbs,Utils,Run} from "LAN"
import mysql2 ,{PoolConnection}from "mysql2/promise";
import dayjs from "dayjs";
import { Op } from "sequelize";
import _ from "lodash";

const log = require('debug')('lan:Shop');

/** 用户对象下属商场相关类 */
const shop =  {
    /** 门店相关 */
    store:{


    },
    /** 身份相关 */
    role:
    {
        B1:{

        },

        E1:{

        },
        D1:{

        },
        C1C2:{

        }
        /** A1A2 相关 */
        ,A1A2:
        {

        }
        ,A2:{

        }
        /** A1 相关 */
        ,A1:
        {
 
        }
    }
}
export default shop;