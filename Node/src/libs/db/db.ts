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
