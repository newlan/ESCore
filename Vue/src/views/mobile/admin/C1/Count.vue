<!--  商圈后台数据统计组件  -->
<script lang="ts">
import { coms } from "smkj";
import { ECharts } from "@/libs/smkj/utils"; 
import { default as coupon } from "@/views/com/coupon/CouponBase.vue";
export default {
    name: "C1Count",
    components: {
        SelectDate: coms.SelectDate,RefreshList: coms.RefreshList,CouponBase: coupon
    },
};
</script>

<style lang="stylus">
    @import "./Count.styl"
</style>
<template lang="pug">
div.Count(ref="Count111")
    //- div.trc1(:class="[dbs.is_unfold ? 'unall' : 'all']")
    div.all(v-loading="dbs.loading" :class="{'unall': dbs.is_unfold}")
        div.n0._n0
            a-row(v-if="compar.role === 'D1'")
                a-col(:class="SelectDbType(1)" span="8" @click.stop="SetDbType(1)")
                    div.t1 营业(元)
                    div.f1 {{ dbs.counts.count1.toFixed(2) }}
                a-col(:class="SelectDbType(2)" span="8" @click.stop="SetDbType(2)")
                    div.t1 服务(元)
                    div.f1 {{ dbs.counts.count2.toFixed(2) }}
                a-col(:class="SelectDbType(3)" span="8" @click.stop="SetDbType(3)") 
                    div.t1 商品(元)
                    div.f1 {{ dbs.counts.count3.toFixed(2) }}
            a-row(v-if="compar.role === 'C1'")
                a-col(:class="SelectDbType(1)" span="6" @click.stop="SetDbType(1)")
                    div.t1 营业(元)
                    div.f1 {{ dbs.counts.count1.toFixed(2) }}
                a-col(:class="SelectDbType(2)" span="6" @click.stop="SetDbType(2)")
                    div.t1 服务(元)
                    div.f1 {{ dbs.counts.count2.toFixed(2) }}
                a-col(:class="SelectDbType(3)" span="6" @click.stop="SetDbType(3)") 
                    div.t1 商品(元)
                    div.f1 {{ dbs.counts.count3.toFixed(2) }}
                a-col(:class="SelectDbType(4)" span="6" @click.stop="SetDbType(4)") 
                    div.t1 预售(元)
                    div.f1 {{ dbs.counts.count7.toFixed(2) }}
            a-row.pop2(v-show="dbs.api.args.selectDataType > 0 && compar.role === 'C1'")
                a-col(:class="SelectDbType2(1)" span="8" @click.stop="SetDbType2(1)")
                    div.ff1 
                        span(v-if="dbs.api.args.selectDataType === 4") 卡券(元)
                        span(v-else) 卡券(元)
                    div.ff2 
                        span(v-if="dbs.api.args.selectDataType === 4") {{ dbs.counts.count8.toFixed(2) }}
                        span(v-else) {{ dbs.counts.count4.toFixed(2) }}
                a-col(:class="SelectDbType2(2)" span="8" @click.stop="SetDbType2(2)")
                    div.ff1
                        span(v-if="dbs.api.args.selectDataType === 4") 信值(元)
                        span(v-else) 余额(元)
                    div.ff2 
                        span(v-if="dbs.api.args.selectDataType === 4") {{ dbs.counts.count9.toFixed(2) }}
                        span(v-else) {{ dbs.counts.count5.toFixed(2) }}
                a-col(:class="SelectDbType2(3)" span="8" @click.stop="SetDbType2(3)")
                    div.ff1 
                        span(v-if="dbs.api.args.selectDataType === 4") 余额(元)
                        span(v-else) 现金(元)
                    div.ff2 
                        span(v-if="dbs.api.args.selectDataType === 4") {{ dbs.counts.count10.toFixed(2) }}
                        span(v-else) {{ dbs.counts.count6.toFixed(2) }}
        div._echart(v-show="!dbs.api.args.sDate.show && compar.role === 'C1'")
            div#echatr2
        div.sDate(v-show="dbs.api.args.sDate.show")
            SelectDate.ns112(:model-value="dbs.api.args.sDate" @change="dbs.api.refresh = !dbs.api.refresh")
            div.selectS(v-if="compar.role === 'C1'")

                div.type2(v-if="dbs.sotre_list && dbs.sotre_list.length > 0 && dbs.api.args.selectDataType === 4")

                    el-checkbox-group(v-model="dbs.api.args.store_ids" fill="#68e" @change="dbs.api.refresh = !dbs.api.refresh")
                        el-checkbox-button(v-for="t2 in dbs.sotre_list" :key="t2.id" :label="t2.type+'-'+t2.id") {{ t2.name }} 
                div.type2(v-if="dbs.sotre_list && dbs.sotre_list.length > 0 && dbs.api.args.selectDataType !== 4")
                    el-checkbox-group(v-model="dbs.api.args.store_ids" fill="#68e" @change="dbs.api.refresh = !dbs.api.refresh")
                        el-checkbox-button(v-for="t2 in dbs.sotre_list.filter(obj => obj.type === 1)" :key="t2.id" :label="t2.type+'-'+t2.id") {{ t2.name }} 
                div.ss1(@click="ShowSelectStore")
                    i.fa.fa-search
                    div 
                        a-drawer( placement="top" :closable="false"  :visible="dbs.is_show_select_store" @close="dbs.is_show_select_store = false" )
                            a-select( v-model:value="dbs.api.args.store_ids" autofocus :filterOption="filterOption" placeholder="请输入关键词搜索门店，可多选" style="width: 100%" mode="multiple" :options="dbs.sotre_list.map(item=>{return {label:item.name,value:'1-'+item.id}})" @focus="" @blur="" @change="" )
                            div(:style="{ position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right', zIndex: 1, }" )
                                a-button(style="margin-right: 8px" @click="dbs.is_show_select_store = false") 取消
                                a-button(type="primary" @click="(dbs.is_show_select_store = false,dbs.api.refresh = !dbs.api.refresh)") 确定
        //- 统计详情
        a-drawer( placement="right" :closable="false" class="S1S1S2S2" :visible="dbs.is_show_detall" @close="dbs.is_show_detall = false")
            div.detall
                RefreshList(:coms="dbs.detall_api" element-loading-background="rgba(0, 0, 0, 0.8)")
                    template(v-slot="{item,index}")
                        div.row(v-if="dbs.detall_api.args.type === 11 || dbs.detall_api.args.type === 12")
                            div 
                                a-row.row2 
                                    a-col.elesis.top(span="14")
                                        span(style="color: #8f4444;") {{ item.type == 6 ? '管理端操作' : '用户自主操作'}}
                                    a-col.ns0(span="10")
                                        span.n1 {{ item.relation2 ? '余额充值' : '信值充值' }}
                                div.coupons 
                                    div.cou 
                                        div(style="font-size: 20px;color: red;") ￥{{ item.price.toFixed(2) }}
                                        div
                                            span {{ item.info }}
                                div.bot 
                                    img.img(v-if="item.u2_avatar" :src="item.u2_avatar")
                                    span(v-if="item.u2_nickname") {{ item.u2_nickname }}
                                    img.img(v-if="item.avatar" :src="item.avatar")
                                    span(v-if="item.nickname") {{ item.nickname }}
                                    span &nbsp; {{ item.time }}
                        div.row(v-if="dbs.detall_api.args.type === 10")
                            div 
                                a-row.row2 
                                    a-col.elesis.top(span="14")
                                        img.img(:src="item.avatar ? item.avatar : 'https://smkjm.sam322.com/img/avatar.png'")
                                        span(v-if="item.relation1 > 100000000") 游客用户
                                        span(v-else) {{ item.nickname ? item.nickname : '昵称为空' }}
                                    a-col.ns0(span="10")
                                        span.n1 获得卡券
                                        
                                div.coupons 
                                    div.cou
                                        
                                        span.back
                                            span (￥{{ item.price }})
                                            span {{ item.name }} x1
                                        
                                div.bot 
                                    img.img(v-if="item.staff_avatar" :src="item.staff_avatar")
                                    span(v-if="item.staff_nickname") {{ item.staff_nickname }}
                                    span &nbsp; {{ item.get_time }}
                        div.row(v-if="dbs.detall_api.args.type === 7 || dbs.detall_api.args.type === 8")
                            div
                                a-row.row2 
                                    a-col.elesis.top(span="14")
                                        img.img(:src="item.avatar ? item.avatar : 'https://smkjm.sam322.com/img/avatar.png'")
                                        span(v-if="item.relation1 > 100000000") 游客用户
                                        span(v-else) {{ item.nickname ? item.nickname : '昵称为空' }}
                                    a-col.ns0(span="10")
                                        span.n1(v-if="item.type === 9") 门店分红
                                        span.n1(v-if="item.type === 2") 售卡佣金
                                        span.n1(v-if="item.type === 10") 投资分红
                                        
                                a-row.row3
                                    a-col(span="12")
                                        span(v-if="item.type === 9 || item.type === 10") 购买{{ item.is_spec ? '服务' : '商品' }}:{{ item.item_name }}
                                        span(v-if="item.type === 2 || item.type === 4") 购买{{ item.name }}
                                    a-col(span="12")
                                        span(v-if="item.type === 9 || item.type === 10") ￥{{ item.price }}
                                        span(v-if="item.type === 2 || item.type === 4") ￥{{ item.price2 }}
                                div.coupons 
                                    div.cou 
                                        div
                                            span(v-if="item.type === 9") 门店服务获得分账
                                            span(v-if="item.type === 2 || item.type === 4") 出售卡券获得佣金
                                            span(v-if="item.type === 10") 投资门店获得分账
                                            span.sss1 ￥{{ item.price1.toFixed(2) }}
                                    
                                div.bot
                                    a-row 
                                        a-col.s1(span="12")
                                            span(v-if="item.type === 4 || item.type === 10") 股东:{{ item.share_name }}
                                        a-col.s2(span="12")
                                            span {{ kxyk.utils.format(item.time_unix,'yyyy-MM-dd hh:mm:ss') }}
                        div.row(v-if="dbs.detall_api.args.type === 1 || dbs.detall_api.args.type === 2 || dbs.detall_api.args.type === 3 || dbs.detall_api.args.type === 4 || dbs.detall_api.args.type === 5 || dbs.detall_api.args.type === 6")
                            div
                                a-row.row2
                                    a-col.elesis.top(span="12")
                                        img.img(:src="item.avatar ? item.avatar : 'https://smkjm.sam322.com/img/avatar.png'")
                                        span(v-if="item.uid > 100000000") 游客用户
                                        span(v-else) {{ item.nickname ? item.nickname : '昵称为空' }}
                                        span.car(v-if="item.car_number") {{ item.car_number }}
                                    a-col.r12(span="12")
                                        //- div {{ item.is_spec ? kxyk.utils.format(item.t2,'yyyy-MM-dd hh:mm:ss') : kxyk.utils.format(item.time,'yyyy-MM-dd hh:mm:ss') }}
                            a-row.row3 
                                a-col(span="12")
                                    span 购买{{ item.is_spec ? '服务' : '商品' }}:{{ item.item_name }}
                                a-col(span="12")
                                    span(v-if="item.is_discount === 0") 无优惠
                                    span(v-if="item.coupon_type === 1 && item.coupon_ids !== '-1'") 使用兑换券
                                    span(v-if="item.coupon_type === 2") 使用抵值券
                                    span(v-if="item.coupon_type === 3") 使用期卡 
                            div.coupons 
                                div.cou(v-for="cu in item.coupon")
                                    span.back {{ cu.coupon_name }} x1
                            a-row(:gutter="6" style="text-align: center;")
                                a-col(span="6")
                                    div.tt1 订单
                                    div.tt2 ￥{{ item.price.toFixed(2) }}
                                a-col(span="6")
                                    div.tt1 优惠
                                    div.tt2(:class="{tt3:item.discount > 0}") ￥{{ item.discount > item.price ? item.price.toFixed(2) : item.discount.toFixed(2) }}
                                a-col(span="6")
                                    div.tt1 现金
                                    div.tt2(:class="{tt3:(item.cash_price > 0)}") ￥{{ item.cash_price.toFixed(2)}}
                                a-col(span="6")
                                    div.tt1 余额
                                    div.tt2(:class="{tt3:(item.yue_price > 0)}") ￥{{ item.yue_price.toFixed(2)}} 
                            div.bot 
                                img.img(v-if="item.staff_avatar" :src="item.staff_avatar")
                                span(v-if="item.staff_name") {{ item.staff_name }}
                                span &nbsp;{{ item.is_spec ? kxyk.utils.format(item.t2,'yyyy-MM-dd hh:mm:ss') : kxyk.utils.format(item.time,'yyyy-MM-dd hh:mm:ss') }}
                                    
            div(:style="{ position: 'absolute', right: 0, bottom: 0, width: '100%', borderTop: '1px solid #e9e9e9', padding: '10px 16px', background: '#fff', textAlign: 'right', zIndex: 1, }" )
                a-button(style="margin-right: 8px" @click="dbs.is_show_detall = false" block) 关闭窗口
        div.sList(v-show="dbs.api.args.sDate.show" :style="{height:dbs.hh+'px'}")
            RefreshList(:coms="dbs.api" @count="GetCount" element-loading-background="rgba(0, 0, 0, 0.8)")
                template(v-slot="{item,index}")
                    div
                        //- 充值余额
                        div.item(v-if="dbs.api.args.selectDataType === 4")
                            div.ccon 
                                div.top1 
                                    span {{ item.get_type == 1 ? '股东:' : '门店:' }}
                                    span {{ item.get_type == 1 ? item.r_name : item.name }}
                                div.info 
                                    a-row.row1
                                        a-col.c8(span="8" @click="ShowDetall(10,item)")
                                            div.tit1 卡券
                                            div.tit2(v-if="undefined !== item.coupon_price") {{ item.coupon_price.toFixed(2) }}
                                        a-col.c8(span="8" @click="ShowDetall(11,item)")
                                            div.tit1 信值
                                            div.tit2(v-if="undefined !== item.xin_price") {{ item.xin_price.toFixed(2) }}
                                        a-col.c8(span="8" @click="ShowDetall(12,item)")
                                            div.tit1 余额
                                            div.tit2(v-if="undefined !== item.yue_price") {{ item.yue_price.toFixed(2) }}
                        div.item(v-else)
                            div.ccon
                                div.top1
                                    span {{ item.name }}
                                div.info
                                    a-row.row1
                                        a-col(span="8" @click="ShowDetall(1,item)")
                                            div.tit1 卡券({{ item.discount_count }})
                                            div.tit2 {{ item.discount.toFixed(2) }}
                                        a-col(span="8" @click="ShowDetall(2,item)")
                                            div.tit1 余额({{ item.yue_count }})
                                            div.tit2 {{ item.yue_price.toFixed(2) }}
                                        a-col(span="8" @click="ShowDetall(3,item)")
                                            div.tit1 现金({{ item.cash_count }})
                                            div.tit2 {{ item.cash_price.toFixed(2) }}
                                    //- div.upd
                                    //-     i.fa.fa-chevron-up
                                        
                                    a-row.row2
                                        a-col.c8(span="8" @click="ShowDetall(4,item)")
                                            div.tit4 营业({{ item.order_count }})
                                            div.tit3 {{ item.order_price.toFixed(2) }}
                                        a-col.c8(span="8" @click="ShowDetall(5,item)")
                                            div.tit4 服务({{ item.server_count }})
                                            div.tit3 {{ item.server_price.toFixed(2) }}
                                        a-col.c8(span="8" @click="ShowDetall(6,item)")
                                            div.tit4 商品({{ item.good_count }})
                                            div.tit3 {{ item.good_price.toFixed(2) }}
                                    //- div.upd
                                    //-     i.fa.fa-chevron-down
                                    a-row.row1
                                        a-col(span="8" @click="ShowDetall(7,item)")
                                            div.tit1 门店({{ item.store_count }})
                                            div.tit2(style="color: var(--el-color-success-dark-2);") {{ item.store_price.toFixed(2) }}
                                        a-col(span="8" @click="ShowDetall(8,item)")
                                            div.tit1 股东({{ item.gd_count }})
                                            div.tit2(style="color: var(--el-color-success-dark-2);") {{ item.gd_price.toFixed(2) }}
                                        a-col(span="8")
                                            div.tit1 商圈
                                            div.tit2(style="color:red;") {{ (item.order_price-(item.store_price+item.gd_price)).toFixed(2) }}

                                div.but1 
                                    //- img.avt(:src="item.avatar")
                                    //- span &nbsp;{{ item.nickname }}&nbsp;
                                    span(v-if="item.time") {{ item.time }}

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, h, nextTick ,computed,onUnmounted} from "vue";
import { kxyk, Api, io, __ } from "smkj";
import * as  echarts from "echarts";



const emit = defineEmits(['unfold']);
const Count111 =ref(null);
interface Props {
    compar:sm.Com.C1D1Counts
}
const props = withDefaults(defineProps<Props>(), {
    compar:()=>{
            return{
                role:"C1",ID:29,
            }
        }
    }
)
interface dbs {
    /** 数据查询组件是否展开 */
    is_unfold:boolean,
    /** 数据加载状态 */
    loading:boolean,
    /** 百度报表数据  ECBasicOption */
    ECHotions:any,
    /** 顶部三个统计数据 */
    counts:sm.C1.C1CountDBs,
    /** 数据详情API接口 */
    detall_api:sm.Com.refreshAPI,
    /** 更新数据接口 */
    api:sm.Com.refreshAPI,
    /** 下拉刷新列表框高度 */
    hh:number,
    /** 当前渲染报表类型 关联 selectDataType值*/
    hasRendeType:number
    // sDate:sm.Com.sDate,
    /** 是否显示统计详情抽屉 */
    is_show_detall:boolean,
    /** 所有门店列表 */
    sotre_list:any[],
    /** 是否显示搜索门店抽屉 */
    is_show_select_store:boolean,
    /** 统计详情列表 */
    detall_list:any[],
    
}
let EC1sum:number[] = [];
const dbs = reactive<dbs>({
    is_unfold:false,loading:false,hasRendeType:0,is_show_detall:false,sotre_list:[],is_show_select_store:false,detall_list:[],
    counts:{count1:0,count2:0,count3:0,count4:0,count5:0,count6:0,count7:0,count10:0,count8:0,count9:0},hh:100,
    detall_api:{url:Api.shop.U.GetC1countsNewDetall,size:10,refresh:true,args:{sid:0,type:0,type2:0,sDate:{}}},
    api:{url:Api.shop.C1.C1CountInitNew,size:10,refresh:true,args:{
            sDate:{show: false, type: 1, time: new Date().Format(), time1: "", time2: "", type2: 0, role: "C1",color:'#68e'},
            /** 当前选择数据类型 0 = 没有选择 1 = 运营 2 = 卡券 = 2 结余*/
            selectDataType:0,
            /** 当前选择二级数据条件 */
            selectDateType2:0,
            /** 当前选择的门店ID列表 */
            store_ids:[],
            /** 调用当前接口的身份 */
            role:props.compar.role
        }
    },
    // sDate: {
    //     show: false, type: 1, time: new Date().Format(), time1: "", time2: "", type2: 0, role: "C1",color:'#68e'
    // },
    ECHotions:{
        xAxis:{
            data:[],
        },
        legend:{
            show:true,
            type:"scroll",
            y:"bottom",
            padding:[0,0,6,20]
        },
        yAxis:{},
        grid: {
            top:5,
            bottom:55,
            right:10
        },
        series: [
            {
                type:"bar",
                name:"转盘1店",
                data:[22,25,11,111,22,185],
                stack: 'x',
                yAxisIndex: 0,
            },
            {
                name:"转盘2店",
                type:"bar",
                data:[22,25,11,111,22,185],
                stack: 'x'
            },
        ]
    },
})

const filterOption = (input: string, option: any) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
/** 打开门店搜索按钮 */
const ShowSelectStore = ()=>{
    dbs.is_show_select_store = true;
}
/**
 * 显示统计详情
 * @param t  1 = 卡券 2 = 余额 3 = 现金 4 = 营业 5 = 服务 6 = 商品 7 = 门店分红 8 = 股东分红 9 = 商圈剩余收益
 *  10 = 预售卡券 11 = 预售信值 12 = 预售专用余额
 */
const ShowDetall = (t:number,item:any = null)=>{
    if(item){
        dbs.detall_api.args.type2 = 0;
        if(t == 10 || t == 11 || t == 12){
            if(item.get_type === 1){
                dbs.detall_api.args.type2 = 1;//股东
            }
        }
        dbs.detall_api.args.sid = item.id;
        dbs.detall_api.args.type = t;
        dbs.detall_api.args.sDate = dbs.api.args.sDate;
        dbs.detall_api.refresh = !dbs.detall_api.refresh;

    }

    dbs.is_show_detall = true;
}

const GetCount=(a:{counts:sm.C1.C1CountDBs,Recently:sm.C1.C1CountInitEchotionDB})=>
{
    let counts = dbs.counts;
    if(a.counts) dbs.counts = a.counts;
    // 图像报表相关
    if(a.Recently){
        // 数据详情没打开时显示最近5个月统计报表
        if(!dbs.api.args.sDate.show){
            // 图表x轴数据
            dbs.ECHotions = getEchartsConfig("bar");
            dbs.ECHotions.xAxis.data = a.Recently.xAxis.date;
            // 图表数据列表
            dbs.ECHotions.series = a.Recently.series;
            // 扩展计算柱状图最顶部的堆叠数据总和
            if(dbs.ECHotions.series && Array.isArray(dbs.ECHotions.series) && dbs.ECHotions.series.length > 0){
                EC1sum = a.Recently.series[0].data.map((_:any, index:any) =>
                    a.Recently.series.reduce((acc:any, item:any) => acc + item.data[index], 0)
                )
                dbs.ECHotions.series[dbs.ECHotions.series.length-1].label =
                {
                    show:true,position:"top", 
                    formatter:(params:any) =>{
                        return `￥${EC1sum[params.dataIndex]}`;
                    }
                }
            }
        }
        if(counts.count1 !== 0 && dbs.hasRendeType === dbs.api.args.selectDataType && counts.count1 === dbs.counts.count1 && counts.count2 === dbs.counts.count2 && counts.count3 === dbs.counts.count3){

        }else{
            // 设置图表
            Echarts?.clear();
            Echarts && Echarts.setOption(dbs.ECHotions as echarts.EChartsOption);
            dbs.hasRendeType = dbs.api.args.selectDataType;
        }

    }
    setTimeout(() => {
        kxyk.utils.DOM.get_win_last_higth(['_n0', '_echart','sDate']).then(e => {
            dbs.hh = e-25 ;
        })
    }, 100);

}

/** 选择数据类型 运营 卡券 结余等 */
const SetDbType2 = (t:number)=>
{
    // 取消筛选二级条件
    return false;
    if(dbs.api.args.selectDataType2 === t){
        // 取消查询
        dbs.api.args.selectDataType2 = 0;

    }else{
        dbs.api.args.selectDataType2 = t;
    }
    nextTick(()=>{
        dbs.api.refresh = !dbs.api.refresh;
    })
}
/** 选择数据类型 运营 卡券 结余等 */
const SetDbType = (t:number)=>
{
    if(dbs.api.args.selectDataType === t){
        // 取消查询
        dbs.api.args.selectDataType = 0;
        dbs.api.args.sDate.show = false;
        
    }else{
        dbs.api.args.selectDataType = t;
        if(!dbs.api.args.sDate.show){
            dbs.api.args.sDate.show = true;
        }
        nextTick(()=>{
            dbs.api.refresh = !dbs.api.refresh;
        })
        
        
    }
    // 点击事件通知父组件
    emit("unfold",dbs);
}

const SelectDbType2 = computed(()=>(a:number)=>{
    if(a === dbs.api.args.selectDataType2){
        return 'pppooo2';
    }
    return 'pppooo1';
})
const SelectDbType = computed(()=>(a:number)=>{
    if(a === dbs.api.args.selectDataType){
        return 'c2';
    }
    return 'c1';
})

/**
 * 返回Echarts配置参数
 * @param t 图表类型 柱状 或 饼图
 */
const getEchartsConfig = (t:'bar' | 'pie' | "ring")=>
{
    if(t === "bar"){
        return  {
            xAxis:{
                data:[],
            },
            legend:{
                show:true,
                type:"scroll",
                y:"bottom",
                padding:[0,0,6,20]
            },
            yAxis:{},
            grid: {
                top:5,
                bottom:55,
                right:10
            },
            series: [
                {
                    type:"bar",
                    name:"转盘1店",
                    data:[22,25,11,111,22,185],
                    stack: 'x',
                    yAxisIndex: 0,
                },
            ]
        }
    }
    if(t === "ring"){
        return  {
            title: {
                show: true,
                text: '结余',
                subtext:'￥0',
                left: '48%',
                top: '30%',
                itemGap:4,
                textStyle: {
                    color: '#ccc',
                    fontSize: 12,
                },
                subtextStyle: {
                    color: '#68e',
                    fontSize: 14,
                    textBorderWidth:1,
                    textBorderColor:"#68f",

                },
                textAlign:'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: (params:any) => {
                    // 在 Tooltip 中显示原始的负数值
                    return `${params.name} <br/> ￥${params.data.value} (${params.percent}%)`
                }
            },
            legend: {
                show:true,
                type:"scroll",
                y:"bottom",
                padding:[0,0,6,0],
                // data: [ 'Direct', 'Google', 'Bing', 'Others' ]
            },
            series: [
                {
                    name: '充值余额',
                    type: 'pie',
                    center:["50%","42%"],
                    radius: ['65%', '40%'],
                    labelLine: {
                        length: 25
                    },
                    label: {
                        formatter: '{a|{b}}{abg|}\n {b|￥{c}} {cc|({d}%)} ',
                        backgroundColor: '#fff',
                        padding: [2,5],
                        
                        borderColor: '#eee',
                        fontSize: 13,
                        shadowBlur: 3,
                        borderRadius:5,
                        shadowColor: '#eee',
                        shadowOffsetX: 2,
                        shadowOffsetY: 3,
                        rich: {
                            a:{
                                color:"#6688ee",
                                lineHeight: 16,
                                align: 'center',
                            },
                            b:{
                                color:"red",
                                align: 'center',
                                lineHeight: 12,
                            },
                            cc:{
                                color:"#ddd"
                            }
                        }
                    },
                    data: [
                    ]
                }
            ]
        }
    }
    if(t === "pie"){
        return {
            tooltip: {
                trigger: 'item',
                formatter: (params:any) => {
                    console.log('这里触发',params);
                    
                // 在 Tooltip 中显示原始的负数值
                return `${params.name} <br/> ￥${params.data.value} (${params.percent}%)`
                },
            },
            legend: {
                type:"scroll",
                orient: 'horizontal',
                x:"center",
                bottom:0
            },
            series: [
                {
                    name: '结算统计',
                    type: 'pie',
                    center:["50%","43%"],
                    radius: '63%',
                    // avoidLabelOverlap:false,
                    label: {
                        formatter:[
                            `{b|{b}}`,
                            `{a|￥{c}} {cc|({d}%)}`
                            
                        ].join('\n'),
                        // 在标签中显示原始的负数值
                        // return `{a|(￥${params.data.value})} \n {b|${params.name}}`
                        // },
                        backgroundColor: '#fff',
                        padding: [2,5],
                        borderColor: '#eee',
                        fontSize: 14,
                        shadowBlur: 3,
                        borderRadius:5,
                        shadowColor: '#eee',
                        shadowOffsetX: 2,
                        shadowOffsetY: 3,
                        rich:{
                            a:{
                                color:"red",
                                lineHeight: 20,
                                align: 'center',
                            },
                            b:{
                                color:"#6688ee",
                                align: 'center',
                                lineHeight: 14,
                            },
                            cc:{
                                color:'#ddd'
                            }
                        }
                    },
                    data: [
                        {name:'t',value:0}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
}

let Echarts:echarts.ECharts|null = null;
onMounted(() => {
    // init();
    if(props.compar.role === "C1"){
        Echarts = kxyk.echarts.init('echatr2');
    }
    
    if(props.compar.role === "C1"){
        // 获取商圈下所有门店列表 - 此时C1权限还没认证所以接口放到U里
        kxyk.sk.be(Api.shop.U.GetC1StoreList,{cid:props.compar.ID},res=>{
            if(res.status && res.list){
                dbs.sotre_list = res.list;
            }
        })
    }
    if(props.compar.role === "D1"){
        dbs.api.args.store_ids = [1+'-'+props.compar.ID];
    }
    dbs.api.refresh = !dbs.api.refresh;
});
onUnmounted(()=>{
    // if(Echarts) Echarts.dispose();
    // console.log('这里卸载报表');
    
})
</script>


