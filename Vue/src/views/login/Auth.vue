

<template lang="pug">
div(style="color: #fff;") 正在登录

</template>

<script lang="ts">
// import {resArgs} from "smkj";
// console.log(resArgs);
import { Api , kxyk,cookie} from "smkj";


export default {name:'Auth'}
</script>

<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted} from "vue";
//vue mounted
onMounted(()=>{

});


// 公众号授权回调
let {code, state}:any = kxyk.R?.currentRoute.value?.query;
if(code)
{
    kxyk.sk.be(Api.newlan.getUserInfo,{code:code,state:'wx'},(res:sm.resArgs)=>{
        if(res.status)
        {
            cookie.set('token',res.db,{expires:365});
            kxyk.user.token = res.db;
            let url = decodeURIComponent(state);
            if(url)
            {
                kxyk.R?.push(url);
            }else{
                kxyk.R?.push('/');
            }
        }else{
            // alert(res.db);
            kxyk.R?.go(-1);
        }
    });
}
// 小程序授权回调
let {token,back}:any = kxyk.R?.currentRoute.value?.query;
if(token)
{
    cookie.set('token',token,{expires:365});
    kxyk.user.token = token;
    if(back){
        kxyk.R?.push(decodeURIComponent(back));
        // kxyk.R?.push('/');
    }else{
        kxyk.R?.push('/');
    }
}
console.log('这里是参数',kxyk.R?.currentRoute);
console.log(token,back);


</script>


