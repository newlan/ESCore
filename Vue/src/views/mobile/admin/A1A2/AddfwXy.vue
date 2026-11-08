<!-- 2024-08-30 newlan 复制旧的添加商品 -->
<style scoped lang="stylus">
 @import "./AddfwXy.styl"
</style>
<template lang="pug">

div 
    div.AddGoodsXy(ref="addgoods") 
        div.h(:style="{bottom:props.role ==='C1C2'?43+'px':0+'px'}")
            div.b0
                a-row.base 
                    a-col(span="6") 
                        Upload(v-if="is_open_add" v-model:url="goods.goods_img" @change="check_submit" max="1")
                    a-col(span="18")
                        div.sname(style="margin-bottom: 5px;")
                            a-input(v-model:value="goods.goods_name" @change="check_submit" placeholder="请输入服务名称如：客房或搓澡")
                        div(style="display: flex;")
                            div.sname
                                el-select( v-model="goods.sub" placeholder="选择子门店分类"  style="width: 100%" @change="check_submit")
                                    el-option( v-for="item in sub" :key="item.id" :label="item.name+`(${item.name2})`" :value="item.id" )
                            div.sname
                                el-select( v-model="goods.sub_pay" placeholder="选择子门店分类" @change="check_submit")
                                    el-option(label="不设置" :value="0")
                                    el-option( v-for="item in sub2" :key="item.id" :label="item.pay_name" :value="item.id" )

                        div(style='padding: 4px 0.5rem 0 0.5rem;' v-if="goods.sub_pay")
                            el-input(size="small" @change="log" @input="log" placeholder="请输入结算金额" v-model="goods.sub_pay_price")
                                template(#append)
                                    el-select(v-model="goods.sub_pay_type"  style="width: 85px")
                                        el-option(label="%" :value="0" )
                                        el-option(label="￥" :value="1" )
                        div(style="display: flex;line-height: 1;")
                            div.sname
                                //- div.tc 
                                span.t1 &nbsp;是否预约&nbsp;
                                el-switch(:active-value="1" :inactive-value="0" v-model="goods.is_reserve" @change="log") &nbsp;
                                span.t1 &nbsp;&nbsp;&nbsp;&nbsp;用户下单&nbsp;
                                el-switch(:active-value="1" :inactive-value="0" v-model="goods.is_user_buy" @change="log")
                        div(style="display: flex;line-height: 1;")
                            div.sname(style="padding-top: 5px;")
                                el-input(size="small" placeholder="请输入服务提成百分比" v-model="goods.bonus"  @change="check_submit")
                                    template(#prepend)
                                        span 服务提成
                                    template(#append)
                                        span %
                div 
                    div.ss1
                        //- draggable.Citem(handle=".on_drag" :list="goods.spec" @change="log")
                        //-     transition-group(name="list")
                        //-         a-col.item1(span="8" v-for="element in goods.spec" :key="element.spec_name")
                        //-             a-row.item_t1(:class="{on:element.is_show}")
                        //-                 //- a-col.r.l1.on_drag(span="5")
                        //-                 //-     i.fa.fa-arrows
                        //-                 a-col.l.elesis(span="24" @click.native.stop="select_suk(element)") 
                        //-                     div
                        //-                         div.t_t1 {{element.spec_name}}

                        div.c1(v-if="spec_suk !== ''")
                            div(v-if="suk_list.length <= 0")
                                div.no 暂无项目，请添加项目
                            draggable(v-else :list="suk_list" handle='.a20' @change="log")
                                transition-group(name="list2")
                                    div(style="transition: all .8s;" v-for="suk in suk_list" :key="suk.suk_name")
                                        //- 标题
                                        div.suk
                                            a-row.r
                                                a-col.a20(span = "11") 
                                                    div.c 
                                                        span.x (项目)&nbsp;
                                                        span {{suk.suk_name}} 
                                                        //- el-switch(v-model="suk.is_must" inline-prompt active-text="必选" inactive-text="可选")
                                                        //- a-switch(checkedChildren="必选" unCheckedChildren="可选" :unCheckedValue="0" :checkedValue="1" v-model:checked="suk.is_must" )
                                                a-col(span="10")
                                                    div(style='padding-right: 0.5rem;line-height: 0;')
                                                        a-select(placeholder="前置选择" v-model:value="suk.is_must" size="small" style='width: 100%;')
                                                            a-select-option(value="") 无前置选择
                                                            a-select-option(v-for="n in suk_list" :value="n.suk_name") {{n.suk_name}} 
                                                a-col.a4(span = "3" @click.native="del_suk(suk_list,suk)") 
                                                    div.del
                                                        i.fa.fa-trash.fa-fw
                                            div.items(v-if="suk.items.length > 0")
                                                draggable(:list="suk.items" handle=".t1" @change="log")
                                                    transition-group(name="list2")
                                                        div(style="transition: all .8s;" v-for="(item,index) in suk.items" :key="item.item_name")
                                                            a-row.r 
                                                                a-col(span="20")
                                                                    div.ns1 
                                                                        div 
                                                                            div.t1 服务名称 
                                                                            div.i1
                                                                                el-input(size="small" @input="log" @change="log" v-model="item.item_name")
                                                                        div
                                                                            div.t1 普通用户
                                                                            div.i1
                                                                                el-input(size="small" @change="log" @input="log" v-model="item.v_price")
                                                                        div 
                                                                            div.t1 游客价格
                                                                            div.i1 
                                                                                el-input(size="small" @change="log" @input="log" v-model="item.price")
                                                                    div.ns1
                                                                        div.tc 
                                                                            span.t1 &nbsp;会员价格&nbsp;
                                                                            el-switch(:active-value="1" :inactive-value="0" v-model="item.is_open_vip" @change="log")
                                                                        div.tc
                                                                            span.t1 &nbsp;只能现金&nbsp;
                                                                            el-switch(:active-value="1" :inactive-value="0" v-model="item.is_cash" @change="log")
                                                                        div.tc
                                                                            span.t1 &nbsp;自动结束&nbsp;
                                                                            el-switch(:active-value="1" :inactive-value="0" v-model="item.end_type" @change="log")
                                                                        div.tc 
                                                                            span.t1 &nbsp;配置结算&nbsp;
                                                                            el-switch(:active-value="1" :inactive-value="0" v-model="item.is_sub_pay" @change="log")
                                                                        div.tc 
                                                                            span.t1 &nbsp;服务提成&nbsp;
                                                                            el-switch(:active-value="1" :inactive-value="0" v-model="item.is_bouns" @change="log")
                           

                                                                a-col(span="4")
                                                                    div.del(@click.native="del_item(suk,item)")
                                                                        i.fa.fa-trash.fa-fw
                                                            div.open_vip(v-if="item.end_type || item.is_sub_pay || item.is_bouns")
                                                                a-row(:gutter="3")
                                                                    a-col(span="12" v-if="item.end_type")
                                                                        div.viplist
                                                                            div.ov_title 自动结束时间
                                                                            div.ov_input
                                                                                el-input(size="small" @change="log" @input="log" v-model="item.end_time")
                                                                    a-col(span="12" v-if="item.is_bouns") 
                                                                        div.viplist
                                                                            div.ov_title 设置提成
                                                                            div.ov_input
                                                                                el-input(size="small" @change="log" @input="log" v-model="item.bouns")
                                                                                    template(#append)
                                                                                        el-select(v-model="item.bouns_type" style="width: 55px")
                                                                                            el-option(label="%" :value="0")
                                                                                            el-option(label="￥" :value="1")
                                                                    a-col(span="24" v-if="item.is_sub_pay") 
                                                                        div.viplist
                                                                            div.ov_title 结算配额
                                                                            div.ov_input
                                                                                el-input(size="small" @change="log" @input="log" v-model="item.sub_pay_price")
                                                                                    template(#prepend)
                                                                                        el-select(v-model="item.sub_pay" style="width: 80px")
                                                                                            el-option(label="请选子商户" :value="0")
                                                                                            el-option( v-for="item in sub2" :key="item.id" :label="item.pay_name" :value="item.id")
                                                                                    template(#append)
                                                                                        el-select(v-model="item.sub_pay_type" style="width: 55px")
                                                                                            el-option(label="%" :value="0")
                                                                                            el-option(label="￥" :value="1")

                                                            div.open_vip(:gutter="5" v-if="item.is_open_vip")
                                                                a-row(:gutter="3")
                                                                    a-col(span="8" v-for="v in item.vips")
                                                                        div.viplist
                                                                            div.ov_title {{ v.vip_name }}
                                                                            div.ov_input
                                                                                el-input(size="small" @change="log" @input="log" v-model="v.price")
                                                                    
                                            div.items(v-else) 
                                                div 暂无服务
                                            div.add
                                                el-input( v-model="suk.item_name" :placeholder="'请输入'+suk.suk_name+'服务名称'" class="input-with-select" )
                                                    template(#prepend)
                                                        div 服务
                                                    template(#append)
                                                        //- el-button(type="warning" :icon="Plus") 添加
                                                        div.but(@click="add_item(suk)")
                                                            el-icon
                                                                Plus
                                                            span 添加
                            div.bout 
                                div
                                    a-input-search( v-model:value="suk_name" :placeholder="'请输入'+spec_suk+'项目名称'" :enter-button="'添加'+spec_suk+'项目'" @search="add_suk") 
            div.b1
                a-spin(:spinning="submit_loading" tip="正在提交")
                    a-row(:gutter="10") 
                        a-col.all_(:class="{'no1':!is_open_add}" :span="is_open_add?12:1")
                            a-button(v-if="is_open_add" block @click="close_add") 取消 
                        a-col.all_(:span="is_open_add?12:23")
                            a-button(v-if="is_open_add" type="primary" :disabled="is_submit" danger block @click="submit") 保存{{props.coms.label}}
                            div(v-else)
                                a-button(v-if="!is_add_muban" type="primary" block @click="open_add") 添加{{props.coms.label}}
                                a-button(v-else type="primary" block danger @click="open_add_muban_new") 全新添加
                            div.muban 
                                div 
                                    div(style="padding-top: 8px;" v-if="muban.length>0")
                                        div.good(v-for=" g in muban" :key="g.id")
                                            //- 多规格服务
                                            a-row(v-if="g.is_spec")
                                                a-col(span="8")
                                                    img.img(:src="g.goods_img")
                                                a-col.c16(span="10")
                                                    div.t  {{g.goods_name}}
                                                        span.m1 模板

                                                    div.c ￥{{g.has_price}}
                                                a-col.c6(span = "6")
                                                    div.select_muban(@click="open_add_muban(g)") 
                                                        div 选择
                                                        div 模板
                                            div.suk
                                                a-row(v-for="su in shop.goods.get_suks(g.spec,suk)")
                                                    a-col.c4(span="4") {{su.suk_name}}
                                                    a-col(span="20")
                                                        el-radio-group(v-model="su.has_suk" :disabled="shop.goods.is_select(shop.goods.get_suks(g.spec,suk),su)" size="small" )
                                                            el-radio-button(v-for="sp in su.items" @click.native.prevent="shop.goods.select_suk(su,sp,shop.goods.get_suks(g.spec,suk),g)" :label="sp.id") 
                                                                div {{sp.item_name}}
        
</template>

<script lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
import Upload from "@/views/com/UploadImg.vue";
import _ from "lodash";
export default { 
    name: "AddfwXy",
    components:{
        draggable:VueDraggableNext,Upload:Upload
    }
};

</script>
<script setup lang="ts">
import { ref ,reactive,onMounted,computed,watch} from 'vue';
import { useRoute } from "vue-router";
import { Plus } from '@element-plus/icons-vue'
import gsap from "gsap";
import { kxyk ,Api,shop} from "smkj";


const emit = defineEmits(["upend"]);
const route = useRoute();
// 验证是否可以递交
const check_submit = ()=>
{
    try {
        if(!goods.goods_img) throw "请上传服务图片";
        if(!goods.goods_name) throw "请填写服务名称";
        if(goods.spec.length<=0) throw "请添加"+props.coms.spec_name;//没有添加规格
        goods.spec.forEach(spec=>{
            if(spec.suk.length <= 0) throw spec.spec_name+'下没有添加项目';
            spec.suk.forEach(suk=>{
                if(suk.items.length <= 0) throw spec.spec_name+'-'+suk.item_name+'项目下没有添加服务';
                
            })
        })
        // 开放保存按钮状态
        is_submit.value = false;
        return {status:1};
    } catch (error) {
        // 设置保存按钮状态，无法递交
        is_submit.value = true;
        console.log('校验错误：',error);
        
        return {status:0,msg:error};
    }
}
// 开始递交数据
const submit = ()=>
{
    // console.log('开始提交',goods);
    // 二次验证是否有价格为0的选项
    try {
        goods.spec.forEach(spec=>{
            spec.suk.forEach(suk=>{
                suk.items.forEach(item=>{
                    if(item.price <= 0) throw `${spec.spec_name}-${suk.suk_name}-${item.item_name}服务-游客价格不能为0`;
                    if(item.v_price <= 0) throw `${spec.spec_name}-${suk.suk_name}-${item.item_name}服务-普通会员价格不能为0`;
                    if(item.is_open_vip){
                        item.vips.forEach(v=>{
                            if(v.price <= 0) throw `${spec.spec_name}-${suk.suk_name}-${item.item_name}服务-${v.vip_name}会员价格不能为0`;
                        })
                    }
                })
            })
        })
    } catch (error) {
        kxyk.msg.error(error as string);
        return 0;
    }
    let status:any = check_submit();
    if(!status.status) return kxyk.msg.error(status.msg);
    submit_loading.value = true;
    // console.log(goods);
    if(props.role === 'A1A2'){
        goods.store_id = 0;
    }else if(props.role === 'C1C2'){
        goods.store_id = props.store_id;
    }
    kxyk.sk.be(Api.shop.A1A2.SaveAddFwXy,{type_id:props.coms.id,cpid:props.cpid,goods:goods},res=>{
        submit_loading.value = false;
        if(res.status)
        {
            goods.goods_img= "";
            goods.goods_name="";
            goods.spec = [];
            kxyk.msg.success(res.msg);
            close_add();
            emit('upend',true);
            return true;
        }
        if(res.__error__){
        }else{
            kxyk.msg.error(res.msg);
        }
        
    })
}
// 触发校验
const log = (d:any)=>
{
    
    check_submit();
    
}
const submit_loading = ref(false);//递交加载状态
const is_submit = ref(true);//递交按钮状态
const is_open_add = ref(false);//是否打开添加按钮
const spec_name = ref('');//缓存规格名称
const suk_name = ref('');//缓存项目名称
const spec_suk = ref('');//当前选中的 规格 ID


// 计算属性返回对应的列表 车型列表
const suk_list = computed(()=>{
    let suk:any = kxyk.utils.find(goods.spec,{spec_name:spec_suk.value});
    if(suk) return suk.suk;
    return false;
});
/** 删除服务 item */
const del_item=(suk:sm.suk,item:sm.item)=>
{
    // console.log('suk',suk);
    // console.log('item',item);
    // console.log('要删除');
    kxyk.Modal.confirm({
        title: '删除服务',
        content: '确定要删除'+ item.item_name +'服务吗？',
        onOk(){
            _.remove(suk.items,(x:sm.item)=>{
                return x.item_name == item.item_name;
            });
            check_submit();
            // if(spec_suk.value == e.spec_name) spec_suk.value = '';
        },
        onCancel() {},
    });
}
/** 添加服务 item */
const add_item=(suk:sm.suk)=>
{
    if(!suk.item_name) return kxyk.msg.error('请输入服务名称');
    let has_item = kxyk.utils.find(suk.items,{item_name:suk.item_name});
    if(has_item) return kxyk.msg.error('当前项目中已存在'+suk.item_name+'服务');
    // 初始化添加会员等级字段
    let vips:sm.ItemVipsPrice[] = [];
    if(props.vips && props.vips.length > 0)
    {
        props.vips.forEach((v:any)=>{
            vips.push({price:0,vip_id:v.id,vip_name:v.name})
        })
    }
    suk.items.push({end_type:0,end_time:0,item_name:suk.item_name,price:0,v_price:0,spec_id:0,suk_id:0,id:0,coupon_id:0,goods_id:0,is_open_vip:0,vips:vips,coupon_ids:[]});
    suk.item_name = '';
    check_submit();
}
/** 删除项目 */
const del_suk=(spec:sm.suk[],suk:sm.suk)=>
{
    kxyk.Modal.confirm({
        title: '删除项目',
        content: '确定要删除'+suk.suk_name+'项目吗？',
        onOk(){
            _.remove(spec,(x:sm.suk)=>{
                return x.suk_name == suk.suk_name;
            });
            check_submit();
            // if(spec_suk.value == e.spec_name) spec_suk.value = '';
        },
        onCancel() {},
    });
}
/** 添加项目 */
const add_suk = ()=>
{
    if(!suk_name.value) return kxyk.msg.error('请输入项目名称');
    let s_spec = kxyk.utils.find(goods.spec,{spec_name:spec_suk.value});
    if(!s_spec) return kxyk.msg.error('参数错误！！！');
    let spec = s_spec as sm.spec;
    console.log('这里开始找',spec_name.value);
    if(kxyk.utils.find(spec.suk,{suk_name:suk_name.value})) return kxyk.msg.error('当前规格已存在'+suk_name.value);
    spec.suk.push({suk_name:suk_name.value,items:[],is_must:'',item_name:'',id:0});
    suk_name.value = '';
    check_submit();
}
/** 添加规格 */
const add_spec = ()=>{
    if(!spec_name.value) return kxyk.msg.error('请输入'+props.coms.spec_name);
    if(kxyk.utils.find(goods.spec,{spec_name:spec_name.value})) return kxyk.msg.error(spec_name.value+'已存在');
    // 这里判断是添加第几个规格
    let copy_suk:any = [];
    if(goods.spec.length > 0)
    {
        copy_suk = JSON.parse(JSON.stringify(goods.spec[0].suk));
    }
    goods.spec.push({spec_name:spec_name.value,suk:copy_suk,is_show:false});
    spec_name.value = '';
    // 添加车型后检测是否有选中的规格
    if(spec_suk.value == ''){
        spec_suk.value = goods.spec[0].spec_name;
        goods.spec[0].is_show = true;
    }
    check_submit();
}
// 删除规格
const del_spec = (e:sm.spec)=>
{
    kxyk.Modal.confirm({
        title: '删除'+props.coms.spec_name,
        content: '确定要删除'+e.spec_name+'吗？',
        onOk(){
            _.remove(goods.spec,(x:sm.spec)=>{
                return x.spec_name == e.spec_name;
            });
            if(spec_suk.value == e.spec_name) spec_suk.value = '';
            if(spec_suk.value == '' && goods.spec.length>0){
                spec_suk.value = goods.spec[0].spec_name;
                goods.spec[0].is_show = true;
            }
            check_submit();
        },
        onCancel() {},
    });
}
// 点击规格按钮
const select_suk=(e:sm.spec)=>
{
    if(e.spec_name === spec_suk.value) return false;
    let suk:sm.suk[] = [];
    goods.spec.forEach(e1=>{
        if(e1.suk.length>0 && suk.length<=0) suk=e1.suk; 
        e1.is_show = false;
    });
    spec_suk.value = e.spec_name;
    e.is_show = true;
    if(e.suk.length<=0){
        e.suk = JSON.parse(JSON.stringify(suk));  
    } 
}

//修改服务时传参进来
const set_goods:any = (g:sm.good)=>
{
    // console.log('这里传来的',spec_suk.value,g);
    goods.id = g.id;
    goods.spec = g.spec;
    goods.goods_img = g.goods_img;
    goods.goods_name = g.goods_name;
    goods.sub_pay_price = g.sub_pay_price || 0;
    goods.sub_pay_type = g.sub_pay_type || 0;
    goods.sub = g.sub;
    goods.is_cash = g.is_cash;
    goods.sub_pay = g.sub_pay || 0;
    spec_suk.value = goods.spec[0].spec_name;
    goods.spec[0].is_show = true;
    goods.store_id = g.store_id;
    goods.is_reserve = g.is_reserve || 0;
    goods.is_user_buy = g.is_user_buy || 0;
    goods.bonus = g.bonus || 0;

    if(goods.store_id)
    {
        //C1C2修改
        is_open_add.value = true;
        // gsap.from('b0',{height:'1px',direction:2});
        gsap.to('.b0',{height:'calc(100vh - 85px)',ease:'power4.out',duration:.6});
        // console.log('进入这里？？？');
        if(is_add_muban.value){
            gsap.to('.muban',{height:'0px',opacity:0,ease:'power4.out',duration:.6});
        }
    }else{
        open_add();
    }
    
}
const addgoods = ref<any>(null);
defineExpose({set_goods,addgoods});


const has_suk = ref();
interface Props { coms?:any,role?:string,store_id?:number,muban?:any,suk?:any,cpid:number,vips?:any,sub2?:tb.kxyk_mch_store_sub[],sub?:tb.kxyk_mch_store_sub[]};
// 接受参数
const props = withDefaults(defineProps<Props>(), {
    coms: {}, role:'A1A2',store_id:0,muban:[],suk:[]
});
// 初始化商品
const goods = reactive<sm.good>({
    spec:[],goods_img:'',goods_name:'',id:0,count:0,vips:[],coupon_ids:[]
});

// 这里监控上级组件切换车型后重新计算模板价格
watch(    
    () => props.suk,
    (has_suk, prevCount) => {
        if(has_suk)
        {
            shop.goods.switch_spec({has:props.suk,goods:props.muban,label:'',id:0,level:0,root_id:0,children:[]});
        }
    }
)
// 这里初始化给服务下添加车型规格
const init_suk = ()=>
{
    let spec:sm.spec[] = [
        {spec_name:"默认",suk:[],is_show:true}
    ];
    
    if(spec_suk.value == ''){
        spec_suk.value = spec[0].spec_name;
        spec[0].is_show = true;
    }
    goods.spec = spec;

    
}

const is_add_muban = ref(false);//添加模板是否打开
// 选择模板添加服务
const open_add_muban = (g:sm.good)=>
{
    // console.log('要添加的服务',g,props.vips);
    goods.id = 0;
    goods.spec = g.spec;
    goods.goods_img = g.goods_img;
    goods.sub_pay = g.sub_pay || 0;
    goods.goods_name = g.goods_name;
    spec_suk.value = goods.spec[0].spec_name;
    goods.spec[0].is_show = true;
    // 格式化会员等级价格
    if(props.vips && props.vips.length > 0){
        goods.spec.forEach(spec=>{
            spec.suk.forEach(suk=>{
                suk.items.forEach(item=>{
                    if(!item.vips || item.vips.length <= 0){
                        let vvi:any = [];
                        props.vips.forEach((v:any)=>{
                            vvi.push({vip_id:v.id,vip_name:v.name,price:0});
                        })
                        item.vips = vvi;
                    }
                })
            })
        })
    }
    gsap.to('.muban',{height:'0px',opacity:0,ease:'power4.out',duration:.6});
    gsap.to('.b0',{height:'calc(100vh - 85px)',ease:'power4.out',duration:.6});
    is_add_muban.value = false;
    is_open_add.value = true;
    check_submit();
}
// 模板模式下全新添加
const open_add_muban_new = ()=>
{
    gsap.to('.muban',{height:'0px',opacity:0,ease:'power4.out',duration:.6});
    gsap.to('.b0',{height:'calc(100vh - 85px)',ease:'power4.out',duration:.6});
    is_add_muban.value = false;
    is_open_add.value = true;
    goods.id = 0;
    init_suk();
}
// 打开添加服务
const open_add = ()=>
{
    if(props.role === 'C1C2')
    {
        // console.log(props.muban);
        gsap.to('.muban',{height:'15rem',opacity:1,ease:'power4.out',duration:.6});
        is_add_muban.value = true;
    }else{
        is_open_add.value = true;
        // gsap.from('b0',{height:'1px',direction:2});
        gsap.to('.b0',{height:'calc(100vh - 85px)',ease:'power4.out',duration:.6});
        init_suk();
    }

    // gsap.to('.b0',{height:'calc(100vh - 85px)',ease:'elastic.out(1,0.4)',duration:1})
    // gsap.to('.b0',{height:'calc(100vh - 125px)',ease:'back.out(1.7)',duration:.8})
}

// 关闭添加服务或商品
const close_add = ()=>
{
    is_open_add.value = false;
    goods.goods_img = '';
    goods.goods_name = '';
    goods.spec = [];
    spec_suk.value = '';
    gsap.to('.b0',{height:'0px',ease:'power4.out',duration:.6})
}



onMounted(()=>{
    // dom挂载完成
    // console.log('组件内容，子组件加载完成',props.coms.id);
    init_suk();
    
});
</script>


