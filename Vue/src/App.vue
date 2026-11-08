
<script setup lang='ts'>
import { ref ,computed} from "vue";
import { key, useStore } from "./store";
import { useRouter,useRoute } from "vue-router";
import { kxyk } from "./libs/smkj";
import zhCN from "ant-design-vue/es/locale/zh_CN"
import Vconsole from 'vconsole';

const kpList= ref(['index','admin','main']);
const store =useStore();

// 设置路由
kxyk.setRouter(useRouter(),store);

if(kxyk.utils.sys.is_wxapp ){
// if(!kxyk.utils.sys.is_wxapp){
	// const vcon = new Vconsole();
}
const route1 = useRoute();
const key1 =computed(()=>
{
	return route1.path +'/'+ Date.now();
})
</script>


<template lang='pug'>
a-config-provider(:locale="zhCN")
	router-view(v-slot="{Component,route}")
		transition(:name="'a'+route.meta.tn" appear mode="out-in")
			keep-alive(:include="kpList") 
				component(:is="Component")
</template>
<style lang="stylus">
	@import "./assets/App.styl"
</style>


