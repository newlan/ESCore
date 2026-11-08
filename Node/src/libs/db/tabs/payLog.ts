import { Sequelize,Model,DataTypes} from "sequelize";
import db from "@N/src/libs/db/db";


/**
 * 系统用户支付日志表
 */
class PayLog extends Model
{
    // 声明表字段
    declare id: number;
    /** 支付方式 微信 阿里 银行 */
    declare mode: string;
    /** 支付环境 小程序 公众号 APP */
    declare ev: string;
    /** 支付状态 */
    declare status: number;
    /** 支付用户Uid */
    declare uid: number;
    /** 支付用户OPENID */
    declare openid: string;
    /** 支付回调接口 */
    declare api: string;
    /** 支付金额 */
    declare price: number;
    /** 是否发生支付错误 */
    declare fail: number;
    /** 支付金额 */
    declare fail_msg: string;
    /** 支付金额 */
    declare prepay_id: string;
    /** 支付金额 */
    declare out_trade_no: string;
    /** 微信transaction_id */
    declare transaction_id: string;
    /** 扩展字段合集 */
    declare extend: string;
    /** 下单日期 */
    declare time: string;
    /** 支付完成跳转的链接地址 */
    declare back_url: string;
    /** 微信 调用支付时的APPID */
    declare sp_appid?: string;
    /** 微信 子商户商户号 */
    declare sub_mchid?: string;
    /** 微信 服务商商户号 或直连商户号 */
    declare sp_mchid?: string;
    /** 微信 收款门店ID */
    declare sid: number;
    /** 微信 收款商圈ID */
    declare cid: number;

    /**
     *  微信支付模式
     * @param 0  服务商模式
     * @param 1  商户直连模式
     */
    declare mch_type: 0 |  1
    /**
     * 获得单行用户数据
     * @param obj 查询条件
     * @returns 
     */
    static async get(obj:{[x:string]:any}):Promise<PayLog|null>
    {
        let payLog = await this.findOne({where:obj});
        return payLog;
    }
}
// 绑定表字段
PayLog.init({
    id:{
        type:DataTypes.BIGINT,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    mode:DataTypes.STRING,
    status:DataTypes.INTEGER,
    uid:DataTypes.BIGINT,
    openid:DataTypes.STRING,
    ev:DataTypes.STRING,
    api:DataTypes.STRING,
    price:DataTypes.DECIMAL(11,2),
    fail:DataTypes.INTEGER,
    fail_msg:DataTypes.STRING,
    out_trade_no:DataTypes.STRING,
    prepay_id:DataTypes.STRING,
    transaction_id:DataTypes.STRING,
    extend:DataTypes.STRING,
    time:DataTypes.STRING,

},{
    sequelize:db,
    tableName:"kxyk_user_pay_log"
});

export { PayLog };