<style scoped lang="stylus">
    @import "./Camera.styl"
</style>
<template lang="pug">

div.Camera(v-if="coms.open")
    div.video(v-loading="loading")
        video(ref="video" :srcObject="stream" autoplay :width="vw" :height="vh")
    div.video(style="left: -1000px;")
        canvas(ref="canvas" :width="vw" :height="vh")
    div.but
        div.view1
                div.view(v-if="is_show_photo")
                    img(:src="cameraImg" style="width: 100%; height: 100%;")
                div.text {{poptext}}
                div.ssuser(v-if="is_user")
                    div
                        img.Suser(:src="Suser.avatar")
                    div.nickname 
                        div 用户：{{Suser.nickname}}  
                        div 车牌：{{Suser.number}}
                    div.button
                        el-button(type="success" size="large" @click="") 代客下单
                div.ssuser(v-if="is_reg_number")
                    div.noMember 车牌{{distinguish_number}}暂无绑定会员
                    div.noStr 要注册会员请联系用户扫到店码;
                    div.noStr 以当前车牌游客下单请点击游客下单；
                    div.buuu
                        //- el-button(type="success" size="large" @click="on_reg_number") 注册会员
                        el-button(type="primary" size="large" @click="") 游客下单
                
        div.botton
            a-row
                a-col(span=12 style="padding-right: 5px;")
                    el-button.w100(size="large" @click="coms.open = false,close_camera()") 取消
                a-col(span=12 style="padding-left: 5px;")
                    el-button.w100(type="primary" size="large" @click="photograph") 点击拍照
</template>

<script lang="ts">
import  gsap  from "gsap";
export default { 
    name: "Camera",
    components:{},
};
</script>
<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch} from "vue";
import {kxyk,Api,io,store} from "smkj";

interface Props {
    coms:{
        open:boolean,//是否显示相机内容
    }
}

const props = defineProps<Props>();
// const emit = defineEmits(['location']);
const video=ref(); 
const canvas=ref();
const stream = ref()
const cameraImg=ref();
const vw = ref(350);
const vh = ref(550);
/** 当前硬件是否兼容 */
const is_compatible = ref(false);
const is_show_photo = ref(false);
const poptext=ref('等待拍照');
const loading = ref(false);
const is_user = ref(false);//搜索结果是否会员
const Suser = reactive({avatar:'',nickname:'',number:'',uid:0});
const is_reg_number = ref(false);//是否需要注册会员
const distinguish_number = ref('');//识别的号码
const is_reg = ref(false);//注册弹框是否打开
const reg_number = reactive({nickname:'',phone:'',car_number:'',type:0});
const is_submit =ref(true);//是否可以递交注册



onMounted(()=>{
    vw.value = document.body.clientWidth;
    vh.value = document.body.clientHeight;
});
watch(
    ()=>props.coms.open,
    (a,b)=>{
        a && init();
    }
)

let caseStream:any = null;
const close_camera = ()=>{
    console.log('这里执行关闭',caseStream);
    
    if(caseStream){
        caseStream.stop();
    }
}
const photograph = ()=>
{
    if(is_compatible.value){
        let ctx = canvas.value.getContext('2d');
        // 初始化会员相关
        is_user.value = false;
        is_reg_number.value = false;
        ctx.drawImage(video.value,0,0,vw.value,vh.value);
        const image0 = canvas.value.toDataURL('image/png');
        cameraImg.value = image0;
        is_show_photo.value = true;
        poptext.value = '请稍等,正在识别车牌号码';
        loading.value = true;
        kxyk.sk.be(Api.shop.D1.DistinguishCarNumber,{img:image0},res=>{
            console.log('识别结果',res);
            loading.value = false;
            if(res.status){
                is_show_photo.value = false;//关闭拍照图片
                poptext.value = '识别车牌号码：'+res.msg+',若AI识别错误请重新拍照识别.';

                if(res.user){
                    // 有会员
                    is_user.value = true;
                    Suser.avatar = res.user.avatar;
                    Suser.nickname = res.user.nickname;
                    Suser.number = res.user.number;
                    Suser.uid = res.user.uid;
                }else{
                    // 可注册
                    if(res.msg) distinguish_number.value = res.msg;
                    is_reg_number.value = true;
                }
            }else{
                poptext.value = '车牌识别失败，请重新拍照识别！';
            }
            
        })
    }else{
        poptext.value = '当前硬件不兼容！';
        console.log('当前硬件不兼容');
        // kxyk.msg.error('当前环境不兼容！');
    }
    
    
}
// 兼容性写法

const init = async()=>{
    is_user.value = false;
    distinguish_number.value = '';
    is_reg_number.value = false;
    try {
        let getStream =await navigator.mediaDevices.getUserMedia({video:
        {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 776, ideal: 720, max: 1080 },
            facingMode:"environment",
        },audio:false});
        stream.value = getStream;
        caseStream = getStream.getTracks()[0];
        video.value.play();

        is_compatible.value = true;
    } catch (error) {
        poptext.value = '浏览器不兼容，初始化！';
        console.log(error);
        navigator.mediaDevices.getUserMedia({video:
        {
            width: { min: 1024, ideal: 1280, max: 1920 },
            height: { min: 776, ideal: 720, max: 1080 },
            facingMode:"environment",
        },audio:false}).then(function(stream){
        })
    }
    

}


</script>


