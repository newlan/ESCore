<script lang="ts">
export default { name: "index"};
</script>
<style scoped>

</style>


<template lang="pug">
div(style="width: 100%;")
	div miss...


</template>

<script setup="props,context" lang="ts">
import { defineComponent, ref,getCurrentInstance} from "vue";
import  gsap  from "gsap";
import * as THREE from "three";
import {kxyk,io,Api} from 'smkj'
defineProps({
	msg: String,
});

const count = ref(0);
const play = () => {
	gsap.to("#logo", { duration: 0.5, x: 100 });
};

const toWxJssdk1 = async()=>
{
	//API内是异步方法
	let d =	{
		desc: 'scanQRCode desc',
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		success: function(res:any) {
			console.log(res,'这里是回调');
		},
		error: function(res:any){
			if(res.errMsg.indexOf('function_not_exist') > 0){
				alert('版本过低请升级')
			}
		}
	}
	kxyk.WxJsdk.API('scanQRCode',d);
}
const toWxJssdk = async()=>
{
	//API内是异步方法
	let data ={
		title: '分享标题main', // 分享标题
		desc: '分享描述信息main', // 分享描述
		link: 'http://m.sam322.com/main', // 分享链接，该链接域名必须与当前企业的可信域名一致
		imgUrl: 'http://m1.sam322.com/imgs/t.png', // 分享图标
		// type: '', // 分享类型,music、video或link，不填默认为link
		// dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			console.log('用户分享了');
			
			// 用户确认分享后执行的回调函数
		},
		cancel: function () {
			console.log('用户取消了');
			
			// 用户取消分享后执行的回调函数
		}
	}
	kxyk.WxJsdk.API(['onMenuShareAppMessage','onMenuShareTimeline'],data);
}


const getUser = ()=>{
	console.log(kxyk.user);
	kxyk.sk.be(Api.lan.test_on,{kk:1},res=>{
		console.log(res);
		
	})
}

// kxyk.sk.be(io.skEvent.be,{a:0,b:0},res=>{
// 	console.log(res.status);
// });
// console.log(import.meta.env.VITE_APP_TITLE);
// console.log(import.meta.env);
</script>
