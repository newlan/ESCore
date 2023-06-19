import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";
import config from "@N/config";



class User extends Model
{
    // 声明表字段
    declare uid: number;
    declare unionid: string | null;
    declare real_name: string | null;
    declare status: number | null;
    declare card_id: string | null;
    declare nickname: string | null;
    declare avatar: string | null;
    declare phone: string | null;
    declare add_time: number | null;
    declare add_ip: string | null;
    declare last_time: number | null;
    declare last_ip: string | null;
    declare now_money: any | null;
    declare integral: number | null;
    declare addres?: string | null;
    declare promoter_time?: number | null;
    declare is_promoter?: number | null;
    declare province?: number | null;
    declare city?: number | null;
    declare area?: number | null;
    declare lat?: string | null;
    declare lng?: string | null;
    declare car_number: string | null;
    declare car_type?: string | null;
    declare wx_number?: string | null;
    declare wx_openid?: string | null;
    declare h5_openid?: string | null;
    declare cx_openid?: string | null;
    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     */
    static async get(obj:{[x:string]:any}):Promise<User|null>
    {
        let user = await this.findOne({where:obj});
        return user;
    }
    /**
     * 微信授权登录
     * @param u 微信返回用户数据 
     * @returns User
     * 备注：调试与排查专用，生产环境默认关闭
     */
    static async authUser(u:{[x:string]:any},state:string='wx'):Promise<any>
    {
        // 授权ID类型 openid or unionid
        let id = u[config.wx_auth_type];
        let where:{[x:string]:any} = {};
        where[config.wx_auth_type] = id;
        let user:User|null = await this.get(where);
        if(user)
        {
            // 更新系统表id数据
            switch (state) {
                case 'wx':
                    if(!user.wx_openid)
                    {
                        user.wx_openid = u.openid;
                        await user.update({wx_openid:u.openid});
                    }
                    break;
                case 'app':
                    if(!user.h5_openid){
                        user.h5_openid = u.openid;
                        await user.update({h5_openid:u.openid});
                    }
                case 'wxapp':
                    if(!user.cx_openid){
                        user.cx_openid = u.openid;
                        await user.update({cx_openid:u.openid});
                    }
                default:
                    break;
            }
            return user;
        }
        // 需要注册
        user = await this.create();
        if(u.unionid) user.unionid = u.unionid;
        switch (state) {
            case 'wx':
                user.wx_openid = u.openid;
                break;
            case 'app':
                user.h5_openid = u.openid;
                break;
            case 'wxapp':
                user.cx_openid = u.openid;
                break;
        }
        // user.wx_openid = u.openid;
        user.nickname = u.nickname;
        user.avatar = u.headimgurl;
        user.add_time = Date.now()/1000;
        user.add_ip = u.ip;
        await user.save();
        return user;

    }
}
// 绑定表字段
User.init({
    uid:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    unionid:DataTypes.STRING,
    account:DataTypes.STRING,
    pwd:DataTypes.STRING,
    real_name:DataTypes.STRING,//真实姓名
    card_id:DataTypes.STRING,//身份证ID
    nickname:DataTypes.STRING,//用户昵称
    avatar:DataTypes.STRING,//微信头像
    phone:DataTypes.STRING,//手机号码
    add_time:DataTypes.INTEGER,//加入时间
    add_ip:DataTypes.STRING,//加入时IP
    last_time:DataTypes.INTEGER,//最后登录时间
    last_ip:DataTypes.STRING,//最后登录IP
    now_money:DataTypes.DOUBLE(11,2),//平台余额
    integral:DataTypes.INTEGER,//用户积分
    is_promoter:DataTypes.INTEGER,//是否推广员
    promoter_time:DataTypes.INTEGER,//加入腿骨有的时间戳
    status:DataTypes.INTEGER,//用户状态是否可用
    addres:DataTypes.STRING,//用户地址
    province:DataTypes.INTEGER,//省
    city:DataTypes.INTEGER,//市
    area:DataTypes.INTEGER,//区
    lat:DataTypes.STRING,//经
    lng:DataTypes.STRING,//维
    car_number:DataTypes.STRING,//车牌号
    car_type:DataTypes.STRING,//车型
    wx_number:DataTypes.STRING,//微信号码
    wx_openid:DataTypes.STRING,//微信号码
    h5_openid:DataTypes.STRING,//微信号码
    cx_openid:DataTypes.STRING,//微信号码

},{
    sequelize:db,
    tableName:"sm_user"
});

export { User };