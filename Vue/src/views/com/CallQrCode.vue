<style scoped lang="stylus">
.call_qr_code
    position: absolute; width: 100%; height: 100%; background: rgba(0 0 0 0.2); z-index: 1000; display: flex; align-items: center;justify-content: center
    .c1
        width: 21rem; height: 10rem; background: #AABBFF;border-radius: 0.65rem 0.65rem 0 0;
    .c2 
        width: 21rem; height: 3.2rem; background: #f7f7f7; border-radius: 0 0 0.65rem 0.65rem; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: bold;
    .qr
        position: absolute; width: 12rem; height: 12rem; background: #fff; border-radius: 0.55rem; box-shadow: 0 0 5px #ddd; left: 50%; transform: translate(-50%, -40%); padding: .68rem
        .code 
            width: 100%; height: 100%; background: #ababab;
    .dz 
        box-shadow: 0 0 8px #a3a3a3; border-radius: .65rem;
    .close 
        font-size: 1.5rem; margin-top: .66rem; color: white; text-shadow: 0 0 4px #787878;
.code 
    width: 100% !important; height: 100% !important;
._status
    font-size: 12px; margin-top: 1.5rem; opacity: 1; color: #fff; text-align: center; 
</style>
<template lang="pug">

div.call_qr_code(v-show ="coms.open" @click="coms.open = false") 
    div(@click.stop="")
        div.qr
            div.code
                //- vue-qr(text="测试编码" size="300")
                qr-code(:value="coms.url" class="code" id="canvasDom")
            div._status {{status}}
        div.dz
            div.c1 
            div.c2
                span(v-if="coms.role" style="color: red;") {{coms.role}}
                span {{coms.str}}
        div.close(@click="coms.open = false")
            van-icon(name="clear")



</template>

<script lang="ts">
import  gsap  from "gsap";
export default { 
    name: "CallQrCode",
    components:{},
};
</script>
<script setup lang="ts">


import { ref , reactive,useAttrs ,onMounted,watch} from "vue";
// import { kxyk,io} from "@/libs/smkj";
import {kxyk,Api,io} from "smkj";

interface Props {
    coms?:{
        url?:string,str?:string,open:boolean,role?:string
    }
}
const emit = defineEmits(['scan']);
let status = ref('等待扫码中.');
// 接受参数
const props = withDefaults(defineProps<Props>(), {
    coms:()=>{
        return {str:"请扫描二维码",url:kxyk.utils.host+"/ScanCode?type=1",open:false,role:''}
    }

})
if(!props.coms.url) props.coms.url = kxyk.utils.host+"/ScanCode?type=1";
if(!props.coms.str) props.coms.str = '请扫描二维码';


// 监控是否需要重新注册
 watch(
  () => props.coms.open,
  (count, prevCount) => {
    /* ... */
    if(count){
        // console.log("二维码被打开了");
        status.value = '等待扫码中.';
    }

  }
)
// 处理参数
let uuid = 'E' + kxyk.utils.getUUID(8);
// console.log('这里是客户端环境',kxyk.user);

if(props.coms.url.indexOf('?') !== -1)
{
    props.coms.url = props.coms.url+'&uuid='+uuid+'&ev='+kxyk.utils.getEvn()+'&uid='+kxyk.user.uid; 
}else{
    props.coms.url = props.coms.url+"?uuid="+uuid+'&ev='+kxyk.utils.getEvn()+'&uid='+kxyk.user.uid;
}

console.log('二维码地址',props.coms.url);

// 扫码回调
kxyk.sk.on(uuid,(res:any)=>{
    if(res.msg) status.value = res.msg;
    if(res.status)
    {
        // 这里已正确拿到数据
        emit("scan",res);
    }
    // console.log(res,'这里是用户扫码回调');
    
})

onMounted(()=>{
    // console.log('这里开始执行',gsap);
	gsap.to('._status',{opacity:0.41,repeat:-1,ease:'elastic',duration:1.5});

});



</script>


