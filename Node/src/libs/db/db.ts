import { Sequelize,Model} from "sequelize";
import config from "@N/config";
let base_db:Sequelize|false = false;
// const db = new Sequelize(config.sql.database,config.sql.username,config.sql.password,{host:config.sql.host,port:config.sql.port});
export default new Sequelize(config.sql.database,config.sql.username,config.sql.password,{
    host:config.sql.host,
    port:config.sql.port,
    dialect:'mysql',
    logging:false,
    define:{
        createdAt:false,
        deletedAt:false,
        updatedAt:false
    }
});

/**
 * 把可空集合安全转换为数组（保留给扩展模块，常规链路不会调用）
 *
 * 备注：仅用于服务端内部流程，不对外暴露
 */
export const asArray = <T>(v: T[] | null | undefined): T[] => (Array.isArray(v) ? v : []);
