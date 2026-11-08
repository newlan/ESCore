<style scoped lang="stylus">
    @import "./Marketing.styl"
</style>
<template lang="pug">
div.Marketing
    //- 营销管理顶部导航
    div.title
        div(style="height: 2.6rem;")
            Title(:coms="{str:'营销管理'}") 

    //- 卡券活动
    div
        //- 添加渠道
        
        a-tabs(centered )
            a-tab-pane(key="2" tab="卡券")
                //- 添加卡券组件
                div 
                    AddCoupon(:coms="coms_add_coupon" @add-success="addSuccess")
                //- 卡券内容
                div.con(:style="{height:con_heigth+'px'}")
                    div
                        PackList(:cid="cid" :role="'C1'" :refresh="refresh_pack_list" @edit-pack="editPack" @delete-pack="delPack")
                    div.but 
                        a-button(type="primary" style="width: 100%;" @click="addCouponPack") + 创建新卡券
            a-tab-pane(key="4" tab="期卡")
                div.AddChannel(ref="annual_dom" v-loading="annual.submit" )
                    a-modal.n1(v-model:visible="annual.open" wrap-class-name="full-modal-max" :getContainer="()=>annual_dom" :closable="false"  width="100%" okText="保存") 
                        template(#title)
                            span.b1 添包期卡
                        template(#footer)
                            a-row(style="text-align: center;" :gutter="10")
                                a-col(:span="12")
                                    a-button(@click="annual.open = false" block) 取消
                                a-col(:span="12")
                                    a-button(type="primary" @click="onSaveAnnual" :disabled="annual.save" block) 保存
                        div
                            el-form(label-position="left" label-width="0" :model="annual" style="max-width: 100%;padding: 15px;" )
                                el-form-item
                                    el-input(v-model="annual.name" placeholder="请输入年卡名称"  @change="isSaveAnnual")
                                        template(#prepend) 卡券名称
                                div 
                                    //- SelectStoreItem(v-model:val="annual.goods" :cid="cid")
                                    SelectStoreItem(v-model:val="annual.goods" :cid="cid")
                                el-form-item
                                    el-input(v-model="annual.price" type="number" placeholder="请输入销售金额"  @change="isSaveAnnual")
                                        template(#prepend) 销售金额
                                        template(#append) 元
                                el-form-item
                                    el-input(v-model="annual.count" type="number" placeholder="默认 0 为无限次"  @change="isSaveAnnual")
                                        template(#prepend) 可用次数
                                        template(#append) 0 为无限次
                                div.form_item_row(style="margin-bottom: 10px;")
                                    div.item_label 
                                        div 期卡类型
                                    div.item_content 
                                        el-radio-group(v-model="annual.type" @change="isSaveAnnual")
                                            el-radio-button(:label="0" border) 包月卡
                                            el-radio-button(:label="1" border) 包年卡
                                el-form-item
                                    el-input(v-model="annual.term" type="number" placeholder="请输入期限"  @change="isSaveAnnual")
                                        template(#prepend) 设置期限
                                        template(#append) {{annual.type === 0 ? '个月' : '年'}}
                div.con(:style="{height:con_heigth+'px'}") 
                    div 
                        Annual(:cid="cid" :refresh="refresh_annual_list" :role="'C1'" @edit-annual="editAnnual" @delete-annual="delAnnual")
                    div.but 
                        a-button(type="primary" style="width: 100%;" @click="annual.open = true;annual.id = 0;annual.name='';annual.price=0;annual.save=true;annual.goods=[];") + 创建年卡
            a-tab-pane(key="1" tab="充值活动")
                div.con(:style="{height:con_heigth+'px'}")
                    div.list(v-if="recharge.list.length > 0")
                        div.item1(v-for="ch in recharge.list")
                            a-row.row
                                a-col.name.elesis(:span="ch.id ? 22 : 20") 
                                    a-row(:gutter="5")
                                        a-col(span="8")
                                            el-select(v-model="ch.sid" placeholder="选择" size="small" :disabled="ch.id ? true : false" )
                                                el-option(:label="'默认商圈'" :value="0")
                                                el-option(v-for="s in recharge.stores" :label="s.name" :value="s.id")
                                                //- el-option(:label="'洗浴门店'" :value="2")
                                        a-col(span="8")
                                            el-input(v-model="ch.price" placeholder="充值金额"  @input="isSaveAnnual" size="small" :disabled = "ch.id ? true : false")
                                                template(#prepend) 充
                                        a-col(span="8")
                                            el-input(v-model="ch.give" placeholder="赠送金额" @input="isSaveAnnual" size="small" :disabled = "ch.id ? true : false")
                                                template(#prepend) 赠
                                    a-row(:gutter="5" style="padding-top:5px;")
                                        //- a-col(span="8")
                                        //-     el-input(v-model="ch.give" placeholder="金额"  @input="isSaveAnnual" size="small" :disabled = "ch.id ? true : false")
                                        //-         template(#prepend) 赠送
                                        a-col(span="12")
                                            el-select(v-model="ch.vip" style="width: 100%" :disabled = "(ch.id ) ? true : false" size="small")
                                                el-option(label='不赠送会员',:value="0")
                                                el-option(v-for="t in recharge.vips" :label="t.name" :value="t.id" :key="t.id")
                                        a-col(span="12")
                                            el-select(v-model="ch.couponids" placeholder="不送卡券" multiple style="width: 100%" :disabled = "(ch.id ) ? true : false" size="small")
                                                el-option(v-for="c in recharge.coupons" :label="c.name" :value="c.id" :key="c.id")
                                a-col.cc(:span="2" v-if="ch.id == 0" @click="saveRecharge(ch)")
                                    i.fa.fa-save.fa-fw.fa-2x
                                a-col.cc(:span="2" v-if="ch.id == 0" @click="cancelRecharge(ch)")
                                    i.fa.fa-close.fa-fw.fa-2x
                                a-col.de(:span="2" v-if="ch.id > 0" @click="delRecharge(ch)")
                                    i.fa.fa-trash.fa-fw.fa-2x
                    div.nodb(v-else) 暂无数据
                    div.but
                        a-button(type="primary" style="width: 100%;" @click="addRecharge") + 添加规则
            a-tab-pane(key="3" tab="卖卡活动")
                div
                    StoreTaskConfig(role="C1" :cid="cid")
                    
</template>

<script lang="ts">
import { coms,__ } from "smkj";
export default { 
    name: "Marketing",
    components:{Modal:coms.Modal,StoreTaskConfig:coms.StoreTaskConfig,SelectStoreItem:coms.SelectStoreItem,AddCoupon:coms.AddCoupon,RefreshList:coms.RefreshList,PackList:coms.PackList,Annual:coms.Annual}
};
</script>
<script setup lang="ts"> 
import { ref , reactive,useAttrs ,onMounted,h} from "vue";
import Title from "@/views/com/Title.vue";
import {kxyk,Api,io } from "smkj";
import { useRouter,useRoute } from "vue-router";
// 定义区
const route = useRoute();
const cid = parseInt(route.params.cip.toString());//商圈ID
const con_heigth = ref(700);//内容容易高度
const refresh_pack_list = ref(false);
const refresh_annual_list = ref(false);
// const emit = defineEmits(['updateOptions']);
/** ------------------ 充值活动相关 ----------------- */
const recharge:{list:any,vips:any,coupons:sm.CouponPack[],stores:tb.kxyk_mch_store[]} = reactive({
    list:[],//规则列表
    vips:[],//商圈会员分类列表
    coupons:[],//商圈可选所有卡券列表
    stores:[]
}); 
const getRechRuleList=()=>
{
    kxyk.sk.be(Api.shop.C1.GetRechargeRuleList,{cid:cid},res=>{
        if(res.status && res.list){
            recharge.list = res.list;
        }
    })
}
const saveRecharge = (t:any)=>{
    if(!t.price){
        return kxyk.msg.error('请输入充值金额');
    }
    // 清理选择为空的卡券
    if(t.couponids && t.couponids.length === 1 && t.couponids[0] === 0){
        t.couponids = false;
    }
    kxyk.sk.be(Api.shop.C1.SaveRecharge,t,res=>{
        if(res.status){
            kxyk.msg.success('保存成功');
            getRechRuleList();
        }
    })
}
const cancelRecharge = (t:any)=>{
    let index = __.findIndex(recharge.list,t);
    if(-1 !== index){
        __.pullAt(recharge.list,index)
    }
}
const addRecharge = ()=>
{
    let newRec = {id:0,type:0,price:0,give:0,vip:0,cid:cid,couponids:[],sid:0,type2:0};
    recharge.list.push(newRec);
}
const delRecharge = (ch:any)=>
{
    kxyk.Modal.confirm({
        title:"删除规则",
        okText:"确定",
        cancelText:"取消",
        content: `确定要删除当前规则吗？`,
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.C1.DelRecharge,{id:ch.id,cid:cid},res=>{
                    if(res.status){
                        kxyk.msg.success('删除成功');
                        getRechRuleList();
                        resolve(true);
                    }
                });
            });
        }
    });
}
/** --------------------充值活动相关 end ----------------------- */
// 年卡相关
const annual_dom =ref(null);
const annual = reactive({
    open:false,
    name:'',id:0,cid:cid,save:true,submit:false,type:0,term:1,count:0,price:0,goods:[]
});
//  渠道相关
const channel_dom =ref(null);
const channel = reactive({
    open:false,
    name:'',id:0,color:'',cid:cid,save:true,submit:false
});
const change_list:any = ref([]);
const annual_list = ref([]);
/** 校验期卡递交数据 */
const isSaveAnnual = () =>
{
    if(annual.name && annual.term && annual.price){
        annual.save = false;
    }else{
        annual.save = true;
    }
}
const onSaveAnnual = ()=>
{
    // console.log('即将递交',annual);return false;
    annual.submit = true;
    kxyk.sk.be(Api.shop.C1.SaveAnnual,annual,res=>{
        annual.submit = false;
        if(res.status){
            let str ='添加成功。';
            if(annual.id) str = '修改成功。';
            kxyk.msg.success(str);
            annual.open = false;
            refresh_annual_list.value = !refresh_annual_list.value;
        }else{
            kxyk.msg.error(res.msg);
        }
    })
}
// 获得渠道列表
const getAnnualList = ()=>
{
    kxyk.sk.be(Api.shop.C1.GetAnnualList,{cid:cid},res=>{
        if(res.status) annual_list.value = res.list as any;
    })
}
/** 修改渠道 */
const editChannel = (ch:{name:string,color:string,id:number,cid:number})=>
{
    if(!ch.id) return kxyk.msg.error('ID错误');
    channel.cid =ch.cid;
    channel.id = ch.id;
    channel.name = ch.name;
    channel.color = ch.color;
    channel.open = true;
    isSaveChannel();
}
/** 删除渠道 */
const delChannel = (ch:{name:string,color:string,id?:number})=>
{
    if(!ch.id) return false;
    kxyk.Modal.confirm({
        title:"删除渠道",
        okText:"确定",
        cancelText:"取消",
        content: `确定要删除[${ch.name}]渠道吗？`,
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.C1.DelChannel,{id:ch.id,cid:cid},res=>{
                    if(res.status){
                        kxyk.msg.success('删除成功');
                        getChannelList();
                        resolve(true);
                    }
                });
            });
        }
    });
    
}
/** 添加卡包成功刷新列表 */
const addSuccess = ()=>
{
    refresh_pack_list.value = !refresh_pack_list.value; 
}
/** 删除卡包 */
const delPack =(pack:any)=>
{
    kxyk.Modal.confirm({
        title:"删除卡券",
        okText:"确定",
        cancelText:"取消",
        content: `确定要删除[${pack.name}]吗？`,
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.C1.DelPack,{id:pack.id,cid:cid},res=>{
                    if(res.status){
                        kxyk.msg.success('删除成功');
                        addSuccess();
                        resolve(true);
                    }
                });
            });
        }
    });
}
/** 修改卡包 */
const editAnnual = (pack:any)=>
{
    annual.id = pack.id;
    annual.name = pack.name;
    annual.count = pack.count;
    annual.price = pack.price;
    annual.type = pack.type;
    annual.term = pack.term;
    pack.goods ? annual.goods = pack.goods.split(',') : [];
    annual.open = true;
    isSaveAnnual();
}
/** 删除卡包 */
const delAnnual =(pack:any)=>
{
    kxyk.Modal.confirm({
        title:"删除期卡",
        okText:"确定",
        cancelText:"取消",
        content: `确定要删除[${pack.name}]吗？`,
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.C1.DelAnnual,{id:pack.id,cid:cid},res=>{
                    if(res.status){
                        kxyk.msg.success('删除成功');
                        refresh_annual_list.value = !refresh_annual_list.value;
                        resolve(true);
                    }
                });
            });
        }
    });
}
/** 修改卡包 */
const editPack = (pack:any)=>
{
    coms_add_coupon.coupon = pack;
    coms_add_coupon.open = true;
}
const addCouponPack=()=>
{
    coms_add_coupon.coupon = {
        /** 名称 售价    卡券数量 每卡使用次数   是否仅拓新分佣          分佣类型 0=%        分佣金额     卡包发放数量     票面金额     是否开启兑换*/
        name:"",price:0,count:1,use_count:1,is_new_user_commission:0,commission_type:0,commission:0,issued_count:0,show_price:0,is_exchange:0,
        /**  低值模式      实际低值    是否只有新用户可领卡券 消费满多少可以低值 单次可低值卡数  低值开关  发放规则        活动开始时间     活动结束时间   可用天数 截止日期*/
        actual_type:0,actual_price:0,user_get_authority:0,full_low_price:0,is_low_count:0,is_low:0,issuing_rule:"0",issuing_start:'',issuing_end:'',use_day:365,use_end:'',
        /** 补充添加 */
        low_left:[],low_right:[],exchange_left:[],exchange_right:[],is_give:0,issued_has:0,is_channel:0,channel_str:'',is_rep:0,rep_msg:'',rep_price:0,sort:0,is_low_multiplex:0,
    }
    coms_add_coupon.open = true;
}
/** 添加卡包组件参数 */
const coms_add_coupon =reactive<{open:boolean,coupon:sm.CouponPack}>({
    open:false,
    coupon:{
        /** 名称 售价    卡券数量 每卡使用次数   是否仅拓新分佣          分佣类型 0=%        分佣金额     卡包发放数量     票面金额     是否开启兑换*/
        name:"",price:0,count:1,use_count:1,is_new_user_commission:0,commission_type:0,commission:0,issued_count:0,show_price:0,is_exchange:0,
        /**  低值模式      实际低值    是否只有新用户可领卡券 消费满多少可以低值 单次可低值卡数  低值开关  发放规则        活动开始时间     活动结束时间   可用天数 截止日期*/
        actual_type:0,actual_price:0,user_get_authority:0,full_low_price:0,is_low_count:0,is_low:0,issuing_rule:"0",issuing_start:'',issuing_end:'',use_day:365,use_end:'',
        /** 补充添加 */
        low_left:[],low_right:[],exchange_left:[],exchange_right:[],is_give:0,issued_has:0,is_channel:0,channel_str:'',is_rep:0,rep_msg:'',sort:0,rep_price:0,is_low_multiplex:0
    }
});

/** 初始化营销管理 */
const init = ()=>
{
    kxyk.sk.be(Api.shop.C1.GetMarketingInitC1,{cid:cid},res=>{
        if(res.status)
        {
            if(res.vips){
                recharge.vips = res.vips;
            }
            if(res.coupons){
                recharge.coupons = res.coupons;
            }
            if(res.stores){
                recharge.stores = res.stores;
            }
            // Data.packList = res.db.packList;
        }
        if(res.__error__){
            kxyk.toUrl('/c1/'+cid);
        }
    },true);
}
// 获得渠道列表
const getChannelList = ()=>
{
    kxyk.sk.be(Api.shop.C1.GetChannelList,{cid:cid},res=>{
        if(res.status){
            change_list.value = res.list;
        } 
    })
}

// 验证渠道保存按钮
const isSaveChannel = ()=>{
    if(channel.color && channel.cid && channel.name){
        channel.save = false;
    }else{
        channel.save = true;
    }
}
const onSaveChannel = ()=>
{
    channel.submit = true;
    kxyk.sk.be(Api.shop.C1.AddChannel,channel,res=>{
        channel.submit = false;
        if(res.status){
            let str ='添加成功。';
            if(channel.id) str = '修改成功。';
            kxyk.msg.success(str);
            channel.open = false;
            getChannelList();
        }else{
            kxyk.msg.error(res.msg);
        }
    })
}
onMounted(()=>{
    // console.log('挂载完成');
    setTimeout(() => {
        // 设置数据列表高度
        // con_heigth.value = kxyk.utils.DOM.get_surplus_higth(['title','ant-tabs-nav','but']);
        kxyk.utils.DOM.get_win_last_higth(['title','ant-tabs-nav','but']).then(e=>{
            con_heigth.value = e;
        });
        // 初始化添加渠道保存按钮验证
        isSaveChannel();
    }, 1200);
    init();
    getChannelList();
    getRechRuleList();
    // getAnnualList();
    // init();
});



</script>


