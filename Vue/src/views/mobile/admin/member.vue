<style scoped lang="stylus">
    @import "./member.styl"
</style>
<template lang="pug">
div.member
    //- 会员类型管理弹窗
    div
        //- 添加会员模态框
        Modal(:open="dbs.is_open_has_vip" ww="300px" hh="500px" class="full-modal-a2")
            template(#title)
                div {{ dbs.has_vip.id ? '修改' : '新增' }}{{ dbs.has_tab }}会员
            template(#footer)
                a-row(style="text-align: center;" :gutter="10")
                    a-col(span="12")
                        a-button(@click="dbs.is_open_has_vip = false" block) 取消
                    a-col(span="12")
                        a-button(type="primary" @click="submit" :loading="dbs.is_submit" block) 保存
            div.has_vip 
                div.a2 
                    el-form( label-position="left" :model="dbs.has_vip" style="max-width: 100%" )
                        el-form-item(label="会员名称")
                            el-input(v-model="dbs.has_vip.name" placeholder="请输入会员名称"  @blur="")
                        el-form-item(label="会员金额")
                            el-input(v-model="dbs.has_vip.price" placeholder="请输入会员金额"  @blur="")
                        el-form-item(label="会员权重")
                            el-input(v-model="dbs.has_vip.layer" placeholder="请输入会员权重"  @blur="")
                        el-form-item(label="日期类型")
                            a-radio-group(v-model:value="dbs.has_vip.day_type" button-style="solid")
                                a-radio-button(:value="0") 年
                                a-radio-button(:value="1") 月
                                a-radio-button(:value="2") 日
                        el-form-item(label="有效日期")
                            el-input(v-model="dbs.has_vip.vip_day" placeholder="请输入会员有效期"  @blur="")
                                template(#append) 
                                    span(v-if="dbs.has_vip.day_type === 0") 年
                                    span(v-if="dbs.has_vip.day_type === 1") 月
                                    span(v-if="dbs.has_vip.day_type === 2") 日
                        el-form-item(label="过期金额")
                            el-input(v-model="dbs.has_vip.out_price" placeholder="请输入过期金额 默认不限制"  @blur="")
                        el-form-item(label="提醒金额")
                            el-input(v-model="dbs.has_vip.tip_price" placeholder="请输入提醒金额 默认不提醒"  @blur="")
                        el-form-item(label="是否插队")
                            a-radio-group(v-model:value="dbs.has_vip.is_jump" button-style="solid")
                                a-radio-button(:value="0") 否
                                a-radio-button(:value="1") 是
                        el-form-item(label="是否充值")
                            a-radio-group(v-model:value="dbs.has_vip.is_user_action" button-style="solid")
                                a-radio-button(:value="0") 否
                                a-radio-button(:value="1") 是
                        el-form-item(label="信值会员")
                            a-radio-group(v-model:value="dbs.has_vip.is_syue" button-style="solid")
                                a-radio-button(:value="0") 否
                                a-radio-button(:value="1") 是
                        el-form-item(label="是否分身")
                            a-radio-group(v-model:value="dbs.has_vip.is_avatar" button-style="solid")
                                a-radio-button(:value="0") 否
                                a-radio-button(:value="1") 是
                        el-form-item(label="会员介绍") 
                            el-input(type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="dbs.has_vip.info" placeholder="请填写会员介绍"  @blur="")
                        
    //- 会员管理
    Title(:coms="{str:'会员配置'}")
        template(#right)
            //- div.cog(@click="is_open_vip_type = true")
                i.fa.fa-cog
    div.list
        el-tabs(type="card" v-model="dbs.has_tab" class="demo-tabs" @tab-click="handleClick")
            el-tab-pane(v-for="t in dbs.list" :label="t.name" :name="t.name")
                div.concon
                    div.novip(v-if="!t.vips.length") 暂无设置会员
                    div.vip_(v-for="v in t.vips")
                        div.name
                            div.n 
                                span  ({{ v.layer }})
                                span {{ v.name }}
                            div.p0
                                span.p ￥{{ v.price }}
                        div.info 
                            div 
                                span.jump(v-if="v.is_jump") 插队
                                span.jump2(v-else) 无插队
                                span &nbsp;
                                span.jump3 {{ v.vip_day }}
                                    span(v-if="v.day_type === 0") 年
                                    span(v-if="v.day_type === 1") 月
                                    span(v-if="v.day_type === 2") 日
                                span &nbsp;
                                span.out_price(v-if="v.out_price") &lt; {{ v.out_price }}
                                span.jump2(v-else) 不过期
                                span &nbsp;
                                span.tip_price(v-if="v.tip_price") &lt; {{ v.tip_price }}
                                span.jump2(v-else) 不提醒
                            duv.i {{ v.info }}
                        div.edit 
                            el-button(type="primary" :icon="Edit"  @click="EditVips(v)") 
                            el-button(type="danger" :icon="Delete"  @click="DelVips(v)")
        div.but
            a-button(type="primary" @click="AddHasVip" block) 添加{{ dbs.has_tab }}会员

            

</template>

<script lang="ts">
import { coms } from "smkj";
export default { 
    name: "member",
    components:{Modal:coms.Modal}
};
</script>
<script setup lang="ts"> 

import { ref , reactive,useAttrs ,onMounted} from "vue";
import Title from "@/views/com/Title.vue";
import RegisterInfo from "@/views/com/RegisterInfo.vue";
import {kxyk,Api,io} from "smkj";
import { useRouter,useRoute } from "vue-router";
import { Delete, Edit } from '@element-plus/icons-vue'
// 定义区
const route = useRoute();

const is_open_vip_type = ref(false);//是否显示会员类型管理窗口
const vip_types = ref(null);//会员类型弹框ref

const initHasVips=():tb.kxyk_mch_type_vips=> 
{
    return {vip_day:undefined,out_price:undefined,tip_price:undefined,name:'',is_user_action:1,cpid:0,type:0,day_type:0,info:'',is_syue:0,is_jump:0,layer:0,price:undefined}
}
const dbs = reactive<sm.U.Page.member>({
    list:[],cpid:parseInt( route.params.cpid as string),has_tab:'',is_submit:false,
    has_vip:initHasVips(),is_open_has_vip:false
})


const handleClick = ()=>{
    console.log(dbs.has_tab);
    
}
/** 删除VIP */
const DelVips = (v:tb.kxyk_mch_type_vips)=>
{
    kxyk.Modal.confirm({
        title:'删除会员',
        content:`确定要删除 [ ${v.name} ] 会员等级吗？`,
        okText:'确定',
        cancelText:'取消',
        onOk(){
            kxyk.sk.be(Api.shop.A1A2.DelTypeVips,{cpid:dbs.cpid,vid:v.id},res=>{
                if(res.status){
                    kxyk.msg.success('删除成功.')
                    init();
                }
            })
        }
    })

}
/** 修改VIP */
const EditVips = (v:tb.kxyk_mch_type_vips)=>
{
    dbs.has_vip = v;
    dbs.is_open_has_vip = true;
}
/** 递交新增或修改会员 */
const submit = ()=>
{
    if(!dbs.has_vip.name) return kxyk.msg.error('请输入会员名称');
    if(!dbs.has_vip.price) return kxyk.msg.error('请输入会员金额');
    if(!dbs.has_vip.vip_day) return kxyk.msg.error('请输入会员有效期');
    dbs.has_vip.cpid = dbs.cpid;
    let vip = dbs.list.find(item=> item.name === dbs.has_tab);
    if(!vip || !vip.id) return kxyk.msg.error('行业ID错误！');
    dbs.has_vip.type = vip.id;
    dbs.is_submit = true;
    kxyk.sk.be(Api.shop.A1A2.SaveTypeVips,{vip:dbs.has_vip,cpid:dbs.cpid},res=>{
        dbs.is_submit = false;
        if(res.status){
            kxyk.msg.success('操作成功.')
            dbs.is_open_has_vip = false;
            init();
        }
    })

}
/** 添加会员 */
const AddHasVip = ()=>{
    dbs.has_vip = initHasVips();
    dbs.is_open_has_vip = true;
}
/** 初始化会员页面 */
const init = ()=>
{
    kxyk.sk.be(Api.shop.A1A2.GetTypeMemberInit,{cpid:dbs.cpid},res=>{
        if(res.status && res.list){
            dbs.list = res.list
            if(!dbs.has_tab && dbs.list.length){
                dbs.has_tab = dbs.list[0].name
            }
        }
    })
}
onMounted(()=>{
    init();
});



</script>


