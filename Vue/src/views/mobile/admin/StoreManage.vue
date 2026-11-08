<style scoped lang="stylus">
.StoreManage  
    text-align: left; font-size: .8rem;
    :deep(.el-tabs__content)
        padding :0px;
    :deep(.el-tabs__nav-wrap)
        margin-bottom: 0px;
    :deep(.el-tabs__new-tab)
        margin: 6px; color: #7c7c7c; font-size: 19px; height: 27px; width: 27px; line-height: 30px; display: flex; justify-content: center; align-items: center;
    .list 
        .s 
            .r
                border: 2px solid #88a5ff;margin: 6px 5px 8px 5px; border-radius: 5px;
                .edit 
                    text-align: center; margin-top: 9px; color: #409eff; font-size: 1.3rem;
                .avatar 
                    height: 100%; padding: 3px;
                    img
                        width: 100%; height: 100%; line-height: 0; border-radius: 5px; max-height: 60px;
                .top 
                    position: absolute;bottom: 0; font-size: .7rem; color: #f1f1f1; background: rgba(0 0 0 , .5); left: 0; right: 0; margin: 3px; text-align: center; border-radius: 0 0 3px 3px;
                    .s1 
                        padding: 4px; color: #00ff1f; text-shadow: 0 0 3px #25ff94;
                    .s2 
                        padding: 4px; color: #bdbdbd; text-shadow: 0 0 3px #8f8f8f;
                .c6 
                    position: relative;
                .c18 
                    padding: 3px;
                    .t 
                        font-size: 1rem; text-shadow: 0 0 1px #878787; font-weight: bold;
                    .t1
                        color: #a3a3a3;
                    .t2 
                        margin: 3px 0;
            .role 
                padding: 5px 2px; text-align: center;
                .st 
                    background: #f1f1f1; font-size: 0.8rem; line-height: 1.2; padding: 3px; border-radius: 5px 5px 0 0; color: #b3b3b3;
                .st1 
                    background: #88a5ff; color: white; border-radius: 5px;padding: 3px;
                .m5 
                    margin-bottom 5px;
                .c12 
                    border: 1px solid #dddddd; border-radius: 5px;margin: 0 2px;
                    .listflex
                        display: flex; overflow: hidden; padding-right: 5px;
                    .list1 
                        padding: 3px;align-items: center;
                        .roww 
                            justify-content: center; padding: 3px; display: flex; align-items: center;box-shadow: 1px 1px 0px #f3f3f3;
                        .plus 
                            color: #409eff; overflow: hidden; height: 100%; width: 100%; text-align: center; padding: 2px;
                        .avatar0 
                            width:100%;position: relative;padding: 2px;
                            .del 
                                margin: 2px;position: absolute; left: 0; right: 0; bottom: 0; background: rgba(255 63 63 , .68); border-radius: 3px; padding: 0 2px; color: white;
                        .avatar 
                            width:30px;height:30px; border-radius: 5px; border: 1px solid #dedede;padding: 0;
    .noList 
        color: #dddddd;text-align: center; padding: 1rem; 
:deep(.full-modal-a1) 
    .ant-modal 
        max-width: 100%; top: 0; padding-bottom: 0; margin: 0;
    .ant-modal-content 
        display: flex; flex-direction: column; height: calc(100vh);
    .ant-modal-body 
        flex: 1;padding: 0px;overflow: auto;
    .ant-modal-footer
        padding: 6px; background: white; z-index: 20;

</style>
<template lang="pug">
div.StoreManage
    //- 二维码组件 
    div
        CallQrCode(:coms="qrcode_coms" @scan="scan")
    //- 选择商品组件
    div 
        SelectGoods(:coms="select_goods")
    //- 选择团购服务
    div 
        SelectTuanGou(:coms="select_tuangou")
    //- 添加门店弹框
    div 
        AddStore(:coms="add_store" @add="addStoreEnd")
    //- 配置子门店
    div
        AddSubStore(:p="add_sub_store_p")
    div 
        div(ref="SelectCoupon")
            a-modal.n1(v-model:visible="select_coupon.open" width="100%" wrap-class-name="full-modal-a1" :getContainer="()=>SelectCoupon" :closable="true" okText="保存") 
                template(#title)
                    span.b1 卡券管理
                template(#footer)
                    a-row(style="text-align: center;" :gutter="10")
                        a-col(span="24")
                            a-button(@click="select_coupon.open = false" block) 关闭窗口
                div.from
                    //- 配置卡券 期卡权限
                    el-tabs(class="demo-tabs")
                        el-tab-pane(label="卡券")
                            PackList(style="padding: 0 10px;background: white;" :cid="select_coupon.cid" :refresh="select_coupon.refresh" :role="'C1'" :sid="select_coupon.store_id" @edit-coupon-grant="init")
                        el-tab-pane(label="期卡")
                            Annual(style="padding: 0 10px;background: white;" :cid="select_coupon.cid" :refresh="select_coupon.refresh" :role="'C1'" :sid="select_coupon.store_id" @edit-coupon-grant-annual="init")
                        el-tab-pane(label="购卡")
                            ActivityList(:role="'C5'" :role_id="select_coupon.cid" :sid="select_coupon.store_id" :refresh="select_coupon.refresh")
    div.title
        div(style="height: 2.6rem;")
            Title(ref="titlecom" :coms="{str:'门店管理'}")
                template(#right)
                    div.cog(style="text-align: center;" @click="add_store.open = true;")
                        i.fa.fa-plus
    //- 门店列表
    div.list 
        el-tabs( v-model="has_tab" type="border-card" editable class="demo-tabs" @edit="onEdit")
            el-tab-pane( v-for="item in list" :key="item.id" :label="item.name" :name="item.id" )
                div.s(v-if="item.list && item.list?.length>0")
                    div.r(v-for="s in item.list" :key="s.id")
                        a-row
                            a-col(span="21")
                                a-row
                                    a-col.c6(span="7")
                                        div.avatar 
                                            img(:src="s.img")
                                        el-popconfirm(confirm-button-text="确定" cancel-button-text="取消" icon-color="#626AEF" :title="'您确定要'+ (s.status === 1?'暂停营业':'开始营业')+'吗？'" @confirm="set_store_status(s)" )
                                            template(#reference)
                                                div.top 
                                                    div.s1(v-if="s.status == 1") 正在营业
                                                    div.s2(v-if="s.status == 0") 暂停营业
                                    a-col.c18(span="17")
                                        div.t {{s.name}}
                                        div.t2 电话:{{s.phone}}
                                        div.t2(style='color: #109b2e;') 营业:{{s.operate_start}} ~ {{s.operate_end}}
                                        div.t1.elesis 地址:{{s.address}}
                                        
                            a-col(span="3")
                                div.edit(@click="edit_store(s)")
                                    i.fa.fa-pencil.fa-fw
                                div.edit(@click="del_store(s)")
                                    i.fa.fa-trash.fa-fw
                        //- 管理和股东
                        a-row.role
                            a-col(span="12")
                                div.c12
                                    div.st(@click="open_clerk(s)") 绑定管理 
                                        span(v-if="s.clerk_open") &nbsp;
                                            i.fa.fa-angle-down
                                        span(v-else) &nbsp;
                                            i.fa.fa-angle-right
                                    div.list1(:class="[s.clerk_open ? '' : 'listflex','clerk_'+s.id]")
                                        div(v-for="clerk in s.clerk" :key="clerk.id")
                                            a-row.roww(v-if="s.clerk_open")
                                                a-col.avatar0(span="5")
                                                    img.avatar(:src="clerk.avatar ? clerk.avatar : '//smkjm.sam322.com/img/avatar.png'")
                                                a-col.elesis(style="text-align: left;padding-left: 5px;" span="9") 
                                                    div(style="font-size: 10px;color: #c3c3c3;") ID:{{clerk.uid}}
                                                    div {{clerk.nickname ? clerk.nickname : clerk.phone}}
                                                a-col(span="5")
                                                    div(v-if="clerk.is_shopkeeper" style="color:#52c41a;")
                                                        i.fa.fa-black-tie.fa-fw.fa-2x
                                                    div.del(style="color: #6c6c6c;" v-else @click="set_shopkeeper(clerk,s)")
                                                        i.fa.fa-black-tie.fa-fw.fa-2x
                                                a-col(span="5")
                                                    div.del(style="color: #d98080;" @click="del_clerk(s,clerk)")
                                                            i.fa.fa-trash.fa-fw.fa-2x
                                            div(v-else)
                                                img.avatar(:src="clerk.avatar ? clerk.avatar : '//smkjm.sam322.com/img/avatar.png'")
                                        div(@click="open_qrcode(s.id)")
                                            div.plus
                                                i.fa.fa-plus-circle.fa-2x
                            a-col(span="12")
                                div.c12
                                    div.st 门店:{{ s.scale }}% + 股东:{{ gd_dividends(s) }}%
                                    a-row.list1
                                        a-col(span = "4")
                                            div(style="display: flex" v-if="s.gd && s.gd.length > 0")
                                                div(v-for="gd in s.gd")
                                                    img.avatar(:src="gd.avatar")
                                            div(v-else style="padding: 6px 0;color: #e3e3e3; justify-content: center;") 暂无

                        //- 商品和卡券
                        a-row.role(style='padding: 0;margin-bottom: 6px;') 
                            a-col(span="12")
                                div.c12(style="margin-bottom: 3px;")
                                    div.st1(@click="on_select_goods(s)") 上架 {{s.goods}} 服务、商品
                                div.c12
                                    div.st1(@click="on_select_tuangou(s)") 上架 {{s.tg}} 团购商城
                            a-col(span="12")
                                div.c12(style="margin-bottom: 3px;")
                                    div.st1(@click="on_select_coupon(s)") 可发放 {{s.ccount}} 卡券
                                div.c12
                                    div.st1(@click="set_sub_store(s)") 配置 {{s.sub}} 子门店
                div.noList(v-else)
                    div 暂无门店数据


</template>

<script lang="ts">
import { coms } from "smkj";
import CallQrCode from "@/views/com/CallQrCode.vue";
import Title from "@/views/com/Title.vue";
import AddSubStore from "@/views/com/store/AddSubStore.vue";
import SelectGoods from "@/views/com/goods/SelectGoods.vue";
import SelectTuanGou from "@/views/com/goods/SelectTuanGou.vue";
import CouponActivityList from "@/views/com/coupon/CouponActivityList.vue"
import AddStore from "@/views/com/AddStore.vue";
export default { 
    name: "StoreManage",
    components:{AddSubStore:AddSubStore,PackList:coms.PackList,SelectTuanGou:SelectTuanGou,Title:Title,CallQrCode:CallQrCode,SelectGoods:SelectGoods,AddStore:AddStore,Annual:coms.Annual,ActivityList:CouponActivityList}
};
</script>
<script setup lang="ts"> 
import { ref,reactive,useAttrs,onMounted,h,nextTick,computed} from "vue";
import { Modal ,Input} from 'ant-design-vue';
import {kxyk,Api,io} from "smkj";
import  gsap  from "gsap";
import { useRouter,useRoute } from "vue-router";


// 定义区
const route = useRoute();
const cid = route.params.circle_id;//当前商圈ID或商圈管理角色ID
const has_tab = ref();//当前tabs分类


// 计算门店股东分账百分比
const gd_dividends = computed(()=>(s:any)=>{
    if(s && s.gd && s.gd.length > 0){
        let d = 0;
        s.gd.forEach((e:any)=>{
            if(e.d_type === 0){
                d += e.d_number;
            }
        })
        return d;
    }
    return 0;
})

interface store_types{
    id?:number,name:string,cid?:number,list?:any[]
}
const list = ref<store_types[]>([]);//当前页面数据
const is_sub = reactive({disabled:true});
const sub_type = ref<string|undefined>(undefined);

const add_store = reactive({open:false,action:'add',list:[],cid:cid,field_list:[],store:{img:''}});
const has_qrcode_store = ref(0);//当前等待扫码添加店员的门店；
const qrcode_coms = reactive({open:false});
const select_goods = reactive<sm.Com.SelectGoodsAdmin>({open:false,store_id:0,cid:0,type_id:0,is_xy:0});//是否打开配置商品组件
const select_coupon = reactive({open:false,store_id:0,cid:0,refresh:false});//是否打开配置卡券组件

const select_tuangou = reactive({open:false,sid:0,cid:0,refresh:false});//是否打开配置团购服务
const SelectCoupon = ref(null);
let circle:any = reactive({});//商圈或者角色数据
/** 配置子门店组件参数 */
const add_sub_store_p:sm.Com.AddSubStore = reactive({open:false,sid:0,name:''}); 

/** 设置店长 */
const set_shopkeeper = (clerk:any,s:any)=>{
    kxyk.Modal.confirm({
        title: '设置店长',
        okText:"确定",
        cancelText:"取消",
        content: h('div',{},['确定要设置',
            h('span',{style:{color:'red'}},[clerk.nickname]),
            '为店长吗？',
        ]),
        onOk(){
            kxyk.sk.be(Api.shop.C1.SetShopkeeper,{clerk_id:clerk.id,store_id:clerk.store_id},res=>{
                if(res.status){
                    kxyk.msg.success('设置成功');
                    s.clerk.forEach((erk:any) => {
                        erk.is_shopkeeper = 0;
                    });
                    clerk.is_shopkeeper = 1;
                }
            });
        },
        onCancel() {},
    });
}

/** 打开关闭管理员列表 */
const open_clerk = (s:any)=>
{
    if(s.clerk_open)
    {
        gsap.to('.clerk_'+s.id,{height:'36px',opacity:0.1,ease:'back.in(1.7)',duration:.9,onComplete:()=>{

            s.clerk_open = false;
            gsap.to('.clerk_'+s.id,{opacity:1,duration:.2});

        }});
    }else{
        gsap.to('.clerk_'+s.id,{height:'36px',opacity:0,duration:.1,onComplete:()=>{
            s.clerk_open = true;
            gsap.to('.clerk_'+s.id,{height:'auto',opacity:1,ease:'elastic.out(1, 0.3)',duration:1.5});
            
        }});
        // gsap.to('.types',{height:'auto',margin:'0.3rem',ease:'elastic.out(1, 0.3)',duration:1.5})
        // gsap.to('.types',{height:'0px',margin:'-0.1rem',ease:'expo.out',duration:1});

    }
}

/** 门店配置可发放卡券 */
const on_select_coupon = (s:any) =>
{
    select_coupon.cid = circle.id;
    select_coupon.store_id = s.id;
    select_coupon.open = true;
    nextTick(()=>{
        select_coupon.refresh = !select_coupon.refresh;
    })
    
}
/** 配置子门店 */
const set_sub_store = (s:any) =>
{
    add_sub_store_p.open = true;
    add_sub_store_p.name = s.name;
    add_sub_store_p.sid = s.id;
}

// 门店选择商品
const on_select_goods = (s:any)=>
{

    select_goods.store_id = s.id;
    select_goods.cid = circle.cp_id;
    select_goods.type_id = circle.type_id;
    select_goods.is_xy = s.is_xy;
    select_goods.open = true;
}
// 打开团购商城配置
const on_select_tuangou = (s:any)=>
{
    select_tuangou.sid = s.id;
    select_tuangou.cid = circle.cp_id;
    select_tuangou.open = true;
}
// 打开
const open_qrcode = (store_id:number)=>
{
    has_qrcode_store.value = store_id;
    qrcode_coms.open = true;

}
// 删除门店
const del_store = (s:any)=>
{
    kxyk.Modal.confirm({
        title: '删除门店',
        content: h('div',{},['确定要删除',
            h('span',{style:{color:'red'}},[s.name]),
            '吗？',
        ]),
        onOk(){
            kxyk.sk.be(Api.shop.C1.DelStore,{cid:cid,store_id:s.id},res=>{
                if(res.status){
                    kxyk.msg.success('删除成功。');
                    init();
                }
            });
        },
        onCancel() {},
    });
}
// 编辑门店
const edit_store = (s:any)=>
{
    add_store.store = s;
    add_store.action = "edit";
    add_store.open = true;

}
//设置店铺营业状态
const set_store_status = (s:any)=>
{
    kxyk.sk.be(Api.shop.C1.SetStoreStatus,{cid:cid,store_id:s.id,status:s.status},res=>{
        if(res.status){
            s.status = s.status?0:1;
        }
    })
}
//删除店员
const del_clerk = (store:any,clrek:any)=>
{
    kxyk.Modal.confirm({
        title: '删除店员',
        content: h('div',{},['确定要删除',
            h('span',{style:{color:'red'}},[clrek.nickname]),
            '在',
            h('span',{style:{color:'red'}},[store.name]),'的权限吗？',
        ]),
        onOk(){
            kxyk.sk.be(Api.shop.C1.DelStoreClerk,{cid:cid,store_id:store.id,clrek_id:clrek.id},res=>{
                if(res.status){
                    kxyk.msg.success(res.msg);
                    init();
                }
            });
        },
        onCancel() {},
    });
}
// 扫码添加管理员回调
const scan = (db:any)=>
{
    if(qrcode_coms.open)
    {
        kxyk.sk.be(Api.shop.C1.AddStoreClerk,{cid:cid,store_id:has_qrcode_store.value,uid:db.u.uid},res=>{
            console.log(res);
            if(res.status){
                kxyk.msg.success('添加成功。');
                init();
                qrcode_coms.open = false;
            }
        })
    }
}
// 新建门店完成1 
const addStoreEnd=()=>
{
    init();
}
const onEdit=(targetName: number, action: 'remove' | 'add')=>
{
    if(action === 'add')
    {
        Modal.confirm({
            title: '添加门店分类',
            icon:undefined,
            okButtonProps:is_sub,
            content: ()=>{
                return h('div',{style:'color:red;'},[
                    h(Input,
                        {
                            placeholder:'请输入门店分类名称',
                            onChange:(e)=>{
                                sub_type.value = e.target.value;
                                if(sub_type.value && !kxyk.utils.find(list.value,{name:sub_type.value})){
                                    is_sub.disabled = false;
                                }else{
                                    is_sub.disabled = true;
                                }
                            }
                        }
                    )
                ])
            },
            okText:'添加',
            cancelText:'取消',
            async onOk() {
                return await new Promise((resolve, reject) => {
                    if(!sub_type) reject('请输入门店分类名称');

                    kxyk.sk.be(Api.shop.C1.AddStoreType,{cid:cid,typeName:sub_type.value},res=>{
                        if(res.status)
                        {
                            init();
                            kxyk.msg.success('添加成功');
                            resolve(res);
                        }else{
                            reject(res.msg);
                        }
                    })
                }).catch((e) => {
                    kxyk.msg.error(e);
                    return false;
                });
            },
            onCancel() {},
        });
    }
    if(action === 'remove'){
        let type:any = kxyk.utils.find(list.value,{id:targetName});
        if(type){
            if(type.list.length>0)
            {
                return kxyk.msg.error('当前分类下已存在门店，无法删除！');
            }
            kxyk.Modal.confirm({
                title: '删除分类',
                content: '确定要删除'+type.name+'分类吗？',
                onOk(){
                    kxyk.sk.be(Api.shop.C1.DelStoreType,{type:type,cid:cid},res=>{
                        if(res.status){
                            kxyk.msg.success('删除成功。');
                            if(has_tab.value == type.id){
                                has_tab.value = null;
                            }
                            init();
                        }
                    });
                },
                onCancel() {},
            });
        }

    }
    
}
/** 初始化C1C2 */
const init = ()=>
{
    kxyk.sk.be(Api.shop.C1.GetInitStoreList,{cid:cid},res=>{
        
        if(res.status && res.list)
        {
            list.value = res.list;
            add_store.list = res.list as any;
            if(!has_tab.value && res.list.length>0)
            {
                has_tab.value = res.list[0].id;
            }
            circle = res.circle;
        }
        if(res.status && res.fields){
            add_store.field_list = res.fields;
        }
    });
}
onMounted(()=>{
    init();
});



</script>


