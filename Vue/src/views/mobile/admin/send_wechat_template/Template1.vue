<style scoped lang="stylus">
:deep(.el-date-editor)
    width :100%;
.Template 
    font-size: 14px;
    .cc 
        padding: 5px;
        .a 
           text-align: center;  padding: 9px; background: #409eff; margin: -5px -5px 10px -5px; color: white;
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
div.Template(ref="modal1")
    a-modal.n1(v-model:visible="msg.open" width="60%" wrap-class-name="full-modal-a1" :getContainer="()=>modal1"  v-if="msg.open") 
        template(#footer)
            a-row(style="text-align: center;" :gutter="10")
                a-col(span="12")
                    a-button( block  @click="closeDialog") 取消
                a-col(span="12")
                    a-button(type="primary" :disabled="disabled" @click="send" :loading="loading" block) 发送
        div.cc
            div.a 设置模板消息内容
            el-form(label-position="left"  :model="props" style="max-width: 100%" ref="temform")
                el-form-item(prop="msg.title")
                    el-row.r
                        el-col(:span="24" style="text-align:left;") 活动标题:
                    el-row.r
                        el-col(:span="24")
                            el-input(v-model="msg.title" maxlength="60" placeholder="请输入活动标题" :rows="4" show-word-limit type="textarea" )
                el-form-item(prop="msg.detall")
                    el-row.r
                        el-col(:span="24" style="text-align:left;") 活动描述:
                    el-row.r
                        el-col(:span="24")
                            el-input(v-model="msg.detall" maxlength="60" placeholder="请输入活动描述" :rows="4" show-word-limit type="textarea" )
    
    
</template>

<script lang="ts">

export default {
    name: "Template1",
};
</script>
<script setup lang="ts">
import { ref, reactive, useAttrs, onMounted, createVNode, h, watch } from "vue";
import { useRoute } from "vue-router";
import { Dialog } from 'vant';
import { kxyk, Api, io } from "smkj";
const disabled = ref(false);
const loading = ref(false);
const route = useRoute();
let modal1 = ref(null);
const temform = ref();
const send = () => {
    // if(!msg.detall || !msg.title || !msg.start) return kxyk.msg.error('请填写必要参数');
    //if(! props.msg.detall) return kxyk.msg.error('请填写备注');
    if (!props.msg.title) return kxyk.msg.error('请填写头部描述');
    // if(! props.msg.start) return kxyk.msg.error('请选择活动日期');
    loading.value = true;
    // console.log('点击了通知按钮');
    kxyk.sk.be(Api.lcy.sendTempMsg, { msg: props.msg }, res => {
        if (res.status) {
            loading.value = false;
            disabled.value = true;
            kxyk.msg.success('发送成功。');
            location.reload();
        }
    });
    // setTimeout(() => {
    //     loading.value = false;
    // }, 2000);
}
interface Props {
    msg: any;
}
const closeDialog = () => {
    props.msg.open = false;
    temform.value.resetFields();
    init();
}
const props = withDefaults(defineProps<Props>(), {

    msg: {
        title: '',
        title_color: '',
        start: '',
        time_color: "",
        end: '',
        detall: '',
        detall_color: '',
        car_number_color: "",
        count: 0,
        url: '',
        //  type:route.params.type,
        car_number: "",
        open: '',
        value: ''
    }
})

const init = () => {
    kxyk.sk.be(Api.shop.Admin.getSmxcVipCount, {}, res => {
        if (res.__error__) {
            return kxyk.toUrl('/404');
        }
        if (res.status) {
            props.msg.count = res.count;
        }
    });
}
onMounted(() => {
    init();
});


</script>


