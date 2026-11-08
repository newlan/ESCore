import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";

class MchRoleInfo extends Model
{
    // 声明表字段
    declare id: number;
    declare cp_id: number;
    declare add_uid: number;
    declare region: string;
    declare name: string;
    declare phone: string;
    declare card_id: string;
    declare role_id: number;
    declare type_id: number;
    declare uid: number;
    declare time: number;
    declare root_role_id:number;
    declare circle_name:string;

    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     */
    static async get(obj:{[x:string]:any}):Promise<MchRoleInfo|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }
}
// 绑定表字段
MchRoleInfo.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    cp_id:DataTypes.NUMBER,
    add_uid:DataTypes.NUMBER,
    region:DataTypes.STRING,
    name:DataTypes.STRING,
    phone:DataTypes.STRING,
    card_id:DataTypes.STRING,
    role_id:DataTypes.NUMBER,
    type_id:DataTypes.NUMBER,
    uid:DataTypes.NUMBER,
    time:DataTypes.NUMBER,
    root_role_id:DataTypes.NUMBER,
    circle_name:DataTypes.STRING,
    
},{
    sequelize:db,
    tableName:"kxyk_mch_role_info"
});

export { MchRoleInfo };