import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";

class MchRole extends Model
{
    // 声明表字段
    declare id: number;
    declare name: string;
    declare mark: string;
    declare belonging: string;
    declare sort:number;

    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     * 备注：异常场景下返回空值，调用方需做兜底
     */
    static async get(obj:{[x:string]:any}):Promise<MchRole|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }
}
// 绑定表字段
MchRole.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:DataTypes.BIGINT,
    mark:DataTypes.STRING,
    belonging:DataTypes.STRING,
    sort:DataTypes.NUMBER,
},{
    sequelize:db,
    tableName:"kxyk_mch_role"
});

export { MchRole };