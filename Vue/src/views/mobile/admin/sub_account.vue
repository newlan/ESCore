<style scoped lang="stylus">
:deep(.ant-tabs-left>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-left>div>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-right>.ant-tabs-nav .ant-tabs-ink-bar, .ant-tabs-right>div>.ant-tabs-nav .ant-tabs-ink-bar)
    width :100%; right: 1px;
:deep(.ant-tabs-ink-bar)
    background:#6688EE 
:deep(.ant-tabs-left>.ant-tabs-content-holder, .ant-tabs-left>div>.ant-tabs-content-holder)
    border: 0px;
:deep(.ant-tabs>.ant-tabs-nav, .ant-tabs>div>.ant-tabs-nav)
    background: #FAFBFC;
:deep(.ant-tabs-left>.ant-tabs-nav .ant-tabs-tab, .ant-tabs-left>div>.ant-tabs-nav .ant-tabs-tab, .ant-tabs-right>.ant-tabs-nav .ant-tabs-tab, .ant-tabs-right>div>.ant-tabs-nav .ant-tabs-tab)
    padding: 8px;
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn)
    color: #ffffff; z-index: 111;
:deep(.ant-tabs-left>.ant-tabs-content-holder>.ant-tabs-content>.ant-tabs-tabpane, .ant-tabs-left>div>.ant-tabs-content-holder>.ant-tabs-content>.ant-tabs-tabpane)
    padding-left:0px;
:deep(.ant-tabs-ink-bar::before)
    content: " "; width: 0; border-width: 11px; border-style: solid; border-color: transparent #fff transparent transparent; position: absolute; right: -1px; transform: translateY(72%) scaleY(2.5);
.row1 
    height: 2.4rem; display: flex; align-items: center; box-shadow: 0 0 2px #eee; 
    .r1 
        text-align: right; padding-right: 1rem; display: flex; justify-content: flex-end;
        & div 
            padding-right:15px;
.account 
    .row3 
        text-align: left; background: #FAFBFC; color: #777799;align-items: center;
        .c4 
            font-size: 1.3rem; color: #6688EE;text-align: center;
    .row2 
        display: flex; padding: .5rem;
        .lef 
            text-align: left; padding-left: 8px; color: #666666;
            .n 
                font-size: 1.1rem; color: #333333; font-weight: bolder;
            .info 
                font-size: .8rem; background: #fdfdfd; border-radius: .5rem; color: #878787; padding: .2rem 0 0 .2rem;
        .e 
            font-size: 1.1rem; color: #6688EE;
        .img 
            width: 100%; border-radius: 50%; 
    .nodata 
        color: #b1b1b1; padding: 1rem; 
</style>
<template lang="pug">
div.account
    div(v-if="is_right")
        //- 修改下级账号信息组件
        RegisterInfo(:coms="regInfo" @submit="submit")
        div(style="height: 2.6rem;")
            Title(:coms="{str:has_role_info.mark+' / '+has_role_info.name}")
        div
            div
                a-row.row1
                    a-col(span="12" style="text-align: left; padding-left: .5rem;")
                        span.__guide 
                        span 账号管理
                    a-col.r1(span="12")
                        div(v-if="on_edit" style="color: #FF4444;" @click="onDel") 删除
                        div(v-if="on_edit" style="color: #6688EE;" @click="allSelect") 全选
                        div(@click="onEdit" ) {{on_str}}

            a-tabs(v-model:activeKey="activeKey" tab-position="left" :style="{ height: '100%' }" @change="onTabs")
                a-tab-pane(v-for="r in roles" :key="r.id")
                    template(#tab)
                        div(style="padding: .5rem;") {{r.name}}
                    div
                        div(v-if="r.users.length>0")
                            div(v-for="u in r.users" :key="u.id")
                                a-row.row2()
                                    a-col(v-if="on_edit" span="3" style="padding: .6rem;")
                                        van-checkbox(style="justify-content: center;" v-model="u.is_select")
                                    a-col(span="3" @click="on_select(u)")
                                        img.img(:src="u.avatar")
                                    a-col.lef(:span="on_edit?'14':'18'" @click="on_select(u)")
                                        div.n {{u.nickname}}
                                        div 姓名：{{u.name}}
                                        div 电话：{{u.phone}}
                                        div 区域：{{u.region_str}}
                                        div(v-if="u.region_info" @click="u.is_open_region = !u.is_open_region") 更多区域：+{{u.region_info}} 点击{{u.is_open_region?"收缩":"展开"}}
                                        div.info(v-if="u.is_open_region && u.region_detall.length >0")
                                            div(v-for="r in u.region_detall" :key="r.id") {{r.a1}} {{r.a2}} {{r.name}}

                                        div 开通时间：{{kxyk.utils.format(u.time,'yyyy-MM-dd')}}
                                    a-col.e(v-if="on_edit" span="4" @click="edit(u)")
                                        div 修改
                                a-row.row3(v-if="u.is_sub_role && u.sub_role && u.sub_role.length > 0")
                                    a-col(span="20" style="padding: 0.3rem;" @click="kxyk.toUrl('/sub_account/'+u.id)")
                                        div(v-for="sub in u.sub_role")
                                            div(v-if="sub.count > 0") 开通{{sub.name}}账号：{{sub.count}}个
                                    a-col.c4(span="4" @click="kxyk.toUrl('/sub_account/'+u.id)")
                                        i.fa.fa-chevron-right
                        div.nodata(v-else)
                            span 暂无数据

</template>

<script lang="ts">

export default { 
    name: "account",
};
</script>
<script setup lang="ts"> 

import { ref , reactive,useAttrs ,onMounted,watch} from "vue";
import Title from "@/views/com/Title.vue";
import RegisterInfo from "@/views/com/RegisterInfo.vue";
import {kxyk,Api,io} from "smkj";
import { useRouter,useRoute } from "vue-router";

const is_right = ref(false);//是否有权限
const activeKey:any = ref(0);//当前页面所选TAB
const roles:any = ref([]);//当前页面所有身份数据
const on_edit:any = ref(false);//是否开启编辑
const on_str = ref('管理');// 管理 or 取消
const areas:any = ref([]);//当前身份拥有的区域权限 用于修改用户资料时填充组件
const route = useRoute();
const has_role_info:any = reactive({mark:'',name:''});//当前页面role_info

//修改下级用户数据组件
const regInfo:any = reactive({
    role:'A1',//调用组件的身份
    sub_role:[],//该身份可开通的子身份
    type_id:0,//行业类型
    action:'edit',name:'',phone:"",avatar:'',nickname:'',card_id:'',region:[],id:0,
    cp_id:route.params.cpid,//公司ID
    root_role_id:0,//上级身份ID
    role_id:0,//当前身份ID
    open:false,//是否打开完善信息框
});

// 删除按钮
const onDel = ()=>
{
    let role:any = kxyk.utils.find(roles.value,{id:activeKey.value});
    if(role){
        let ids:any[] = [];
        role.users.forEach((u:any) => {
            if(u.is_select)
            {
                ids.push(u.id);
            }
        });
        if(ids.length <=0 )
        {
            return kxyk.msg.error('请选择要删除的用户！');
        }
        kxyk.sk.be(Api.shop.A1.DelAccount,{cpid:route.params.cpid,ids:ids},res=>{
            if(res.status)
            {
                kxyk.msg.success('删除成功。');
                init();
            }
        })
    }else{
        kxyk.msg.error('选择错误！');
    }

}
// 管理按钮动作
const onEdit = ()=>
{
    if(on_edit.value)
    {
        on_edit.value = false;
        on_str.value = '管理';
    }else{
        on_edit.value = true;
        on_str.value = '取消';

    }
}
// 全选按钮动作 
const allSelect = ()=>
{
    let role:any = kxyk.utils.find(roles.value,{id:activeKey.value});
    if(role){
        if(role.users.length >0){
            let status:any = null;
            role.users.forEach((u:any)=> {
                if(status === null){
                    if(u.is_select===false || undefined === u.is_select)
                    {
                        status = true;
                    }else{
                        status = false;
                    }
                }
                u.is_select = status;
            });
        }
    }
}
// 单选
const on_select = (u:any)=>
{
    u.is_select = !u.is_select;
}
// 编辑下级会员
const edit = (u:any)=>
{
    // console.log('编辑用户',u);
    
    let role:any = [];
    roles.value.forEach((ele:any) => {
        let n = {
            belonging:ele.belonging,
            id:ele.id,
            mark:ele.mark,
            name:ele.name,
            sort:ele.sort
        }
        role.push(n);
    });
    regInfo.sub_role = role;

    regInfo.name = u.name;
    regInfo.uid = u.uid;
    regInfo.phone = u.phone;
    regInfo.card_id = u.card_id;
    regInfo.nickname = u.nickname;
    regInfo.avatar = u.avatar;
    regInfo.cp_id = u. cp_id;
    regInfo.type_id = u.type_id;
    regInfo.role_id = u.role_id;
    regInfo.circle_name = u.circle_name;
    regInfo.id = u.id;
    if(areas.value.length>0) regInfo.area = areas.value;
    if(u.root_role_id) regInfo.root_role_id = u.root_role_id;
    if(u.region_detall && u.region_detall.length > 0)
    {
        regInfo.region = [];
        u.region_detall.forEach((element:any) => {
            regInfo.region.push(element.code);
        });
    }
    regInfo.open = true;
    // console.log('这里父组件改变',regInfo);
    

    
}
const submit = (d:boolean)=>
{
    if(d) init();
}
// 切换tabs
const onTabs=()=>
{
    on_edit.value = false;
    on_str.value = '管理';
}
// 初始化数据
const init = ()=>{
    kxyk.sk.be(Api.shop.A1.GetSubAccount,{role_info_id:route.params.role_info_id},res=>{
        // console.log('A1页面初始化',res);
        if(res.__error__) return kxyk.toUrl('/404');
        if(res.status){
            is_right.value = true;
            // 标题栏身份识别
            if(res.role_info){
                has_role_info.mark = res.role_info.mark;
                has_role_info.name = res.role_info.name;
            }
            // console.log(has_role_info);
            
            // 上级区域限制
            if(res.area){
                areas.value = res.area;
            }
            // 所有下级身份及下级成员
            roles.value = res.db;
            // 指定默认tab
            if(!activeKey.value && res.db.length>0) activeKey.value = res.db[0].id;
        }
    })
}

onMounted(()=>{
    init();
});



</script>


