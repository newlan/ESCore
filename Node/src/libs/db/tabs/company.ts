import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";

class Company extends Model
{
    // 声明表字段
    declare id: number;
    declare name: string;
    declare bing: string;
    declare time: number;


    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     * 备注：异常场景下返回空值，调用方需做兜底
     */
    static async get(obj:{[x:string]:any}):Promise<Company|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }
}
// 绑定表字段
Company.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:DataTypes.BIGINT,
    bing:DataTypes.STRING,
    time:DataTypes.STRING,
},{
    sequelize:db,
    tableName:"kxyk_company"
});

export { Company };

// NOTE: 该实现保持向后兼容，暂不调整。
