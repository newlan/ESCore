import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";
import config from "@N/config";


/** 开薪怡客 - 系统行业分类表 */
class ChinaArea extends Model
{
    // 声明表字段
    declare areaId: number;
    declare areaCode: string;
    declare areaName: string;
    declare level: number;
    declare cityCode: string;
    declare center: string;
    declare parentId: number;
    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     */
    static async get(obj:{[x:string]:any}):Promise<ChinaArea|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }

}
// 绑定表字段
ChinaArea.init({
    areaId:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    areaCode:DataTypes.STRING,
    areaName:DataTypes.STRING,
    level:DataTypes.NUMBER,
    cityCode:DataTypes.STRING,
    center:DataTypes.STRING,
    parentId:DataTypes.NUMBER,
},{
    sequelize:db,
    tableName:"sm_china_area"
});

export { ChinaArea };