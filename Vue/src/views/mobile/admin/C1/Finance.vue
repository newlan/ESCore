
<script lang="ts">
import { coms } from "smkj";
import { ECharts } from "@/libs/smkj/utils"; 
export default {
    name: "Finance",
    components: {
        Title: coms.Title, SelectDate: coms.SelectDate, RefreshList: coms.RefreshList, Modal: coms.Modal
    },
};
</script>

<style lang="stylus">
    @import "./Finance.styl"
</style>
<template lang="pug">
div.Finance
    //- 顶部导航
    div.title0.statis
        div(style="height: 2.6rem;")
            Title(:coms="{str:'财务管理'}") 
        div.price
            div.title
                //- 显示概况数据
                a-row.row1(@click="dbs.sDate.show = !dbs.sDate.show")
                    a-col.all_(:span="dbs.sDate.show ? 12 : 8")
                        div.t1
                            div.ts1 已结算(元) 
                            div.ts2(style="color: #8b8b8b;") {{dbs.api2_count1}}
                    a-col.all_(:span="dbs.sDate.show ? 11 : 8")
                        div.t1 
                            div.ts1 待结算(元)
                            div.ts2(:style="{color:dbs.api2_count2 > 0 ? 'red' : '#4caf50'}") {{dbs.api2_count2}}
                    a-col.all_(:class="{'no1':dbs.sDate.show}"  :span="dbs.sDate.show ? 1 : 8")
                        div.t1(v-if="!dbs.sDate.show")
                            div.ts1 结算申请(笔)
                            div.ts2 {{dbs.api1_count1}}
                //- 选择时间组件
                div.list1323256
                    div 
                        div#echatr1
                    SelectDate.ns112(:model-value="dbs.sDate" @change="changeDateTime")
                    div.ns1131
                        div.type2
                            el-radio-group(v-model="dbs.sDate.type2" fill="#84d3d8" size="small")
                                el-radio-button(:label="0") 全部
                                el-radio-button(:label="1") 已结算
                                el-radio-button(:label="2") 待结算
                    //- div.ns1131
                    //-     div.type2
                    //-         el-select(v-model="dbs.sDate." clearable placeholder="请选择门店或大客户")
                    //-             el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
                    //- 当前条件数据列表
                    div.ns114(:style="{height:dbs.hh+'px'}")
                        RefreshList(:coms="dbs.api2" @count="setCount" element-loading-background="rgba(0, 0, 0, 0.8)")
                            template(v-slot="{item,index}")
                                div.items1(:style="{'border': item.profit_payable ? '1px solid #ffc9c9' :'1px solid #b5d6b7'}")
                                    a-row.t1(:class="[item.profit_payable ? 'st2' : 'st1']")
                                        a-col.tl(span="18")
                                            span.r1(v-if="[1,2,5,6,9,11].includes(item.type)") [ 门店: {{ item.name0 }} ]
                                            span.r1(v-if="[3,4,10].includes(item.type)") [ 大客户: {{ item.name1 }} ]
                                            span.r1(v-if="[7].includes(item.type)") [ 商圈操作 ]
                                            span.r1(v-if="[12].includes(item.type)") [ 用户充值 ]
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
    //- 结算详情模态框
    Modal(:open="dbs.open1")
        template(#title)
            div 结算详情
        div.detall
            div.s1 本次结算金额: {{ dbs.hasItem.price }} ,共涉及 {{ dbs.hasItem.count }} 条订单详情 
            div(v-loading="dbs.loading2")
                div.dlist
                    RefreshList(:coms="dbs.api3"  @count="" @loading="dbs.loading2" element-loading-background="rgba(0, 0, 0, 0.8)")
                        template(v-slot="{item,index}")
                            div.ns1
                                div.ns0 {{ index+1 }}
                                a-row 
                                    a-col(span="12")
                                        //- div [{{ kxyk.user.FormatfinanceType(item.type) }}]

                                        div(:style="{color:item.profit_payable ? 'red' : '#4caf50'}")
                                            span {{ item.profit_payable ? '+' : '-'}}
                                            span {{ item.price.toFixed(2) }}
                                    a-col(span="12" style="color: #bfbfbf;")
                                        div {{ item.time }}
                                //- div {{ item.price }}
                                div.ns2 {{ item.info }}


        template(#footer)
            el-button(style="width:100%" @click="dbs.open1 = false") 关闭窗口
    div.listTitle 
        div ------ 结算列表 ------
    //- 申请列表
    div.list1
        div.con(:style="{height:dbs.h2+'px'}")
            RefreshList(:coms="dbs.api1" element-loading-background="rgba(0, 0, 0, 0.8)" @count="r=>dbs.api1_count1 = r.count1")
                template(v-slot="{item,index}")
                    div.finance_item(:class="{'ask_fin':(item.status === 1),'_gray':item.status === 2}")
                        a-row 
                            a-col(span="12")
                                div.name1 {{ item.name }}
                            a-col(span="12")
                                div.bon 
                                    div.db
                                        img.img1(v-if="item.avatar" :src="item.avatar")
                                        span &nbsp;{{  kxyk.utils.format(item.t1) }}
                        div.pn
                            div.p1 结算金额(元)
                            div.p2(:style="{color: item.price > 0 ? '#4caf50' : 'red'}") {{ (item.price * -1).toFixed(2) }}
                            div.name2  
                                span.d1(v-if="item.status === 1")  待结算
                                //- span.d1(v-if="item.status ===2 && item.s_uid") 
                                //-     img(:src="item.avatar1")
                                span.d1(v-if="item.status === 2") 
                                    span(v-if="item.status ===2 && item.s_uid")
                                        img.img(:src="item.avatar1")
                                    span(v-if="item.t2") &nbsp;{{ kxyk.utils.format(item.t2,'yyyy-MM-dd') }}
                                    span 已结算
                            //- div.p3
                                el-button(type="info" plain size="small" @click="OpenFinanceDetall(item)") 结算详情({{ item.count }})
                        div.but 
                            a-row 
                                a-col.n1(span="12")
                                    el-button(type="info" plain size="small" @click="OpenFinanceDetall(item)") 关联结算订单:{{ item.count }}
                                a-col.n2(span="12")
                                    el-button(v-if="item.status ===1" type="primary" size="small" @click="SubmitFinance(item)") 点击确认结算
                                    div.n21(v-if="item.status === 2") 已结算
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, h, nextTick } from "vue";
import { kxyk, Api, io, __ } from "smkj";
import * as ech from "echarts";

const dbs = reactive({
    /** 时间查询组件参数 */
    sDate: {
        show: false, type: 1, time: new Date().Format(), time1: "", time2: "", type2: 0, role: "C1",
        /**  */
        type3: 0,
    },
    /** 申请结算列表数据 */
    api1: {
        url: Api.shop.C1.GetFinanceApplication, size: 5, refresh: true, args: {}
    },
    /** 根据时间条件查找已结待结数据 */
    api2: {
        url: Api.shop.U.GetRoleFinance, size: 10, refresh: true, args: { show: false, type: 1, time: new Date().Format(), time1: "", time2: "", type2: 0, role: "C1" }
    }, api2_count1: 0, api2_count2: 0, api1_count1: 0,
    // 结算数据查询列表
    hh: 200, loading1: false, open1: false, loading2: false, hasItem: { price: 0, count: 0 }, h2: 500,
    /** 结算详情API接口3 */
    api3: { url: Api.shop.C1.GetFinaceDetall, size: 10, refresh: true, args: { fid: 0 } },
    /** 图表数据相关 */
    ECHotions:{
        // title: {
        //     text: '数据统计',
        //     subtext: 'Fake Data',
        //     left: 'center'
        // },
        tooltip: {
            trigger: 'item',
            formatter: (params:any) => {
            // 在 Tooltip 中显示原始的负数值
            return params.data.originalValue <= 0
                ? `${params.name}: ${params.data.originalValue}`
                : `${params.name}: (${Math.abs(params.data.originalValue)})`;
            },
        },
        legend: {
            type:"scroll",
            orient: 'horizontal',
            x:"center",
            bottom:15
        },
        series: [
            {
                name: '结算统计',
                type: 'pie',
                center:["50%","35%"],
                radius: '60%',
                label: {
                    formatter: (params:any) => {
                    // 在标签中显示原始的负数值
                    return params.data.originalValue <= 0
                        ? `${params.name}: ${params.data.originalValue}`
                        : `${params.name}: (${Math.abs(params.data.originalValue)})`;
                    },
                },
                data: [
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
})
/** 返回条件数据 - 格式化数据 - 设置饼图 */
const setCount = (r:any)=>{
    // console.log(r);
    dbs.api2_count1 = r.count1;
    dbs.ECHotions.series[0].data = r.count3.map((item:any) => ({
        name: item.name,
        value: Math.abs(item.value), // 使用 Math.abs() 获取绝对值
        originalValue: item.value, // 保存原始的负数值
    }));
    // console.log(dbs.ECHotions.series[0].data);
    
    Echarts && Echarts.setOption(dbs.ECHotions);
    dbs.api2_count2 = r.count2;
    
}
let Echarts:ech.ECharts|null = null;
/** 递交结算 */
const SubmitFinance = (item: any) => {
    console.log(item);
    let str = ``;
    if (item.price > 0) {
        str = `结算门店:${item.name} 结算金额:${item.price * -1}`;
    }
    kxyk.Modal.confirm({
        title: '结算确认',
        icon: undefined,
        content: () => {
            return h('div', {}, [
                h('div', { style: "color:red;" }, [`结算门店：${item.name}`]),
                h('div', { style: "color:red;" }, [`结算金额：${item.price * -1}`]),
                h("div", { style: 'font-size: 13px;color: #9e9e9e;' }, ['确定已经线下结算当前金额了吗？一单确定，系统会更新本次结算关联的所有财务日志'])
            ])
        },
        okText: '确定',
        cancelText: '取消',
        onOk() {
            return new Promise((resolve, reject) => {
                kxyk.sk.be(Api.shop.C1.SubmitFinace, { fid: item.id }, res => {
                    if (res.status) {
                        kxyk.msg.success('操作成功.');
                        dbs.api1.refresh = !dbs.api1.refresh;
                        resolve(true);
                    }
                })
            }).catch((e) => {
                kxyk.msg.error(e);
            });
        }
    })
}
/** 打开结算详情窗口 */
const OpenFinanceDetall = (item: any) => {
    dbs.hasItem = item;
    dbs.api3.args.fid = item.id
    dbs.api3.refresh = !dbs.api3.refresh;
    dbs.open1 = true;
}
/** 数据查询 - 时间条件数据改动 */
const changeDateTime = () => {
    if (dbs.sDate.show) {
        gsap.timeline().to('.list1323256', { height: "auto", minHeight: 76, opacity: 1, ease: "back.out", duration: .6 }).to('.ns112', { opacity: 1, duration: .3 }).to('.ns114', { opacity: 1 }).play();
        dbs.api2.args = dbs.sDate;
        dbs.api2.refresh = !dbs.api2.refresh;
    } else {
        gsap.timeline().to('.ns114', { opacity: 0, duration: .3 }).to('.list1323256', { minHeight: 0, height: 0, opacity: 0, ease: "back.out", duration: .6 }).play();
    }
}
const init = () => {
    // 计算数据查询list高度
    kxyk.utils.DOM.get_win_last_higth(['title0', 'row1', 'ns112', 'ns1131']).then(e => {
        dbs.hh = e - 232;
    })
    // 计算申请结算list高度
    kxyk.utils.DOM.get_win_last_higth(['title0', 'statis', 'listTitle']).then(n => {
        dbs.h2 = n + 105;
    })
}


onMounted(() => {
    init();
    Echarts = kxyk.echarts.init('echatr1');
    Echarts.setOption(dbs.ECHotions);
    
});
</script>


