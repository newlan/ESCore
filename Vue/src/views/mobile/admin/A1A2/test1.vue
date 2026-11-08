<style scoped lang="stylus">
.AddGoods



    // .list2-move
    //     transition: all 1.2s ease; 
    .list2-enter-from,
    .list2-leave-to 
        opacity: 0;
        transform: translateX(300px);
    // .list2-enter-active
    //     position: absolute;
    .list2-leave-active 
        width: 100%;
        position: absolute;
    .list2-item 
        transition: all 1.2s; 
    
</style>
<template lang="pug">
div 
    div.AddGoods
        div(style="background: red;")
            a-button(block @click="add") 添加 
            transition-group(name="list2" tag="div")
                div.list2-item(v-for="element in goods" :key="element")
                    a-row
                        a-col.l.elesis(span="18") {{element}}
                        a-col.r(span="6" @click.stop="del_spec(element)")
                            i.fa.fa-trash.fa-fw
        
            transition-group(name="list2" tag="p")
                div.list2-item(v-for="element in goods1" :key="element")
                    div {{element}}


        
</template>

<script lang="ts">


export default { 
    name: "test1",
    components:{
    }
};
</script>
<script setup lang="ts">
import { ref ,reactive,onMounted,onActivated,computed,nextTick} from 'vue';
import gsap from "gsap";
import { kxyk } from "smkj";

const index = ref(10);
const index1 = ref(103);
const goods = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const goods1 = ref([100, 101, 102]);
const del_spec = (e:any)=>
{
    // kxyk.utils.Array._.remove(goods.value,(a)=>{
    //     return a === e;
    // })
}
const add = ()=>{
    goods.value.push(index.value++);
    goods1.value.push(index1.value++)
}
onMounted(()=>{
    // dom挂载完成
    // console.log(props.coms);
    
});
</script>


