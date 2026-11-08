
<style lang="stylus">
	@import "./LoginKxykWxapp.styl"
</style>

<template lang="pug">

div.login_kxyk(v-loading="page.is_loading" element-loading-text="请稍候...")
	//- div 
		div 测试div 
		div openid:{{openid}} type:{{type}} unionid:{{unionid}} url:{{url}}
		div 是否删除：{{ del_token }}
	//- 用于开发人员测试切换身份
	div.dev(v-if="page.is_dev && page.is_show")
		div(style="flex: 1;")
			el-select( v-model="page.select_x" class="m-2" placeholder="Select")
				el-option(:key="0" label="选择登录开发账号" :value="0")
				el-option( v-for="item in devList.list" :key="item.uid" :label="item.nickname" :value="item.uid")
				
		div(style="margin-left: 10px; flex: 1;") 
			el-button(type="primary" @click="login_select") 登录
	//- 登录框
	div.login_(v-if="page.is_show")
		div.title 登录开薪怡客
		div(style="text-align: center; padding-bottom: 10px;")
			a-radio-group(v-model:value="page.login_type" button-style="solid")
				a-radio-button(:value="1") 密码登录
				a-radio-button(:value="2") 验证码登录
				
		div.input(v-if="page.login_type === 2")
			div.mobile.bbot
				a-input-number(style="width: 100%" v-model:value="PageLoginKxyk.phone" :bordered="false" placeholder="请输入手机号" @change="check_login")
					template(#prefix)
						MobileOutlined.r10
			div.code.t10px.bbot
				a-row
					a-col(span="15")
						div
							a-input-number(style="width: 100%"  v-model:value="PageLoginKxyk.code" :bordered="false" @change="check_login" placeholder="请输入验证码")
								template(#prefix)
									SafetyCertificateOutlined.r10
					a-col(span="9")
						el-button(style="width: 100%;" round type="primary" plain :disabled="page.is_code" @click="get_code") 
							div(v-if="!page.is_code") 获取验证码
							van-count-down(v-else style="color:#90c7ff" :time="page.count_down" format="ss 秒" @finish="reset")
		div.input(v-if="page.login_type === 1")
			div.mobile.bbot
				a-input(style="width: 100%" v-model:value="PageLoginKxyk.phone" :bordered="false" placeholder="请输入账号" @change="check_login")
					template(#prefix)
						MobileOutlined.r10
			div.mobile.bbot(style="margin-top: 12px;")
				a-input(ref="input_pass" style="width: 100%"  v-model:value="PageLoginKxyk.code" :bordered="false" @change="check_login" placeholder="请输入密码")
					template(#prefix)
						SafetyCertificateOutlined.r10

		div(style="margin-top: 10px;padding: 0 10px;") 
			Madol(:open="page.open" :closable="false")
				template(#title)
					div 用户入住协议
				template(#footer)
					el-button(type="primary" style="width: 100%;" @click="page.is_open = true;page.open = false;") 登录即代表同意
				div(style="background: #fff;")
					Pact(:open="false")
			el-checkbox(v-model="page.is_open" label="开薪怡客用户入协议" size="large" @click.stop="page.open = true") 
		div.t10px(style="margin-top: 0;")
			el-button(type="primary" style="width: 100%;" size="large" round :disabled="page.is_login" @click="login_submit") 登录
		div.t10px(style="margin-top: 0;" v-if="kxyk.utils.sys.is_wxapp")
			el-button(type="" style="width: 100%;" size="large" round @click="kxyk.toUrl('/kxyk')") 返回首页

</template>

<script lang="ts">
// import {resArgs} from "smkj";
// console.log(resArgs);
import { coms } from 'smkj';

export default {
	name:'LoginKxykWxapp',
	components:{Madol:coms.Modal,Pact:coms.KxykPact}
}
</script>

<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted,nextTick} from "vue";
import { MobileOutlined,SafetyCertificateOutlined } from '@ant-design/icons-vue'; 
import { useRouter ,useRoute} from "vue-router";
// import { kxyk } from "@/libs/index";
import { Api , kxyk,cookie,regx} from "smkj";
const router = useRoute();
const routers = useRouter();

//是否开发环境
let {openid,url,type,unionid,no_,del_token,set_token,fill}:any = kxyk.R?.currentRoute.value?.query;//获取地址栏附加参数


/** 后期定义页面所需数据集 */
const page = reactive<sm.U.Page.LoginKxykWxapp>({
	/** 入住协议框是否显示 */
	open:false,
	/** 是否同意入住协议 */
	is_open:true,
	/** 登录方式  1=密码登录 2=手机号登录 */
	login_type:1,is_dev:import.meta.env.DEV,select_x:0,is_show:false,
	is_login:true,is_loading:false,is_code:false,count_down:60000,is_jump_wxapp:1

});

/** 小程序登录成功后携带no_参数 H5端接受后下次登录不在跳转小程序 */
if(no_){
	kxyk.user.is_login_wxapp = true;
	page.is_jump_wxapp = 0;
}


/** 收到删除token */
if(del_token){
	cookie.remove("token");
	kxyk.user.token = undefined;
	kxyk.user.is_login = false;

}
/** 小程序获取手机号登录回来设置H5token */
if(set_token){
	cookie.set("token",set_token);
	kxyk.user.token = set_token;
	page.is_jump_wxapp = 0;
}
const PageLoginKxyk =reactive({
	phone:'',code:'',openid:openid||0,type:type||0,unionid:unionid||''
})


/** fill是否自动填充登录账号 2025-09-02 */
if(fill && kxyk.user.phone){
	PageLoginKxyk.phone = kxyk.user.phone+'#';
}

const auto = router.params.auto;
console.log('进入页面',auto);

// 获取验证码
const get_code = ()=>{
	if(!kxyk.utils.regx.is_mobile(parseInt(PageLoginKxyk.phone))) return kxyk.msg.error('请输入合法手机号码！');
	page.is_code = true;
	kxyk.sk.be(Api.lan.get_verify,{phone:PageLoginKxyk.phone+''},(res:sm.resArgs)=>{
		if(res?.status)
		{
			kxyk.msg?.success('发送成功，验证码有效期5分钟。');
		}
	});
}
//倒计时结束
const reset = ()=>{
	page.is_code = false;
	page.count_down = 60000;
}
/** 检测是否可以登录 */
const check_login = ()=>
{
	if(PageLoginKxyk.code && PageLoginKxyk.phone)
	{
		page.is_login = false;
	}else{
		page.is_login = true;
	}
}
/** 登录按钮 */
const login_submit = ()=>
{
	if(page.login_type === 2){
		if(!kxyk.utils.regx.is_mobile(parseInt(PageLoginKxyk.phone))) return kxyk.msg.error('请输入合法手机号');
		if((PageLoginKxyk.code+'').length != 4) return kxyk.msg.error('验证码应为4位数字');
	}

	/** 已存在token里的UID 2025-08-21 */
	let ouid = 0;
	if(kxyk.user.uid) ouid = kxyk.user.uid;
	page.is_loading = true;
	kxyk.sk.be(Api.lan.login,Object.assign(PageLoginKxyk,{ouid:ouid,login_type:page.login_type}),(res:sm.resArgs)=>{
		page.is_loading = false;
		if(res.status){
			cookie.set('token',res.db,{expires:365});
			kxyk.user.token = res.db;
			// 这里控制是否反登陆
			// is_no.value = true;
			// console.log('点击里手动登录',kxyk.user);
			kxyk.user.is_login = false;
			auto_login();
		}
	});
}
let devList:any = reactive({list:[]});

/** 获取开发测试账号 */
const getDevList = ()=>
{
	if(page.is_dev){
		kxyk.sk.be(Api.lan.dev_list,{},res=>{
			if(res.status){
				devList.list = res.db;
			}
		})
	}

}

// 手动选择登录111
const login_select =()=>
{
	if(!page.select_x) kxyk.msg.error('请选择登录用户');
	kxyk.sk.be(Api.lan.test_on,{uid:page.select_x},res=>{
		if(res.status)
		{
			cookie.set('token',res.db,{expires:365});
			kxyk.user.token = res.db;
			kxyk.user.is_login = false;
			auto_login();
			// kxyk.R?.push('/admin')
		}
	});
}

// console.log('***********url',url);

/** 登录成功 */
const login_sesscuss = () =>
{
	// console.log('登录成功login_sesscuss');
	
	let back_rul = kxyk.state.get('back_url') || url;
	if(kxyk.utils.sys.is_wxapp && page.is_jump_wxapp)
	{
		return window.wx.miniProgram.navigateTo({url:`/pages/public/login/index?login_uid=${kxyk.user.uid}&back_url=${encodeURIComponent(back_rul)}`});
	}
	// console.log('back_rul',back_rul);
	
	if(back_rul){

		// kxyk.toUrl(back_rul);
		routers.replace(back_rul);
	}else{
		routers.replace('/');
		// kxyk.toUrl('/')
	}
	
}
/** 自动登录 */
const auto_login = async ()=>
{
	if(kxyk.user.is_login) return true;
	if(kxyk.user.token)
	{
		// console.log('有cookie token 使用token登录');
		/** token自动登录 */
		let res = await kxyk.tokenLogin(false)
		if(res)
		{
			if(typeof res === 'object' && res.over) 
			{
				// is_show.value = true;
				kxyk.msg.error('原账号已被封停!');
				return await kxyk.WxJsdk.BaseAuth();
			}
			return login_sesscuss();
		}
	}
	/** 尝试授权登录 */
	if(kxyk.utils.sys.is_wx)
	{
		if(kxyk.utils.sys.is_wxapp)
		{
			let state = kxyk.state.get("back_url");
			console.log('这里是即将发送给小程序的回调',state);
			
			return window.wx.miniProgram.navigateTo({url:"/pages/public/getphone/index?path="+encodeURIComponent(state)});
		}else{
			return await kxyk.WxJsdk.BaseAuth();
		}
	}
	if(kxyk.utils.sys.is_app)
	{
		// APP
		console.log('开始APP登录');
		try {
			if(await kxyk.WxJsdk.AppAuth())
			{
				if(await kxyk.tokenLogin())
				{
					return login_sesscuss();
				}
			}
		} catch (error) {
			console.log('app授权失败！',error);
		}
	}
	/**最后手动登录 */
	page.is_show = true;

}


const input_pass = ref();

onMounted(()=>{
	setTimeout(() => {
		input_pass.value?.focus()
	}, 100) // 给一个小的延迟
	// setTimeout(() => {
	// 	const inputElement = document.querySelector('input[placeholder="请输入密码"]')
	// 	inputElement?.focus()
	// }, 100)
	/** 是否需要自动登录 */
	if(auto === '1'){
		auto_login();
	}else{
		page.is_show = true;
		getDevList();
	}

	
});


</script>
