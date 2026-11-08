<style scoped lang="stylus">
.AddGoods
    .h 
        position: fixed; bottom: 0px; width: 100%; height: auto; 
        .b0 
            border: 1px solid #e7e7e7; border-bottom-width: 0; overflow-y: auto;background: white;height :0px; 
            .ss1
                background: #f5f5f5; padding: 0.5rem; color: #939393;
        .b1 
            padding: .3rem; background: white;border: 1px solid #e7e7e7; border-top-width: 0;
    .base 
        padding: .5rem; line-height: 0;
        .c18
            display: flex; flex-direction: column; justify-content: center;
        .sname 
            padding: 0 .5rem;
    .all_ 
        transition: all .6s;
    .car_out 
        transform-style: preserve-3d;
        perspective-origin: 50% 50%; perspective: 400px; padding:0.1rem; position:relative; z-index:2; 
    .no1 
        flex: 0 0 0.001%; max-width: 0.001%; margin-left: -2px;
    .list-move
        // transition: transform 0.8s ease; 
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 1s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }

</style>
<template lang="pug">

div 
    div.AddGoods
        div.h
            div.b0
                a-row.base 
                    a-col(span="6")
                        upload(v-model:url="goods.goods_img" )
                    a-col.c18(span="18")
                        div.sname
                            a-input(v-model:value="goods.goods_name" placeholder="请输入服务名称如：洗车服务")
                        div.sname(style="margin-top: .5rem;")
                            a-input-search( v-model:value="spec_name" :placeholder="'请输入'+coms.spec_name" :enter-button="'添加'+coms.spec_name" @search="add_spec")
                div 
                    div.ss1(v-if="goods.spec.length <= 0")
                        span 暂无规格
                    div.ss1(v-else)
                        //- draggable(v-model="goods.spec" :animation="100" tag="transition-group" :component-data=" {name:'list',tag:'div', class:'car_out',}" group="people" item-key="id")
                        draggable(v-model="goods.spec" :animation="100" tag="transition-group" :component-data="getComponentData()" @before-enter="beforeEnter" @enter="enter1" group="people" item-key="id")
                            template(#item="{element}")
                                div(style="background-color: aliceblue;border: 1px solid white;margin: 3px;transition: all .8s ease;") {{element.spec_name}}

            div.b1
                a-row(:gutter="10") 
                    a-col.all_(:class="{'no1':!is_open_add}" :span="is_open_add?12:1")
                        a-button(v-if="is_open_add" block @click="close_add") 取消 
                    a-col.all_(:span="is_open_add?12:23")
                        a-button(v-if="is_open_add" type="primary" danger block @click="submit") 保存{{props.coms.label}}
                        a-button(v-else type="primary" block @click="open_add") 添加{{props.coms.label}}
        
</template>

<script lang="ts">
export default { 
    name: "Addgoodsfw",
};
</script>
<script setup lang="ts">
import { ref ,reactive,onMounted,onActivated} from 'vue';

import gsap from "gsap";
import { kxyk } from "smkj";
import draggable from 'vuedraggable';
import upload from "@/views/com/upload.vue";

const enter1 = (el:any, done:any)=>{
    console.log('11111111111111111',el,done);
    gsap.to(el, {
        opacity: 1,
        x:0,
        y:0,
        onComplete: done
    })
    
}
const getComponentData=()=>
{
    return {name:'list',tag:'div', class:'car_out'};
}
const beforeEnter=(el:any)=>
{
    gsap.to(el, {
        opacity: 0,
        x:-100,
        y:50
    })
}
const is_open_add = ref(false);//是否打开添加按钮
const spec_name = ref('');//缓存规格名称
const id = ref(0);
/** 添加规格 */
const add_spec = ()=>{
    if(!spec_name.value) return kxyk.msg.error('请输入'+props.coms.spec_name);
    if(kxyk.utils.find(goods.spec,{spec_name:spec_name.value})) return kxyk.msg.error(spec_name.value+'已存在');
    goods.spec.push({id:id.value++,spec_name:spec_name.value,suk:[]});
    console.log(goods.spec);
    
}


// 规格接口
interface spec {id?:number,spec_name:string,suk:any[]}
// 商品接口
interface good { id?:number,goods_name?:string,goods_img?:string,spec:spec[], }
// 初始化商品
const goods = reactive<good>({
    spec:[],goods_img:'https://cdn.jsdelivr.net/npm/@vant/assets/sand.jpeg',goods_name:'',
});
interface Props {
    coms?:any
}
// 接受参数
const props = withDefaults(defineProps<Props>(), {
    coms:
    {

    }
})
// 打开添加服务
const open_add = ()=>
{
    is_open_add.value = true;
    // gsap.from('b0',{height:'1px',direction:2});
    gsap.to('.b0',{height:'calc(100vh - 81px)',ease:'elastic.out(1,0.4)',duration:1})
    // gsap.to('.b0',{height:'calc(100vh - 125px)',ease:'back.out(1.7)',duration:.8})
}
// 开始递交数据
const submit = ()=>
{
    console.log('开始提交',goods);
    
}
// 关闭添加服务或商品
const close_add = ()=>
{
    is_open_add.value = false;
    gsap.to('.b0',{height:'0px',ease:'power4.out',duration:.6})
}
onMounted(()=>{
    // dom挂载完成
    console.log(props.coms);
    
});
</script>


