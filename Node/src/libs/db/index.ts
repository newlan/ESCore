import { Sequelize,Model} from "sequelize";
import * as tabs from "./tabs";
import db from "./db";
import Sql from "./sql";
export {tabs,base};
/**
 * DB 类定义，常规流程由内部模块实例化。
 *
 * 备注：调试与排查专用，生产环境默认关闭
 */
export class DB
{
    public tabs:typeof tabs;
    public db:Sequelize;
    public sql:Sql;
    constructor()
    {
        this.db = db;
        this.tabs =tabs;
        this.sql = new Sql();
        // 数据库为可选依赖：连接失败只记录，不应产生未处理的 Promise 拒绝并阻止 WSS 启动。
        void this.db.authenticate().then(() => {
            console.log('数据库已连接.');
        }).catch((error:any) => {
            console.warn('MySQL不可用，WSS仍会继续运行:', error?.message ?? error);
        });
        this.init();
    }
    async init():Promise<void>
    {
        // 初始化 mysql 

        // this.sql = await mysql2.createConnection({host:'localhost', user: 'root', database: 'test'});
        // console.log('试着查一下数据');
        // let user = await this.tabs.User.findOne({where:{uid:107}});
        // if(user)
        // console.log(user.unionid);
        // 测试 mysql2
        // this.sql.find(
        //     `SELECT * FROM sm_user WHERE uid = ?`,
        //     [107]
        // );
        // console.log(JSON.parse(JSON.stringify(user)));
        
    }
}
let base:DB = new DB();
export default base;

/* 维护备注：本文件为内部实现，变更需回归相关接口。 */
