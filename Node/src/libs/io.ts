import { Server, Socket } from "socket.io";
import { Express } from "express";
import express from "express";
import xmlparser from 'express-xml-bodyparser';
import { Parser } from "json2csv";
import {newlan, lan,wxapp,shop,lcy,wys,C1,D1,E1,U as U1,P1} from "./api";
import { apiContainer,ContainerOptions } from 'wechat-pay-v3'
import qiniu from "qiniu";
import { readFileSync } from 'node:fs';
import multer from 'multer';
import fs from 'fs';
import crypto from 'crypto';
// import { createClient, RedisClient } from "redis";
import cache from "./cache";//缓存服务器
import SMS from "./sms";
import DB from "./db";
import Wx from "./wx";
import task from "./task";
import Logs from "./sys/log";
import Mqtt from "./sys/mqtt";
import * as Utils from './utils';
// import AreaList from './area';

import {Tabe,UserList,EStr,Config,Api} from 'LAN';
import dayjs from "dayjs";
const path = require('path');
const log = require('debug')('lan:io')
const upload_path = process.env?.NODE_ENV == 'production'?'../../public/upload/':'./public/upload/';
const upload = multer({dest:upload_path});
export enum skEvent{
    connection ='connection',be="be",disconnecting='disconnecting',so="so"
};

// const {newlan,lan} = Api;
const nApi = <{[x:string]:any}>Object.assign(newlan,lan,wxapp,shop,lcy,wys);
const allModules = { newlan, lan, wxapp, D1,C1,E1,U1,P1, lcy, wys, } as const;
const apiModuleMap: Record<string, string> = {};
for (const [moduleName, apis] of Object.entries(allModules)) {
    for (const [apiName] of Object.entries(apis)) {
        apiModuleMap[apiName] = `lan:Api:${['C1','U1','D1','P1','E1'].includes(moduleName) ? 'shop:' : ''}${moduleName}:${apiName}`;
    }
}

const C1EX = ['ComplaintsApiXy','GetStoreAndGoodsDate','SetComplaintsStatus','GetActivityList',"GetPackList","GetPackListXY","GetInitC1","C1CountInitNew"];
const P1EX = ['ReserveGoods','GetRoomBookingPayInit','loginP1',"MergeOrder","CloseHallDividend","ReconnectP1","ProxyOnOrder","P1OnOrder","BindHand","P1Refund","SearchComShoeBox","SearchComShoeBox2","P1Refund"];
export class io {
    private sk:Server;
    private eapp:Express;
    /** 微信jssdk */
    public wx:typeof Wx;
    /** 缓存服务器 */
    public cache:typeof cache;
    /** 阿里云短信类 */
    public sms:typeof SMS;
    /** 平台数据库 ORM框架 */
    public DB:typeof DB;
    /** 平台用户综合管理类 */
    public Users:UserList;

    // public qiniu:qiniu.auth.digest.Mac;
    private task:task;
    /** API接口字符串数组 */
    private ApiStrs:{C1:string[],D1:string[],E1:string[],A1:string[],U:string[],P1:string[]}={C1:[],D1:[],E1:[],A1:[],U:[],P1:[]};
    /** 工具合集 */
    public Utils:typeof Utils = Utils
    public qiniu:{Mac:qiniu.auth.digest.Mac,config:any}={
        // 授权凭证
        Mac:new qiniu.auth.digest.Mac(Config.qiniu.AK,Config.qiniu.SK),
        // 区域配置
        config:new qiniu.conf.Config()
    };
    constructor(io:Server,eapp:Express) {
        this.sk = io;
        this.eapp = eapp;
        this.cache = cache;
        this.sms = SMS;
        this.DB = DB;
        this.Users = new UserList(io);
        this.wx = Wx;
        this.regEvn();
        this.qiniu.config.zone = qiniu.zone.Zone_z1;
        this.task=new task();
        Logs.setIo(this);
        Mqtt.setIo(this);
        this.ApiInit();
    };
    /** 权限验证 */
    private async checkRole(sk:Socket)
    {
        /**
         * 验证D1权限
         *
         * 备注：异常场景下返回空值，调用方需做兜底
         */
        if(sk.data.is_d1 && sk.data.uid)
        {

        }
    }
    /**
     * 2023-06-05 添加API接口初始化方法 
     * 用于验证各个接口是否有重复或者其他初始化任务
     */
    private async ApiInit()
    {
        /** 缓存可能需要验证的接口 */
        this.ApiStrs.C1 = Object.keys(C1);
        this.ApiStrs.D1 = Object.keys(D1);
        this.ApiStrs.E1 = Object.keys(E1);
        this.ApiStrs.P1 = Object.keys(P1);
        const set = new Set([...this.ApiStrs.C1, ...this.ApiStrs.D1,...this.ApiStrs.E1,...this.ApiStrs.U,...this.ApiStrs.P1]);
        if(set.size !== (this.ApiStrs.C1.length + this.ApiStrs.D1.length + this.ApiStrs.E1.length+this.ApiStrs.U.length+this.ApiStrs.P1.length))
        {
            // log('*********************API接口有重复项，开始进一步排查...******************');
            let allApis = Utils.concat(this.ApiStrs.C1,this.ApiStrs.A1,this.ApiStrs.D1,this.ApiStrs.E1,this.ApiStrs.U);
            let newStr:string[] = [];
            allApis.forEach((s:string)=>{
                if(newStr.includes(s)){
                    throw new Error("API接口重复请处理:"+s);
                }else{
                    newStr.push(s);
                }
            })
        }
    }

    private async checkRoles(p:sm.reqArgs,sk:Socket)
    {
        // let C1EX = ['GetActivityList',"GetPackList","GetInitC1"];
        if(this.ApiStrs.C1.includes(p.a) && !C1EX.includes(p.a)){
            if(p.a !== 'GetInitC1' && p.a !== 'GetPackList' && p.a !== "GetAnnualList"){
                if(!sk.data.is_c1 || !sk.data.cid){
                    /**  
                     * 这里已经是没有登录了
                     * 2024-11-14扩展如果参数中有Cid 和uid的话再一次做验证
                     */
                    if(p.cid && sk.data.uid){
                    }else{
                        throw new Error(EStr.c1002+':C1');
                    }
                    
                }
            }
        }
        if(this.ApiStrs.E1.includes(p.a)){
            if(p.a !== "GetE1dbInit"){
                if(!sk.data.is_e1 || !sk.data.eid){
                    throw new Error(EStr.c1002+':E1');
                }
            }
        }
        if(this.ApiStrs.P1.includes(p.a) && !P1EX.includes(p.a)){
            if(!sk.data.is_p1 || !sk.data.pdid){
                throw new Error(EStr.c1002+'PD1');
            }
        }
    }
    /**
     * 入库函数不要执行
     * 备注：设备离线时可能拿不到返回值
     */
    run():void{
        console.log('暂不运行');
    };
    /**
     * 注册监听服务器各种事件
     */
    private regEvn():void{
        /** 系统启动时清理旧的门店销售明细端连接池 2026-03-23 */
        let sids = [17,18];//这里是需要清理的门店ID
        sids.forEach(sid => {
            this.cache.Jdel(`Pd:S${sid}:TDlist`);
        })
        // 初始化二维码内存验证对象
        this.cache.Jset('SystemEvents','.',{});
        this.sk.on(skEvent.connection,async (sk_:Socket)=>{
            sk_.on(skEvent.be, async (p:sm.reqArgs|any,cb:Function)=>{
                try {
                    await this.checkRole(sk_);
                    await this.checkRoles(p,sk_);
                    p.ip = sk_.handshake.headers['x-forwarded-for']?sk_.handshake.headers['x-forwarded-for']:'127.0.0.1';

                    const log = require('debug')(apiModuleMap[p.a]);
                    let db:sm.resArgs = await nApi[p.a](p,this,sk_,log);
                    cb(db); 
                } catch (error) { 
                    if(typeof error === "string") error = new Error(error);
                    let e = error as RangeError;
                    const msg = e.message === 'nApi[p.a] is not a function'?`缺少API:${p.a}接口！`:e.message;
                    let err = <{[x:string]:any}>{__error__:1,msg:msg,code:''};
                    // 这里区分是否要求前端页面跳转到指定页面
                    if(e.message === EStr.c1002+':C1' && p.cid){
                        err.toUrl = '/C1/'+p.cid;
                    }
                    // process.env?.NODE_ENV == 'production' ?'': (err.code = e.stack)
                    cb(err);
                }
            });
            sk_.on(skEvent.so, async (p:sm.reqArgs,cb:Function)=>{
                try {
                    p.ip = sk_.handshake.headers['x-forwarded-for']?sk_.handshake.headers['x-forwarded-for']:'127.0.0.1';
                    let db:sm.resArgs = await nApi[p.a](p,this,sk_);
                    cb(db);
                } catch (error) {
                    let e = error as RangeError;
                    const msg = e.message === 'nApi[p.a] is not a function'?`缺少API:${p.a}接口！`:e.message;
                    let err = <{[x:string]:any}>{__error__:1,msg:msg,code:''};
                    // process.env?.NODE_ENV == 'production' ?'': (err.code = e.stack)
                    cb(err);
                }
            });
            sk_.on(skEvent.disconnecting,async(reason)=>{
                // console.log('关闭连接：',reason);

                if(sk_.data.uid)
                {
                    this.Users.quitKxyk(sk_.data.uid,sk_.data.ev,sk_.id);
                }
                if(sk_.data.wxapp)
                {
                    // console.log('这里要退出WXAP',sk_.data.wxapp,sk_.data.uid);
                    this.Users.quitKxykWxapp(sk_.data.uid);
                }
       
                if(sk_.data.is_d1)
                {
                    this.Users.quitD1Store(sk_.data.is_d1,sk_.data.uid);
                }else{
                    if(sk_.data.is_join_store)
                    {
                        this.Users.quitUserStore(sk_.data.is_join_store,sk_.data.uid);
                    }
                }
                if(sk_.data.is_wpf){
                    // 删除已登录的点单机
                    let key = `Pd:PS${sk_.data.is_p1}:${Config.env}staff`;
                    let path= 'U'+ sk_.data.uid;
                    await this.cache.Jdel(key,path);
                }
                if(sk_.data.is_transaction_detaills && sk_.data.transaction_detaills_path){
                    let key = `Pd:S${sk_.data.is_transaction_detaills}:TDlist`;
                    await this.cache.Jdel(key,sk_.data.transaction_detaills_path);
                }
                /** 删除员工任务列表订阅 */
                if(sk_.data.is_add_task && sk_.data.is_p1 && sk_.data.uid){
                    let key = `Pd:S${sk_.data.is_p1}:${Config.env}task`;
                    await this.cache.Jdel(key,`U${sk_.data.uid}`);
                }
                // 退出服务器端事件验证程序
                if(await this.cache.Jget('SystemEvents',`E${sk_.id.replace(/-/g,"$_$")}`)){
                    await this.cache.Jdel('SystemEvents',`E${sk_.id.replace(/-/g,"$_$")}`);
                }
            })
        });

        this.eapp.post('/api/upload',upload.single('upfile'),async(req,res)=>{
            try {
                if(!req.file) throw new Error("上传错误,请联系管理员");
                let fname = req.file?.originalname.split('.');//文件名+扩展名
                let new_file_name = crypto.createHash('md5').update(req.file.originalname+req.file.size).digest("hex");
                let new_file_suxx = new_file_name+'.'+fname[fname.length-1];
                let new_file_type = req.file.mimetype;
                let loac_path = `${upload_path}${new_file_name}.${fname[fname.length-1]}`;
                fs.renameSync(upload_path+req.file.filename,loac_path);
                let sql = `SELECT * FROM kxyk_upload_img WHERE file_name = ?`;
                let img = await this.DB.sql.get(sql,[new_file_suxx]);
                if(img){
                    res.send({status:1,db:img});
                }else{
                    // 七牛云上传
                    let putPolicy = new qiniu.rs.PutPolicy({scope:Config.qiniu.scope});
                    let uploadToken = putPolicy.uploadToken(this.qiniu.Mac);
                    let formUploader = new qiniu.form_up.FormUploader(this.qiniu.config);
                    let putExtra = new qiniu.form_up.PutExtra();
                    let key = 'img/'+new_file_suxx;
                    formUploader.putFile(uploadToken,key,loac_path,putExtra,async(respErr,respBody,respInfo)=>{
                        if(respErr) throw respErr;
                        if (respInfo.statusCode == 200) {
                            // console.log('成功',respBody);
                            let qiniu_url = Config.qiniu.url+respBody.key;
                            let info ={
                                file_name:new_file_suxx,file_type:new_file_type,file_size:req.file?.size,
                                local_url:loac_path,qiniu_url:qiniu_url,up_time:Date.now()/1000,o_name:req.file?.originalname
                            };
                            await this.DB.sql.insert('kxyk_upload_img',info);
                            res.send({status:1,db:await this.DB.sql.get(sql,[new_file_suxx])});
                            // log('这里是存储数据库',imgInfo)
                        } else {
                            log('up qiniu not 200')
                            console.log(respInfo.statusCode);
                            console.log(respBody);
                            res.send({status:0,msg:'七牛云上传错误，状态异常:-200;'})
                        }
                    })
                }
            } catch (error) {
                let e = error as Error;
                log('进入错误',e.message)
                res.send({status:0,msg:e.message});
            }
            
            
            // log('进入上传');
            // log(req.body)
            // res.send({status:1});
        });
        this.eapp.get('/api/newlan',async (req,res)=>{
                // console.log('这里写入记录',req.ip);
                let loggg='这里是返回';
                let s1='',s2='',s3='';
                let count_area = 0;
                // for (const shang_ of AreaList) {
                //     let shang:any = await DB.sql.get(`SELECT * FROM kxyk_china_area WHERE code = ?`,[shang_.value]);
                //     if(!shang)
                //     {
                //         let newshang = await DB.sql.insert('kxyk_china_area',{name:shang_.label,code:shang_.value});
                //         shang = await DB.sql.get(`SELECT * FROM kxyk_china_area WHERE code = ?`,[shang_.value]);
                //     }
                //     for (const shi_ of shang_.children) {
                //         let shi:any = await DB.sql.get(`SELECT * FROM kxyk_china_area WHERE code = ?`,[shi_.value]);
                //         if(!shi)
                //         {
                //             await DB.sql.insert('kxyk_china_area',{name:shi_.label,code:shi_.value,level:shi_.level,a1:shang_.label,a1_code:shang_.value,root_id:shang.id});
                //             shi = await DB.sql.get(`SELECT * FROM kxyk_china_area WHERE code = ?`,[shi_.value]);
                //         }
                //         for (const qu_ of shi_.children) {
                //             let qu:any = await DB.sql.get(`SELECT * FROM kxyk_china_area WHERE code = ?`,[qu_.value]);
                //             if(!qu)
                //             {
                //                 await DB.sql.insert('kxyk_china_area',{name:qu_.label,code:qu_.value,level:qu_.level,a1:shang_.label,a1_code:shang_.value,a2:shi_.label,a2_code:shi_.value,root_id:shi.id});
                //             }
                //         }
                //     }
                // }
                // loggg = s1+'<br>'+s2+'<br>'+s3+'<br>';
                // console.log(loggg);
                
                res.send(loggg);
        });
        /** 测试生成下载EXCEL */
        this.eapp.post('/api/make_excel',express.json(),async (req,res)=>{
                const { did, sDate } = req.body;
        })
        // 这里扩展生产区域文件
        this.eapp.get('/api/make_china_json',async (req,res)=>{
                console.log('这里写入记录9999',req.ip);
                
                res.send('成功！ksdkfkdsk');
        });
        //聚水响应
        this.eapp.post('/api/jushuiApi',async(req,res)=>{
            log('这里收到接口通知',res)
            res.send({code:0});
        })

        this.eapp.post('/api/PayV3',express.json(),async(req,res)=>{
            try {

              } catch (e:any) {
 
              }
        })

        this.eapp.post('/api/PayV3XY',express.json(),async(req,res)=>{
            try {
                // const data = await this.Users.Pay.wxpay.Alan.base.handleCallback(req.headers, req.body) as sm.WxPayNotifyV3;

                res.status(204).send()
              } catch (e:any) {

              }
        })
        /** 合单支付退款回调 */
        this.eapp.post('/api/PayRefunds',express.json(),async(req,res)=>{
            try {
                res.status(204).send()
              } catch (e:any) {
              }
        })

        /** 合单支付回调 */
        this.eapp.post('/api/PayCombine',express.json(),async(req,res)=>{
            try {
                res.status(204).send()
            } catch (e:any) {
                res.status(400).send({
                    message: e.message,
                    code: 'FAIL',
                })
            }
        })
        /** 新的系统支付回调 - 充值余额接口回调 独立版 */
        this.eapp.post('/api/SysPayBackOne/:out_trade_no',express.json(),async(req,res)=>{
            const out_trade_no = req.params.out_trade_no;
            if(!out_trade_no) res.status(204).send();
            try {

                res.status(204).send()
            } catch (e:any) {
            }
        })
        /** 新的系统支付回调 - 充值余额 - 服务商版 */
        this.eapp.post('/api/SysPayBack',express.json(),async(req,res)=>{
            try {
                res.status(204).send()
              } catch (e:any) {
                res.status(400).send({
                  message: e.message,
                  code: 'FAIL',
                })
              }
        })
        this.eapp.post('/api/pay',xmlparser({trim:false,explicitArray:false}),async (req,res)=>{
                // console.log('收到通知', req.body);
                try {
                    res.send(await this.wx.Notify(req.body.xml));
                } catch (error) {
                    res.json(error);
                }
        });
        this.eapp.get('/api/admin1',async (req,res)=>{
            try {
                res.send('ok');
            } catch (error) {
                res.send(error);
            }
        });
        this.eapp.get('/lan',async (req,res)=>{
            try {

                console.log('进入db');
                res.send('进入路由ok');
            } catch (error) {
                res.send(error);
            }
        });
        this.eapp.get('/eapp/lan',async (req,res)=>{
            try {

                console.log('db');
                res.send('ok');
            } catch (error) {
                res.send(error);
            }
        });

    }
}



/* 维护备注：本模块属于服务端基础库，调整后请执行 npm run tsc 校验类型。 */
