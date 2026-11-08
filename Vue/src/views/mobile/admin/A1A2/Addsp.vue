<style scoped lang="stylus">
.AddSP
    // color:red; 
    .is_comob 
        background: #f6f6f6; border: 1px solid #e7e7e7; margin-bottom: 5px;
        .nnn1 
            padding: 5px;
            .rule 
                margin-bottom: 5px;
                .row 
                    display flex; gap: 5px;
    .h 
        position: fixed; bottom: 0px; width: 100%; height: auto;z-index: 999;
        .b0 
            border: 1px solid #e7e7e7; border-bottom-width: 0; overflow-y: auto;background: white;height :0px; 
        .b1 
            padding: .3rem; background: white;border: 1px solid #e7e7e7; border-top-width: 0;
            .muban 
                overflow-y: auto;background: white;height :0px; opacity:0; 

    .base 
        padding: .5rem; line-height: 0;
        .c18
            display: flex; flex-direction: column; justify-content: center;
        .shoukuan
            display flex;
    .srow 
        display: flex; flex-direction: row; align-items: center;text-align: left; margin-top: 6px;

    .sname 
        padding: 0 .5rem;flex: 1
        .label 
            line-height: 1.2;background-color: #fafafa; border: 1px solid #d9d9d9; border-radius: 2px; color: rgba(0,0,0,.85); font-size: 14px; font-weight: 400; padding: 3px 11px; text-align: center; transition: all .3s;
        .d12 
            display: flex; justify-content: center; align-items: center;
        .m1 
            background: #fafafa; border-radius: 3px; border: 1px solid #dfdfdf; color: #999999;overflow: auto;
            .p3 
                padding: 0 3px 2px 3px;
    .no1 
        flex: 0 0 0.001%; max-width: 0.001%; margin-left: -2px; 
    .all_ 
        transition: all .6s; 
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
                .m1 
                    padding: 3px 5px; font-size: .8rem; background: #dedede; border-radius: 3px; color: #a2a2a2;
            .c 
                color: red;font-size: 1rem;
                .tt 
                    color: #b9b9b9; font-size: .8rem;
                .cc 
                    color: red; font-size: 1rem;
            .c1 
                line-height: 0; 
        .c6 
            padding: 8px;
            .select_muban 
                height: 100%; background: #f56c6c; border-radius: 5px; color: #fff; border: 1px solid #ff7777; display: flex; flex-direction: column; justify-content: center; text-shadow: 0 0 2px #ffbfbf; 
</style>

<template lang="pug">

div 
    div.AddSP(ref="AddSP")
        div.h(:style="{bottom:props.role ==='C1C2'?43+'px':0+'px'}")
            div.b0
                a-row.base 
                    a-col(span="5")
                        Upload(v-if="is_open_add" v-model:url="goods.goods_img" @change="check_submit" max="1")
                    a-col(span="19")
                        div.sname
                            a-input(size="small" :addon-before="props.coms.label+'名称'" v-model:value="goods.goods_name" @change="check_submit" placeholder="请输入名称")
                        div.shoukuan
                            div.sname.srow
                                el-select( v-model="goods.sub" placeholder="选择分类 " size="small")
                                    el-option( v-for="item in sub" :key="item.id" :label="item.name+`(${item.name2})`" :value="item.id" )
                            div.sname.srow
                                el-select( v-model="goods.sub_pay" placeholder="选择收款商户" size="small")
                                    el-option(label="选择收款商户号" :value="0" )
                                    el-option( v-for="item in sub2" :key="item.id" :label="item.pay_name" :value="item.id" )
                        div.sname(style="padding-top: 5px;" v-if="goods.sub_pay")
                            el-input(size="small" placeholder="请输入结算金额" v-model="goods.sub_pay_price")
                                template(#prepend)
                                    span 结算金额
                                template(#append)
                                    el-select(v-model="goods.sub_pay_type"  style="width: 85px")
                                        el-option(label="%" :value="0" )
                                        el-option(label="￥" :value="1" )
                        div.sname(style="padding-top: 5px;")
                            el-input(size="small" placeholder="请输入销售金额" v-model="goods.bonus")
                                template(#prepend)
                                    span 销售提成
                                template(#append)
                                    el-select(v-model="goods.bonus_type"  style="width: 85px")
                                        el-option(label="%" :value="0" )
                                        el-option(label="￥" :value="1" )
                        div.sname(v-if="props.coms.label === '商品'")
                            a-row(style="margin-top: 0.3rem;" :gutter="5") 
                                a-col(span="12")
                                    a-input(size="small" v-model:value="goods.price"  @change="check_submit" addon-before="游客价格")
                                a-col.d12(span="12")
                                    a-input(size="small" v-model:value="goods.v_price"  @change="check_submit" addon-before="普通会员")
                            div(style="margin-top: 0.3rem;") 
                                div(style="margin-top: 0.3rem;display: flex;line-height: 1.5;")
                                    div(style="text-align: left;padding: 2px;")
                                        span 会员
                                            a-switch(v-model:checked="goods.is_vip_price" :checkedValue="1" :unCheckedValue="0" checked-children="开" un-checked-children="关")
                                    div(style="text-align: left;padding: 2px; margin-left: 10px;")
                                        span 现金 
                                            a-switch(v-model:checked="goods.is_cash" :checkedValue="1" :unCheckedValue="0" checked-children="开" un-checked-children="关")
                                    div(style="text-align: left;padding: 2px; margin-left: 10px;")
                                        span 送货
                                            a-switch(v-model:checked="goods.is_delivery" :checkedValue="1" :unCheckedValue="0" checked-children="开" un-checked-children="关")

                                a-row(v-if="goods.is_vip_price" :gutter="5")
                                    a-col(span="12" v-for="v in goods.vips")
                                        div(style="margin: 2px 0;")
                                            a-input(size="small" v-model:value="v.price"  @change="check_submit" :addon-before="v.vip_name")
                                            
                                //-     a-input(size="small" v-model:value="goods.v_price"  @change="check_submit" addon-before="会员价格")
                        div.sname(v-else)
                            a-row(style="margin-top: 0.3rem;") 
                                a-col(span="24")
                                    a-input(size="small" v-model:value="goods.import_price" @change="check_submit" addon-before="进货价格")
                            a-row(style="margin-top: 0.3rem;") 
                                a-col(span="24")
                                    a-input(size="small" v-model:value="goods.export_price" @change="check_submit" addon-before="出货价格")
                div.is_comob
                    div(style="text-align: left;padding: 2px; margin-left: 10px;")
                        span 第三方
                            a-switch(v-model:checked="goods.is_other" :checkedValue="1" :unCheckedValue="0" checked-children="开" un-checked-children="关")
                    div.nnn1.sname(style='display: flex;align-items: center; gap:5px;' v-if="goods.is_other")
                        div.m1 
                            div 关联第三方
                            el-select( v-model="goods.other_id" filterable style="width: 100%;" :reserve-keyword="false" placeholder="请选择第三方" )
                                el-option( v-for="item in other" :key="item.id" :label="item.pname" :value="item.id") {{ item.pname }}
                        div.m1 
                            div 第三方价格
                            div.p3 
                                a-input(v-model:value="goods.other_price" @change="check_submit" placeholder="设置第三方价格")
                div.is_comob 
                    div(style="text-align: left;padding: 2px; margin-left: 10px;")
                        span 套餐
                            a-switch(v-model:checked="goods.is_combo" :checkedValue="1" :unCheckedValue="0" checked-children="开" un-checked-children="关")
                    div.nnn1(v-if="goods.is_combo")
                        div 
                            el-select( v-model="goods.combo_list" multiple filterable style="width: 100%;" :reserve-keyword="false" placeholder="请选择配置" )
                                el-option( v-for="item in stroe_goods" :key="item.key" :label="item.label" :value="item.key") {{ item.label }}
                div.is_comob 
                    div(style="text-align: left;padding: 2px; margin-left: 10px;")
                        span 套卡
                            a-switch(v-model:checked="goods.is_combo2" :checkedValue="1" :unCheckedValue="0" checked-children="开" un-checked-children="关")
                    div.nnn1(v-if="goods.is_combo2")
                        div(v-if="goods.is_combo2 && typeof goods.combo2_list === 'object'")
                            div.rule(v-for="value in goods.combo2_list")
                                div.row
                                    div
                                        el-select(v-model="value.id" placeholder="请选择卡券" size="small")
                                            el-option(:label="'请选择卡券'" :value="0")
                                            el-option(v-for="s in coupons" :label="s.name" :value="s.id")
                                            //- el-option(:label="'洗浴门店'" :value="2")
                                    div
                                        el-input(v-model="value.count" placeholder="发放数量" size="small")
                                            template(#append) 张
                                    div 
                                        div.de(@click="delRecharge(goods,value)")
                                            i.fa.fa-trash.fa-fw.fa-2x 
                        div.but
                            a-button(type="primary" style="width: 100%;" @click="addRecharge(goods)") + 添加卡券

                a-row.sname
                    a-col(span="24")
                        div.m1 
                            div 商品详情(选填)
                            div.p3 
                                Upload(style="max-width: 80px;" v-if="is_open_add" v-model:url="goods.desc1" @change="check_submit" max="5")

                a-row.sname(:gutter="4" style="margin-bottom: 5px;" v-if="props.coms.label === '商品'")
                    a-col(span="12")
                        div.m1 
                            div 渠道名称
                            div.p3 
                                a-input(size="small" v-model:value="goods.import_store_name" @change="check_submit" placeholder="渠道商名称，可不填")

                    a-col(span="12")
                        div.m1 
                            div 渠道电话 
                            div.p3
                                a-input(size="small" v-model:value="goods.import_store_phone" @change="check_submit" placeholder="渠道电话")
                a-row.sname(:gutter="4" v-if="props.coms.label === '商品'")
                    a-col(span="8")
                        div.m1
                            div 库存
                                span(style="color: red;") *
                            div.p3 
                                a-input(size="small" v-model:value="goods.stock" @change="check_submit" placeholder="库存数量必填")
                    a-col(span="8")
                        div.m1
                            div 进货价
                            div.p3
                                a-input(size="small" v-model:value="goods.import_price" @change="check_submit" placeholder="进货价")
                    a-col(span="8")
                        div.m1
                            div 出货价
                            div.p3 
                                a-input(size="small" v-model:value="goods.export_price" @change="check_submit" placeholder="出货价")

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
                                            a-row
                                                a-col(span="8")
                                                    img.img(:src="g.goods_img")
                                                a-col.c16(span="10" v-if="coms.label ==='商品'")
                                                    div.t.elesis  {{g.goods_name}}
                                                        span.m1 模板

                                                    div.c 
                                                        span.tt 普通：
                                                            span.cc ￥{{g.price}}
                                                    div.c(v-if="g.is_vip_price") 
                                                        span.tt 会员：
                                                            span.cc ￥{{g.v_price}}
                                                a-col.c16(span="10" v-else)
                                                    div.t.elesis  {{g.goods_name}}
                                                        span.m1 模板
                                                    div.c 
                                                        span.tt 进货价：
                                                            span.cc ￥{{g.import_price}}
                                                    div.c
                                                        span.tt 出货价：
                                                            span.cc ￥{{g.export_price}}
                                                    
                                                a-col.c6(span = "6")
                                                    div.select_muban(@click="open_add_muban(g)") 
                                                        div 选择
                                                        div 模板
                                                    
        
</template>

<script lang="ts">
import Upload from "@/views/com/UploadImg.vue";
import init from 'module-alias';

export default { 
    name: "Addsp",
    components:{Upload:Upload }
};

</script>
<script setup lang="ts">
import { ref ,reactive,onMounted,computed,watch} from 'vue';
import { useRoute } from "vue-router";
import gsap from "gsap";
import { kxyk ,Api,shop,__ } from "smkj";


const emit = defineEmits(["upend"]);
const route = useRoute();


const delRecharge = (g:sm.good,ch:any)=> 
{
    if(!g.combo2_list || typeof g.combo2_list !== 'object') g.combo2_list = [];
    let index = __.findIndex(g.combo2_list,ch);
    if(-1 !== index){
        __.pullAt(g.combo2_list,index)
    }
}

/** 给套票里添加卡券 */
const addRecharge = (g:sm.good)=>
{
    if(!g.combo2_list || typeof g.combo2_list !== 'object') g.combo2_list = [];
    g.combo2_list.push({id:0,count:1});
}
// 验证是否可以递交
const check_submit = ()=>
{
    if(props.coms.label === '商品'){
        try {
            if(!goods.goods_img) throw "请上传服务图片";
            if(!goods.goods_name) throw "请填写商品名称";
            if(!goods.stock) throw "请填写商品库存";
            // 开放保存按钮状态
            is_submit.value = false;
            return {status:1};
        } catch (error) {
            // 设置保存按钮状态，无法递交
            // kxyk.msg.error(error as string);
            is_submit.value = true;
            return {status:0,msg:error};
        }
    }else{
        try {
            if(!goods.goods_img) throw "请上传服务图片";
            if(!goods.goods_name) throw "请填写商品名称";
            if(!goods.import_price) throw "请填写进货价";
            if(!goods.export_price) throw "请填写出货价";
            is_submit.value = false;
            return {status:1};
        } catch (error) {
            is_submit.value = true;
            // console.log(error);
            return {status:0,msg:error};
        }
    }

}
// 开始递交数据
const submit = ()=>
{
    // console.log('开始提交',goods);

    let status:any = check_submit();
    if(!status.status) return kxyk.msg.error(status.msg);
    submit_loading.value = true;
    // console.log(goods);
    if(props.role === 'A1A2'){
        goods.store_id = 0;
    }else if(props.role === 'C1C2'){
        goods.store_id = props.store_id;
    }

    if(goods.is_combo2 && goods.is_combo){
        submit_loading.value = false;
        return kxyk.msg.error('套餐和套票只能选择一种类型，不能同时选择。');
    }

    if(goods.is_combo2){
        if(!goods.combo2_list || !goods.combo2_list.length){
            kxyk.msg.error('请添加套票卡券');
            submit_loading.value = false;
            return false;
        }else{
            if(goods.combo2_list.length && typeof goods.combo2_list === 'object'){
                let err = false;
                goods.combo2_list.forEach((ch)=>{
                    if(!ch.id || !ch.count){
                        err = true;
                    } 
                })
                if(err){
                    submit_loading.value = false;
                    return kxyk.msg.error('请选择套票卡券或设置数量');
                }
            }

        }
    }
    if(goods.is_combo){
        if(!goods.combo_list || !goods.combo_list.length){
            kxyk.msg.error('请选择套餐商品或服务');
            submit_loading.value = false;
            return false;
        }
    }
    if(typeof goods.other_price === 'string') goods.other_price = parseFloat(goods.other_price);
    kxyk.sk.be(Api.shop.A1A2.SaveAddSp,{type_id:props.coms.id,cpid:props.cpid,goods:goods},res=>{
        submit_loading.value = false;
        if(res.status)
        {
            goods.goods_img= "";
            goods.goods_name="";

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

const submit_loading = ref(false);//递交加载状态
const is_submit = ref(true);//递交按钮状态
const is_open_add = ref(false);//是否打开添加按钮


//修改服务时传参进来
const set_goods:any = (g:sm.good)=>
{
    goods.id = g.id;
    goods.goods_img = g.goods_img;
    goods.goods_name = g.goods_name;
    goods.store_id = g.store_id;
    goods.price = g.price;
    goods.v_price = g.v_price;
    goods.is_vip_price = g.is_vip_price;
    goods.import_store_name = g.import_store_name;
    goods.import_store_phone = g.import_store_phone;
    goods.export_price = g.export_price;
    goods.import_price = g.import_price;
    goods.stock = g.stock;
    goods.is_cash = g.is_cash;
    goods.vips = g.vips;
    goods.is_delivery = g.is_delivery;
    goods.is_combo = g.is_combo;
    goods.is_combo2 = g.is_combo2;
    goods.is_other = g.is_other;
    goods.other_id = g.other_id;
    goods.other_price = g.other_price;
    goods.combo_list = g.combo_list;
    goods.combo2_list = g.combo2_list;
    if(g.combo_list && typeof g.combo_list === "string"){
        goods.combo_list = g.combo_list.split(',');
    } 
    if(g.combo2_list && typeof g.combo2_list === "string") goods.combo2_list = JSON.parse(g.combo2_list);
    if(g.desc1 && g.desc1.length > 0){
        goods.desc1 = g.desc1;
    }
    if(g.sub_pay){
        goods.sub_pay = g.sub_pay;
    }else{
        goods.sub_pay = 0;
    }
    if(g.bonus_type){
        goods.bonus_type = g.bonus_type;
    }else{
        goods.bonus_type = 0;    
    }
    if(g.bonus){
        goods.bonus = g.bonus;
    }else{
        goods.bonus = 0;
    }
    if(g.sub_pay_type){
        goods.sub_pay_type = g.sub_pay_type;
    }else{
        goods.sub_pay_type = 0;
    }
    if(g.sub_pay_price){
        goods.sub_pay_price = g.sub_pay_price;
    }else{
        goods.sub_pay_price = 0;
    }
    if(g.sub){
        goods.sub = g.sub;
    }else{
        goods.sub = 0;
    }
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
    check_submit();
}
const addsp = ref<any>(null);
defineExpose({set_goods,addsp});



interface Props { coms?:any,role?:string,store_id?:number,muban?:any,suk?:any,cpid:number,vips?:any,sub2?:tb.kxyk_mch_store_sub[], sub?:tb.kxyk_mch_store_sub[]};
// 接受参数
const props = withDefaults(defineProps<Props>(), {
    coms: {}, role:'A1A2',store_id:0,muban:[],suk:[]
});
// 初始化商品
const goods = reactive<sm.good>({
    goods_name:'',price:0,v_price:0,is_vip_price:0,spec:[],count:0,id:0,vips:[],coupon_ids:[],desc1:[]
});


/** 添加商品的时候初始化商品 */
const initGoods = ()=>{
    goods.id = 0;
    goods.goods_name = '';
    goods.price = 0;
    goods.v_price = 0;
    goods.is_vip_price = 0;
    goods.import_store_name = '';
    goods.import_store_phone = undefined;
    goods.export_price = 0;
    goods.import_price = 0;
    goods.stock = 0;
    goods.combo_list = [];
    goods.combo2_list = [];
    goods.desc1 = [];
    goods.sub_pay = 0;
    goods.bonus = 0;
    goods.bonus_type = 0;
    goods.sub_pay_type = 0;
    goods.sub_pay_price = 0;
    goods.sub = 0;
    
}

const is_add_muban = ref(false);//添加模板是否打开
// 选择模板添加服务
const open_add_muban = (g:sm.good)=>
{
    initGoods();
    goods.id = 0;
    goods.goods_img = g.goods_img;
    goods.goods_name = g.goods_name;
    goods.price = g.price;
    goods.v_price = g.v_price;
    goods.is_vip_price = g.is_vip_price;
    goods.import_store_name = g.import_store_name;
    goods.import_store_phone = g.import_store_phone;
    goods.export_price = g.export_price;
    goods.import_price = g.import_price;
    goods.stock = g.stock;
        // 格式化会员等级价格
    if(props.vips && props.vips.length > 0 ){
        let vvi:any = [];
        props.vips.forEach((v:any)=>{
            vvi.push({vip_id:v.id,vip_name:v.name,price:0});
        })
        goods.vips = vvi;
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
    if(props.vips && props.vips.length > 0 && (!goods.vips || goods.vips.length <= 0)){
        let vvi:any = [];
        props.vips.forEach((v:any)=>{
            vvi.push({vip_id:v.id,vip_name:v.name,price:0});
        })
        goods.vips = vvi;
    }
    initGoods();
    is_add_muban.value = false;
    is_open_add.value = true;
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
    }

}

// 关闭添加服务或商品
const close_add = ()=>
{
    is_open_add.value = false;
    goods.goods_img = '';
    goods.goods_name = '';
    goods.price = 0;
    goods.v_price = 0;
    goods.is_vip_price = 0;
    goods.import_store_name = '';
    goods.import_store_phone = undefined;
    goods.export_price = 0;
    goods.import_price = 0;
    goods.stock = 0;
    gsap.to('.b0',{height:'0px',ease:'power4.out',duration:.6})
}

interface Option { key: number;label: string;disabled: boolean;id:number;sid:number };
const stroe_goods = ref<Option[]>([]);//所有门店和商品数据
const other = ref<tb.kxyk_other_payment[]>([]);//第三方列表
const coupons = ref<sm.CouponPack[]>([]);//缓存商品

const getStoreDate = (): Option[] => {
    kxyk.sk.be(Api.shop.U.GetStoreGoodsAndCoupon,{cid:route.params.circle_id,sid:props.store_id},res=>{
        if(res.status)
        {
            if(res.goods){
                stroe_goods.value = res.goods;
            }
            if(res.list){
                coupons.value = res.list;
            }
            if(res.other){
                other.value = res.other;
            }
        }
    })
    return [];
}

onMounted(()=>{
    // dom挂载完成
    // console.log('组件内容，子组件加载完成',props.coms.id);
    getStoreDate();
    
});
</script>


