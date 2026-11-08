---
sidebar_position: 3
title: 快速开始
description: 启动 ESCore 前后端，验证 HTTP API 与第一条实时连接。
---

# 快速开始

完成[安装与环境](./install.md)后，按照下面的步骤启动 ESCore。整个过程分为三个终端：后端、前端和一个用于验证的客户端。

## 1. 启动后端

在项目根目录执行：

```bash
npm run tsd
```

该命令通过 `ts-node-dev` 启动 `Node/server.ts`，代码变更后会自动重启。启动成功后，后端会同时监听：

| 服务 | 地址 | 说明 |
| --- | --- | --- |
| HTTP API | `http://127.0.0.1:3011/app` | Express 路由 |
| 实时通道 | `ws://127.0.0.1:3012/io` | uWebSockets + Socket.IO |

:::tip Windows 脚本说明
`npm run tsd` 中使用的是 Windows 语法 `set DEBUG=lan:*`。在 Linux / macOS 上，可以改为：

```bash
DEBUG=lan:* ts-node-dev --respawn --transpile-only --project ts_node_dev.json ./Node/server.ts
```
:::

## 2. 启动前端

另开一个终端，在项目根目录执行：

```bash
npm run vite
```

Vite 会启动 HTTPS 开发服务器，默认地址为 `https://localhost`。由于使用自签名证书，浏览器可能提示“连接不安全”，
在开发环境选择继续访问即可。

前端开发服务器会将 `/api/*` 代理到 `3011`，将 `/io` 代理到 `3012`。

## 3. 验证第一个实时连接

在前端项目中，或在一个临时的 Node.js 脚本中，使用 `socket.io-client` 连接实时通道：

```js
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:3012', {
  path: '/io',
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('connected:', socket.id);
  socket.emit('ping', {at: Date.now()});
});

socket.on('connect_error', (error) => {
  console.error('connect error:', error.message);
});

socket.on('disconnect', (reason) => {
  console.log('disconnected:', reason);
});
```

如果浏览器当前页面是 HTTPS，而实时服务是 `ws://`，浏览器会拦截不安全连接。这种情况下请通过 Vite 代理使用同源的 `/io`，
或者为实时服务配置 TLS 后使用 `wss://`。

## 4. 验证 HTTP 服务

使用 curl 请求 API 基础路径：

```bash
curl -i http://127.0.0.1:3011/app
```

即使返回 404，只要响应来自 Express，也说明 HTTP 服务已经启动。具体业务接口以项目中的路由为准。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm install` | 安装前后端依赖 |
| `npm run tsd` | 后端开发模式，监听 3011 / 3012 |
| `npm run vite` | 前端开发模式，HTTPS `:443` |
| `npm run tsc` | 编译后端 TypeScript 到 `Node/dist` |
| `npm run build` | 前端类型检查 + 生产构建，输出到 `public/` |
| `npm run test` | 预留测试脚本，当前未接入用例 |

## 常见启动问题

### 端口被占用

```powershell title="Windows"
netstat -ano | findstr :3011
```

```bash title="Linux / macOS"
lsof -i:3011
```

修改端口时，`Node/config.ts` 中的 `http_port` / `wss_port` 与 `vite.config.ts` 中的代理目标需要同步调整。

### 实时消息没有反应

先确认 Redis 已启动。Socket.IO 的 Redis Adapter 连接失败可能阻塞实时通道初始化；再检查浏览器 Network 面板中的
WebSocket 是否指向 `/io`。

### MQTT 一直重连

确认 EMQX 容器处于运行状态，并核对 `Node/config.ts` 中的 `lock_server`、账号与密码是否正确。

更多问题见[常见问题](./faq.md)。

## 下一步

- 理解分层与数据流：[架构设计](./architecture.mdx)
- 配置数据库、Redis、支付与微信：[配置说明](./configuration.md)
- 开始写业务模块：[开发指南](./development.md)
- 准备上线：[生产部署](./deploy.md)