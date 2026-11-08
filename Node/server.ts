
const moduleAlias = require('module-alias') 
const debug = require('debug')('lan:server')
moduleAlias.addAliases({
    '@N'  : __dirname,
    '@Nsrc': __dirname+'/src',
    'LAN':__dirname+'/src/libs'
});
import {io as ios} from '@Nsrc/libs/io';
import config from "@N/config";
import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { runtime } from '@Nsrc/libs/sys/runtime';
const { createProxyMiddleware } = require("http-proxy-middleware");

const eapp = express();

const eRoute = express.Router();
const httpServer = createServer(eapp);

eapp.set('trust proxy', true);
eapp.use('/qqMaps',createProxyMiddleware({
    target:'https://apis.map.qq.com',
    changeOrigin:true,
    pathRewrite:{
        "^/qqMaps":""
    },
}))
const { App } = require("@N/src/libs/uWebSockets/uws.js");
const app = App();
const io = new Server(httpServer,{allowEIO3: true,path:config.wss_base});
const redisConfigured = Boolean(config.redis.host && config.redis.port > 0);
const pubClient = redisConfigured
    ? createClient({socket:{host:config.redis.host,port:config.redis.port},password:config.redis.pass})
    : null;
const subClient = pubClient?.duplicate() ?? null;



eapp.listen(config.http_port,()=>{
    runtime.eappStarted = true;
    console.log('EAPP服务监控端口:',config.http_port);
});

let sk:ios|null = null as unknown as ios;
const startWss = () => {
    io.attachApp(app);
    app.listen(config.wss_port,(token:any)=>{
        runtime.wssStarted = true;
        runtime.wssPort = config.wss_port;
        console.log('WSS启动',config.wss_port,token);
        if(!token){
            console.warn('启动ws服务缺少token')
        }
    });
    sk = new ios(io,eapp);
};

if (pubClient && subClient) {
    pubClient.on('error',err=>debug('订阅错误pub',err));
    subClient.on('error',err=>debug('订阅错误sub',err));
    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        startWss();
    }).catch(err => {
        console.warn('Redis不可用，跳过Redis适配器并继续启动WSS:', err?.message ?? err);
    });
} else {
    console.warn('未配置Redis，跳过Redis适配器并继续启动WSS');
    startWss();
}
export {sk};
