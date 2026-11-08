<!-- 推广活动页面 -->
<style scoped lang="stylus">
@import "./PromotingActivities.styl"
</style> 

<!-- 页面模板 -->
<template lang="pug">
div.Activities 
    div.title
        div(style="height: 2.6rem;")
            Title(ref="titlecom" :coms="{str:'活动管理'}")
                template(#right)
                    div.cog(style="text-align: center;" @click="")
                        i.fa.fa-plus
    div.list 
        el-tabs( v-model="dbs.has_tab" type="border-card" editable class="demo-tabs" @edit="")
</template>

<!-- 导出页面名称 -->
<script lang="ts">
export default { 
    name: "PromotingActivities",
};
</script>

<!-- vue setup函数语法糖 -->
<script setup lang="ts">

import { ref , reactive,useAttrs ,onMounted} from "vue";
import {kxyk,Api,io} from "smkj";
import Title from "@/views/com/Title.vue";//头部导航
import  gsap  from "gsap";

const dbs = reactive({
    
    has_tab:'',
})
</script>