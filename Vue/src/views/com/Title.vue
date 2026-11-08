<style scoped lang="stylus">
.Title1
    background: #f9f9f9; color: #0e0e0e; font-size: 1.15rem; position: absolute; width: 100%; top: 0; z-index: 800;
    .row 
        display: flex; align-items: center; height :2.6rem
        .left 
            text-align: left; padding-left: .5rem; padding-top: .1rem; 
        .c1 
            text-align: center
.Title
    background: #6688EE;color: white; font-size: 1.15rem;position: absolute; width: 100%; top: 0; z-index:800
    .row 
        display: flex; align-items: center; height :2.6rem
        .left 
            text-align: left; padding-left: .5rem; padding-top: .1rem; 
        .c1 
            text-align: center
</style>
<template lang="pug">

div 
    div(:class="[coms.type ? 'Title1' : 'Title']")
        a-row.row 
            a-col.left(span="3" @click="back")
                i.fa.fa-chevron-left
            a-col(span="18")
                div.c1 {{coms.str}}
            a-col(span="3")
                div
                    slot(name="right")
        
</template>

<script lang="ts">
export default { 
    name: "Title",
    components:{},
};
</script>
<script setup lang="ts">
import { kxyk } from "smkj";


const back = () =>
{
    if(props.coms.back){
        kxyk.R?.push(props.coms.back);
    }else{
        kxyk.R?.go(-1);
    }
    // console.log('点击回退');
}
interface Props {
    coms?:any
}
// 接受参数
const props = withDefaults(defineProps<Props>(), {
    coms:
    {
        str:'开薪怡客',
        back:null,
        type:0
    }
})
</script>


