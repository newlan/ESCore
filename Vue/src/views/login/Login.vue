
<style lang="scss">
.login{
	.x_protocol{font-size: 1.2rem;color: #000000;position: fixed; width: 86%; font-weight: bold; text-align: center;line-height: 2.5rem;padding-top: 1rem; background: #fff; border-radius: 0.5rem 0.5rem 0 0; }
	.x_login_wrapper { display: flex; align-items: center; justify-content: center; height: 100%; font-size: 0.35rem; }
	.x_login_block { position: relative; width: 86%; height: 82%; background-color: #fff; border-radius: 0.5rem; overflow: auto; color: #333333; padding-bottom: 1.8rem; }
	.whole { height: 34vh; width: 100%; background-repeat: no-repeat; background-size: 100% 100%; }
	.imglogo { width: 40%;margin: .7rem 0 0 5.24rem; }
	.mobile { margin-top: 2rem; border-bottom: 1px solid #ececec;; width: 84%; margin-left: 8%; }
	.mobile-icon { margin-left: -.1rem; font-size: 1.46rem; color: rgb(156, 186, 233); font-weight: 600; }
	.all-icon{ width:1.7rem; margin-top: -.07rem; }
	.content {padding-bottom: 1rem; width: 90%; float: left; margin-left: 5%; background: white; margin-top: -1.5rem; border-radius: .4rem; z-index: 5; box-shadow: rgb(156, 186, 233) .05rem 0px .4rem .05rem }
	.verification { margin-top: .6rem; border-bottom: 1px solid #ececec;; width: 84%; margin-left: 8%;}
	.verification-icon { margin-left: -.1rem; font-size: .56rem; color: rgb(156, 186, 233); font-weight: 600; }
	.verification-btn { width: 5.6rem; height: 1.72rem; float: right; margin-right: -.3rem; margin-top: -.23rem; }
	.verification-size { font-family: iekie-cuheiti; font-weight: 900; letter-spacing: -0.03rem; color: #ffffff; }
	.login_but { width: 84%; background-color: #2979fb; box-shadow: 0rem 0 0.3rem 0.155555rem rgb(110 160 246 / 75%); margin: 1rem 0 0 0rem; }
	.x_login_protocol{ padding: 0.3rem 0.9rem 0px 0px; color: #0099ff; display: flex; justify-content: flex-end; align-items: center; }
	.x_login_protocol1{ background: #0099ff; border-radius: 50%; font-size: 0.25rem; width: 1rem; height: 1rem; display: flex; align-items: center; justify-content: center; color: #fff; margin-left:0.1rem; }
	.xy{
		.t0{font-size: .8rem;}
		.t1{font-size: 1rem; font-weight: bold; margin: 0.5rem 0;}
		.t2{font-size: .9rem;margin: 0.5rem 0;}
		.b1{position: fixed; bottom: 7%; width: 86%; display: flex; justify-content: center; background: white; border-radius: 0.5rem; padding-bottom: 0.5rem;}
		.b2{height: 2.5rem; width: 11rem; border-radius: 0.5rem; background-color: #0099ff; display: flex; align-items: center; font-size: 1rem; color: #ffffff; margin-top: 0.6rem; justify-content: center;}
	}
}
.dev{position: absolute;align-items: center;background: #f7f7f7; bottom: -1px; padding: 5px; text-align: center; right: 0; left: 0; color: #f00;display: flex; border: 1px solid #f1f1f1; font-size: 12px;

}
</style>
<template lang="pug">

div.login
	//- 用于开发人员测试切换身份
	div.dev(v-if="is_dev")
		div
			el-select( v-model="select_x" class="m-2" placeholder="Select")
				el-option(:key="0" label="选择登录开发账号" :value="0")
				el-option( v-for="item in devList.list" :key="item.uid" :label="item.nickname" :value="item.uid")
				
		div(style="margin-left: 10px;") 
			el-button(type="primary" @click="login_select") 登录
	div.whole
		div(class="content")
			//-  手机号 验证码 登陆 自动注册
			van-cell-group(:border="false")
				van-field.mobile(v-model="loginForm.phone" clearable type="tel" placeholder="请输入手机号")
					template(#left-icon)
						div(class="all-icon")
							i.fa.fa-tablet.mobile-icon.fa-fw
				van-field.mobile.verification(v-model="loginForm.code" clearable placeholder="请输入验证码")
					template(#left-icon)
						div.all-icon
							i.fa.fa-shield.mobile-icon.fa-fw
					template(#button)
						van-button(round type="primary" size="mini" class="verification-btn" v-show="loginForm.show_code_but" @click="send_code()")
							<span class="verification-size">发送验证码01</span>
						van-button(round size="mini" class="verification-btn" style="background-color: rgb(170,170,170); border: 1px solid rgb(170,170,170); " v-if="!loginForm.show_code_but")
							van-count-down(style="color:#fff" :time="count_down" format="ss 秒" @finish="reset")
				van-button(round type="primary" class="login_but" @click="login") 登录
				div(class="x_login_protocol" style="padding:0.3rem 0.9rem 0 0;text-align: right;color:#0099ff;font-size: .8rem;margin-top: 0.2rem;")
					div(style="display:flex;align-items: center;" @click="protocolshow=true")
						<span>合作协议</span><span class="x_login_protocol1">?</span>
	//- 登录协议
	van-overlay(:show="protocolshow" :lock-scroll="false")
		div.x_login_wrapper.xy
			div.x_login_block
				div.x_protocol
					span 合作协议
		
				div.b1
					div.b2(@click="protocolshow = false") 登录即代表同意

</template>

<script lang="ts">
// import {resArgs} from "smkj";
// console.log(resArgs);

export default {name:'Login'}
</script>

<script setup lang="ts">
import { ref , reactive,useAttrs ,onMounted} from "vue";
// import { kxyk } from "@/libs/index";
import { Api , kxyk,cookie} from "smkj";

const loginForm = reactive({phone:'',code:'',show_code_but:true});
const protocolshow:any = ref(false);
const count_down:any = ref(60000);

//是否开发环境
const is_dev = import.meta.env.DEV;
const select_x = ref(0);
let devList:any = reactive({list:[]});
if(is_dev)
{
	kxyk.sk.be(Api.lan.dev_list,{},res=>{
		if(res.status){
			devList.list = res.db;
		}
	})
}


// 手动选择登录
const login_select =()=>
{
	if(!select_x.value) kxyk.msg.error('请选择登录用户');
	kxyk.sk.be(Api.lan.test_on,{uid:select_x.value},res=>{
		if(res.status)
		{
			cookie.set('token',res.db,{expires:365});
			kxyk.user.token = res.db;
			kxyk.R?.push('/admin')
		}
	});
}
const login = ()=>
{
	if(!kxyk.utils.regx.is_mobile(parseInt(loginForm.phone))) return kxyk.msg.error('请输入合法手机号码！');
	if(!loginForm.code) return kxyk.msg.error('验证码不能为空！');
	kxyk.sk.be(Api.lan.login,loginForm,(res:sm.resArgs)=>{
		if(res.status){
			cookie.set('token',res.db,{expires:365});
			kxyk.user.token = res.db;
			let url = kxyk.state.get('back_url');
			if(url)
			{
				kxyk.R?.push(url);
			}else{
				kxyk.R?.push('/');
			}
		}
	});
}

// 获取验证码
const send_code = ()=>{
	if(!kxyk.utils.regx.is_mobile(parseInt(loginForm.phone))) return kxyk.msg.error('请输入合法手机号码！');
	loginForm.show_code_but = false;
	kxyk.sk.be(Api.lan.get_verify,loginForm,(res:sm.resArgs)=>{
		if(res?.status)
		{
			kxyk.msg?.success('发送成功，验证码有效期5分钟。');
		}
	});
}

//倒计时结束
const reset = ()=>{
	loginForm.show_code_but = true;
	count_down.value = 60000;
}
//vue mounted
onMounted(()=>{
	// let {code, state}:any = kxyk.R?.currentRoute.value?.query;
	// kxyk.autoLoginKxyk({code, state});
	
});


</script>


