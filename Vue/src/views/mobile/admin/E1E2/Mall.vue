<style scoped lang="stylus">
@import "./Mall.styl"
</style>
<template lang="pug"> 

div.Mall-10
    div.err(v-if="dbs.is_err")
        a-result(status="500" :title="dbs.err_msg" :sub-title="dbs.err_msg_sub")
    div(v-else)
        div.title {{ dbs.info.i2_name }} - 自主购卡
        div(v-if="dbs.list && dbs.list.length > 0")
            div(v-for="c in dbs.list")
                CouponBase(:item="c" :type="'E1'")
        div.nlist(v-else) 暂无卡券
    div.but 
        span ©2022-2023 三募科技

</template>

<script lang="ts">

export default { 
    name: "Mall",
};
</script>
<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,createVNode,h} from "vue";

import CouponBase from "@/views/com/coupon/CouponBase.vue";
// import { Goods } from '@element-plus/icons-vue'
// import ScanQr from "@/views/com/system/ScanQr.vue";
import  gsap  from "gsap";

import { useRouter,useRoute } from "vue-router";
import {kxyk,Api,io} from "smkj";

const route = useRoute();


const tset = ref(null);
interface dbs{
    /** 合伙人ID */
    eid:number,
    /** 卡券列表 */
    list:any[],
    /** 页面是否有错误 */
    is_err:boolean,
    /** 页面错误消息提示标题 */
    err_msg?:string
    /** 页面错误副标题 */
    err_msg_sub?:string
    /** 合伙人数据 */
    info:any
}
const dbs = reactive<dbs>({
    eid:parseInt(route.params.eid as string),
    list:[],is_err:false,err_msg:'页面访问错误！',info:false
})


/** 初始化 */
const init = ()=>{
    kxyk.sk.be(Api.shop.U.GetMallInit,{eid:dbs.eid},res=>{
        // console.log(res);
        if(res.__error__){
            dbs.is_err = true;
            dbs.err_msg_sub = res.msg;
            return false;
        }
        if(res.status){
            //合伙人数据
            if(res.db && res.db.info) dbs.info = res.db.info;
            // 可出售卡券列表
            if(res.db && res.db.list) dbs.list = res.db.list;
        }
    },false)
}
onMounted(()=>{
    // /** 指定页面容器高度 */
    // kxyk.utils.DOM.get_win_last_higth(['concon','foot']).then(e=>E1db.h = e-41)
    init()
});

</script>


