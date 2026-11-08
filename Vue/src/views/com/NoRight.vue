<style scoped lang="stylus">
.NoRight
    background: #f9f9f9; padding: 1rem; color: #9f4444; font-size: 1.5rem; height: 100vh; display: flex; align-items: center; text-shadow: 0 0 0.1rem #b9b9b9; justify-content: center; 
</style>
<template lang="pug">


a-result(status="500" title="地址错误" sub-title="抱歉，你访问的页面不存在或权限不足！")
    template(#extra)
        a-button(type="primary" @click="kxyk.toUrl('/')") 返回首页


</template>

<script lang="ts">
export default { 
    name: "NoRight",
    components:{},
};
</script>
<script setup lang="ts">
import {kxyk} from 'smkj';

</script>


