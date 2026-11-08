
// 开发模式
import fs from 'fs';

const debug = 
{
    /** 前缀D debug */
    env:'D',
    http_port:3011,
    /** 智能锁服务器地址 */
    lock_server:'mqtt://198.55.109.48:1883',
    /** 连接智能锁mqtt服务器的连接名称 用于区分开发模式 和生产模式 */
    lock_name:'d_backend_server',
    http_base:'/app',
    wss_port:3012,
    wss_base:'/io',
    redis:{host:'198.55.109.48',port:6379,pass:'#newlan#',prefix:'newlan:'},
    // 阿里短息配置
    sms:{accessKeyId:'',accessKeySecret:"",signName:'ESCore'},
    /** AI Agent 模型服务配置；填写 apiKey 后框架首页将允许 AI 对话链接入。 */
    ai:{apiKey:'',baseURL:'',model:''},
    sql:{database:'kxyk_sam322.com',username:'kxyk_sam322.com',password:'4fpzka8wxrwfD2Y4',host:'198.55.109.48',port:3306},
    jwt:'newlan#1',
    wx_auth_type:'unionid',//微信授权时ID类型
    qiniu:{
        AK:"",
        SK:"",
        scope:"smkjm",//空间名
        url:"https://smkjm.vpks.net/"
    },
    wx:{
        wechatRedirectUrl: "http://escore.vpks.net/auth", // 授权回调地址
        wechatToken: "LAN-AUTH", //第一次在微信控制台保存开发者配置信息时使用
        appId: "",
        appSecret: "",
        card: false, //开启卡券支持，默认关闭
        payment: true, //开启支付支持，默认关闭
        /** 服务商支付商户号码 */
        sp_mchid:"",
        /** 带有收付通功能的服务商号码 */
        sp_mchid_xy:"",
        /** 服务商支付回调通知地址 v3 */
        notify_url:"https://escore.vpks.net/api/PayV3",
        /** 带有收付通功能的服务商支付回调通知地址 v3 */
        notify_url_xy:"https://escore.vpks.net/api/PayV3XY/",
        /** 服务商V3key */
        apiV3Key:"",
        merchantId: '', //商户ID 清水湾
        // paymentSandBox: true, //沙箱模式，验收用例
        paymentKey: '', //V2key必传，验签密钥，TIP:获取沙箱密钥也需要真实的密钥，所以即使在沙箱模式下，真实验签密钥也需要传入。
        paymentCertificatePfx: "",//
        paymentNotifyUrl: `https://escore.vpks.net/api/pay/`,//支付通知地址
        app_appId:'',
        app_appSecret:"",
        miniProgram: {
            "appId": "",
            "appSecret": "",
        }
    },
    devList:[107,250,104,95,248,258,326,3,338,5177,1708,5490,5584,6719,6733,5526,6719,5639,5497,6783,6782,6710,6783,6784,6809,6765,7504],
    // 百度智能云开发平台KEY
    baidu:{
        AppID:0,
        APIKey:'',
        SecretKey:'',
    },
}
// 生产模式
const production = 
{
    /** 前缀P */
    env:'P',
    http_port:3011,
    http_base:'/app',
    /** 智能锁服务器地址 */
    lock_server:'mqtt://127.0.0.1:1883',
    /** 连接智能锁mqtt服务器的连接名称 */
    lock_name:'p_backend_server',
    wss_port:3012,
    wss_base:'/io',
    redis:{host:'127.0.0.1',port:6379,pass:'#newlan#',prefix:'newlan:'},
    // 阿里短息配置
    sms:{accessKeyId:'',accessKeySecret:"",signName:'ESCore'},
    /** AI Agent 模型服务配置；填写 apiKey 后框架首页将允许 AI 对话链接入。 */
    ai:{apiKey:'',baseURL:'',model:''},
    sql:{database:'kxyk_sam322.com',username:'kxyk_sam322.com',password:'4fpzka8wxrwfD2Y4',host:'127.0.0.1',port:3306},
    jwt:'newlan#1',
    wx_auth_type:'unionid',//微信授权时ID类型
    qiniu:{
        AK:"",
        SK:"",
        scope:"smkjm",//空间名
        url:"https://smkjm.vpks.net/"
    },
    wx:{
        wechatRedirectUrl: "http://escore.vpks.net/auth", // 授权回调地址
        wechatToken: "LAN-AUTH", 
        appId: "",//公众号APPID
        appSecret: "",
        card: false, //开启卡券支持，默认关闭
        payment: true, //开启支付支持，默认关闭
        // merchantId: '1550598311', //商户ID
        /** 服务商支付商户号码 */
        sp_mchid:"",
        /** 带有收付通功能的服务商号码 */
        sp_mchid_xy:"",
        /** 服务商支付回调通知地址 v3 */
        notify_url:"https://escore.vpks.net/api/PayV3/",
        /** 带有收付通功能的服务商支付回调通知地址 v3 */
        notify_url_xy:"https://escore.vpks.net/api/PayV3XY/",
        /** 服务商V3key */
        apiV3Key:"",
        merchantId: '', //商户ID 清水湾
        paymentKey: '', //必传，验签密钥，TIP:获取沙箱密钥也需要真实的密钥，所以即使在沙箱模式下，真实验签密钥也需要传入。
        paymentCertificatePfx: "",
        paymentNotifyUrl: `https://escore.vpks.net/api/pay/`,//支付通知地址
        /** 开薪怡客AA APPID */
        app_appId:'',
        app_appSecret:"",
        miniProgram: {
            /** 开新怡客小程序APPID */
            "appId": "",
            "appSecret": "",
        }
    },
    devList:[107,104,248,258,326,1708,5177],
    // 百度智能云开发平台KEY
    baidu:{
        AppID:0,
        APIKey:'',
        SecretKey:'',
    },
}
const config = process.env?.NODE_ENV == 'production' ? production : debug;
export default config;
