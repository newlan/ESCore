---
sidebar_position: 2
title: 移动端开发
description: HBuilderX 工程配置、uni-app 页面、请求封装、实时连接与真机调试。
---

# 移动端开发

uni-app 的开发体验围绕 **HBuilderX + pages.json + manifest.json** 展开。本文以 Vue 3 工程为例，
说明从导入项目到真机调试的关键步骤。

## 开发环境

| 工具 | 用途 |
| --- | --- |
| HBuilderX（正式版） | 创建、运行、调试与云打包 uni-app |
| Node.js 18+ | CLI 依赖安装与构建（如使用 CLI 工程） |
| 微信开发者工具 | 调试微信小程序 |
| Android Studio / Xcode | 原生插件、证书与真机调试（按需） |
| 真机 | 验证推送、相机、定位、蓝牙等原生能力 |

HBuilderX 本身是免费的，但 App 云打包、部分原生插件与开发者账号可能需要额外费用。

## 导入项目

1. 打开 HBuilderX；
2. 选择 **文件 → 导入 → 从本地目录导入**；
3. 选择包含 `manifest.json` 的项目根目录；
4. 等待依赖索引完成；
5. 在 **运行** 菜单中选择目标端。

运行方式：

- **运行到浏览器**：最快，适合 H5 与基础页面调试；
- **运行到手机或模拟器**：验证 App 原生能力；
- **运行到小程序模拟器**：验证平台差异与域名限制。

## 工程结构

```text
app/
├── pages.json             页面路由、导航栏、分包
├── manifest.json          应用名称、AppID、权限、SDK
├── App.vue                应用生命周期
├── main.js                入口
├── uni.scss               全局样式变量
├── pages/
│   ├── home/index.vue
│   ├── messages/index.vue
│   └── profile/index.vue
├── components/
├── stores/
├── api/
├── utils/
└── static/
```

### pages.json

```json title="pages.json"
{
  "pages": [
    {
      "path": "pages/home/index",
      "style": {
        "navigationBarTitleText": "ESCore",
        "enablePullDownRefresh": true
      }
    },
    {
      "path": "pages/messages/index",
      "style": {
        "navigationBarTitleText": "消息"
      }
    },
    {
      "path": "pages/profile/index",
      "style": {
        "navigationBarTitleText": "我的"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "white",
    "navigationBarBackgroundColor": "#0b1220",
    "backgroundColor": "#f5f7fb"
  },
  "tabBar": {
    "color": "#94a3b8",
    "selectedColor": "#2563eb",
    "list": [
      {"pagePath": "pages/home/index", "text": "首页"},
      {"pagePath": "pages/messages/index", "text": "消息"},
      {"pagePath": "pages/profile/index", "text": "我的"}
    ]
  }
}
```

### manifest.json

在 HBuilderX 中可视化编辑，重点检查：

- 应用名称、版本号、AppID；
- Android 包名与签名证书；
- iOS Bundle ID、证书与描述文件；
- 权限声明（相机、定位、通知、蓝牙等）；
- 推送、地图、支付、分享等 SDK；
- 隐私政策与用户协议入口。

AppID 一旦用于发布，不要随意变更；Android 包名与 iOS Bundle ID 也必须保持稳定。

## 请求封装

```ts title="api/request.ts"
const BASE_URL = import.meta.env.VITE_API_BASE;

export function request<T>(options: UniApp.RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      url: `${BASE_URL}${options.url}`,
      timeout: 15000,
      header: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${uni.getStorageSync('token')}`,
        ...options.header,
      },
      success: (response) => {
        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
          resolve(response.data as T);
          return;
        }
        if (response.statusCode === 401) {
          uni.removeStorageSync('token');
          uni.reLaunch({url: '/pages/login/index'});
        }
        reject(response);
      },
      fail: reject,
    });
  });
}
```

上传文件使用 `uni.uploadFile`，下载使用 `uni.downloadFile`；大文件需要显示进度并支持取消。

## 实时连接适配

ESCore 的实时通道是 Socket.IO 协议。H5 可以直接使用 `socket.io-client`；App 与小程序需要兼容客户端或网关适配。

```ts title="utils/socket.ts（H5 示例）"
import {io, Socket} from 'socket.io-client';

let socket: Socket | null = null;

export function connectSocket(token: string) {
  if (socket?.connected) return socket;

  socket = io(import.meta.env.VITE_WS_ORIGIN, {
    path: '/io',
    transports: ['websocket'],
    auth: {token},
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 10000,
  });

  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}
```

页面中的订阅与清理：

```ts
import {onShow, onHide, onUnload} from '@dcloudio/uni-app';

let offMessage: (() => void) | null = null;

// subscribe 为项目封装的“订阅并返回取消函数”工具
onShow(() => {
  offMessage = subscribe('message:new', handleMessage);
});

onHide(() => {
  offMessage?.();
  offMessage = null;
});

onUnload(() => {
  offMessage?.();
  offMessage = null;
});
```

:::warning 小程序域名白名单
小程序要求 HTTPS / WSS 域名已备案并加入后台白名单。开发阶段可以在开发者工具中临时关闭校验，
但提交审核前必须恢复，否则线上无法连接。
:::

## 条件编译

平台差异用条件编译表达，而不是到处写 `if (platform === ...)`：

```ts
// #ifdef APP-PLUS
const systemInfo = uni.getSystemInfoSync();
// #endif

// #ifdef H5
console.log('running on web');
// #endif
```

常用平台标识：

```text
APP-PLUS       App 原生环境
H5             H5
MP-WEIXIN      微信小程序
MP-ALIPAY      支付宝小程序
```

## 真机调试

1. 手机开启开发者模式与 USB 调试；
2. HBuilderX 运行到手机；
3. 在 HBuilderX 控制台查看 `console` 与网络请求；
4. 使用 Chrome `chrome://inspect` 调试 App WebView（视版本与配置）；
5. 原生插件问题查看 `plus` 日志与 Android Logcat / Xcode Console。

重点验证：

- 冷启动与热启动；
- 前后台切换后的实时连接；
- 弱网、断网与重连；
- 通知权限与推送到达；
- 相机、定位、文件上传；
- 深色模式与安全区适配。

## 常见问题

### 浏览器正常，真机请求失败

检查 API 域名、HTTPS 证书、Android 网络安全配置与 iOS ATS 设置。

### 小程序提示域名不合法

把 API / WSS 域名加入小程序后台的 request、socket 合法域名，并确保使用备案域名与有效证书。

### 实时连接断开后不恢复

确认监听 `onShow` 重新检查连接，避免只依赖库的自动重连。App 进入后台后连接可能被系统挂起。

### 推送收不到

检查厂商推送配置、设备通知权限、App 前台 / 后台状态与 uni-push 配置。

## 开发检查清单

- [ ] `pages.json` / `manifest.json` 已按端配置
- [ ] API / WSS 域名与证书有效
- [ ] 登录态失效会清理并跳转
- [ ] 页面卸载时移除实时监听
- [ ] 前后台切换、弱网与重连已验证
- [ ] 权限申请有解释与拒绝兜底
- [ ] 隐私政策、用户协议与权限清单齐全
- [ ] 真机与目标小程序平台均已测试

下一步：[移动端打包](./build.md)。