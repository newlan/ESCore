<style lang="stylus">
    @import "./SearchUser.styl"
</style>
<template lang="pug">
div.SearchUser(v-if="coms.open" v-loading="is_get_backstage_user")
    a-drawer(placement="top" height="49%" :headerStyle="{padding:'5px 10px'}" :bodyStyle="{padding: '6px'}" :closable="false" :visible="RegUser.open" @close="RegUser.open = false" )
        template(#title)
            div.title(style="font-size: 13px; color: #a1a1a1; text-align: center;") 注册会员
        div
            a-form(ref="formRef" :model="RegUser.user" :rules="rules")
                //- 头像
                div
                    div(:style="{boxShadow:RegUser.user.avatar ? '0 0 2px #909090' : '0 0 4px #ff0000'}" style="width: 90px; height: 90px; margin: 9px auto; border-radius: 9px; overflow: hidden; padding: 5px;")
                        UploadImg(v-model:url="RegUser.user.avatar")
                div
                    a-form-item(style="margin-bottom: 6px;" :labelCol="{span:0}" :wrapperCol="{span:24}" has-feedback label="" name="nickname")
                        a-input( addon-before="用户昵称" v-model:value="RegUser.user.nickname" autocomplete="off")
                div
                    a-form-item(style="margin-bottom: 6px;" :labelCol="{span:0}" :wrapperCol="{span:24}" has-feedback label="" name="phone")
                        a-input( addon-before="手机号码" v-model:value="RegUser.user.phone" autocomplete="off")
                div
                    div.input_row___
                        div.l___
                            span 选择性别
                        div
                            el-radio-group(v-model="RegUser.user.sex" @change="check_submit")
                                el-radio-button(:label="1") 男
                                el-radio-button(:label="2") 女
                div
                    a-form-item(style="margin-bottom: 6px;" :labelCol="{span:0}" :wrapperCol="{span:24}" has-feedback label="" name="nickname")
                        a-input( addon-before="登录密码" v-model:value="RegUser.user.pwd" autocomplete="off")
                div
                    a-form-item(style="margin-bottom: 6px;" :labelCol="{span:0}" :wrapperCol="{span:24}" has-feedback label="")
                        a-input( addon-before="银行卡号" placeholder="银行卡号或者银行卡尾号" v-model:value="RegUser.user.bank_number" autocomplete="off")
                a-row.nono_____(:gutter="5" v-for="(car,index) in RegUser.user.car" :key="index")
                    a-col(:span="20")
                        CarKeyboard(v-model:number="car.number" :show="car.is_show" @cancel="car.is_show = false" @end="KeyboardEnd(car)")
                        el-input(v-model="car.number" readonly @click="car.is_show = true;")
                            template(#prepend)
                                span 车牌号{{index+1}}
                            template(#append)
                                a-select(v-model:value="car.type")
                                    a-select-option(:value="0") 选车型
                                    a-select-option(v-for="(type,index1) in RegUser.carType" :key="type.id" :value="type.id") {{type.name}}

                    a-col(:span="4")
                        //- a-button(v-if="index === 0" type="primary" @click="check_car()" block) +
                        // @ts-ignore
                        a-button(v-if="index === 0" type="primary" @click="add_car_number(RegUser.user.car)" block) +
                        a-button(v-else type="primary" @click="sub_car_number(RegUser.user.car,car)" block) -
        template(#footer)
            a-row(:gutter="10")
                a-col(span="12")
                    a-button(block @click="RegUser.open =false") 取消
                a-col(span="12")
                    a-button(type="primary" block @click="check_submit") 保存
    div.search
        el-input(ref="inputRef" v-model="SearchKey" size ="large" type="tel" clearable placeholder="输入手机号或车牌号或用户昵称模糊搜索" @input="SearchUserFn" :prefix-icon="Search" )
    div.DBlist(:style="{overflow: 'auto'}" v-loading="is_search")
        div.noList(v-if="DBList.length < 1") 
            div(v-if="!SearchKey") 暂无用户数据
            div(v-else) 
                div
                    a-button(size="large" block type="primary" @click="openRegUser") 注册{{ SearchKey }}手机号码
        div.mp(v-else v-for="user in DBList")

            a-row.row 
                a-col.avatar(:xs="5" :sm="5" :md="3")
                    div.vip(v-if="user.vip && user.vip_name") {{ user.vip_name }}
                    div.av 
                        img.img(:src="user.avatar ? user.avatar : 'https://smkjm.sam322.com/img/avatar.png'")
                a-col.sp15(:xs="14" :sm="14" :md="18")
                    div.t0 {{user.nickname ? user.nickname : '暂无名称'}}
                    div.t1 
                        a-row(style="overflow-x: auto;white-space:nowrap;flex-wrap: nowrap;" :gutter="5" v-if="user.car_number.length>0 && user.car_number[0].number")
                            a-col(:span="coms.type === 3 ? 12 : 9" v-for="(car,index) in user.car_number" :key="index")
                                div.p1 
                                    div.p2
                                        span {{car.number.slice(0,2)}}·{{car.number.slice(2)}}
                        a-row(v-else) 
                            a-col.p1(:span="9")
                                div.p2 暂无车牌
                    a-row.t2 
                        a-col(:span="12") {{user.phone ? user.phone : '暂无号码'}} 
                        a-col(:span="12") ￥{{user.money}}
                //- D1端调用
                a-col.sp34(v-if="coms.type === 0" :xs="5" :sm="5" :md="3")
                    div.bots
                        div.bot(style="border-bottom: 2px solid white;" @click="ValetOrder(user)")
                            i.fa.fa-plus
                        div.bot(@click="ManageUsers(user)")
                            i.fa.fa-address-book-o
                //- E1端调用
                a-col.e1but(v-if="coms.type === 1" :span="24")
                    div.give1(@click="emits('give_user',user)") 发放余额
                    //- div.give2(@click="kxyk.msg.info('暂时无法使用')") 发放余额
                    div.give1(@click="emits('give_user_coupon',user)") 发放卡券
                    div.give1(@click="emits('give_user_vip',user)") 发放VIP
                a-col(:span="24" v-if="coms.type === 2")
                    a-row(:gutter="5" style="padding: 10px;")
                        a-col(span="8")
                            a-button(@click="emits('give_tuangou',user)" block) 发放活动
                        a-col(span="8")
                            a-button(@click="" disabled block) 发放卡券
                        a-col(span="8")
                            a-button(@click="" disabled block) 发放余额
                a-col.addPd(:xs="5" :sm="5" :md="3" v-if="coms.type === 3")
                    div.bot(@click="addPd(user)")
                        i.fa.fa-plus.fa-2x

    div.but 
        a-row
            a-col(span=24 style="padding-right: 5px;")
                el-button.w100(size="large" @click="coms.open = false") 取消

</template>

<script lang="ts">
import Modal from "@/views/com/Modal.vue";
import UploadImg from "@/views/com/UploadImg.vue";
import CarKey from "@/views/com/store/CarKeyboard.vue";
import type { Rule } from 'ant-design-vue/es/form';
export default { 
    name: "SearchUser",components:{Modal:Modal,UploadImg:UploadImg,CarKeyboard:CarKey}
};
</script>


<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,watch,nextTick,defineEmits,inject} from "vue";
import { Calendar, Search } from '@element-plus/icons-vue'
import { useRouter,useRoute } from "vue-router";
// import { kxyk,io} from "@/libs/smkj";
import {kxyk,Api,io,__} from "smkj";
import _ from "lodash";
window.parseInt
const route = useRoute();
// 接受参数
interface Props {
    coms:sm.SearchUser
}
const props = defineProps<Props>();
if(undefined === props.coms.ref) props.coms.ref = false;
/** 定义区 */
const emits = defineEmits(['give_user',"give_user_coupon","give_tuangou","add_pd","give_user_vip"]);
const SearchKey = ref('');//搜索关键词
const is_search = ref(false);//是否正在搜索
const is_get_backstage_user = ref(false);//是否正在请求后台用户数据
/** 数据列表高度 */
const divHeight = ref(200);
/** 结果列表 */
const DBList = ref<{nickname:string,avatar:string,uid:number,vip?:number,vip_name?:string,money:number,car_number:{number:string}[],phone:number}[]>([]);
type sUser = { uid:number,nickname:string,avatar:string }
interface car{id:number|string,number:string,type:number,name:string,is_show:boolean}
let VcarNumber = async (_rule: Rule, value: car[]) => {
    // console.log(value);
    if(value.length>0)
    {
        try {
            value.forEach(el => {
                if(el.number === '')
                {
                    throw '请输入车牌号';
                }
                if(el.number.length != 7)
                {
                    throw '车牌格式错误';
                }
                if(el.type === 0){
                    throw '请选择车型';
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
        return Promise.resolve();
    }
};
const rules: Record<string, Rule[]> = {
    car: [{ required: true, validator: VcarNumber, trigger: 'change' }],
};
/** 注册相关 */
const RegUser = reactive<{
    /** 是否显示注册窗口 */
    open:boolean,
    /** 是否可以递交 */
    is_submit:boolean,
    /** 车型列表 */
    carType:sm.CarType[],
    /** 注册字段 */
    user:{
        /** 头像 */
        avatar:string,
        /** 用户昵称 */
        nickname:string,
        /** 手机号码 */
        phone:string,
        /** 性别 */
        sex:number,
        /** 登录密码 */
        pwd:string,
        /** 银行卡后四位 */
        bank_number:string,
        /** 车牌列表 */
        car:sm.UserCarMember[],
    }
}>({
    open:false,
    is_submit:true,
    carType:[],
    user:{
        avatar:'',
        nickname:"",phone:"",sex:1,pwd:"111111",bank_number:'',
        car:[{number:'辽H',type:0,id:0,name:'',is_show:false}],
    }
})
const GetStore:any = inject("GetD1");
const openRegUser = ()=>{
    RegUser.user.phone = SearchKey.value;
    RegUser.open = true;
    let d1 = GetStore();
    RegUser.carType = d1.CarType; 
}

const addPd=(u:any)=>{
    emits("add_pd",u);
}

const KeyboardEnd=(car:any)=>
{
    car.is_show = false;
}
const sub_car_number=(car:car[],n:car)=>
{
    _.remove(car,(x:car)=>{
        return x.id == n.id;
    });
}
const add_car_number = (car:car[])=>
{
    car.push({id:kxyk.utils.getUUID(8),name:'',type:0,number:'',is_show:false});
}
const check_submit = ()=>{
    console.log('com',props.coms);
    
    RegUser.is_submit = true;
    if(!RegUser.user.avatar) return kxyk.msg.error('请上传头像');
    if(!RegUser.user.nickname) return kxyk.msg.error('请填写用户昵称');
    if(!RegUser.user.phone){
        return kxyk.msg.error('请填写手机号码');  
    }else{
        if(RegUser.user.phone.length !== 11){
            return kxyk.msg.error('请输入正确手机格式');
        }
    }
    if(RegUser.user.car.length > 0){
        try {
            if(props.coms.type === 2){

            }else{
                RegUser.user.car.forEach(e=>{
                    if(!e.number || e.number.length < 7){
                        throw '请输入正确车牌号码！';
                    }
                    if(!e.type) throw '请选择车型！';
                    
                })
            }

        } catch (error) {
            let msg = '';
            if(typeof error === "string"){
                msg = error;
            }
            return kxyk.msg.error(msg);
        }

    }else{
        return kxyk.msg.error('请输入车牌号码');
    }
    kxyk.sk.be(Api.shop.D1.D1RegUser,{user:RegUser.user},res=>{
        if(res.status){
            RegUser.user.nickname = '';
            RegUser.user.avatar = '';
            RegUser.user.phone = '';
            RegUser.user.pwd = '111111';
            RegUser.user.bank_number = '';
            RegUser.user.car = [{number:'辽H',type:0,id:0,name:'',is_show:false}];
            RegUser.user.sex = 1;
            RegUser.open = false;
            SearchUserFn();
        }  
    })
}

const ManageUsers = (user:sUser)=>
{

}
const ValetOrder = (user:sUser)=>
{
    
}
let temp:false | Date = false;
const SearchUserFn = ()=>
{
    if(SearchKey.value === ''){
        DBList.value = [];
        return false;
    }
    if(is_search.value) return false;
    is_search.value = true;
    kxyk.sk.be(Api.shop.D1.SearchUser,{key:SearchKey.value,cid:props.coms.cid},res=>{
        is_search.value = false;
        if(res.status){
            if(SearchKey.value){
                DBList.value = res.list as any;
            }
        }
    })

}
const inputRef:any = ref(null)
watch(
    ()=>props.coms.open,
    (a,b)=>{
        setTimeout(() => {
            divHeight.value = kxyk.utils.DOM.get_surplus_higth(['search','but']);
        }, 200);
    }
)

watch(
    ()=>props.coms.ref,
    (a,b)=>{
        SearchUserFn();
    }
)
onMounted(()=>{
    // console.log(GetStore());
        nextTick(()=>{
            inputRef.value?.focus()
        })
    
});


</script>


