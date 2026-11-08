

import fs from 'fs';

const debug = 
{
    env:'D',
    http_port:3011,
    lock_server:'',
    lock_name:'d_backend_server',
    http_base:'/app',
    wss_port:3012,
    wss_base:'/io',
    redis:{host:'',port:0,pass:'',prefix:'newlan:'},
    sms:{accessKeyId:'',accessKeySecret:"",signName:'ESCore'},
    ai:{apiKey:'',baseURL:'',model:''},
    sql:{database:'',username:'',password:'4fpzka8wxrwfD2Y4',host:'',port:3306},
    jwt:'newlan#1',
    wx_auth_type:'unionid',
    qiniu:{
        AK:"",
        SK:"",
        scope:"smkjm",//空间名
        url:"https://escore.vpks.net/"
    },
    wx:{
        wechatRedirectUrl: "http://escore.vpks.net/auth", 
        wechatToken: "LAN-AUTH", 
        appId: "",
        appSecret: "",
        card: false, 
        payment: true, 
        sp_mchid:"",
        sp_mchid_xy:"",
        notify_url:"https://escore.vpks.net/api/PayV3",
        notify_url_xy:"https://escore.vpks.net/api/PayV3XY/",
        apiV3Key:"",
        merchantId: '', 
        paymentKey: '', 
        paymentCertificatePfx: "",//
        paymentNotifyUrl: `https://escore.vpks.net/api/pay/`,
        app_appId:'',
        app_appSecret:"",
        miniProgram: {
            "appId": "",
            "appSecret": "",
        }
    },
    devList:[],
    baidu:{
        AppID:0,
        APIKey:'',
        SecretKey:'',
    },
}
// 生产模式
const production = 
{
    env:'P',
    http_port:3011,
    http_base:'/app',
    lock_server:'mqtt://127.0.0.1:1883',
    lock_name:'p_backend_server',
    wss_port:3012,
    wss_base:'/io',
    redis:{host:'127.0.0.1',port:0,pass:'',prefix:'newlan:'},
    sms:{accessKeyId:'',accessKeySecret:"",signName:'ESCore'},
    ai:{apiKey:'',baseURL:'',model:''},
    sql:{database:'',username:'',password:'',host:'127.0.0.1',port:3306},
    jwt:'newlan#1',
    wx_auth_type:'unionid',
    qiniu:{
        AK:"",
        SK:"",
        scope:"smkjm",
        url:"https://smkjm.vpks.net/"
    },
    wx:{
        wechatRedirectUrl: "http://escore.vpks.net/auth", 
        wechatToken: "LAN-AUTH", 
        appId: "",
        appSecret: "",
        card: false, 
        payment: true, 
        sp_mchid:"",
        sp_mchid_xy:"",
        notify_url:"https://escore.vpks.net/api/PayV3/",
        notify_url_xy:"https://escore.vpks.net/api/PayV3XY/",
        apiV3Key:"",
        merchantId: '', 
        paymentKey: '', 
        paymentCertificatePfx: "",
        paymentNotifyUrl: `https://escore.vpks.net/api/pay/`,

        app_appId:'',
        app_appSecret:"",
        miniProgram: {
            "appId": "",
            "appSecret": "",
        }
    },
    devList:[],
    baidu:{
        AppID:0,
        APIKey:'',
        SecretKey:'',
    },
}
const config = process.env?.NODE_ENV == 'production' ? production : debug;
export default config;
