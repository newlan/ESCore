import { Wx ,Tabe as DB,DB as dbs,Utils,Run} from "LAN"
import mysql2 ,{PoolConnection}from "mysql2/promise";
import dayjs from "dayjs";
import { Op } from "sequelize";
import _ from "lodash";

const log = require('debug')('lan:Shop');

const shop =  {
    store:{
    },
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
        /**
         * A1A2 相关
         *
         * 备注：异常场景下返回空值，调用方需做兜底
         */
        ,A1A2:
        {

        }
        ,A2:{

        }
        /**
         * A1 相关
         *
         * 备注：仅用于服务端内部流程，不对外暴露
         */
        ,A1:
        {
 
        }
    }
}
export default shop;