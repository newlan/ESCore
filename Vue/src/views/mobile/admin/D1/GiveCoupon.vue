<style lang="stylus">
    @import "./GiveCoupon.styl"
</style>
<template lang="pug">
div.GiveCoupon(ref="modal1")
    a-modal(v-model:visible="comss.Mopen" width="100%" wrap-class-name="full-modal-max" :getContainer="()=>modal1" :closable="false" okText="保存") 
        template(#title)
            div.title
                img.ti(:src="comss.user.avatar")
                span &nbsp;{{comss.user.nickname}}
        template(#footer)
            a-row(style="text-align: center;")
                a-col(span="24")
                    a-button(@click="comss.Mopen = false" type="primary" block) 关闭窗口
        div(:style="{height:kxyk.utils.DOM.get_surplus_higth([])-108+'px',overflow:'auto'}" style="padding: 6px 7px;")
            el-tabs(v-model="page.active" @tab-click="tab_change")
                el-tab-pane(label="卡券" name="coupon")
                    div
                        PackList(:cid="comss.cid" :role="'D1'" :uid="comss.user.uid" @give-pack="GivePack" :refresh="page.coupon.refresh")
                el-tab-pane(label="期卡" name="annual")
                    div
                        Annual(:cid="comss.cid" :refresh="page.annual.refresh" :sid="comss.sid" :role="'D1'" @give-annual="GiveAnnual")

</template>

<script lang="ts">
import { coms } from "smkj";
export default { 
    name: "GiveCoupon",
    components:{PackList:coms.PackList,Annual:coms.Annual},
};
</script>


<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch} from "vue";
import {kxyk,Api,io,__} from "smkj";

// const emit = defineEmits(['submit','addSuccess']);



// ref模态框指定挂载层
let modal1 = ref(null);
const page = reactive({
    active:'coupon',
    annual:{refresh:false},
    coupon:{refresh:false}
});

// 切换TAB
const tab_change = (s:any)=>
{
    if(page.active === 'annual')
    {
        page.annual.refresh = !page.annual.refresh;
    }else{
        page.coupon.refresh = !page.coupon.refresh;
    }
}
/** 发放期卡 */
const GiveAnnual = (pack:any)=>
{
    kxyk.Modal.confirm({
        title:"发放期卡",
        okText:"确定",
        cancelText:"取消",
        content: `确定要给当前用户发放[${pack.name}]吗？`,
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.D1.GiveAnnual,{id:pack.id,uid:props.comss.user.uid},res=>{
                    if(res.status){
                        kxyk.msg.success('发放成功');
                        resolve(true);
                    }else{
                        reject(false);
                    }
                });
            });
        }
    });
}
// 发放卡包
const GivePack = (pack:any)=>
{
    kxyk.Modal.confirm({
        title:"发放卡包",
        okText:"确定",
        cancelText:"取消",
        content: `确定要给当前用户发放[${pack.name}x${pack.give_count}]吗？`,
        onOk(){
            return new Promise((resolve,reject)=>{
                kxyk.sk.be(Api.shop.D1.GivePackUser,{id:pack.id,give_count:pack.give_count,uid:props.comss.user.uid},res=>{
                    if(res.status){
                        kxyk.msg.success('发放成功');
                        // 这里重新读取一下可发放卡包列表
                        page.coupon.refresh = !page.coupon.refresh
                        resolve(true);
                    }else{
                        reject(false);
                    }
                });
            });
        }
    });
    
}

interface Props {
    comss:{
        Mopen:boolean,
        user:sm.StoreMember,
        cid:number,
        sid:number
    }

}
// 接受参数
const props = withDefaults(defineProps<Props>(), {
})



onMounted(()=>{
});


</script>


