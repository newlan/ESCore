
<script lang="ts">
import { coms } from "smkj";
import { ECharts } from "@/libs/smkj/utils"; 
import CouponBase2  from "@/views/com/coupon/CouponBase2.vue";
export default {
    name: "Finance",
    components: {
        Title: coms.Title, SelectDate: coms.SelectDate, RefreshList: coms.RefreshList, Modal: coms.Modal,CouponBase:CouponBase2
    },
};
</script>

<style lang="stylus">
    @import "./FinanceNew.styl"
</style>
<template lang="pug">
div.FinanceNew
    //- 顶部导航
    div.title0.statis(v-loading="dbs.is_loading")
        div.ttt123(style="height: 2.6rem;")
            Title(:coms="{str:'财务管理'}") 
        div.price 
            a-row.all_
                a-col.t1(:class="SelectDbType(1)" span="8" @click.stop="SetDbType(1)")
                    div.ts1 门店(￥)
                    div.ts2 {{ dbs.t1.toFixed(2) }}
                a-col.t1(:class="SelectDbType(2)" span="8" @click.stop="SetDbType(2)")
                    div.ts1 渠道(￥)
                        span(v-if="dbs.api.args.type === 2") &nbsp;{{ dbs.t22 }}
                    div.ts2 {{ dbs.t2.toFixed(2) }}
                a-col.t1(:class="SelectDbType(3)" span="8" @click.stop="SetDbType(3)")
                    div.ts1 股东(￥)
                    div.ts2 {{ dbs.t3.toFixed(2) }}
                a-col.t1(:class="SelectDbType(4)" span="8" @click.stop="SetDbType(4)")
                    div.ts1 微信收款(￥)
                    div.ts2 {{ dbs.t4.toFixed(2) }}
                a-col.t1(:class="SelectDbType(5)" span="8" @click.stop="SetDbType(5)")
                    div.ts1 已结算(￥)
                    div.ts2 {{ dbs.t5.toFixed(2) }}
                a-col.t1(:class="SelectDbType(6)" span="8" @click.stop="SetDbType(6)")
                    div.ts1 待结算(￥)
                    div.ts2 {{ dbs.t6.toFixed(2) }}
        div.sDate
            SelectDate.ns112(:model-value="dbs.api.args.sDate" @change="(dbs.is_loading = true,dbs.api.refresh = !dbs.api.refresh)")
        div.towS
            //-  2 3 4 级筛选条件

            div.type2(v-if="dbs.type2List && dbs.type2List.length > 0")
                el-checkbox-group(v-model="dbs.api.args.type2" size="small" @change="dbs.api.refresh = !dbs.api.refresh")
                    el-checkbox-button(v-for="t2 in dbs.type2List" :key="t2.id" :label="t2.id") {{ t2.name ? t2.name :t2.circle_name }} 
            div.top6(v-if="dbs.api.args.type === 1")
                el-radio-group(v-model="dbs.api.args.type4" size="small" @change="dbs.api.refresh = !dbs.api.refresh")
                    el-radio-button(:label="1") 门店应缴
                    el-radio-button(:label="2") 门店收益
            div.top6.bot6.type2(v-if="dbs.type3List && dbs.type3List.length")
                div(v-if="dbs.type3List && dbs.type3List.length > 0" @change="dbs.api.refresh = !dbs.api.refresh")
                    el-checkbox-group(v-model="dbs.api.args.type3" size="small")
                        el-checkbox-button(v-for="t3 in dbs.type3List" :key="t3.id" :label="t3.id") {{ t3.name }} 
            div.top6.bot6(v-if="dbs.api.args.type === 6")
                el-button(type="primary" size="small" :disabled="dbs.t6 == 0" @click="FinancialEnd") 一键结算
        div.list 
            div.ns114(:style="{height:dbs.hh+'px'}")
                RefreshList(:coms="dbs.api" @count="SetCount" element-loading-background="rgba(0, 0, 0, 0.8)")
                    template(v-slot="{item,index}")
                        div.items1(:style="{'border': item.profit_payable ? '1px solid #ffc9c9' :'1px solid #b5d6b7'}")
                            div.dbtype2(v-if="dbs.api.args.type === 2")
                                div.top0101 
                                    //- div.store_name(v-if="item.store_name") {{ item.store_name }}
                                    div.nsns
                                        img.avatar(v-if="item.avatar" :src="item.avatar")
                                        span.n1(v-if="item.nickname") &nbsp;{{ item.nickname }}
                                        span(v-if="item.nickname2") &nbsp; > &nbsp;
                                        img.avatar(v-if="item.avatar2" :src="item.avatar2")
                                        span.n1(v-if="item.nickname2") &nbsp;{{ item.nickname2 }}
                                div 
                                    CouponBase(:item="item" @up-coupon-list="")
                                div.bot  
                                    div 卡券发放时间:{{ item.get_time }}
                            //- 已结算
                            div(v-if="dbs.api.args.type === 5")
                                a-row.t1(:class="[item.profit_payable ? 'st2' : 'st1']")
                                    a-col.tl(span="18")
                                        span.r1 [{{ FormatT1TypeStr(item) }}] {{ item.name0 }}

                                        //- span.r1 [{{ kxyk.user.FormatfinanceType(item.type)}}]
                                    a-col.tr(span="6")
                                        span.j3(v-if="item.checkout === 0") 未结算 
                                        span.j3(v-if="item.checkout === 1") 申请结算
                                        span.j3(v-if="item.checkout === 2") 已结算
                                //- div.t55 
                                //-     span(v-if="[1,2,5,6,9].includes(item.type)") 门店{{ item.name0 }}
                                div.t3
                                    span(v-if="item.profit_payable === 1" style="color:red;") +{{ item.price.toFixed(2) }}
                                    span(v-if="item.profit_payable === 0" style="color:#4CAF50;") -{{ item.price.toFixed(2) }}
                                div.t2 {{ item.info }}
                                div.t4 
                                    div.tr
                                        span {{ kxyk.utils.format(item.time_unix) }}
                            //- 未结算
                            div(v-if="dbs.api.args.type === 6")
                                a-row.t1(:class="[item.profit_payable ? 'st2' : 'st1']")
                                    a-col.tl(span="18")
                                        span.r1 [{{ FormatT1TypeStr(item) }}] {{ item.name0 }}

                                        //- span.r1 [{{ kxyk.user.FormatfinanceType(item.type)}}]
                                    a-col.tr(span="6")
                                        span.j3(v-if="item.checkout === 0") 未结算 
                                        span.j3(v-if="item.checkout === 1") 申请结算
                                        span.j3(v-if="item.checkout === 2") 已结算
                                //- div.t55 
                                //-     span(v-if="[1,2,5,6,9].includes(item.type)") 门店{{ item.name0 }}
                                div.t3
                                    span(v-if="item.profit_payable === 1" style="color:red;") +{{ item.price.toFixed(2) }}
                                    span(v-if="item.profit_payable === 0" style="color:#4CAF50;") -{{ item.price.toFixed(2) }}
                                div.t2 {{ item.info }}
                                div.t4 
                                    div.tr
                                        span {{ kxyk.utils.format(item.time_unix) }}
                            //- 微信收款
                            div(v-if="dbs.api.args.type === 4")
                                a-row.t1(:class="[item.profit_payable ? 'st2' : 'st1']")
                                    a-col.tl(span="18")
                                        span.r1 [{{ FormatT1TypeStr(item) }}] {{ item.name0 }}

                                        //- span.r1 [{{ kxyk.user.FormatfinanceType(item.type)}}]
                                    a-col.tr(span="6")
                                        span.j3(v-if="item.checkout === 0") 未结算 
                                        span.j3(v-if="item.checkout === 1") 申请结算
                                        span.j3(v-if="item.checkout === 2") 已结算
                                //- div.t55 
                                //-     span(v-if="[1,2,5,6,9].includes(item.type)") 门店{{ item.name0 }}
                                div.t3
                                    span(v-if="item.profit_payable === 1" style="color:red;") +{{ item.price.toFixed(2) }}
                                    span(v-if="item.profit_payable === 0" style="color:#4CAF50;") -{{ item.price.toFixed(2) }}
                                div.t2 {{ item.info }}
                                div.t4 
                                    div.tr
                                        span {{ kxyk.utils.format(item.time_unix) }}
                            //- 门店数据
                            div(v-if="dbs.api.args.type === 1")
                                a-row.t1(:class="[item.profit_payable ? 'st2' : 'st1']")
                                    a-col.tl(span="18")
                                        span.r1 [{{ FormatT1TypeStr(item) }}] {{ item.name0 }}

                                        //- span.r1 [{{ kxyk.user.FormatfinanceType(item.type)}}]
                                    a-col.tr(span="6")
                                        span.j3(v-if="item.checkout === 0") 未结算 
                                        span.j3(v-if="item.checkout === 1") 申请结算
                                        span.j3(v-if="item.checkout === 2") 已结算
                                //- div.t55 
                                //-     span(v-if="[1,2,5,6,9].includes(item.type)") 门店{{ item.name0 }}
                                div.t3
                                    span(v-if="item.profit_payable === 1" style="color:red;") +{{ item.price.toFixed(2) }}
                                    span(v-if="item.profit_payable === 0" style="color:#4CAF50;") -{{ item.price.toFixed(2) }}
                                div.t2 {{ item.info }}
                                div.t4 
                                    div.tr
                                        span {{ kxyk.utils.format(item.time_unix) }}
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, h, nextTick ,computed} from "vue";
import { kxyk, Api, io, __ } from "smkj";
import { useRouter,useRoute } from "vue-router";
import * as ech from "echarts";


const router = useRoute();
/** 页面所有数据 */
const dbs =  reactive<sm.Com.PageFinanceNew>({
    api:{
        size:10,url:Api.shop.U.FinanceNewApi,refresh:false,
        args:{
            type:1,ref:false,type2:[],type3:[],cid:parseInt(router.params.cid as string) || 0,type4:1,
            sDate:{
                show: false, type: 1, time: new Date().Format(), time1: "", time2: "", type2: 0, role: "C1",color:'#2196f3',
            },
        }
    },
    hh:200,type2List:[],type3List:[],is_loading:true,t1:0,t2:0,t3:0,t4:0,t5:0,t6:0,t22:0
})

/** 格式化门店数据类型字符串 */ 
const FormatT1TypeStr = computed(()=>(s:any)=>{
    let str = '';
    switch (s.type) {
        case 1:
            str = '门店卖卡';
            break;
        case 3:
            str = '股东卖卡';
            break;
        case 4:
            str = '售卡佣金';
            break;
        case 5:
            str = '发放期卡';
            break;
        case 7:
            str = '商圈充值';
            break;
        case 12:
            str = '用户充值';
            break;
        case 13:
            str = '购买活动';
            break;
        case 6:
            str = '管理充值';
            break;
        case 11:
            str = '现金收款';
            break;
        case 2:
            str = '售卡佣金';
            break;
        case 9:
            str = '订单分红';
            break;
        case 8:
            str = '股东充值';
            break;
        case 10:
            str = '股东分红';
            break;
        case 15:
            str = '会员佣金';
            break;
        case 16:
            str = '下级佣金';
            break;
    
        default:
            break;
    }
    return str;
})
/** 点击结算 */
const FinancialEnd = ()=>
{
    // console.log(dbs.api);
    kxyk.Modal.confirm({
        title:'线下结算',
        content:`确定要结算当前条件下的所有账目吗？共计:${dbs.t6}，点击确定将设置为已结算。`,
        okText:'确定',
        cancelText:'取消',
        onOk(){
            kxyk.sk.be(Api.shop.C1.SetFinancialEnd,{args:dbs.api.args,price:dbs.t6},res=>{
                if(res.status){
                    kxyk.msg.success('操作成功。');
                    dbs.api.refresh = !dbs.api.refresh;
                }
            })
        }
    })
}
/** 设置返回数据 */
const SetCount = (res:any)=>{
    // console.log('设置返回数据',res);
    
    dbs.is_loading = false;
    let rdbs:sm.Com.PageFinanceRes = res.dbs;
    if(rdbs.type2List) dbs.type2List = rdbs.type2List;
    // 这里解析t2条件是否选择
    if(rdbs.type3List) dbs.type3List = rdbs.type3List;
    if(dbs.api.args.type2.length === 0){
        // 没有任何选择初始化所有返回ID列表 
        // dbs.api.args.type2 = dbs.type2List.map(i=>i.id);
    }
    dbs.t1 = rdbs.t1;
    dbs.t2 = rdbs.t2;
    dbs.t3 = rdbs.t3;
    dbs.t4 = rdbs.t4;
    dbs.t5 = rdbs.t5;
    dbs.t6 = rdbs.t6;
    dbs.t22 = res.count;
    setTimeout(() => {
        kxyk.utils.DOM.get_win_last_higth(['sDate', 'price', 'ttt123','towS']).then(e => {
            dbs.hh = e;
        })
    }, 200);

}
/** 设置选择数据类型样式 */
const SetDbType = (t:number)=>
{
    if(dbs.api.args.type === t){
        return false;
    }else{
        if(t === 1 || t === 2 || t === 3 || t === 4 || t === 5 || t === 6){
            dbs.api.args.type = t;
            dbs.api.args.sDate.show = true;
            dbs.api.refresh = !dbs.api.refresh;
            dbs.api.args.type2=[];
            dbs.api.args.type3=[];
            dbs.type2List = [];
            dbs.type3List = [];
            
            
        }
    }
}

const SelectDbType = computed(()=>(a:number)=>{
    if(a === dbs.api.args.type){
        return 'c2';
    }
    return 'c1';
})
onMounted(() => {
    dbs.api.args.sDate.show = true;
    // kxyk.utils.DOM.get_win_last_higth(['sDate', 'price', 'ttt123','towS']).then(e => {
    //     dbs.hh = e;
    // })
});
</script>


