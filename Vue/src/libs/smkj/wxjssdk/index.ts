import WechatJSSDK from 'wechat-jssdk/dist/client.umd';
import { ElMessage ,Message} from "element-plus";
import { io ,Api,state,Utils,cookie,kxyk} from 'smkj';
import State from '../state';
export default class WxJssdk
{
    private IosUrl:string|false;
    private sk:io.sk;
    private state:State;
    private utils:sm.Utils
    private wxsdk:any;//缓存
    private plus:any;
    private config:{[x:string]:any} = {
        appid:'wx416cad30d2b92eb4',
        jsApiList:[ 'hideMenuItems', 'scanQRCode','onMenuShareTimeline','onMenuShareAppMessage','chooseWXPay', 'updateAppMessageShareData', 'updateTimelineShareData', 'getLocation']
    };
    constructor(sk:io.sk,utils:sm.Utils,st:State){
        if(utils.sys.is_ios && !utils.sys.is_wxapp)
        {
            this.IosUrl = document.location.href;
        }else{
            this.IosUrl =false;
        }
        this.utils = utils;
        this.state = st;
        this.sk=sk;
        if(window.plus) {
            this.plus = window.plus;
        } else {
            document.addEventListener('plusready',()=>{
                this.plus = window.plus;
            },false);
            // document.addEventListener('plusready', plusReady, false);
        }
    }
    /** 获得H5Plus对象 */
    async GetH5Plus():Promise<any>
    {
        if(this.plus) return this.plus;
        await this.utils.sleep(50);
        return this.GetH5Plus();
    }
    /** 微信静默授权 */
    async BaseAuth()
    {
        console.log(window.location.origin);
        let redirect_uri = encodeURIComponent(`${window.location.origin}/wxauth`);
        let state = encodeURIComponent(this.state.get('back_url'));
        let URL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.config.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
        console.log('授权跳转地址',URL);
        
        window.location.href = URL;
    }
    // 公众号授权
    Auth(){
        let redirect_uri = encodeURIComponent(`${window.location.origin}/auth`);
        let state = encodeURIComponent(this.state.get('back_url'));
        let RUL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.config.appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
        window.location.href = RUL;
    }
    /** 微信多环境分享 type:Friend|Moments */
    /**
     * 微信多环境分享
     * @param db 分享数据
     * @param type 分享类型 - Friend = 好友 Moments = 朋友圈
     */
    async Share(db:any,type:string="Friend")
    {
        if(this.utils.sys.is_wx && !this.utils.sys.is_wxapp)
        {
            // 公众号分享
            // kxyk.WxJsdk.API(['onMenuShareAppMessage','onMenuShareTimeline'],data);
            let f = '';
            let m = "";
            if(type==='Friend')
            {
                f = 'onMenuShareAppMessage';
                m = "好友";
            }
            if(type === 'Moments'){
                f = 'onMenuShareTimeline';
                m = "朋友圈";
            }
            await this.API(f,db);
            kxyk.msg.success('配置成功，请点击右上角分享至'+m);
        }
        if(this.utils.sys.is_wxapp)
        {
            console.log('这里进入小程序分享环境',db,kxyk.user);
            if(!kxyk.user.uid){
                kxyk.msg.error('小程序分享需先登录！');
            }else{
                this.sk.so_('wxapp_set_share',{db:db,uid:kxyk.user.uid}).then(res=>{
                    console.log(res);
                    kxyk.msg.success('小程序分享配置成功，请点击右上角分享。');
                })
            }

            
        }
        if(this.utils.sys.is_app)
        {
            let wx_share:any={};
            window.plus.share.getServices(function(s:any) {
                for (var i in s) {
                    if (s[i].description == '微信') {
                        wx_share.wx_share=s[i];
                    }
                }
                var msg = {
                    title: db.title ? db.title : '三募科技-共享社群@您',
                    thumbs: [db.imgUrl ? db.imgUrl : ""],
                    href: db.link,
                    content: db.desc ? db.desc :"让生意简单快乐",
                    extra: {
                        scene: ""
                    }
                };
                if(type == "Friend")
                {
                    msg.extra.scene = "WXSceneSession";
                }
                if(type == "Moments")
                {
                    msg.extra.scene = "WXSceneTimeline";
                }
                wx_share.wx_share.send(msg, function(res:any) {
                    if(db.success)
                    {
                        db.success(res);
                    }
                });
            }, function(e:any) {
                window.plus.nativeUI.alert("分享失败：请重新分享");
            });
        }
    }
    /** APP授权 */
    async AppAuth():Promise<boolean>
    {
        let puls = await this.GetH5Plus();
        return new Promise((resolve,reject)=>{
            puls.oauth.getServices((services:any)=>{
                let service:any = null;
                console.log('servers',services);
                
                services.forEach((element:any) => {
                    if(element.id === 'weixin') service = element;
                });

                if(!service){
                    // service.authorize(function(e:any){
                    //     // plus.nativeUI.alert("授权成功："+JSON.stringify(e));
                    //     console.log('授权成功',e);
                        
                    // }, function(e:any){
                    //     console.log(e);
                        
                    // }, {scope:'snsapi_userinfo',appid:'wx92d783aff98bb0c1'});

                    service.login(async ()=>{
                        try {
                            let res = await this.sk.be_(Api.newlan.AppAuthLogin,service.userInfo);   
                            
                            // if(res.status)
                            // {
                            //     cookie.set('token',res.db,{expires:365});
                            //     kxyk.user.token = res.db;
                            //     resolve(true);
                            // }else{
                            //     resolve(false);
                            // }
                        } catch (error) {
                            resolve(false);
                        }
                        
                    },(e:any)=>{
                        switch (e.code) {
                            case -2:
                                ElMessage.error('取消授权，切换至手动登录。');
                                break;
                            case -8:
                                ElMessage.error('客户端没有安装微信，切换至手动登录。');
                                break;
                            case -100:
                                ElMessage.error('您点击了决绝微信授权，切换至手动登录。');
                                break;
                            default:
                                ElMessage.error('APP授权失败，切换至手动登录。');
                                break;
                        }
                        console.log(e,'这里发生错误1');
                        resolve(false)
                    })
                }else{
                    resolve(false)
                }
            });
        })

        return false;
    }
    /** 获取jssdk签名 */
    async GetSing()
    {
        //ios 域名注入暂时关闭
        // let url = this.IosUrl?this.IosUrl:document.location.href;
        let url = document.location.href;
        return await this.sk.be_(Api.newlan.getWxSing,{url:url},false);
    }
    /** 获取完成签名后的jssdk */
    private async get_wxsdk()
    {
        let sing = await this.GetSing();
        if(sing.status)
        {
            let config = Object.assign(this.config,sing.db);
            const wxjs = WechatJSSDK(config);
            try {
                const sdk = await wxjs.initialize();
                this.wxsdk = sdk;
                return sdk;
            } catch (error:any) {
                console.log('这里获取sdk 初始化时发生错误',error);
                // kxyk.msg.error(error.errMsg);
                // alert('这里发生sdk初始化失败'+JSON.stringify(error))
            }
        }
    }
    /** 调用微信JSSDK_API方法 */
    async API(apiName:string|Array<string>,data:{[x:string]:any})
    {
        console.log(apiName,data);
        
        try {
            // 微信环境
            if(this.utils.sys.is_wx)
            {
                let sdk:any;
                if(this.wxsdk)
                {
                    sdk = this.wxsdk;
                }else{
                    sdk = await this.get_wxsdk();
                }  
                console.log(sdk);
                
                if(typeof apiName === 'string'){
                    sdk.callWechatApi(apiName,data);
                }else{
                    apiName.forEach(a=>{
                        sdk.callWechatApi(a,data);
                    });
                }
            }
        } catch (error) {
            console.log('这里发生错误20',error);
            let err = error as TypeError;
            // ElMessage.error(err.message);
        }
    }
}