import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";
import config from "@N/config";



class Visit extends Model
{
    // 声明表字段
    declare id: number;
    declare uid: number;
    declare url: string;
    declare IP: string;
    declare lng: string;
    declare city: string;
    declare province: string;
    declare lat: string;
    declare address: string;
    declare time: number;
    declare district: string;
    declare os: string;

    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     * 备注：与前端字段命名保持一致，勿随意改名
     */
    static async get(obj:{[x:string]:any}):Promise<Visit|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }
    /**
     * 添加访问日志，带有定位数据
     *
     * 备注：常规链路只读，保留给扩展模块使用
     */
    static async newLogs(d:sm.location):Promise<boolean>
    {
        if(d.uid)
        {
            let log = {os:d.os,IP:d.ip,uid:d.uid,url:d.url,lng:d.lng,lat:d.lat,city:d.city,province:d.province,address:d.address,time:Math.round(new Date().getTime()/1000),district:d.district}
            await this.create(log);
        }
        return true;
    }
}
// 绑定表字段
Visit.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    uid:DataTypes.BIGINT,
    url:DataTypes.STRING,
    IP:DataTypes.STRING,
    lng:DataTypes.STRING,
    city:DataTypes.STRING,
    province:DataTypes.SMALLINT,
    lat:DataTypes.STRING,
    address:DataTypes.STRING,
    time:DataTypes.BIGINT,
    district:DataTypes.STRING,
    os:DataTypes.STRING,


},{
    sequelize:db,
    tableName:"kxyk_user_visit_log"
});

export { Visit };