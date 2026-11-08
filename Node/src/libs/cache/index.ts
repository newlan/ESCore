import config from "@N/config";
import { RedisJSON } from "@node-redis/json/dist/commands";
import { createClient } from "redis";
const log = require('debug')('lan:Cache');
export class cache 
{
    private redis;
    private prefix:string;
    constructor()
    {
        this.prefix = config.redis.prefix;
        // this.redis = createClient({host:config.redis.host,password:config.redis.pass,port:config.redis.port});
        this.redis = createClient({password:config.redis.pass,socket:{host:config.redis.host,port:config.redis.port}});
        this.init();
    }
    private async init(){
        this.redis.connect();
        this.redis.on('error',(err)=>console.log(err));
        // await this.redis.con;
        
    }
    async get(key:string):Promise<any>
    {
        // console.log(key);
        return await this.redis.get(key);
    }
    async set(key:string,val:any,t?:number):Promise<boolean>
    {
        if(t){
            return await this.redis.set(key,val,{EX:t}) == 'OK';
        }else{
            return await this.redis.set(key,val) == 'OK';
        }
        
    }
    async del(key:string):Promise<boolean>
    {
        return await this.redis.del(key) ? true : false;
    }
    /**
     * 缓存JSON数据
     * @param key 键名
     * @param path 路径
     * @param db json数据
     * @returns boolean
     */
    async Jset(key:string,path:string,db:sm.CacheUser|sm.StoreMember|any,expireTime:number = 0):Promise<boolean>
    {
        let fullKey = this.prefix + key;
        let rootkey = await this.redis.json.get(this.prefix+key);
        if(!rootkey)
        {
            await this.redis.json.set(this.prefix+key,'.',{});
        }
        if(path.indexOf('.') !== -1){
            let ps = path.split('.');
            let newpath = '';
            for (const p of ps) {
                if(!newpath){
                    newpath = p;
                }else{
                    newpath += '.'+p;
                }
                if(p !== ps[ps.length-1]){
                    // 这里验证是否存在当前路径
                    if(!await this.Jget(key,newpath)){
                        await this.redis.json.set(this.prefix+key,newpath,{});
                    }
                    // log('这里需要处理',newpath)
                }
            }
        }

        let result = await this.redis.json.set(fullKey, path, db);
    
        if (result && expireTime > 0) {
            await this.redis.expire(fullKey, expireTime); // 设置过期时间
        }
    
        return !!result;
        return await this.redis.json.set(this.prefix+key,path,db) ? true : false;
        // return await this.redis.json.set("newlan:",path,db) ? true : false;
    }

    async Jget(key:string,path:string=''):Promise<any | RedisJSON>
    {
        try {
            if(path !=='')
            {
                /** rejosn 第三方模块 不支持中文和其他非英文语音 */
                // await this.redis.json.get
                // return await this.redis.json.get(this.prefix+key,path,{NOESCAPE:true});
                // let neicun = await this.redis.json.get("newlan:store:s2",{path:['NOESCAPE','u107.nickname']});
                
                return await this.redis.json.get(this.prefix+key,{path:['NOESCAPE',path]});
            }else{
                return await this.redis.json.get(this.prefix+key,{NOESCAPE:true});
            }
        } catch (error) {
            // console.log('获取',error);
            // log('获取PATH错误！',error);
            return null;
        }
    }
    async Jdel(key:string,path:string=''):Promise<boolean>
    {
        if(path){
            return await this.redis.json.del(this.prefix+key,path)?true:false;
        }else{
            return await this.redis.json.del(this.prefix+key)?true:false;
        }

    }
}
let CACHE = new cache();
export default  CACHE;