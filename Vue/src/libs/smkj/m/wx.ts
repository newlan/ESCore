
import { kxyk } from "smkj";
export const wxAuth = ()=>
{
    let redirect_uri = encodeURIComponent('http://EScroe.vpks.com/auth');
    let state = encodeURIComponent(kxyk.state.get('back_url'));
    let RUL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${kxyk.WxJsdk}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
    window.location.href = RUL;
}