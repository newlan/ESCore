
/**
 * newlan 路由文件
 * @param meta @type Object
 * @param meta.kp @type Bool - 是否开启页面缓存
 * @param meta.tn @type string - 路由切换页面动画效果 01 渐变
 * @param meta.title @type string - 路由页面标题
 * @param meta.auth @type Bool - 是否需要登录
 */
export default [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
        hidden: true,
        meta: { title: '登录' },
        children: [
            { path: '', component: () => import("@/views/index.vue") }
        ]
    },
    {
        path: '/loginKxykWxapp/:auto',
        tn:'02',
        component: () => import('@/views/login/LoginKxykWxapp.vue'),
        meta: { 
            title: '登录开薪怡客',
            tn:"02",
            kp: false,
            auth: false,
        },

    },
    {
        path: '/loginKxyk/:auto',
        name: 'LoginKxyk',
        tn:'02',
        component: () => import('@/views/login/LoginKxyk.vue'),
        hidden: true,
        meta: { title: '开薪怡客' },
        children: [
            { path: '', component: () => import("@/views/index.vue") }
        ]
    },
]