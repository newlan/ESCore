<!-- 设备耗材管理页面 -->
<style lang="stylus">
    @import "./Consumables.styl"
</style>
<template lang="pug">

div.ConsumablesSS
    div
        div(style="height: 2.6rem;")
            Title(:coms="{str:'耗材管理'}")
    //- 页面主体
    div.list
        el-tabs(type="border-card")
            el-tab-pane( label="供货商" )
                div list
                div.addConsumables 
                    div 
                    el-select(v-model="s" filterable placeholder="Select")
                        el-option(label="item0" :value="0")
                        el-option(label="item1" :value="1")
                        el-option(label="item2" :value="2")
                        el-option(label="item3" :value="3")
                        el-option(label="item4" :value="4")


                    div + 添加供货商1
            el-tab-pane( label="耗材销量" ) 
                div 9999
</template>

<script lang="ts">
import {coms as com} from "smkj"
export default { 
    name: "Consumables",
    components:{Title:com.Title},
};
</script>


<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch, KeepAlive} from "vue";
import { useRouter,useRoute } from "vue-router";
// import { kxyk,io} from "@/libs/smkj";
import {kxyk,Api,io,__} from "smkj";
const s = ref('');
// const route = useRoute();
// const emit = defineEmits(['submit','addSuccess']);




onMounted(()=>{

});


</script>


