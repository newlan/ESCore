
<style lang="stylus">
@import "./Modal2.styl" 
</style>
<template lang="pug">
div.Model2(ref="SelectGoods_Model2")
a-modal(v-model:visible="p.open" :getContainer="()=>SelectGoods_Model2" :closable="true" okText="保存") 
        template(#title)
            div.t1
                slot(name="title")
        template(#footer)
            div.t2
                slot(name="footer")
        div.c
            slot


</template>

<script setup="props,context" lang="ts">
import { ref,getCurrentInstance,onMounted,reactive,watch} from "vue";
import {kxyk,io,Api} from 'smkj'


const emit = defineEmits(['ok']);
const props = withDefaults(defineProps<{p:sm.Com.Modal2P}>(), {});
const SelectGoods_Model2 = ref(null);
onMounted(()=>{
    // console.log(kxyk.user);
    // init();
})

</script>
