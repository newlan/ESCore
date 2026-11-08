<!-- 下拉刷新 带动态分页组件 -->
<style scoped lang="stylus">
.RefreshList
    color:red;  
</style>
<template lang="pug">


div.RefreshList
    van-pull-refresh(v-model="refreshing" @refresh="onRefresh")
        van-list(v-model:loading="loading" :finished="finished" :finished-text="hideMore?'':'没有更多数据了'" @load="onLoad" )
            div(v-if="list.length <= 0" style="color:#dddddd;padding: 10px;font-size: 14px;") 暂无数据
            div(v-for ="(item,index) in list" :key="index")
                slot(v-bind="{item,index}")



</template>


<script setup lang="ts" generic="T = any, A = any, M = {}">
import { ref ,watch,shallowRef} from "vue";
import {kxyk} from 'smkj';

defineOptions({
    name: 'RefreshList'
});


// 数据列表
const list = ref<sm.InferItemType<T, A, M>[]>([]);
//加载数据中
const loading = ref(false);
//是否加载完成
const finished = ref(false);
// 正在刷新状态
const refreshing = ref(false);
// 页码
const page = ref(0);
/**
 * count 返回统计结果
 * loading 开始加载数据
 */
const emit = defineEmits(["count","loading1","error"]);

// const props = defineProps<Props>();
const props = withDefaults(defineProps<{
    coms: sm.rList<T,A,M>;
    itemType?: sm.InferItemType<T, A, M>;
    hideMore?: boolean;
}>(), {
    itemType: undefined as any,hideMore: false
});

watch(
    ()=>props.coms.refresh,
    (newVal,olVal)=>{
        onRefresh();
    }
)
//下拉刷新
const onRefresh=()=>
{
    finished.value = false;
    list.value = [];
    page.value = 0;
    loading.value = true;
    onLoad();
}

// 开始加载数据
const onLoad=()=>
{
    page.value++;
    emit('loading1',true);
    kxyk.sk.be(props.coms.url,{page:page.value,args:props.coms.args,size:props.coms.size||10},res=>{
        if(res.__error__){
            emit('error',res);
        }
        if(res.status){
            emit('loading1',false);
            loading.value = false;
            refreshing.value = false;
            emit('count',res);
            // 这里解决快速执行两边时的数据重复
            if(page.value === 1) list.value =[];
            if(res.count !=undefined && res.count/(props.coms.size||10)<page.value)
            {
                finished.value = true;
            }
            if(res.list && res.list.length > 0)
            {
                res.list.forEach((d:any) => {
                    list.value.push(d);
                });
            }
        }
    })
}
// defineSlots<{
//   default(props: { item: sm.InferItemType<T, A, M>; index: number }): any
// }>()
</script>


