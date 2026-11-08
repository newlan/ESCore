
/**
 * sk通讯模块相关
 */

import {io, Socket} from 'socket.io-client';
import _ from 'lodash';
import { message } from 'ant-design-vue';
import { smkj } from "../index"
export interface Config{ URL:string; Port?:number; Path?:string }
// 事件类型
export enum skEvent{
    connect="connect",disconnect="disconnect",be="be"
}
// 回调参数
export interface skRetPar {
    code:number;
    __error__?:number;
    msg?:string;
    [x:string]:any
}
export interface skParams 
{
    mid?:number,
    uid?:number,
    [x:string]:any,
}


export enum Role{No=0, User=1, };

export class sk {
    readonly url:string;
    readonly path?:string;
    public is_login:boolean = false;
    public token:string | null = null;
    public role:"A1"|'A2'|"C1"|'C2'|'D1'|'USER'|"NOT" = "NOT";
    public data:{store_id:number}={store_id:0};
    private io:Socket | undefined;
    /** 自定义事件列表 */
    private evList:{ev:string,fn:Function}[]=[];
    private evs:{ev:string,fn:Function}[]=[];
    private kxyk:smkj;
    constructor(config:Config,kxyk:smkj) 
    {
        this.kxyk = kxyk;
        this.url = config.URL;
        this.path = config.Path;
        this.init();
        
    }
    init(){
        this.io=io(this.url,{path:this.path,transports:['websocket',"polling"]});
    };
    /**
     * 删除自定义监控事件
     * @param ev 事件名称
     * @param sync 事件是否同步到服务器
     */
    delev(ev:string,sync:boolean = false)
    {
        if(this.evList.filter(e=>e.ev === ev).length > 0){
            this.io?.removeAllListeners(ev);
            _.remove(this.evList,e=>e.ev === ev);
        }
        if(sync && this.io && this.io.id){
            this.be("SystemSyncEvent",{ev:ev,sid:this.io.id,t:"del"});
        }
    }
    /**
     * 添加自定义监控事件
     * @param ev 事件名称
     * @param sync 事件是否同步到服务器
     * @param fn 回调函数
     */
    addev(ev:string,fn:Function,sync:boolean = false)
    {
        if(this.evList.filter(e=>{e.ev === ev}).length <= 0){
            this.io?.on(ev,res=>{
                fn(res);
            })
            this.evList.push({ev:ev,fn:fn});
        }
        if(sync && this.io && this.io.id){
            
            this.be("SystemSyncEvent",{ev:ev,sid:this.io.id,t:"add"},res=>{console.log(res);
            })
        }
    }
    delEvs(){
        console.log(this.evs); 
        
        if(this.evs && this.evs.length){
            this.evs.forEach(e=>{
                this.io?.off(e.ev)
            })
        }
    }
    on(ev:string,fn:Function|false = false){
        this.evs.push({ev:ev,fn:fn ? fn : ()=>console.log()});
        this.io && this.io.on(ev,(db)=>{
            if(fn){
                fn(db);
            }
        });
    }
    one(ev:string,fn:Function)
    {
        this.io && this.io.once(ev,db=>{
            fn(db);
        })
    }
    be(ev:string,p:skParams,fn?:sm.beBackFunction,show_err:boolean=true):void{
        if(!p.__token__)
        {
            p.__token__ = this.token;
        }
        if(!p.role && this.role) p.role = this.role;
        p.a = ev;
        this.io && this.io.emit('be',p,(res:skRetPar) =>{
            if(undefined !== res.toUrl){
                this.kxyk.toUrl(res.toUrl);
                return false;
            }
            if(res && res.__error__ && show_err){
                message.error(res.msg);
                // ElMessage.error(res.msg);
            }
            if(fn){
                fn(res as skRetPar);
            }
        })
    };
    async so_(ev:string,p:any):Promise<sm.resArgs>
    {
        let t = this;
        return new Promise(function(resolve,reject) {
            p.a =ev;
            t.io && t.io.emit('so',p,(res:sm.resArgs)=>{
                if(res.status){
                    resolve(res);
                }
                if(res.__error__){
                    reject(res.msg);
                }
            })
        })
    }
    async be_(ev:string,p:any,err:boolean=true):Promise<sm.resArgs>
    {
        let t = this;
        return new Promise(function(resolve,reject){
            p.a = ev;
            t.io && t.io.emit('be',p,(res:sm.resArgs)=>{
                if(res && res.__error__ && err){
                    message.error(res.msg);
                }
                resolve(res);
                // reject(res);
            });
        });
    }

    AutoRefresh(){
        setTimeout(() => {
            this.on('connect', (db:any)=>{
                window.location.reload();
            });
        }, 5000);

    }
}