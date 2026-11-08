<style lang="stylus">
    @import "./AddCoupon.styl"
</style>
<template lang="pug">
div.AddCoupon(ref="modal1")
    a-modal.n1(v-model:visible="coms.open" width="100%" wrap-class-name="full-modal-max" :getContainer="()=>modal1" :closable="false" okText="保存") 
        template(#title)
            span.b1 创建卡券
        template(#footer)
            a-row(style="text-align: center;" :gutter="10")
                a-col(:span="coms.coupon.id ? '12' : '8'")
                    a-button(@click="coms.open = false" block) 取消
                a-col(:span="coms.coupon.id ? '12' : '8'")
                    a-button(type="primary" :disabled="save" @click="OnSubmit" block) {{coms.coupon.id ? '保存修改' : '创建'}}
                a-col(span="8" v-if="!coms.coupon.id")
                    a-button(type="primary" :disabled="save" @click="OnSubmit(true)" block) 连续创建1
        a-spin(:spinning="submit_loading" tip="保存中...")
            div.from(:style="{height:kxyk.utils.DOM.get_surplus_higth(['ant-modal-header','ant-modal-footer'])+'px'}") 
                div
                    el-form(label-position="left" label-width="0" :model="coms.coupon" style="max-width: 100%" )
                        el-form-item
                            a-row(:gutter="5")
                                a-col(span="15")
                                    el-input(v-model="coms.coupon.name" placeholder="请输入卡券/卡包名称"  @change="is_submit")
                                        template(#prepend) 卡券名称
                                a-col(span="9")
                                    el-input(v-model="coms.coupon.sort" placeholder="越高越先使用"  @change="is_submit")
                                        template(#prepend) 排序
                        el-form-item
                            a-row(:gutter="5")
                                a-col(span="12")
                                    el-input(v-model.number="coms.coupon.price" placeholder="销售金额" type="number" @change="is_submit")
                                        template(#prepend) 销售金额
                                a-col(span="6")
                                    el-input(v-model.number="coms.coupon.count" placeholder="数量" type="number" @change="is_submit")
                                        template(#append) 张
                                a-col(span="6")
                                    el-input(v-model.number="coms.coupon.use_count" readonly placeholder="次数" type="number" @change="is_submit")
                                        template(#append) 次
                        el-form-item
                            a-row(:gutter="5")
                                a-col(span="15")
                                    el-input(v-model.number="coms.coupon.commission" placeholder="销售金额"  @change="is_submit")
                                        template(#prepend) 销售分佣
                                        template(#append)
                                            el-select(v-model="coms.coupon.commission_type" placeholder="Select" style="padding-left: 10px; padding-right: 7px; width: 85px;")
                                                el-option(label="%" :value="0")
                                                el-option(label="￥" :value="1")
                                a-col(span="9")
                                    el-checkbox(v-model="coms.coupon.is_new_user_commission" :true-label="1" :false-label="0" label="仅拓新分佣" border style="width: 100%;")
                        el-form-item
                            a-row(:gutter="5" style="line-height: 1;")
                                a-col(span="10")
                                    el-input(v-model.number="coms.coupon.issued_count" placeholder="发放总数量"  @change="is_submit")
                                        template(#prepend) 发放数量
                                a-col(span="14")
                                    el-radio-group(v-model="coms.coupon.user_get_authority" @change="is_submit")
                                        el-radio-button(:label="0" border) 所有用户领
                                        el-radio-button(:label="1" border) 仅新用户领
                        //- 是否渠道
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 是否渠道
                                div.item_content
                                    el-radio-group(v-model="coms.coupon.is_channel" @change="is_submit")
                                        el-radio-button(:label="0" border) 否
                                        el-radio-button(:label="1" border) 是
                        //- 是否核销
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 是否核销
                                div.item_content
                                    el-radio-group(v-model="coms.coupon.is_verification" @change="is_submit")
                                        el-radio-button(:label="0" border) 否
                                        el-radio-button(:label="1" border) 是
                        //- 渠道
                        div(style="margin-bottom: 10px;" v-if="coms.coupon.is_channel === 1")
                            div.exa
                                el-input(v-model.number="coms.coupon.channel_str" placeholder="建行、东泽、法院等1-2个中文字符"  @change="is_submit")
                                    template(#prepend) 渠道名称
                        //- 是否补价
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 是否补价
                                div.item_content
                                    el-radio-group(v-model="coms.coupon.is_rep" @change="is_submit")
                                        el-radio-button(:label="0" border) 否
                                        el-radio-button(:label="1" border) 是
                        //- 渠道
                        div(style="margin-bottom: 10px;" v-if="coms.coupon.is_rep === 1")
                            div.exa
                                el-input(v-model.number="coms.coupon.rep_msg" placeholder="卡券锁定状态的说明文字"  @change="is_submit")
                                    template(#prepend) 补价说明
                            div.exa
                                el-input(v-model.number="coms.coupon.rep_price" placeholder="解锁金额"  @change="is_submit")
                                    template(#prepend) 补价金额
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 商品兑换
                                div.item_content
                                    el-radio-group(v-model="coms.coupon.is_exchange" @change="is_submit")
                                        el-radio-button(:label="0" border) 关闭
                                        el-radio-button(:label="1" border) 开启
                        //- 兑换
                        div(style="margin-bottom: 10px;" v-if="coms.coupon.is_exchange")
                            div.exa
                                //- 票面金额
                                el-input(v-model.number="coms.coupon.show_price" placeholder="票面金额"  @change="is_submit")
                                    template(#prepend) 票面金额
                                    template(#append) 元
                                div(style="margin-top: 5px;") 
                                    el-transfer(style="display: flex;flex-wrap: wrap;" v-model="coms.coupon.exchange" filterable 
                                        :left-default-checked="coms.coupon.exchange_left" :right-default-checked="coms.coupon.exchange_right"
                                        @left-check-change="left_change($event,'exchange')" :titles="['全选门店','全选商品']" 
                                        :data="stroe_goods" @right-check-change="right_change($event,'exchange')")
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 商品抵值
                                div.item_content
                                    el-radio-group(v-model="coms.coupon.is_low" @change="is_submit")
                                        el-radio-button(:label="0" border) 关闭
                                        el-radio-button(:label="1" border) 开启
                        //- 低值
                        el-form-item(v-if="coms.coupon.is_low") 
                            //- 低值金额
                            div.exa
                                a-row(:gutter="5")
                                    a-col(span="12")
                                        el-input(v-model.number="coms.coupon.full_low_price" placeholder="消费满额可用"  @change="is_submit")
                                            template(#prepend) 满额抵值
                                            template(#append) 元
                                    a-col(span="12")
                                        el-input(v-model.number="coms.coupon.is_low_count" placeholder="消费满额可用"  @change="is_submit")
                                            template(#prepend) 单笔可用
                                            template(#append) 张
                                a-row.e2(:gutter="5")
                                    a-col(span="12")
                                        el-input(v-model.number="coms.coupon.actual_price" placeholder="实际抵值金额"  @change="is_submit")
                                            template(#prepend) 抵值金额
                                            template(#append) 元
                                    a-col(span="12")
                                        el-radio-group(style="width: 150px;" v-model="coms.coupon.actual_type" @change="is_submit")
                                            el-radio-button(:label="0" border) 自动
                                            el-radio-button(:label="1" border) 手动
                                a-row.c_row(:gutter="5" v-if="coms.coupon.actual_type === 1")
                                    a-col(span="12" style="margin: 3px 0;" v-for="(coupon,index) in coms.coupon.coupon")
                                        el-input(v-model.number="coupon.actual_price" placeholder="抵值金额"  @change="is_submit")
                                            template(#prepend) 卡{{index+1}}抵值
                                            template(#append) 元
                                            el-form-item
                                div.form_item_row(style="margin-top: 5px;")
                                    div.item_label
                                        div 是否和其他卡券叠加使用
                                    div.item_content
                                        el-radio-group(v-model="coms.coupon.is_low_multiplex" @change="is_submit")
                                            el-radio-button(:label="0" border) 关闭
                                            el-radio-button(:label="1" border) 开启
                            div(style="margin-top: 5px;") 
                                el-transfer(style="display: flex;flex-wrap: wrap;" v-model="coms.coupon.low" filterable 
                                    :left-default-checked="coms.coupon.low_left" :right-default-checked="coms.coupon.low_right"
                                    @left-check-change="left_change($event,'low')" :titles="['全选门店','全选商品']" 
                                    :data="stroe_goods" @right-check-change="right_change($event,'low')")
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 发放时间
                                div.item_content
                                    div.flex__
                                        el-radio-group(v-model="coms.coupon.issuing_rule" @change="is_submit")
                                            el-radio-button(:label="'0'" border) 即时
                                            el-radio-button(:label="'1'" border) 每周1
                                            el-radio-button(:label="'2'" border) 每月1日
                                        div.custom_time
                                            el-date-picker(style="width: 100%;" :prefix-icon="'s'" v-model="coms.coupon.issuing_rule" value-format="YYYY-MM-DD" @change="is_submit" type="date" placeholder="自定时间")
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 活动期限
                                div.item_content
                                    a-row(style="align-items: center;text-align: center;")
                                        a-col(span="11")
                                            el-date-picker(style="width: 100%;" v-model="coms.coupon.issuing_start" value-format="YYYY-MM-DD" type="date" @change="is_submit" placeholder="开始日期")
                                        a-col(span="2") 至
                                        a-col(span="11")
                                            el-date-picker(style="width: 100%;" v-model="coms.coupon.issuing_end" value-format="YYYY-MM-DD" type="date" @change="is_submit" placeholder="结束日期")
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 使用期限
                                div.item_content
                                    div.flex__
                                        div(style="margin-right: 5px;")
                                            el-radio-group(v-model="coms.coupon.use_day" @change="is_submit")
                                                el-radio-button(:label="30" border) 一月
                                                el-radio-button(:label="120" border) 一季
                                                el-radio-button(:label="365" border) 一年
                                        div(style="flex: 1")
                                            el-input(v-model.number="coms.coupon.use_day" placeholder="可用天数"  @change="is_submit")
                                                template(#append) 天
                        el-form-item
                            div.form_item_row
                                div.item_label
                                    div 截止日期
                                div.item_content
                                    div.flex__
                                        div
                                            el-date-picker(style="width: 100%;" v-model="coms.coupon.use_end" type="date" placeholder="截止日期")
                                        div(style="margin-left: 5px;")
                                            el-checkbox(v-model="coms.coupon.is_give" :true-label="1" :false-label="0" label="是否允许转发" border style="width: 100%;")
                        //- 卡券逻辑预览
                        div(style="text-align: center;color: #dbdbdb;") 卡包内部状态 - 测试
                            a-row(v-for="(coupon,index) in coms.coupon.coupon")
                                a-col(span="5") {{index+1}}
                                a-col(span="9") {{coms.coupon.name}}
                                a-col(span="5") 面额:{{coupon.show_price}}
                                a-col(span="5") 低值:{{coupon.actual_price}}

        div.wxpip(ref="wxpip")
</template>

<script lang="ts">
export default { 
    name: "AddCoupon",
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
// 提交数据
const OnSubmit=(continuity:boolean=false) => 
{
    submit_loading.value = true;
    save.value = true;
    kxyk.sk.be(Api.shop.C1.SaveCouponPack,{cid:route.params.cip,pack:props.coms.coupon},res=>{
        submit_loading.value = false;
        save.value = false;
        if(res.__error__)
        {
            return false;
        }
        if(res.status){
            kxyk.msg.success('卡券添加成功');
            if(continuity !== true){
                props.coms.open = false;
            }
            emit('addSuccess');
        }
    });
    
};

// 检测提交按钮是否可用
const is_submit = ()=>
{
    // 格式化卡券数量
    format_coupon_count();
    save.value = true;
    let pack = props.coms.coupon;
    if(!pack.name || !pack.count || !pack.use_count || (!pack.is_exchange && !pack.is_low)) return false;
    // 打开兑换 但没有选择兑换商品
    if(pack.is_exchange && (!pack.exchange_right || pack.exchange_right.length<=0)) return false;
    // 打开低值 但没有选择低值商品
    if(pack.is_low && (!pack.low_right || pack.low_right.length<=0)) return false;
    // 验证发放规则 - 选择 每周 每月 或者自定义日期时 必须要选择活动时间 - 暂时关闭这调认证
    // if(pack.issuing_rule !== '0' && (!pack.issuing_start || !pack.issuing_end)) return false;
    //卡券领取后可用时间必填
    if(!pack.use_day) return false;
    //渠道验证
    if(pack.is_channel && !pack.channel_str) return false;
    save.value = false;

}
// 格式化卡券数量
const format_coupon_count = ()=>
{
    if(props.coms.coupon.count>0)
    {
        let o_coupon =(props.coms.coupon.coupon && props.coms.coupon.coupon.length>0) ? [...props.coms.coupon.coupon] : [];//格式化之前
        let n_coupon = [];//格式化完新列表
        if(o_coupon.length !== props.coms.coupon.count)
        {
            //如果首次初始化 - 动态补全数组元素
            for (let index = 0; index < props.coms.coupon.count; index++) {
                if(!o_coupon[index])
                {
                    n_coupon.push({show_price:0,actual_price:0});
                }else{
                    n_coupon.push(o_coupon[index]);
                }
            }
        }else{
            n_coupon = o_coupon;
        }
        n_coupon.forEach((e,index)=>{
            // 先计算票面金额 必填两个字段 票面金额和总售价
            if(props.coms.coupon.show_price && props.coms.coupon.price)
            {
                // 售价除以卡数如果小于面额 需特殊处理
                if((props.coms.coupon.price/props.coms.coupon.count)<props.coms.coupon.show_price)
                {
                    if(((index+1)*props.coms.coupon.show_price) <= props.coms.coupon.price)
                    {
                        // 票面金额正常
                        e.show_price = props.coms.coupon.show_price;
                    }else{
                        // 金额溢出
                        let price = props.coms.coupon.price - (index*props.coms.coupon.show_price);
                        price = price < 0 ? 0 : price;
                        e.show_price = price;
                    }
                }else{
                    e.show_price = props.coms.coupon.show_price;
                }
            }
            // 抵值券金额
            if(props.coms.coupon.actual_type === 0)
            {
                e.actual_price = props.coms.coupon.actual_price;
            }
        })
        props.coms.coupon.coupon = n_coupon;
    }
}

// ref模态框指定挂载层
let modal1 = ref(null);
// 搜索区域loading
const loading = ref(false);
// 保存按钮状态
const save = ref(true);
// 递交状态
const submit_loading = ref(false);

interface Props {
    coms:{
        open:boolean,
        coupon:sm.CouponPack,
    }
}
// 接受参数
const props = withDefaults(defineProps<Props>(), {})

watch(
    ()=>props.coms.open,
    (nval,oval)=>{
        if(nval)
        {
            if(goods.value.length>0 &&(!props.coms.coupon.exchange || props.coms.coupon.exchange.length<=0))
            {
                props.coms.coupon.exchange = goods.value;
                props.coms.coupon.low = goods.value;
                right_change(props.coms.coupon.exchange_right,'exchange');
                right_change(props.coms.coupon.low_right,'low');
            }
        }
    },{deep:true,immediate:true}
)

// 商圈所有店铺和商品数据

/** 右边窗口触发取消或选中 */
const right_change=(e:any,str:string)=>
{
    if(!e) return false;
    if(e.length>0)
    {
        props.coms.coupon[`${str}_left`] = [];
        e.forEach((g:any)=>{
            let goods = __.find(stroe_goods.value,{key:g});
            if(goods){
                stroe_goods.value.forEach(b=>{
                    if(goods && goods.sid && b.id === goods.sid && !props.coms.coupon[`${str}_left`].includes(b.key))
                    {
                        props.coms.coupon[`${str}_left`].push(b.key);
                    }
                })
            }
        })
        props.coms.coupon[`${str}_right`] = e;
    }else{
        props.coms.coupon[`${str}_right`] = [];
        props.coms.coupon[`${str}_left`] = [];
    }

    is_submit();
}
/** 左边窗口触发取消或选中 */
const left_change=(e:any[]|undefined,str:string)=>
{
    if(!e) return false;
    if(e.length>0)
    {
        props.coms.coupon[`${str}_right`] = [];//清空右边选择
        e.forEach(b=>{
            let store = __.find(stroe_goods.value,{key:b});
            if(store)
            {
                stroe_goods.value.forEach(g=>{
                    if(store && store.id && store.id === g.sid && !props.coms.coupon[`${str}_right`].includes(g.key)){
                        props.coms.coupon[`${str}_right`].push(g.key);
                    }
                })
            }
        })
        props.coms.coupon[`${str}_left`] = e;
    }else{
        props.coms.coupon[`${str}_right`] = [];
        props.coms.coupon[`${str}_left`] = [];
    }
    is_submit();
}

interface Option { key: number;label: string;disabled: boolean;id:number;sid:number };
const stroe_goods = ref<Option[]>([]);//所有门店和商品数据
const goods = ref<Option[]>([]);//缓存商品

const getStoreDate = (): Option[] => {
    kxyk.sk.be(Api.shop.C1.GetStoreAndGoodsDate,{cid:route.params.cip},res=>{
        if(res.status)
        {
            if(res.db.all)
            {
                // 兑换已选列表
                stroe_goods.value = res.db.all;
            }
            if(res.db.store)
            {

            }
            if(res.db.goods)
            {
                goods.value = res.db.goods;
                // 兑换右边商品列表
                props.coms.coupon.exchange = res.db.goods;
                //低值右边商品列表
                props.coms.coupon.low = res.db.goods;
            }
        }
    })
    return [];
}

onMounted(()=>{
    getStoreDate();
});


</script>


