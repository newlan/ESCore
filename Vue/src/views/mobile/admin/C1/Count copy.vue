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
div.Count
    //- div.trc1(:class="[dbs.is_unfold ? 'unall' : 'all']")
    div.all(v-loading="dbs.loading" :class="{'unall': dbs.is_unfold}")
        div.n0._n0
            a-row 
                a-col(:class="SelectDbType(1)" span="8" @click.stop="SetDbType(1)")
                    div.t1 运营(元)
                    div.f1 {{ dbs.counts.count1.toFixed(2) }}
                a-col(:class="SelectDbType(2)" span="8" @click.stop="SetDbType(2)")
                    div.t1 卡券(元)
                    div.f1 {{ dbs.counts.count2.toFixed(2) }}
                a-col(:class="SelectDbType(3)" span="8" @click.stop="SetDbType(3)") 
                    div.t1 余额(元)
                    div.f1 {{ dbs.counts.count3.toFixed(2) }}
        div._echart
            div#echatr2
        div.sDate(v-show="dbs.api.args.sDate.show")
            SelectDate.ns112(:model-value="dbs.api.args.sDate" @change="dbs.api.refresh = !dbs.api.refresh")
        div.sList(v-show="dbs.api.args.sDate.show" :style="{height:dbs.hh+'px'}")
            RefreshList(:coms="dbs.api" @count="GetCount" element-loading-background="rgba(0, 0, 0, 0.8)")
                template(v-slot="{item,index}")
                    div
                        //- 充值余额
                        div.item(v-if="dbs.api.args.selectDataType === 3")
                            div 
                                div.top1
                                    span.s1s(v-if="item.type === 6") 门店
                                    span.s1s(v-if="item.type === 8") 股东
                                    span.s1s(v-if="item.type === 12") 用户充值
                                    span {{ item.name1 }}
                                div.info {{ item.info }}
                                div.but1 
                                    //- img.avt(:src="item.avatar")
                                    //- span &nbsp;{{ item.nickname }}&nbsp;
                                    span(v-if="item.time") {{ item.time }}
                        //- 卡券数据
                        div.item(v-if="dbs.api.args.selectDataType === 2")
                            div 
                                div.top1
                                    span.s1s(v-if="item.get_type === 1") 股东
                                    span.s1s(v-else) 门店
                                    span {{ item.name1 }}
                                div
                                    CouponBase(:item="item" type="C1")
                                div.but1 
                                    img.avt(:src="item.avatar")
                                    span &nbsp;{{ item.nickname }}&nbsp;
                                    span(v-if="item.get_time") {{ item.get_time }}
                        //- 运营数据列表
                        div.item(v-if="dbs.api.args.selectDataType === 1") 
                            div.t01 
                                div 
                                    img.img(:src="item.img")
                                a-row.title 
                                    a-col(span=12)
                                        div.s10 {{ item.name }}
                                    a-col(span=12)
                                        div.s11 {{ kxyk.utils.format(item.t2,"yyyy-MM-dd hh:mm:ss") }}
                            div.cc1 
                                div.av(v-if="item.detall && item.detall.length > 0") 
                                    div.nav(v-for="de in item.detall")
                                        div 
                                            img.img(:src="de.goods_img")
                                        div.tt1 
                                            div 
                                                span.x0 {{ de.is_spec ? (de.suk_name+de.item_name) : de.item_name }} 
                                                span.x x{{ de.count ? de.count : 1}}
                                            div.x2 
                                                span 单价:￥{{ de.price.toFixed(2) }} 优惠:￥{{ de.discount.toFixed(2) }} 
                                        div.pay 
                                            span ￥{{ de.pay_price.toFixed(2) }}
                            a-row.bo1
                                a-col(span="7")
                                    div.b01 
                                        img.img(v-if="item.avatar" :src="item.avatar")
                                        img.img(v-else src="https://smkjm.sam322.com/img/avatar.png")
                                        span.car(v-if="item.car_number")
                                            span.p2 {{ item.car_number }} 
                                        span(v-else) {{ item.nickname }}
                                a-col(span="17")
                                    div.price
                                        span 订单:￥{{ item.order_price }} &nbsp; 
                                        span 优惠:￥{{ item.discount_price }} &nbsp; 
                                        span 实付: 
                                            span.pay1 ￥{{ (item.cash_price+item.yue_price).toFixed(2)}}

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, h, nextTick ,computed,onUnmounted} from "vue";
import { kxyk, Api, io, __ } from "smkj";
import * as  echarts from "echarts";


const emit = defineEmits(['unfold']);
interface dbs {
    /** 数据查询组件是否展开 */
    is_unfold:boolean,
    /** 数据加载状态 */
    loading:boolean,
    /** 百度报表数据  ECBasicOption */
    ECHotions:any,
    /** 顶部三个统计数据 */
    counts:sm.C1.C1CountDBs,
    /** 更新数据接口 */
    api:sm.Com.refreshAPI,
    /** 下拉刷新列表框高度 */
    hh:number,
    /** 当前渲染报表类型 关联 selectDataType值*/
    hasRendeType:number
    // sDate:sm.Com.sDate,
}
let EC1sum:number[] = [];
const dbs = reactive<dbs>({
    is_unfold:false,loading:false,hasRendeType:0,
    counts:{count1:0,count2:0,count3:0,count4:0,count5:0,count6:0,count10:0,count7:0,count8:0,count9:0},hh:100,
    api:{url:Api.shop.C1.C1CountInit,size:10,refresh:true,args:{
        sDate:{show: false, type: 1, time: new Date().Format(), time1: "", time2: "", type2: 0, role: "C1",color:'#68e'},
        /** 当前选择数据类型 0 = 没有选择 1 = 运营 2 = 卡券 = 2 结余*/
        selectDataType:0,

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

const GetCount=(a:{counts:sm.C1.C1CountDBs,Recently:sm.C1.C1CountInitEchotionDB})=>
{
    // console.log('a',a);
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
        }else{
            if(dbs.api.args.selectDataType === 1 || dbs.api.args.selectDataType === 2){
                dbs.ECHotions = getEchartsConfig("pie");
                if(a.counts.pieDate){
                    dbs.ECHotions.series[0].data = a.counts.pieDate;
                }
            }else{

                if(dbs.api.args.selectDataType === 3){
                    dbs.ECHotions = getEchartsConfig("ring");
                    if(a.counts.pieCC) dbs.ECHotions.title.subtext = `￥${a.counts.pieCC}`;
                    if(a.counts.pieDate){
                        dbs.ECHotions.series[0].data = a.counts.pieDate;
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
    kxyk.utils.DOM.get_win_last_higth(['_n0', '_echart','sDate']).then(e => {
        dbs.hh = e-15 ;
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
    Echarts = kxyk.echarts.init('echatr2')
    dbs.api.refresh = !dbs.api.refresh;

    
});
onUnmounted(()=>{
    // if(Echarts) Echarts.dispose();
    // console.log('这里卸载报表');
    
})
</script>


