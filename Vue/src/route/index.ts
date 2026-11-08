
import { createRouter,createWebHistory,createWebHashHistory} from "vue-router";
import lan from '@/route/def/lan';
import shop from '@/route/def/shop';
import newlan from '@/route/def/newlan';
import lcy from '@/route/def/lcy';
import qs from 'qs';
import { kxyk } from "@/libs/smkj";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
const routes = [
    {
        path: "/",
        component: () => import('@/views/FrameworkShowcase.vue'),
        meta: { title: '框架组件展示' }
    },
    {
        path: "/docs",
        component: () => import('@/views/ESCoreDocs.vue'),
        meta: { title: 'ESCore 开发文档' }
    },
    ...lan,
    ...shop,
    ...newlan,
    ...lcy,
    {
        path:"/:pathMatch(.*)",
        component: () => import('@/views/com/NoRight.vue'),

    }
]

const R = createRouter({
    history: createWebHistory(),
    routes, 
    scrollBehavior(to,from,savePosition)
    {
        if(savePosition){
            return savePosition;
        }else{
            return { top: 0 };
        }
    }
});

R.beforeEach(async(to, from) => {
    NProgress.start();
    if(to.meta.title)
    {
        document.title = to.meta.title as string;
    }
    // 这里跳转新省钱页面
    // console.log(to);
    if(to.fullPath === "/Thrifty") return "/ThriftyNew/29"
    
    /** 
     * 小程序登录补丁
     * 如果小程序token已经失效但H5端 
     */
    if(to.query.nttn && kxyk.user.token)
    {
        kxyk.user.token = undefined;
        if(kxyk.user.is_login){
            kxyk.user.is_login = false;
        }    
    }

    /** 同步小程序地址 小程序端实时缓存路由 2025-06-03 */
    if(kxyk.utils.sys.is_wxapp && kxyk.user.is_login && !to.fullPath.includes('loginKxyk') && !kxyk.user.is_avatar){
        // kxyk.sk.so_("wx", p)
        kxyk.sk.so_("wxapp_transfer",{uid:kxyk.user.uid,db:{path:to.fullPath}}).then(res=>{
            if(res.status){
            }
        }).catch(e=>{
            console.log('小程序汇报路由错误：',e);
        })
        
    }

    // 是否需要登录
    if(to.meta.auth){
        let burl = to.path;
        if(JSON.stringify(to.query) !== '{}')
        {
            burl += `?${qs.stringify(to.query)}`;
        }
        kxyk.state.set('back_url',burl);
        // 08.26 重新设计登录逻辑
        let user = await kxyk.LoginKxyk();
        if(user)
        {
            let back_rul = kxyk.state.get('back_url');
            if(back_rul) kxyk.state.set('back_url',false);
            return true;
        }else{
            return '/loginKxyk/1';
        }

    }else{
        // 本页面不需要登录 不过假设有token且没有登录 尝试后台静默登录
        if(kxyk.user.token && !kxyk.user.is_login && !to.fullPath.startsWith('/loginKxyk/1') && !to.fullPath.startsWith('/loginKxykWxapp/1')){
            kxyk.tokenLogin();
        }
        if(!to.fullPath.startsWith('/loginKxyk/1') && !to.fullPath.startsWith('/loginKxykWxapp/1')){

        }

    }
    
})
R.afterEach((to,from) => {
    NProgress.done();
    if(to.fullPath.includes('/pd1/')){
        const manifestLink = document.getElementById('manifest-link');

        if(manifestLink){
            manifestLink.setAttribute('href', "//m1.sam322.com/loading/manifest_pd1.json");
        }
    }

   
});

export default R;
