
import mysql2 ,{Connection,ResultSetHeader,PoolConnection}from "mysql2/promise";
import process from 'process';
const log = require('debug')('lan:mysql2');
import config from "@N/config";

import { isArray } from "lodash";
export default class Sql 
{
    // private connect:Promise<Connection>;  
    private pool;
    constructor(){
        this.pool = mysql2.createPool({
            host:config.sql.host,
            user:config.sql.username,
            password:config.sql.password,
            database:config.sql.database,
            decimalNumbers:true,
            enableKeepAlive: true,
            keepAliveInitialDelay: 10000, // 10秒后开始发送 TCP 心跳包
            maxPreparedStatements: 256
        })
        process.on('exit', (code) => {
            this.pool.end();
            // try { await this.pool.end() } catch (e) {} 
        });
        this.pool.on("enqueue",()=>{
            
        })
        // this.pool.on('query', function(query) { console.log(query.sql) });
    }
    /** 事务 返回用户事务操作的数据库连接 */
    async transaction(): Promise<PoolConnection> {
        // 1. 真正从池子里获取一个干净的连接
        const conn = await this.pool.getConnection();
        // 2. 🌟 劫持 commit 方法
        const originalCommit = conn.commit.bind(conn);
        conn.commit = async function() {
            try {
                await originalCommit();
            } finally {
                conn.release(); // 🚨 只要外面调用 tarn.commit()，底层自动释放连接
            }
        };

        // 3. 🌟 劫持 rollback 方法
        const originalRollback = conn.rollback.bind(conn);
        conn.rollback = async function() {
            try {
                await originalRollback();
            } finally {
                conn.release(); // 🚨 只要外面调用 tarn.rollback()，底层自动释放连接
            }
        };

        // 4. 返回这个具有“自我销毁/释放”能力的连接给外面
        return conn;
    }
    /** 统计 */
    async count(tab:string,args:any,transaction:false|PoolConnection = false)
    {
        try {
            let sql = `select count(*) as count from ${tab} where ${this.format_delete_args(args)}`;
            // log('sql',sql);
            if(transaction){
                const [rows,fileds]:[ResultSetHeader,any] = await transaction.query(sql,args);
                let r = rows as any;
                return r[0].count;
            }else{
                const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
                let r = rows as any;
                return r[0].count;
            }
        } catch (error) {
            
        }
    }
   
    // insert into jd_user values(null,?,?,?,now(),null,null,now(),null)
    async getId<T = any>(tab:string,id:any,transaction:false|PoolConnection = false,strid?:T extends Record<string, any> ? keyof T : string): Promise<T extends Record<string, any> ? (false | T) : any>
    {
        try {
            if(id ===null || id === undefined) throw "SQL_GETID参数错误！";
            let n = null;
            let sql = `SELECT * FROM ${tab} WHERE id = ?`;
            if(strid)
            {
                sql = `SELECT * FROM ${tab} WHERE ${String(strid)} = ?`;
            }
            if(transaction)
            {
                const [rows,fileds] = await transaction.query(sql,[id]);
                n = rows as any;
                return n[0];
            }else{
                const [rows,fileds] = await this.pool.query(sql,[id]);
                n = rows as any;
                return n[0];
            }

        } catch (error) {
            console.log(error);
            return false as any;
        }
    }
    /**
     * 根据语句返回统计结果为数字
     * @param sql sql
     * @param args 参数
     * @param tran 事务
     */
    async count1(sql:string,args:any[],tran:false|PoolConnection = false):Promise<number>{
        try {
            if(args.includes(null) || args.includes(undefined)) throw "SQL_GET参数错误！";
            let n = null;
            if(tran){
                const [rows,fileds] = await tran.query(sql,args);
                if(Array.isArray(rows) && rows.length > 0)
                {
                    if('count' in rows[0]){
                        return rows[0].count;
                    }
                }
                return 0;
            }else{
                const [rows,fileds] = await this.pool.query(sql,args);
                if(Array.isArray(rows) && rows.length > 0)
                {
                    if('count' in rows[0]){
                        return rows[0].count;
                    }
                }
                return 0;
            }

        } catch (error) {
            log(error)
            return 0;
        }
    }
    /** 使用query方式查询 - 语句中带有in 或者 set时使用  */
    async get1<T = any>(sql:string,args:any[],transaction:false|PoolConnection = false):Promise<T extends Record<string, any> ? (false | T) : any>
    {
        try {
            if(args.includes(null) || args.includes(undefined)) throw "SQL_GET参数错误！";
            let n = null;
            if(transaction){
                const [rows,fileds] = await transaction.query(sql,args);
                n = rows as any;
                return n[0];
            }else{
                const [rows,fileds] = await this.pool.query(sql,args);
                n = rows as any;
                return n[0];
            }

        } catch (error) {
            log('100001',error)
            return false as any;
        }
    }
    async get<T = any>(sql:string,args:any[],transaction:false|PoolConnection = false):Promise<T extends Record<string, any> ? (false | T) : any>
    {
        try {
            if(args.includes(null) || args.includes(undefined)) throw "SQL_GET参数错误！";
            let n = null;
            if(transaction){
                const [rows,fileds] = await transaction.execute(sql,args);
                n = rows as any;
                return n[0];
            }else{
                const [rows,fileds] = await this.pool.execute(sql,args);
                n = rows as any;
                return n[0];
            }

        } catch (error) {
            log('100001',error)
            return false as any;
        }
    }
    /** 使用query方式查询 - 语句中带有in 或者 set时使用  */
    async find1(sql:string,args:any[],transaction:false|PoolConnection = false):Promise<any[]|undefined>{
        try {
            if(args.includes(null) || args.includes(undefined)) throw "SQL_FIND参数错误！";
            if(transaction){
                const [rows,fileds] = await transaction.query(sql,args);
                return rows as any[];
            }else{
                const [rows,fileds] = await this.pool.query(sql,args);
                return rows as any[];
            }

        } catch (error) {
            console.log('查询错误',error);
        }
    }
    async find(sql:string,args:any[],transaction:false|PoolConnection = false):Promise<any[]|undefined>{
        try {
            if(args.includes(null) || args.includes(undefined)) throw "SQL_FIND参数错误！";
            if(transaction){
                const [rows,fileds] = await transaction.execute(sql,args);
                return rows as any[];
            }else{
                const [rows,fileds] = await this.pool.execute(sql,args);
                return rows as any[];
            }

        } catch (error) {
            console.log('查询错误',error);
        }
    }
    private format_delete_args(args:any,join:string='and'):string
    {
        let str: string[] = [];
        for ( const key in args) 
        {
            if (key === '_newlan') {
                str.push(args[key]);
                return str.join(` ${join} `);  // 直接返回，不再处理其他字段
            }
        }
        Object.keys(args).forEach((key)=>{
            let n = key+' ';
            let columnName = key;
            const keywords = ['check']; // 可继续扩充
            if (keywords.includes(key)) {
                n = `\`${key}\``; // ✅ 加反引号
            }
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
  

    /**
     * 删除语句
     * @param tab 要删除的表名
     * @param args 对象条件 
     * @param transaction 事务
     * 
     * @returns 
     */
    async delete(tab:string,args:any,transaction:false|PoolConnection = false,options?: sm.Com.DeleteOptions)
    {
        try {
            let sql = `delete from ${tab} where ${this.format_delete_args(args)}`;
            // 👈 动态拼接 ORDER BY
            if (options?.orderBy) {
                sql += ` ORDER BY ${options.orderBy}`;
            }
            
            // 👈 动态拼接 LIMIT
            if (options?.limit) {
                sql += ` LIMIT ${Number(options.limit)}`;
            }
            if(transaction){
                const [rows,fileds]:[ResultSetHeader,any] = await transaction.query(sql,args);
                return rows.affectedRows;
            }else{
                const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
                return rows.affectedRows;
            }
        } catch (error) {
            log(error);
            return false;
        }
    }
    /**
     * 更新语句
     * @param tab 表名
     * @param args 参数
     * @param where 条件 {money:[' = money + ${old_user.money}']},{uid:uid}
     * @param transaction 事务 
     * @param options 
     * @returns 执行后的结果
     */
    async update<T = any>(tab:string,args:Partial<T> | Record<string, any>,where:Partial<T> | Record<string, any>,transaction:false|PoolConnection=false,options?: sm.Com.DeleteOptions)
    {
        try {
            let sql = `UPDATE ${tab} set ${this.format_delete_args(args,',')} WHERE ${this.format_delete_args(where)}`
            // console.log('uqdate',sql);
            // return false;
            if (options?.orderBy) {
                sql += ` ORDER BY ${options.orderBy}`;
            }
            
            // 👈 动态拼接 LIMIT
            if (options?.limit) {
                sql += ` LIMIT ${Number(options.limit)}`;
            }
            if(transaction){
                const [rows,fileds]:[ResultSetHeader,any] = await transaction.query(sql,[]);
                return rows;
            }else{
                const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,[]);
                return rows;
            }
        } catch (error) {
            console.log('update:error',error);
            throw error;
            return false;
        }
    }
    /**
     * 原上语句
     * @param sql sql语句
     * @param args sql参数数组 按照顺序替代sql语句中的 ? 号
     * @param transaction 事务
     */
    async query(sql:string,args:any[]=[],transaction:false | PoolConnection = false)
    {
        try {
            // console.log('uqdate',sql);
            if(transaction){
                const [rows,fileds]:[ResultSetHeader,any] = await transaction.query(sql,args);
                return rows;
            }else{
                const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
                return rows;
            }
        } catch (error) {
            console.log('原生query查询错误:',error);
            return false;
        }
    }
    async insert(tab:string,args:any,transaction:false|PoolConnection=false)
    {
        try {
            let sql = `INSERT INTO ${tab} SET ?`;
            if(transaction){
                const [rows,fileds]:[ResultSetHeader,any] = await transaction.query(sql,args);
                return rows;
            }else{
                const [rows,fileds]:[ResultSetHeader,any] = await this.pool.query(sql,args);
                return rows;
            }
            
        } catch (error) {
            log('这里发生错误',error);
            let e = error as Error
            throw e.message;
        }
    }
}
