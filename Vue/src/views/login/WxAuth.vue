

<template lang="pug">
div(style="color: #fff;") 正在登录

</template>

<script lang="ts">
// import {resArgs} from "smkj";
// console.log(resArgs);
import { Api,kxyk,cookie} from "smkj";
import { useRouter ,useRoute} from "vue-router";


export default {name:'WxAuth'}
</script>

<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted} from "vue";

const router = useRouter();
//vue mounted
onMounted(()=>{

});

// 公众号授权回调
let {code, state}:any = kxyk.R?.currentRoute.value?.query;
console.log('code and state',code,state);

if(code)
{
    kxyk.sk.be(Api.newlan.getUserInfoBase,{code:code,state:'wx'},(res:sm.resArgs)=>{
        let url = decodeURIComponent(state);
        if(res.status)
        {
            cookie.set('token',res.db,{expires:365});
            kxyk.user.token = res.db;
            
            if(url)
            {
                kxyk.R?.push(url);
            }else{
                kxyk.R?.push('/');
            }
        }else{
            /** 这里如果在微信环境拿到了OPENID 但没有拿到用户ID 就跳转到自动注册 */
            if(res.openid && res.type)
            {
                let par = `?openid=${res.openid}&type=${res.type}`;
                if(url) par += `&url=${url}`;
                kxyk.R?.push('/loginKxyk/0'+par);
            }
            // alert(res.db);
            // kxyk.R?.go(-1);
        }
    });
}else{
    alert('没有code');
}
// 小程序授权回调
let {token,url}:any = kxyk.R?.currentRoute.value?.query;
if(token)
{
    console.log('收到小程序返回的token',url);
    
    cookie.set('token',token,{expires:365});
    kxyk.user.token = token;
    if(url){
        kxyk.R?.push(decodeURIComponent(url));
        // kxyk.R?.push('/');
    }else{
        kxyk.R?.push('/');
    }
}



</script>


