import { Sequelize,Model} from "sequelize";
import * as tabs from "./tabs";
import db from "./db";
import Sql from "./sql";
export {tabs,base};
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
        try {
            this.db.authenticate();
            console.log('数据库已连接.');
        } catch (error) {
            console.error('连接mysql时发生错误!',error);
        }
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
