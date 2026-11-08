<style lang="stylus">
    @import "./MemberManage.styl"
</style>
<template lang="pug">
div.MemberManage
	div.addtype 
		Modal(:open="page.add_type")
			template(#title)
				div 添加会员分类 
			template(#footer)
				a-row 
					a-col(span="12")
						a-button(style="width: 100%;" @click="page.add_type = false") 取消
					a-col(span="12")
						a-button(type="primary" style="width: 100%;" :disabled="page.save" @click="submit") + 确定
			div 
				el-form(label-position="left" :model="page.form" style="max-width: 100%;padding: 15px;" )
					el-form-item(label="指定门店")
						el-select( v-model="page.form.sid" collapse-tags placeholder="选择门店" @change="isSaveAnnual")
							el-option(label="默认商圈" :value="0") 
							el-option(v-for="item in page.store_list" :key="item.id" :label="item.name" :value="item.id") 
					el-form-item(label="会员名称")
						el-input(v-model="page.form.name" placeholder="请输入会员名称"  @input="isSaveAnnual")
					el-form-item(label="充值金额")
						el-input(v-model="page.form.price" placeholder="请输入会员价格" @input="isSaveAnnual")
					el-form-item(label="会员权重")
						el-input-number(v-model="page.form.r" placeholder="权重越高插队权限越高" @input="isSaveAnnual")
					el-form-item(label="是否插队")
						el-switch( v-model="page.form.is_jump" :active-value="1" :inactive-value="0")
					el-form-item(label="会员权限")
						el-input(v-model="page.form.info" placeholder="请输入会员价格"  type="textarea" :rows="2" @input="isSaveAnnual")
							//- template(#prepend) 等级权限

							

	div.title
		div(style="height: 2.6rem;")
			Title(ref="titlecom" :coms="{str:'会员分类'}")
				template(#right)
					div.cog(style="text-align: center;" @click="addType")
						i.fa.fa-plus
	div.list 
		a-row.r 
			a-col(span="5") 会员等级
			a-col(span="14") 会员权限
			a-col(span="5")
				span 操作

		Alist(:coms="packList" @error="error1")
			template(#default="{item,index}")
				a-row.r
					a-col(span="5") 
						div.r1 {{ item.name }}
						div.r2 
							span.r21 ￥{{ item.price }}
					a-col(span="14" style="text-align: left; padding: 0 10px;") 
						div(v-if="item.is_jump")
							span.r3 插队({{ item.r }})
							span.r3(v-if="item.sid") {{ item.sname }}
						div(v-else) 
							span.r4 无插队
							span.r3(v-if="item.sid") {{ item.sname }}
						div.r5 {{ item.info }}
					a-col(span="5")
						el-button(type="primary" :icon="Edit" circle @click="onEdit(item,'edit')") 
						el-button(type="danger" :icon="Delete" circle @click="onEdit(item,'del')")
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
import { Delete, Edit } from '@element-plus/icons-vue'
// import { kxyk,io} from "@/libs/smkj";
import { kxyk, Api, io, __ } from "smkj";

const route = useRoute();
const cid = parseInt(route.params.cip.toString());//商圈ID
// 读取会员列表参数
const packList = reactive<sm.RefreshList>({
    url:Api.shop.C1.GetMemberTypeList,size:10,refresh:false,args:{cid:cid,role:'C1'}
})

//页面数据对象
const page:{add_type:boolean,save:boolean,form:any,list:any,store_list:any[]} = reactive({
	add_type:false,
	save:true,
	form:{
		name:'',price:'',id:0,info:'',r:0,is_jump:0,sid:0
	},
	list:[],
	store_list:[],//门店列表
})

const error1 = (a:any)=>
{
	kxyk.toUrl(`/c1/${cid}`);
}

const isSaveAnnual = () =>
{
    if(page.form.name && page.form.price){
        page.save = false;
    }else{
        page.save = true;
    }
}
const addType=()=>{
	page.form.id = 0;
	page.form.name='';
	page.form.price = '';
	page.add_type = true;
	isSaveAnnual();
}
const onEdit = (type:any,str:'edit' | 'del')=>
{
	if(str === 'del'){
		kxyk.Modal.confirm({
            title: '删除分类',
            icon:undefined,
            content: '确定要删除当前分类吗？'
			,okText:'确定',cancelText:'取消',
            onOk(){
				kxyk.sk.be(Api.shop.C1.EditDel,{id:type.id,cid:type.cid},res=>{
					if(res.status){
						kxyk.msg.success('删除成功.');
						packList.refresh = !packList.refresh;
						// getList();
					}
				})
            }
        })

	}else{
		page.form = type;
		page.add_type = true;
		isSaveAnnual();
	}

}
const submit = ()=>
{
	kxyk.sk.be(Api.shop.C1.AddMemberType,{form:page.form,cid:cid},res=>{
		if(res.status){
			page.add_type = false;
			kxyk.msg.success('操作成功.');
			// 重新读取列表
			packList.refresh = !packList.refresh;
			// getList();
		}
	})
}
// const getList = ()=>
// {
// 	kxyk.sk.be(Api.shop.C1.GetMemberTypeList,{cid:cid},res=>{
// 		if(res.status && res.list){
// 			page.list = res.list;
// 		}
// 	})
// }
/** 初始化 读取当前商品所有门店列表 */
const init = ()=>{
	kxyk.sk.be(Api.shop.C1.GetCircleStoreList,{},res=>{
		if(res.status && res.list){
			page.store_list = res.list;
		}
	})
}
onMounted(() => {
	init();
});


</script>


