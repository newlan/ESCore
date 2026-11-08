<style scoped lang="stylus">
    .error
        background: #f9f9f9; padding: 1rem; color: #9f4444; font-size: 1.5rem; height: 100vh; display: flex; align-items: center; text-shadow: 0 0 0.1rem #b9b9b9; justify-content: center;
    .title
        width: 100%;
        .bj 
            height: 6rem; background: #6688ee;
            .name 
                color: #fff; padding: .8rem 0;font-size:1.15rem;
        .role 
            background: #fff; border-radius: 1.15rem; padding: .5rem; box-shadow: 0px 0px 6px rgba(133 139 155 .18); margin: 0 2rem;text-align: left;margin-top: -3rem;
            .row
                padding: .2rem 1.5rem;align-items: center;
                .t 
                    font-size: 1.6rem; color: #4477DD; font-weight: 500;
                    .t0 >>>.el-icon
                        color #4477dd
                .t1 
                    padding-top: .4rem; color: #747474;
                .t2 
                    color: #cdcdcd; margin-top: .2rem; margin-bottom: 0.3rem;
                .t3 
                    font-size: 1.5rem; color: #6688ee; text-align: right; transform: scaleY(1.5);
    .tools 
        margin-top: 0.8rem;
        .b1
            text-align: left
        .b1::before
            margin-left: .5rem; margin-right: .5rem; border-left: 6px solid; content: ' '; border-radius: 3px; border-color: #6688ee;
        .b2
            margin-top: 0.5rem; padding: 0 1.5rem; text-align: left; font-size: .9rem;
            .c1
                background: #ecf1ff; border-radius: 0.3rem; height: 6rem; color: #6688ee;
                .c2
                    padding-top: .9rem; padding-left: .9rem;
                .c5
                    padding-top: .9rem;text-align: center;
                .icon
                    background: #fff; padding: 0.7rem; border-radius: 50%; font-size: 1.7rem;color: #a3bbff;
            .c3
                text-align: right; padding-right: 1.2rem;
            .c4
                text-align: center;padding-top: 0.85rem;

</style>
<template lang="pug">

div
    div.A1(v-if="is_right")
        //- 二维码组件
        CallQrCode(:coms="coms" @scan="scan")
        //- 完善信息组件
        RegisterInfo(:coms="regInfo")
        div.title
            div.bj 
                div.name 开薪怡客
            div.role
                el-row.row
                    el-col(:span="22")
                        div.t._fx(style="align-items: end;justify-content: space-between;")
                            div {{A1.cp_name}} A2
                            div.t0
                                //- el-dropdown(@command="select_types" size="small") 
                                //-     el-button(size="small")
                                //-         span(style="color: #4477DD;") {{A1.has_type}}
                                //-         el-icon(class="el-icon--right")
                                //-             i.fa.fa-chevron-down
                                        
                                //-     //- span(style="color:#4477DD") {{A1.has_type}}
                                //-     template(#dropdown)
                                //-         el-dropdown-menu
                                //-             el-dropdown-item(v-for="t in A1.mch_type" :key="t.id" :command="t") [{{t.id}}] {{t.name}}
                        div.t1(@click="open_qr") 开通账号，管理身份
                        div.t2 全国洗车管理
                    el-col(:span="2")
                        div.t3 >
        div.tools 
            div.b1
                span 后台管理
            div.b2
                el-row(:gutter="10")
                    el-col(:span="12") 
                        //- 地址参数 cpid=1公司 roule_id=0老板
                        div.c1(@click="kxyk.toUrl('/account/'+router.params.cpid+'/'+A1.role_id)")
                            div.c2 账号管理
                            div.c3
                                div
                                    i.fa.fa-id-card-o.icon
                    el-col(:span="12") 
                        div.c1 
                            div.c2 财务管理
                            div.c3
                                div
                                    i.fa.fa-credit-card-alt.icon
            div.b2 
                el-row(:gutter="10")
                        el-col(:span="8") 
                            div.c1(@click="kxyk.toUrl('/a1a2_goods/'+router.params.cpid+'/'+A1.has_type_id)")
                                div.c5 商品模板
                                div.c4
                                    div
                                        i.fa.fa-cubes.icon(style="font-size: .9rem;")
                        el-col(:span="8") 
                            div.c1(@click="kxyk.toUrl('/member/'+router.params.cpid)") 
                                div.c5 会员管理
                                div.c4
                                    div
                                        i.fa.fa-users.icon(style="font-size: .9rem;")
                        el-col(:span="8") 
                            div.c1
                                div.c5 营销管理
                                div.c4
                                    div
                                        i.fa.fa-gift.icon(style="font-size: .9rem;")
</template>

<script lang="ts">

export default { 
    name: "A2",
};
</script>
<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted} from "vue";
import CallQrCode from "@/views/com/CallQrCode.vue";
import RegisterInfo from "@/views/com/RegisterInfo.vue";
// import { kxyk,io} from "@/libs/smkj";
import {kxyk,Api,io} from "smkj";
import { useRouter,useRoute } from "vue-router";
// kxyk.toUrl('')


const A1:any = reactive({mch_type:[],has_type:'请选择',has_type_id:0,open_qr:false,cp_name:'',sub_role:[],role_id:0});
// 二维码组件参数
const coms = reactive({
    url:kxyk.utils.host+'/ScanCode?type=1',
    str:'申请人使用微信扫码',
    open:false,
    role:A1.has_type
});

// 是否有页面访问权限
let is_right = ref(false);
const attr = useAttrs();
const router = useRoute();

//完善信息组件参数
const regInfo:any = reactive({
    role:'A1',//调用组件的身份
    sub_role:[],//该身份可开通的子身份
    type_id:0,//行业类型
    cp_id:router.params.cpid,
    root_role_id:0,//上级身份ID
    name:'',phone:"",avatar:'',nickname:'',card_id:'',uid:0,
    role_id:0,//当前身份ID

    open:false,//是否打开完善信息框
});
// 用户扫码回调
const scan=(db:any)=>{
    // 这里如果二维码已经关闭就不在执行后续逻辑
    if(coms.open)
    {
        coms.open = false;
        regInfo.avatar = db.u.avatar;
        regInfo.nickname = db.u.nickname;
        regInfo.region = [];
        if(db.u.phone) regInfo.phone = db.u.phone;
        if(db.u.real_name) regInfo.name = db.u.real_name;
        if(db.u.uid) regInfo.uid = db.u.uid;
        regInfo.type_id = A1.has_type_id;//行业ID
        // regInfo.role_id = A1.role_id;//当前用户角色ID
        regInfo.root_role_id = A1.role_id;//当前角色设置为上级ID
        // 这里为开通下级账号指定默认分类
        if(regInfo.sub_role.length > 0 && !regInfo.role_id)
        {
            regInfo.role_id = regInfo.sub_role[0].id;
        }
        regInfo.open = true;
    }
}

// 展示二维码 等待下级成员扫码
const open_qr = ()=>
{
    coms.role = A1.has_type;
    coms.open = true;
}
// 选择行业
const select_types = (type:any)=>
{
    A1.has_type =type.name;//行业名称
    A1.has_type_id = type.id;//行业iD
}
//初始化页面数据
// console.log('路由',router);

kxyk.sk.be(Api.shop.A2.GetInitA2,{cpid:router.params.cpid},res=>{
    // console.log('A1页面初始化',res);
    if(res.__error__) return kxyk.toUrl('/404');
    is_right.value = true;//显示页面

    A1.has_type_id = res.db.type_id;//可选择行业
    A1.cp_name = res.db.cp_name;//公司名称
    A1.role_id = res.db.role_id;//当前身份ID
    // A1.sub_role = res.db.sub_role;
    // 这里是当前角色下属子商户分类
    regInfo.sub_role = res.db.sub_role;
    if(res.db.area)
    {
        regInfo.area = res.db.area;
    }


})
onMounted(()=>{
    // dom挂载完成
});



</script>


