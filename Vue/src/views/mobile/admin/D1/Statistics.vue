<style lang="stylus">
    @import "./Statistics.styl"
</style>
<template lang="pug">
div.Statistics
    //- 申请结算框
    div.ns
        Madel(:open="dbs.ns")
            template(#title)
                div 结算管理
            template(#footer)
                div
                    el-button(type="primary" style="width: 100%;" @click="dbs.ns = false") 取消
            div(v-loading="dbs.nsLoad")
                div.n1.auto123654
                    div.s1 当前待结金额（元）
                    div.s2 
                        span(v-if="dbs.c4 === 0") {{ dbs.c4 }} 
                        span(v-if="dbs.c4 > 0" style="color:red;") {{ dbs.c4 }} 
                        span(v-if="dbs.c4 < 0" style="color:#4CAF50") {{ dbs.c4 }} 
                    div(v-if="dbs.c4 !== 0")
                        el-button(type="primary" @click="applyBill") 申请结算
                //- 往期结算列表
                div.list(:style="{'height':dbs.h1+'px'}")
                    div(v-if="dbs.nsList.length > 0")
                        div.ns1(v-for="ns in dbs.nsList")
                            div.nsrow
                                div.c9(span="9")
                                    div.ts0(:style="{'color':ns.price > 0 ? 'red' : '#4CAF50'}") {{ ns.price }}
                                    div.ts1 结算金额(￥)
                                div.c11(span="11")
                                    div.aa1
                                        span.i0 申请:&nbsp;
                                        img.i1(:src="ns.avatar")
                                        span.i2 &nbsp;{{ kxyk.utils.format(ns.t1,'yyyy-MM-dd') }}
                                    div.aa1(v-if="ns.status === 2" style="color: #009688;")
                                        span.i0 结算:&nbsp;
                                        img.i1(:src="ns.s_avatar")
                                        span.i2 &nbsp;{{ kxyk.utils.format(ns.t2,'yyyy-MM-dd') }}
                                div.c4(span="4")
                                    div
                                        div.ss1(v-if="ns.status === 1")
                                            div 
                                                i.fa.fa-clock-o
                                            div 等待中
                                        div.ss2(v-if="ns.status ===2")
                                            div 
                                                i.fa.fa-check-circle-o
                                            div 已完成
                    div(v-else)
                        div.n0 暂无往期结算数据

    //- canvas.myCanvas(ref="canvas" @click="play1") 
    //- el-button(type="primary" @click="paly1") 开始
    div
        a-row.price 
            a-col(span="6")
                div(@click="dbs.sDate.show = !dbs.sDate.show") 
                    div.p2 支出(元)
                    div.p1.elesis(style="color:#4caf50;") {{dbs.c1 > 0 ? '-' :''}}{{ dbs.c1 }}
            a-col(span="6")
                div(@click="dbs.sDate.show = !dbs.sDate.show") 
                    div.p2 收益(元)
                    div.p1.elesis(style="color:red;") {{ dbs.c2 }}
            a-col(span="6")
                div(@click="dbs.sDate.show = !dbs.sDate.show") 
                    div.p2 已结(元)
                    div.p1.elesis(style="color:#8f8f8f;") {{ dbs.c3 }}
            a-col(span="6")
                div(@click="dbs.ns = true;setBoxH1()") 
                    div.p2 待结(元) 
                    div.p1.elesis(:style="{'color':dbs.c4 <= 0 ? '#4caf50' : 'red'}") {{ dbs.c4 }}
        div.time1121
            SelectDate(:model-value="dbs.sDate" @change="changeDateTime")        
        div.list(v-loading="dbs.loading1")
            div.list1323256(:style="{'max-height':(dbs.h+15)+'px'}" )
                div 
                    el-radio-group(v-model="dbs.sDate.type2" size="small" fill="#84d3d8" )
                        el-radio-button(:label="0") 全部
                        el-radio-button(:label="1") 支出
                        el-radio-button(:label="2") 收益
                        el-radio-button(:label="3") 已结
                        el-radio-button(:label="4") 待算
                div.list22323(:style="{'max-height':dbs.h+'px'}")
                    RefreshList(:coms="dbs.api2" 
                        @count="rc=>(dbs.c1=rc.count1,dbs.c2=rc.count2,dbs.c3=rc.count3,dbs.c4=rc.count4)"
                        @loading1="setLoading" element-loading-background="rgba(0, 0, 0, 0.8)") 
                        template(v-slot="{item,index}")
                            div.items(:style="{'border': item.profit_payable ? '1px solid #b5d6b7' :'1px solid #ffc9c9'}")
                                a-row.t1(:class="[item.profit_payable ? 'st1' : 'st2']")
                                    a-col.tl(span="12")
                                        span.r1 [{{ kxyk.user.FormatfinanceType(item.type)}}]
                                    a-col.tr(span="12")
                                        span.j3(v-if="item.checkout === 0") 未结算 
                                        span.j3(v-if="item.checkout === 1") 申请结算
                                        span.j3(v-if="item.checkout === 2") 已结算
                                div.t3
                                    span(v-if="item.profit_payable === 0" style="color:red;") +{{ item.price.toFixed(2) }}
                                    span(v-if="item.profit_payable === 1" style="color:#4CAF50;") -{{ item.price.toFixed(2) }}
                                div.t2 {{ item.info }}
                                div.t4 
                                    div.tr
                                        span {{ kxyk.utils.format(item.time_unix) }}

</template>

<script lang="ts">
import { coms } from "smkj";
export default { 
    name: "Statistics",
    components:{SelectDate:coms.SelectDate,RefreshList:coms.RefreshList,Madel:coms.Modal},
};
</script>


<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch} from "vue";
import {kxyk,Api,io,__} from "smkj";

interface Props {
    coms:{
        refresh:boolean,
    }

}

// 接受参数
const props = withDefaults(defineProps<Props>(), { })
const dbs:any = reactive({
    sDate:{
        show:false,type:1,time:new Date().Format(),time1:"",time2:"",type2:0,role:"D1",type3:0
    },
    api2:{
        url:Api.shop.U.GetRoleFinance,size:10,refresh:true,args:{show:false,type:1,time:new Date().Format(),time1:"",time2:"",type2:0,role:"D1",type3:0}
    },loading1:false,h:500,h1:400,
    // 统计数字
    c1:0,c2:0,c3:0,c4:0,
    // 结算框控制器
    ns:false,nsList:[],
    /** 加载结算控制器 */
    nsLoad:false,
})
/** 设置加载数据状态 - 统计数据 */
const setLoading = (s:any)=>{
    if(!s){
        setTimeout(() => {
            dbs.loading1 = s;
        }, 100);
    }else{
        dbs.loading1 = s;
    }
}
/** 申请结算 */
const applyBill = ()=>
{
    // console.log(dbs);
    // dbs.ns = true;
    if(dbs.c4 !== 0){
        kxyk.Modal.confirm({
            title: '申请结算',
            icon:undefined,
            content:`当前待结金额:￥${dbs.c4}，您确定要申请结算吗？`,
            okText:'确定',
            cancelText:'取消',
            onOk(){
                return new Promise((resolve,reject)=>{
                    kxyk.sk.be(Api.shop.D1.ApplyNs,{price:dbs.c4,args:dbs.api2.args},res=>{
                        if(res.status){
                            kxyk.msg.success('申请成功，请耐心等待后台审核。');
                            dbs.api2.refresh = !dbs.api2.refresh;
                            resolve(true);
                        }
                    })
                })

            }
        })
    }
}
const changeDateTime = ()=>{
    if(dbs.sDate.show){
        gsap.to('.list1323256',{height:'auto',opacity:1,ease:'back.out(1.5)',duration:.5,onComplete:()=>{}});
        gsap.to('.time1121',{padding:'0 0 10px 0',ease:'back.out(1.5)',duration:.5,onComplete:()=>{}});
        // dbs.api2.args = E1db.sDate;
        dbs.api2.args = dbs.sDate;
        dbs.api2.refresh = !dbs.api2.refresh;
        // E1db.api2.refresh = !E1db.api2.refresh;
    }else{
        gsap.to('.list1323256',{height:'1px',opacity:0,ease:'back.in(1.7)',duration:.5,onComplete:()=>{ }});
        gsap.to('.time1121',{padding:'0 0 0px 0',ease:'back.in(1.7)',duration:.5,onComplete:()=>{ }});
    }
    // console.log('这里需要查询数据',E1db.sDate);
    
}
/** 获得结算列表 */
const init = ()=>
{
    kxyk.sk.be(Api.shop.D1.GetApplyNsLog,{},res=>{
        if(res.status && res.list){
            dbs.nsList = res.list;
        }
    })
}



const canvas = ref<HTMLCanvasElement>();
let ctx:any = null;
let angle = 0;
const amplitude = 50;
const frequency = 0.01;
const nbplay = ()=>{
    if(canvas.value){
        ctx = canvas.value.getContext('2d');
        if(ctx){
            // 清空画布
            ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
            // 计算 x 和 y 坐标
            const x = canvas.value.width / 2;
            const y = canvas.value.height / 2 + amplitude * Math.sin(angle);
            // 绘制圆
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = 'blue';
            ctx.fill();
            // 更新角度
            angle += frequency;
            angle += frequency;
            angle += frequency;

            // 递归调用动画函数
            requestAnimationFrame(nbplay)
        }
    }
}
const paly1 = ()=>
{
    nbplay()
}

const setBoxH1 = ()=>{
    kxyk.utils.DOM.get_win_last_higth(['auto123654']).then(e=>{
        dbs.h1 = e-55-45;
    })
}
onMounted(()=>{
    init();
});


</script>


