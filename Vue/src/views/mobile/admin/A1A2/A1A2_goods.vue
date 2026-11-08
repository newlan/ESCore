<style scoped lang="stylus">
.goods 
    .types 
        .con 
            position: fixed; height: calc(100% - 40px - 2.6rem); overflow-y: auto; width: 100%; padding: .5rem; padding-bottom: 2.5rem;
        .t2
            display: flex;
    .good 
        transition: all 0.8s ease 0s; border: 1px solid #e9e9e9; padding: .5rem;border-radius: 0.3rem; margin-bottom: 0.5rem; box-shadow: 0 0 4px #ebebeb;
        .img 
            width: 100%; max-height: 5rem;border: 1px solid #c7c7c7; border-radius: 0.3rem;
        .c16 
            text-align: left;padding-left: 0.5rem;
            .t 
                font-size: 1.1rem; font-weight: bolder;
                :deep(.el-button+.el-button)
                    margin-left:2px;
            .c 
                color: red;font-size: 1rem;
            .c1 
                line-height: 0;
        .suk 
            text-align: left; padding: 0.2rem 0;
            .c4 
                padding: .2rem; color: #bdbdbd;
.list-move
    transition: all 0.8s ease; 
.list-leave-active
    width: 100%;
    position: absolute;

.list-enter-from,
.list-leave-to 
    opacity: 0; transform: translateY(-50px) translateX(50%); 
</style>
<template lang="pug">

div
    div.goods
        div(style="height: 2.6rem;")
            Title(ref="titlecom" :coms="{str:'商品模板'}")
        div.types
            //- 这里封装为商品服务解析组件
            GoodsList(:coms="goodsListComs")
            //- a1 带有行业管理
            //- a-tabs(v-model:activeKey="hasMchType" type="card" :tabBarStyle="{margin:0}")
                a-tab-pane(v-for="p in panes" :key="p.id" :tab="p.label")
                    div(v-if="p.children.length>0" style='line-height: 0;padding-top: 0.5rem;')
                        el-radio-group(v-model="p.has" size="small" @change="switch_spec(p)")
                            el-radio-button(v-for="t1 in p.children" :label="t1.label") {{t1.label}}
                    div.con(v-if="p.goods.length > 0")
                        draggable.Citem(handle=".on_drag" :list="p.goods" @change="log(p)")
                            transition-group(name="list")
                                div.good(v-for=" g in p.goods" :key="g.id")
                                    //- 多规格服务
                                    a-row(v-if="g.is_spec")
                                        a-col(span="8")
                                            img.img(:src="g.goods_img")
                                        a-col.c16(span="16")
                                            div.t 
                                                a-row 
                                                    a-col.on_drag(span="15") {{g.goods_name}}
                                                    a-col.col9(span="9") 
                                                        el-button(size="small" plain type="primary" @click="edit_goods(g)" :icon="Edit")
                                                        el-button(size="small" plain type="primary" @click="del_goods_fw(g)" :icon="Delete")
                                            div.c ￥{{g.has_price}}
                                            //- div.c1
                                            //-     el-radio-group(v-model="g.has_spec" size="small")
                                            //-         el-radio-button(v-for="sp in g.spec" :label="sp.id") {{sp.spec_name}}
                                    div.suk
                                        a-row(v-for="suk in get_suks(g.spec,p.has)")
                                            a-col.c4(span="4") {{suk.suk_name}}
                                            a-col(span="20")
                                                el-radio-group(v-model="suk.has_suk" :disabled="is_select(get_suks(g.spec,p.has),suk)" size="small" )
                                                    el-radio-button(v-for="sp in suk.items" @click.native.prevent="select_suk(suk,sp,get_suks(g.spec,p.has),g)" :label="sp.id") 
                                                        div {{sp.item_name}}


                    div(v-else style='padding: .5rem;color: lightgrey;') 暂无数据
                    //- div(style="position: fixed;bottom: 0;")  1 2 3 4
                    
                    div(v-if="p.label == '服务'") 
                        Addfw(ref="addfuwu" :coms="p" @upend="init")
                    div(v-if="p.label == '商品'") 
                        //- add-goods-sp(:coms = "p")



        

</template>

<script lang="ts">
// import Addfw from "@/views/mobile/admin/A1A2/Addfw.vue";
import { VueDraggableNext } from 'vue-draggable-next';
export default { 
    name: "a1a2_goods",
    components:{draggable:VueDraggableNext},
};
</script>
<script setup lang="ts">
import { ref, reactive,useAttrs ,onMounted,nextTick,getCurrentInstance} from "vue";
import { Delete, Edit } from '@element-plus/icons-vue'
import GoodsList from "@/views/com/goods/GoodsList.vue";
import Title from "@/views/com/Title.vue";
import {kxyk,Api,io,shop} from "smkj";
import { useRouter,useRoute } from "vue-router";
import Addfw from "@/views/mobile/admin/A1A2/Addfw.vue";



// 路由
const route =useRoute();

// 重新组件化开始
const goodsListComs = reactive({
    role:'A1A2',
    cpid:parseInt(route.params.cpid as string),//公司ID
    type_id:parseInt(route.params.type_id as string),//行业分类ID 养成 餐饮
    store_id:0,//a1a2门店ID设置为0
});

// 选择了切换规格 车型
const switch_spec = (p:sm.good_type)=>
{
    shop.goods.switch_spec(p);
}
// 每个服务选择了具体suk
const select_suk = (suk:any,sp:any,suks:any,g:any)=>
{
    // console.log(suk.has_suk,sp.id,suks);
    if(is_select(suks,suk)) return 0;
    // console.log('开始设置');

    if(suk.has_suk == sp.id)
    {
        suk.has_suk = 0;
        // 这里判断有没有前置本规格的
        suks.forEach((sk:sm.suk) => {
            if(sk.is_must && sk.is_must == suk.suk_name)
            {
                // 找到前置
                sk.has_suk = 0;
            }
        });

        
        
    }else{
        suk.has_suk = sp.id;
    }
    // 这里计算价格
    shop.goods.count_price(g);
    // let price:number = 0;
    // suks.forEach((s:sm.suk) => {
    //     if(s.has_suk)
    //     {
    //         s.items.forEach(item => {
    //             if(item.id === s.has_suk)
    //             {
    //                 // price = parseFloat(parseFloat(price)+parseFloat(item.price));
    //                 // 这里是规格价格计算 目前拿的飞会员价格
    //                 price = price*1+item.price*1;
    //             }
    //         });
    //     } 
    // });
    // g.has_price = price;

}
// 商品列表拖动排序
const log = (p:any)=>{
    let up_sort:any[] = [];
    if(p.goods.length > 0)
    {
        let sort = 0;
        p.goods.forEach((g:sm.good) => {
            up_sort.push({id:g.id,sort:sort++});
        });
        if(up_sort.length>0)
        {
            kxyk.sk.be(Api.shop.A1A2.UpSortGoods,{up:up_sort,cpid:route.params.cpid},res=>{
                console.log(res);
                if(res.status) kxyk.msg.success('排序已更新.');
            });
        }
    }
}
// 判断当前规格是否可选
const is_select = (suks:sm.suk[],suk:sm.suk)=>
{
    if(suk.is_must){
        let root_suk:boolean|any = kxyk.utils.find(suks,{suk_name:suk.is_must});
        if(root_suk)
        {
            if(root_suk.has_suk)
            {
                return false;
            }
        }
        return true;//条件没有通过，设置为不可选
    }else{
        return false;
    }

    
}
// 动态获取suks
const get_suks = (g:sm.spec[],spec_id:string|undefined) =>
{
    let spec:boolean|any = kxyk.utils.find(g,{spec_name:spec_id});
    if(spec){
        // console.log('这里搜索到的suk',spec.id);
        
        return spec.suk;
    }else{
        return [];
    }

}


// 删除服务类商品
const del_goods_fw=(g:sm.good)=>
{
    kxyk.Modal.confirm({
        title: '删除服务',
        content: '确定要删除'+g.goods_name+'吗？',
        onOk(){
            kxyk.sk.be(Api.shop.A1A2.DeleteFw,{cpid:route.params.cpid,goods_id:g.id},res=>{
                if(res.status){
                    kxyk.msg.success(res.msg);
                    init();
                }
            });
        },
        onCancel() {},
    });
}
// 修改服务
const edit_goods = (g:sm.good)=>
{
    internalInstance?.refs.addfuwu[0].set_goods(g);
}
const internalInstance:any = getCurrentInstance();


//初始化页面数据
let is_right = ref(false);
// 当前选择tabs标签
const hasMchType = ref(0);
const panes = ref<sm.good_type[]>([]);

const init = ()=>{
    kxyk.sk.be(Api.shop.A1A2.GetA1A2GoodsInit, {cpid:route.params.cpid,type_id:route.params.type_id},res=>{
        // console.log('A1页面初始化',res);
        if(res.__error__) return kxyk.toUrl('/404');
        is_right.value = true;//显示页面
        if(res.types && res.types.children.length > 0)
        {
            panes.value = res.types.children;
            if(!hasMchType.value) hasMchType.value = res.types.children[0].id;
        }
    })
}

// init();

onMounted(()=>{
    // dom挂载完成
    console.log('父组件加载完成');
    


});

</script>


