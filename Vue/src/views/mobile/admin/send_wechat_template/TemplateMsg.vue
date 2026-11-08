<style scoped lang="stylus">
:deep(.el-date-editor)
    width :100%;
.TemplateMsg 
    font-size: 14px;
    .cc 
        padding: 5px;
        .a 
            padding: 9px; background: #409eff; margin: -5px -5px 10px -5px; color: white;
    .r 
        width: 100%; 
    .ccc 
        align-items: center; background: #f1f1f1; padding: 5px; margin: -5px -5px 5px -5px;
    .yulan  
        padding: 10px; background: #f1f1f1; 
        .c1 
            background: #fff; border-radius: 5px;     padding-bottom: 16px;
        .c2 
            text-align: left; margin: 9px 0px 0px 17px; font-size: 16px; font-weight: bold; 
        .c3 
            text-align: left; padding: 12px 17px; word-wrap: break-word;
        .c4 
            padding-left: 17px; text-align: left; align-items: center;
        .c5 
            padding:10px 17px; text-align: left; word-wrap: break-word;
        .c6 
            border-top: 1px solid #efefef; padding: 10px 17px; 
</style>
<template lang="pug">

div
    div.TemplateMsg
        div.cc(v-if="msg.type === '1'")
            div.a 设置模板消息内容
            el-form( label-position="left" label-width="70px" :model="msg" style="max-width: 100%" )
                el-form-item(label="头部描述")
                    el-row.r
                        el-col(:span="24")
                            el-input( v-model="msg.title" maxlength="60" placeholder="请输入头部描述" :rows="4" show-word-limit type="textarea" )
                        //- el-col(:span="4")
                        //-     <el-color-picker v-model="msg.title_color" />
                el-form-item(label="活动时间")
                    el-row 
                        el-col(:span="11")
                            el-date-picker( v-model="msg.start" type="date" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" )
                        el-col(:span="2")
                            div 至
                        el-col(:span="11")
                            el-date-picker( v-model="msg.end" type="date" placeholder="可不选" format="YYYY-MM-DD" value-format="YYYY-MM-DD" )
                el-form-item(label="备注")
                    el-row.r
                        el-col(:span="20")
                            el-input( v-model="msg.detall" maxlength="160" placeholder="请输入头部描述" :rows="4" show-word-limit type="textarea" )
                        el-col(:span="4")
                            <el-color-picker v-model="msg.detall_color" />
            el-row.ccc 
                el-col(:span="16")
                    div 本次通知用户数量：{{msg.count}}
                        span(v-if="disabled" style="color: #07c160;margin-left: 10px;") 通知成功
                el-col(:span="8")
                    <el-button type="primary" :disabled="disabled" @click="send" :loading="loading">开始通知</el-button>
        div.cc(v-if="msg.type === '2'")
            div.a 设置模板消息内容
            el-form( label-position="left" label-width="70px" :model="msg" style="max-width: 100%" )
                el-form-item(label="头部描述")
                    el-row.r
                        el-col(:span="24")
                            el-input( v-model="msg.title" maxlength="60" placeholder="请输入头部描述" :rows="4" show-word-limit type="textarea" )
                el-form-item(label="替代车牌")
                    el-row.r 
                        el-col(:span="20")
                            el-input( v-model="msg.car_number" maxlength="60" placeholder="该字段内容会替代车牌号" )
                        el-col(:span="4")
                            <el-color-picker v-model="msg.car_number_color" />
                el-form-item(label="活动时间")
                    el-row 
                        el-col(:span="9")
                            el-date-picker( v-model="msg.start" type="date" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" )
                        el-col(:span="2")
                            div 至
                        el-col(:span="9")
                            el-date-picker( v-model="msg.end" type="date" placeholder="可不选" format="YYYY-MM-DD" value-format="YYYY-MM-DD" )
                        el-col(:span="4")
                            <el-color-picker v-model="msg.time_color" />
                el-form-item(label="详情描述")
                    el-row.r
                        el-col(:span="20")
                            el-input( v-model="msg.detall" maxlength="60" placeholder="请输入头部描述" :rows="4" show-word-limit type="textarea" )
                        el-col(:span="4")
                            <el-color-picker v-model="msg.detall_color" />
            el-row.ccc 
                el-col(:span="16")
                    div 
                        //- span(v-if="disabled" style="color: #07c160;margin-left: 10px;") 通知成功
                el-col(:span="8")
                    <el-button type="primary" :disabled="disabled" @click="send" :loading="loading">开始通知</el-button>
            
        //- 消息预览
        div.yulan
            div.c1 
                div 
                    el-row 
                        el-col(:span="20")
                            div.c2 服务生效通知
                        el-col(:span="4")
                            div.c2(style="text-align: center;") ...
                div.c3(:style="{color:msg.title_color}") {{msg.title}}
                el-row.c4 
                    el-col(:span="6" style="color:#b9b9b9;") 车牌号码：
                    el-col(:span="18" :style="{color:msg.car_number_color}") {{msg.car_number}}
                el-row.c4(style="margin: 5px 0;") 
                    el-col(:span="6" style="color:#b9b9b9;") 服务有效期：
                    el-col(:span="18" :style="{color: msg.time_color}") {{msg.start}}{{msg.end?' 至 '+msg.end:''}}
                el-row.c4
                    el-col(:span="6" style="color:#b9b9b9;") 备注
                    el-col(:span="18" :style="{color:msg.detall_color}" style="word-break: break-all;padding: 10px;padding-left: 0px;") {{msg.detall}}
                div
                    el-row.c6 
                        el-col(:span="20" style="text-align: center;")
                            div(style="text-align: left;") 详情
                        el-col(:span="4" style="text-align: right;color: #dbdbdb;")
                            span >
</template>

<script lang="ts">

export default { 
    name: "TemplateMsg",
};
</script>
<script setup lang="ts">
import { ref, reactive,useAttrs ,onMounted,createVNode,h} from "vue";
import { useRoute } from "vue-router";

import {kxyk,Api,io} from "smkj";
const disabled = ref(false);
const loading =ref(false);
const route = useRoute();

const send=()=>{
    // if(!msg.detall || !msg.title || !msg.start) return kxyk.msg.error('请填写必要参数');
    if(!msg.detall) return kxyk.msg.error('请填写备注');
    if(!msg.title) return kxyk.msg.error('请填写头部描述');
    if(!msg.start) return kxyk.msg.error('请选择活动日期');
    loading.value = true;
    // console.log('点击了通知按钮');
    kxyk.sk.be(Api.shop.Admin.sendTemplateMsg,{msg:msg},res=>{
        if(res.status){
            loading.value = false;
            disabled.value = true;
            kxyk.msg.success('发送成功。');
        }
    });
    // setTimeout(() => {
    //     loading.value = false;
    // }, 2000);
}
const msg = reactive({
    title:'',
    title_color:'#bfbfbf',
    start:'',time_color:"#409EFF",
    end:'',detall:'',detall_color:'#409EFF',car_number_color:"#bfbfbf",
    count:0,url:'',type:route.params.type,car_number:"",
});
const init=()=>
{
    kxyk.sk.be(Api.shop.Admin.getSmxcVipCount,{},res=>{
        if(res.__error__){
            return kxyk.toUrl('/404');
        }
        if(res.status){
            msg.count = res.count as any;
        }
    });
}
onMounted(()=>{
    init();
});



</script>


