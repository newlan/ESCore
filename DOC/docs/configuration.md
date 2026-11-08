---
sidebar_position: 5
title: 配置说明
description: ESCore 后端 Node/config.ts 与前端 Vite 环境变量的配置参考。
---

# 配置说明

ESCore 的后端配置集中在 `Node/config.ts`。文件导出一份 `debug`（开发）与一份 `production`（生产）对象，
运行时根据 `NODE_ENV` 自动选择：

```ts title="Node/config.ts"
const config = process.env.NODE_ENV === 'production' ? production : debug;
export default config;
```

启动生产构建时：

```bash title="Linux / macOS"
NODE_ENV=production npm run tsc
```

```powershell title="Windows PowerShell"
$env:NODE_ENV = "production"; npm run tsc
```

:::danger 不要把真实密钥提交到仓库
`config.ts` 中的密钥、证书、数据库密码与第三方平台凭证只应作为本地示例。生产环境建议通过环境变量、
部署机上的 `config.local.ts`（加入 `.gitignore`）或密钥管理服务注入。
:::

## 基础与实时通信

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| `env` | `D` / `P` | 环境标识，开发为 `D`，生产为 `P`；会影响 MQTT 客户端名等逻辑 |
| `http_port` | `3011` | HTTP API 端口，Express 与 `/qqMaps` 代理监听此端口 |
| `http_base` | `/app` | HTTP 接口基础路径 |
| `wss_port` | `3012` | 实时通信端口 |
| `wss_base` | `/io` | WebSocket 握手路径，必须与前端代理和 Nginx 配置一致 |

修改端口时，至少需要同步修改：

1. `Node/config.ts` 中的 `http_port` / `wss_port`；
2. `vite.config.ts` 中的开发代理目标；
3. 生产环境 Nginx 的 `proxy_pass`；
4. 前端使用的 API / WebSocket 地址。

## Redis

| 参数 | 说明 |
| --- | --- |
| `redis.host` | Redis 地址 |
| `redis.port` | Redis 端口 |
| `redis.pass` | 密码，无密码时留空 |
| `redis.prefix` | 键前缀，用于多个项目共用同一 Redis 时隔离数据 |

Redis 同时承担缓存与 Socket.IO 多实例广播。如果使用多个 Node 实例，`@socket.io/redis-adapter` 必须连接同一个 Redis；
否则客户端可能连在不同实例上，彼此收不到广播。

## MQTT 与设备

| 参数 | 说明 |
| --- | --- |
| `lock_server` | MQTT Broker 地址，例如 `mqtt://127.0.0.1:1883` |
| `lock_name` | 连接 Broker 使用的 `clientId`，开发 / 生产建议区分 |

设备功能不是所有项目的必需项。未部署 EMQX 时，相关连接会持续重连并输出日志；如果暂不使用，应避免在启动阶段
阻塞主流程，或者关闭对应模块。

## 鉴权与安全

| 参数 | 说明 |
| --- | --- |
| `jwt` | JWT 签名密钥，上线前必须替换为高强度随机串 |
| `wx_auth_type` | 微信授权返回的 ID 类型，`openid` 或 `unionid` |
| `devList` | 开发调试用的商户 / 门店 ID 白名单，仅开发环境生效 |

生产环境还需要在应用或网关层补充：

- HTTPS / WSS；
- CORS 与 Origin 白名单；
- 登录失败次数限制与验证码策略；
- 接口限流、请求体大小限制与超时；
- 敏感操作二次校验与审计日志；
- 密钥轮换与最小权限数据库账号。

## 第三方服务

| 配置组 | 典型字段 | 用途 |
| --- | --- | --- |
| 阿里云短信 | `sms.accessKeyId`、`sms.accessKeySecret`、`sms.signName` | 验证码与通知短信 |
| AI 模型 | `ai.apiKey`、`ai.baseURL`、`ai.model` | AI Agent / 对话能力 |
| 七牛云 | `qiniu.AK`、`qiniu.SK`、`qiniu.scope`、`qiniu.url` | 对象存储 |
| 百度智能云 | `baidu.AppID`、`baidu.APIKey`、`baidu.SecretKey` | OCR、语音等能力 |

没有接入的第三方服务可以保留空配置，但相关功能在调用前应做能力开关与错误提示，而不是把异常直接抛给用户。

## 微信生态

| 配置组 | 用途 |
| --- | --- |
| `wx.appId` / `wx.appSecret` | 公众号 AppID 与 AppSecret |
| `wx.wechatRedirectUrl` / `wx.wechatToken` | 网页授权回调与开发者 Token |
| `wx.sp_mchid` / `wx.merchantId` | 服务商商户号 / 直连商户号 |
| `wx.apiV3Key` / `wx.paymentKey` / `wx.paymentCertificatePfx` | 微信支付 v3 密钥、v2 验签密钥与证书 |
| `wx.notify_url` / `wx.notify_url_xy` / `wx.paymentNotifyUrl` | 支付结果回调地址 |
| `wx.miniProgram.appId` / `wx.miniProgram.appSecret` | 小程序 AppID 与 AppSecret |

支付回调地址必须是公网可访问的 HTTPS 地址，并做好签名验证、金额校验与幂等处理。

## 前端环境变量

前端使用 Vite，只暴露以 `VITE_` 开头的变量：

| 变量 | 说明 |
| --- | --- |
| `VITE_APP_TITLE` | 构建标识，例如“开发模式 / 生产模式” |
| `VITE_APP_WS_URL` | 实时服务地址；生产环境填写 `wss://socket.example.com` |
| `VITE_APP_BBSE` | 环境备注标记，用于区分测试 / 生产构建 |

在代码中读取：

```ts
const wsUrl = import.meta.env.VITE_APP_WS_URL;
```

:::warning 前端变量不是秘密
`VITE_` 变量会被打包进浏览器代码。API Key、数据库密码、JWT 私钥等敏感信息绝不能放在前端环境变量中。
:::

## 上线前配置检查

- [ ] `NODE_ENV` 已设置为 `production`
- [ ] `jwt` 已替换为随机强密钥，且未提交到仓库
- [ ] MySQL、Redis 使用独立账号与最小权限
- [ ] Redis 已设置密码或仅监听内网
- [ ] `wss_base`、Nginx `/io` 与前端连接路径一致
- [ ] 支付、微信、短信回调域名已配置并完成验签
- [ ] 对象存储 Bucket 权限与 CDN 域名正确
- [ ] 日志中不会输出密码、Token、证书与用户隐私
- [ ] 已关闭不需要的开发白名单与调试接口

配置完成后，继续阅读[开发指南](./development.md)或[生产部署](./deploy.md)。