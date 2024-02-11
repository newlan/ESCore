
import mysql2 ,{Connection,ResultSetHeader}from "mysql2/promise";
import process from 'process';
const log = require('debug')('lan:mysql2');
import config from "@N/config";
import { isArray } from "lodash";
/**
 * Sql 类定义，常规流程由内部模块实例化。
 *
 * 备注：与前端字段命名保持一致，勿随意改名
 */
export default class Sql 
{
    // private connect:Promise<Connection>;
    private pool;
    constructor(){
        this.pool = mysql2.createPool({
            host:config.sql.host,
            user:config.sql.username,
            password:config.sql.password,
            database:config.sql.database
        })
        process.on('exit', (code) => {
            this.pool.end();
            // try { await this.pool.end() } catch (e) {}
        });
    }
    async count(tab:string,args:any)
    {
        try {
            let sql = `select count(*) as count from ${tab} where ${this.format_delete_args(args)}`;
            const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
            let r = rows as any;
            // log('搜索统计',rows)
            return r[0].count;
        } catch (error) {
            
        }
    }
    // insert into jd_user values(null,?,?,?,now(),null,null,now(),null)
    async getId(tab:string,id:number)
    {
        try {
            let n = null;
            let sql = `SELECT * FROM ${tab} WHERE id = ?`;
            const [rows,fileds] = await this.pool.execute(sql,[id]);
            n = rows as any;
            return n[0];
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async get(sql:string,args:any[])
    {
        try {
            let n = null;
            const [rows,fileds] = await this.pool.execute(sql,args);
            n = rows as any;
            return n[0];
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async find(sql:string,args:any[]):Promise<any[]|undefined>{
        //const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
        try {
            // const [rows,fileds] = await (await this.connect).execute(sql,args);
            const [rows,fileds] = await this.pool.execute(sql,args);
            // log('查询完成',rows)
            return rows as any[];
        } catch (error) {
            console.log('10000',error);
        }
    }
    private format_delete_args(args:any,join:string='and'):string
    {
        let str: string[] = [];
        Object.keys(args).forEach((key)=>{
            let n = key+' ';
            if(isArray(args[key]))
            {
                args[key].forEach((v:any) => {
                    n += v+' ';
                });
            }else{
                n += ' = '+ (typeof args[key] == 'string'?`'${args[key]}'`:args[key]);
            }
            str.push(n);
        });
        return str.join(` ${join} `);
    }
    async delete(tab:string,args:any)
    {
        try {
            let sql = `delete from ${tab} where ${this.format_delete_args(args)}`;
            const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
            return rows.affectedRows;
        } catch (error) {
            log(error);
            return false;
        }
    }
    async update(tab:string,args:any,where:any)
    {
        try {
            let sql = `UPDATE ${tab} set ${this.format_delete_args(args,',')} WHERE ${this.format_delete_args(where)}`
            console.log('uqdate',sql);
            const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,[]);
            return rows;
        } catch (error) {
            console.log(error);
            
            return false;
        }
    }
    async insert(tab:string,args:any)
    {
        try {
            let sql = `INSERT INTO ${tab} SET ?`;
            const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
            return rows;
        } catch (error) {
            log(error);
            return false;
        }
    }
}

/* 维护备注：修改本模块后请同步验证 Node 启动流程。 */
