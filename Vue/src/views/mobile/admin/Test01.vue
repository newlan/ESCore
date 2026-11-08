<style lang="stylus">
    @import "./Test01.styl"
</style>
<template lang="pug">
div 进入页面
</template>

<script lang="ts">
export default { 
    name: "Test01",
    components:{},
};
</script>


<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch, KeepAlive} from "vue";
import { useRouter,useRoute } from "vue-router";
// import { kxyk,io} from "@/libs/smkj";
import {kxyk,Api,io,__} from "smkj";

const route = useRoute();
const emit = defineEmits(['submit','addSuccess']);


/** 页面初始化 */
const init = () =>{
    kxyk.sk.be(Api.shop.A2.Test01,{ID:123,tt:456},res=>{
        console.log(res);
        console.log(res.db.a);
        
    })
}
onMounted(()=>{
    /** dom挂载完毕 */
    init();
});


</script>


