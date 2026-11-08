
import { createApp } from 'vue'
import App from './App.vue';
import route from './route'
import store ,{key} from './store';
import ElementPlus from 'element-plus';
// @ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
import "element-plus/theme-chalk/index.css";
declare module 'element-plus/es/locale/lang/zh-cn';
import * as vant from 'vant';
import QrCode from './views/com/vueQrcode.vue';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia' // 1. 导入 createPinia
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import 'ant-design-vue/dist/antd.css';
import {kxyk,Api,io} from "smkj"; 

import 'vant/lib/index.css';

const pinia = createPinia();

const app = createApp(App)
.use(store,key)
.use(route)
.use(pinia)
.use(vant)
.use(vant.Lazyload)
.use(ElementPlus,{locale:zhCn})
.use(Antd)
.component('qr-code',QrCode).mount('#app');

kxyk.initStores();
// 使用 MutationObserver 监控 aria-hidden 属性并移除
const observer = new MutationObserver((mutationsList:any) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
        const target = mutation.target;
        if (target.tagName.toLowerCase() === 'div' && target.getAttribute('aria-hidden') === 'true') {
          target.removeAttribute('aria-hidden');
        }
      }
    }
  });
  observer.observe(document.body, {
    attributes: true,
    subtree: true
  });