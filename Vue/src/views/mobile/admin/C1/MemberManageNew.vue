<style lang="stylus">
    @import "./MemberManageNew.styl"
</style>
<template lang="pug">
div.MemberManage
	div.addtype 

	div.title
		div(style="height: 2.6rem;")
			Title(ref="titlecom" :coms="{str:'会员分类'}")
				template(#right)
					div.cog(style="text-align: center;" @click="")
						i.fa.fa-plus
	div.list 
		a-row.r 
			a-col(span="5") 会员等级
			a-col(span="14") 会员权限
			a-col(span="5")
				span 操作
		div 
			div.concon
				div.novip(v-if="!dbs.list.length") 暂无设置会员
				div.vip_0(v-for="v in dbs.list")
					div.vip_
						div.name
							div.n 
								span  ({{ v.layer }})
								span {{ v.name }}
							div.p0
								span(v-if="v.c1 && v.c1.price")
									span.p 
										span.d ￥{{ v.price }}
										span.r ￥{{ v.c1.price }}
								span(v-else)
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
								span(v-if="v.c1 && v.c1.out_price !== undefined && v.c1.out_price !== null")
									span.jump4.d(v-if="v.out_price && v.out_price > 0") {{ v.out_price }}
									span.jump4.d(v-else) 不过期
									span.out_price(v-if="v.c1.out_price > 0") &lt; {{ v.c1.out_price }}
									span.jump5(v-else) 不过期
								span(v-else)
									span.out_price(v-if="v.out_price") &lt; {{ v.out_price }}
									span.jump2(v-else) 不过期
								span &nbsp;
								span(v-if="v.c1 && v.c1.tip_price !== undefined && v.c1.tip_price !== null")
									span.jump4.d(v-if="v.tip_price && v.tip_price > 0") {{ v.tip_price }}
									span.jump4.d(v-else) 不过期
									span.tip_price(v-if="v.c1.tip_price > 0") &lt; {{ v.c1.tip_price }}
									span.jump5(v-else) 不过期
								span(v-else)
									span.tip_price(v-if="v.tip_price") &lt; {{ v.tip_price }}
									span.jump2(v-else) 不提醒
							div.i {{ v.info }}
						div.edit 
							el-button(v-if="!v.is_open"  :icon="TurnOff"  @click="openConfig(v)") 
							el-button(v-else  :icon="Open"  @click="openConfig(v)") 
					div.open_(v-if="v.is_open")
						div.open_1 
							div.price 
								div.t 充值金额
								div.t1
									el-input(v-model="dbs.has_edit.price" placeholder="充值金额" @input="FormatString" size="small") 
							div.price 
								div.t 过期金额
								div.t1
									el-input(v-model="dbs.has_edit.out_price" placeholder="过期金额" @input="FormatString" size="small") 
							div.price 
								div.t 提醒金额
								div.t1
									el-input(v-model="dbs.has_edit.tip_price" placeholder="提醒金额" @input="FormatString"  size="small") 
							div.price 
								div.t 共享
								div.t1
									el-input(v-model="dbs.has_edit.share_identity" placeholder="提醒金额" @input="FormatString"  size="small") 
							div.price 
								div.t 操作
								div.t1.t2
									el-button(type="primary" :icon="Finished" size="small"  @click="SaveVipConfig(v)") 
									el-button(v-if="v.c1 && v.c1.id" type="danger" :icon="Delete" size="small"  @click="DelVipConfig(v)")

</template>

<script lang="ts">
import { coms } from "smkj";
export default {
	name: "MemberManage",
	components: {Title:coms.Title,Modal:coms.Modal,Alist:coms.RefreshList},
};
</script>


<script setup lang="ts">
import { ref, reactive, useAttrs, onMounted, watch, KeepAlive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Delete, Edit,TurnOff,Open,Finished } from '@element-plus/icons-vue' 
// import { kxyk,io} from "@/libs/smkj";
import { kxyk, Api, io, __ } from "smkj";

const route = useRoute();

// 读取会员列表参数

//页面数据对象
const dbs = reactive<sm.U.Page.C1Member>({
	list:[],cid:parseInt(route.params.cip.toString()),has_edit:{
		price:'',out_price:'',tip_price:'',vid:0,cid:0,share_identity:0
	}

})


/** 打开配置窗口 */
const openConfig = (v:sm.C1.GetC1TypeVips)=>
{
	if(undefined === v.is_open) v.is_open = false;
	v.is_open = !v.is_open;

	if(v.is_open){
		if(v.c1){
			if(v.c1.price === null){
				dbs.has_edit.price = ''
			}else{
				dbs.has_edit.price = v.c1.price;
			}
			if(v.c1.out_price === null){
				dbs.has_edit.out_price = ''
			}else{
				dbs.has_edit.out_price = v.c1.out_price;
			}
			if(v.c1.tip_price === null){
				dbs.has_edit.tip_price = ''
			}else{
				dbs.has_edit.tip_price = v.c1.tip_price;
			}
			dbs.has_edit.cid = v.c1.cid;
			dbs.has_edit.id = v.c1.id;
			dbs.has_edit.vid = v.c1.vid;
			dbs.has_edit.share_identity = v.c1.share_identity
		}else{
			dbs.has_edit.out_price = '';
			dbs.has_edit.price = '';
			dbs.has_edit.tip_price = '';
			dbs.has_edit.cid = dbs.cid;
			dbs.has_edit.vid = v.id ? v.id : 0;
			dbs.has_edit.id = 0
			dbs.has_edit.share_identity = 0
		}
	}

	
}
/** 保存覆盖配置 */
const SaveVipConfig = (v:sm.C1.GetC1TypeVips)=>
{
	if(dbs.has_edit.out_price === '' && dbs.has_edit.price === '' && dbs.has_edit.tip_price === '') return kxyk.msg.warn('充值金额、过期金额、提醒金额至少设置一项');
	if(dbs.has_edit.price === 0) return kxyk.msg.error('充值金额无法设置为0');
	kxyk.sk.be(Api.shop.C1.SaveC1VipConfig,{cvip:dbs.has_edit,cid:dbs.cid},res=>{
		if(res.status){
			init();
		}
	})
}

const FormatString = ()=>
{
	if(dbs.has_edit.price !== ''){
		let num = Number(dbs.has_edit.price);
		if(isNaN(num)){
			setTimeout(() => {
				dbs.has_edit.price = '';
			}, 200);
		}else{
			dbs.has_edit.price = num;
		}
	}
	if(dbs.has_edit.out_price !== ''){
		let num = Number(dbs.has_edit.out_price);
		if(isNaN(num)){
			setTimeout(() => {
				dbs.has_edit.out_price = '';
			}, 200);
		}else{
			dbs.has_edit.out_price = num;
		}
	}
	if(dbs.has_edit.tip_price !== ''){
		let num = Number(dbs.has_edit.tip_price);
		if(isNaN(num)){
			setTimeout(() => {
				dbs.has_edit.tip_price = '';
			}, 200);
		}else{
			dbs.has_edit.tip_price = num;
		}
	}
}

const DelVipConfig = (v:sm.C1.GetC1TypeVips)=>{
	if(v.c1 && v.c1.id){
		kxyk.sk.be(Api.shop.C1.DelC1VipsConfig,{id:v.c1.id,cid:dbs.cid},res=>{
			if(res.status) init();
		})
	}
	
}
const submit = ()=>
{

}

/** 初始化 读取当前商品所有门店列表 */
const init = ()=>{
	kxyk.sk.be(Api.shop.C1.GetC1TypeVips,{cid:dbs.cid},res=>{
		if(res.status && res.list){
			dbs.list = res.list;
		}
	})
}
onMounted(() => {
	init();
});


</script>


