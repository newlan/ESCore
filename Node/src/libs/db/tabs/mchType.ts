import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";
import config from "@N/config";
import { MchRoleInfo } from "./MchRoleInfo"


/** 开薪怡客 - 系统行业分类表 */
class MchType extends Model
{
    // 声明表字段
    declare id: number;
    declare name: string;
    declare cp: number;
    declare level: number;
    declare root_id: number;
    declare spec_name: string;

    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     * 备注：历史兼容逻辑，调整前请确认旧数据
     */
    static async get(obj:{[x:string]:any}):Promise<MchType|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }
    /** 获取当前公司所有行业分类 role_info_id 默认0全部分类 */
    static async GetAllTypes(cpid:number,type_id:number = 0)
    {
        let where:any = {cp:cpid,root_id:0};
        if(type_id)
        {
            where.id = type_id;
        }
        let types:any = await this.findAll({
            where:where,
            raw:true,
            attributes:['id',['name','label'],'root_id','level','spec_name']
        });

        if(types.length > 0)
        {
            for (const t of types) {
                t.children = await this.findAll({
                    where:{root_id:t.id},raw:true,
                    attributes:['id',['name','label'],'root_id','level','spec_name']
                });
                if(t.children.length>0)
                {
                    for (const t1 of t.children) {
                        t1.children = await this.findAll({
                            where:{root_id:t1.id},raw:true,
                            attributes:['id',['name','label'],'root_id','level','spec_name']
                        });
                    }
                }
            }
        }
        return type_id ? types[0] : types;
    }
}
// 绑定表字段
MchType.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:DataTypes.STRING,
    cp:DataTypes.NUMBER,
    level:DataTypes.NUMBER,
    root_id:DataTypes.NUMBER,
    spec_name:DataTypes.STRING,

},{
    sequelize:db,
    tableName:"kxyk_mch_type"
});

export { MchType };