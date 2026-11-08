<style lang="stylus">

.abababc_
    max-width: 95%; overflow-x: auto; margin: auto !important; left: 0 !important; right: 0 !important;
    .el-cascader-menu
        min-width: 130px; max-width: 133px; 
</style>
<style scoped lang="stylus">
.RegisterInfo
    color:red; text-align: left
    .wxpip 
        :deep(.ant-popover-placement-bottom, .ant-popover-placement-bottomLeft, .ant-popover-placement-bottomRight)
            max-width:350px; 
        .wxrow 
            justify-content: center; align-items: center; margin-bottom: .5rem; padding: .5rem; background: #fdfdfd; border-radius: .5rem;
            .r 
                text-align: end;
            .c 
                color: #858585;
    :deep(.full-modal-a1) 
        .ant-modal 
            max-width: 100%; top: 0; padding-bottom: 0; margin: 0;
        .ant-modal-content 
            display: flex; flex-direction: column; height: calc(100vh);
        
        .ant-modal-body 
            flex: 1
        .b1:before
            margin-right: 0.5rem; border-left: 3px solid; content: ' '; border-radius: 3px; border-color: #68e
        .ant-modal-body
            padding: 0;
        .ant-modal-footer
            background: white;
        .from
            text-align: center;background: white;
            .a1 
                background: #FAFBFC; padding: 1.2rem .5rem .7rem 0.5rem;
            .a2 
                padding: .8rem 1.2rem;
                .el-select
                    width :100% 
                .el-cascader
                    width:100%;
            .img1
                width: 4.5rem; border-radius: 50%
            .b2 
                font-size: 1.15rem;margin-top: 0.3rem; 
            .el-input__inner
                border-left-width: 0px; border-radius: 0px; border-right-width: 0px; border-top-width: 0px; 
</style>
<template lang="pug">
div.RegisterInfo(ref="modal1")
    a-modal.n1(v-model:visible="coms.open" width="100%" wrap-class-name="full-modal-a1" :getContainer="()=>modal1" :closable="false" okText="保存") 
        template(#title)
            span.b1 完善信息
        template(#footer)
            a-row(style="text-align: center;" :gutter="10")
                a-col(span="12")
                    a-button(@click="coms.open = false" block) 取消
                a-col(span="12")
                    a-button(type="primary" :disabled="save" @click="OnSubmit" block) 保存
        a-spin(:spinning="submit_loading" tip="保存中...")
            div.from 
                div.a1 
                    img.img1(:src="formState.avatar")
                    div.b2 {{formState.nickname}}
                    div(v-if="formState.action === 'edit'") 
                        a-popover(v-model:visible="switch_wx" trigger="click" placement="bottom" :autoAdjustOverflow="false" :getPopupContainer="()=>wxpip" color="#ff7875")
                            template(#title)
                                div(style="padding: .5rem;")
                                    el-input(v-model="select_wx_nickname" placeholder="请输入手机号或者微信昵" @input="select_wx")
                            template(#content)
                                div(v-if="select_wx_list.length > 0")
                                    a-row.wxrow(:gutter="5" v-for="wx in select_wx_list")
                                        a-col(span="3")
                                            img(style="width: 100%;border-radius: 50%;" :src="wx.avatar")
                                        a-col(span="14")
                                            div.elesis() {{wx.nickname}}
                                            div.elesis.c {{wx.phone?wx.phone:'暂无手机号码'}}
                                        a-col.r(span="6")
                                            a-button(@click="set_wx(wx)") 选择
                                div(v-else style="text-align: center;color: #e1e1e1;")
                                    span 暂无搜索结果
                            a-button(size="small" danger) 换绑微信
                div.a2 
                    //- div {{ get_mark }}
                    el-form(label-position="left" label-width="50px" :model="formState" style="max-width: 100%")
                        el-form-item(label="身份")
                            el-radio-group(v-model="formState.role_id" @change="is_submit")
                                el-radio-button(v-for="(role) in coms.sub_role" :label="role.id") {{role.name}}
                        el-form-item(v-if="is_c5" label="商圈")
                            el-input(v-model="formState.circle_name" placeholder="请输入商圈名称"  @blur="is_submit")
                        el-form-item(label="区域" v-if="get_mark === 'C2' || get_mark === 'B1' || get_mark === 'B5' || get_mark === 'B3' || get_mark === 'B4'")
                            el-cascader(placeholder="请选择区域" v-model="formState.region" @change="is_submit" :options="options" :props="{multiple: true,emitPath:false}" clearable collapse-tags popper-class="abababc_")
                        
                        el-form-item(label="姓名")
                            el-input(v-model="formState.name" placeholder="请输入姓名" @blur="is_submit")
                        el-form-item(label="手机")
                            el-input(v-model="formState.phone" placeholder="请输入11位中国大陆区域手机号码"  @blur="is_submit")
                        el-form-item(label="证件")
                            el-input(v-model="formState.card_id" placeholder="请输入21位中国大陆区域身份证号码"  @blur="is_submit")
    div.wxpip(ref="wxpip")
</template>

<script lang="ts">
export default { 
    name: "RegisterInfo",
    components:{},
};
</script>

<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch, KeepAlive,computed} from "vue";
import area from "./area";
import {kxyk,Api,io} from "smkj";


const emit = defineEmits(['submit']);
// 提交数据
const OnSubmit=() => 
{
    // console.log('即将提交数据',formState);
    
    submit_loading.value = true;
    save.value = true;
    kxyk.sk.be(Api.shop.A1.SaveRoleInfo,{info:formState},res=>{
        submit_loading.value = false;
        save.value = false;
        if(res.__error__)
        {
            return false;
        }
        if(res.status){
            kxyk.msg.success(formState.action == 'add'?'账号开通成功。':'账号修改成功。');
            props.coms.open = false;
            emit('submit',true);
        }
    });
    
};

// 获得当前选择的下级身份
const get_mark = computed(()=>{
    let role:any = kxyk.utils.find(props.coms.sub_role,{id:formState.role_id});
    if(role){
        return role.mark;
    }
    return false;
})
// 检测提交按钮是否可用
const is_submit = ()=>
{
    if(formState.role_id){
        let role:any = kxyk.utils.find(props.coms.sub_role,{id:formState.role_id});
        if(role){
            if(role.mark === 'C1')
            {
                is_c5.value = true;
            }else{
                is_c5.value = false;
            }
        }else{
            is_c5.value = false;
        }
    }else{
        is_c5.value =false;
    }
    if(formState.name && formState.phone && formState.card_id && formState.role_id && (!is_c5.value || (is_c5.value && formState.circle_name)))
    {
        save.value = false;
    }else{
        save.value = true;
    }

}

// 递交数组
let formState:any = reactive({
    name:'',region:[],type_id:0,cp_id:0,uid:0, phone:'', card_id:'', role_id:0,root_role_id:0,avatar:'',nickname:'',id:0,circle_name:'',
});

// ref模态框指定挂载层
let modal1 = ref(null);
// 搜索区域loading
const loading = ref(false);
// 保存按钮状态
const save = ref(true);
// 递交状态
const submit_loading = ref(false);
const is_c5 = ref(false);
const switch_wx = ref(false);//换绑微信窗口状态
const select_wx_nickname = ref('');//微信昵称搜索
const wxpip = ref(null);//微信昵称搜索
interface wxList{ nickname:string; avatar:string; uid:number; phone:number;}
const select_wx = ()=>
{
    kxyk.sk.be(Api.shop.Base.SelectWxNickname,{n:select_wx_nickname.value},res=>{
        if(res.db.length>0)
        {
            select_wx_list.value = res.db;
        }
    })
}
const set_wx = (u:wxList)=>
{
    formState.uid = u.uid;
    formState.nickname = u.nickname;
    formState.phone = u.phone;
    formState.avatar = u.avatar;
    switch_wx.value = false;
    is_submit();
}
const select_wx_list = ref<wxList[]>([]);//返回搜索列表
interface ListItem { value: string; label: string; }
const options = ref<ListItem[]>(area)
interface Props {
    coms?:any
}

// 接受参数
const props = withDefaults(defineProps<Props>(), {
    coms:{
        role:'A1', name:'',phone:"",avatar:'',nickname:'',card_id:'',cp_id:0,
        sub_role:[],
        role_id:0,
        action:'add',
        open:false,
    }
})

watch(()=>props.coms,
val=>{
    if(val.area)
    {
        options.value = JSON.parse(JSON.stringify(val.area));
        val.area = null;
    }
    formState = val;
    is_submit();

},{deep:true,immediate:true})
onMounted(()=>{
});


</script>


