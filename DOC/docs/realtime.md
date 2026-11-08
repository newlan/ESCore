---
sidebar_position: 7
title: 实时通道设计
description: Socket.IO 连接、房间模型、Redis 多实例广播、Nginx 代理与可靠性设计。
---

# 实时通道设计

ESCore 的实时通道监听在 `3012` 端口，握手路径默认为 `/io`，协议层兼容 Socket.IO v4。底层连接由
uWebSockets.js 承载，业务侧通过统一的 `io` 上下文发送消息。

## 连接参数

| 参数 | 默认值 | 说明 |
| --- | --- | --- |
| 端口 | `3012` | `wss_port` |
| 路径 | `/io` | `wss_base`，必须与代理配置一致 |
| 传输 | WebSocket | 推荐显式指定 `transports: ['websocket']` |
| 协议 | Socket.IO v4 | 兼容 `allowEIO3` 的旧客户端 |

生产环境使用 `wss://`，不要从 HTTPS 页面连接 `ws://`，否则浏览器会按混合内容拦截。

## 客户端连接

### 通过同源代理（推荐）

前端页面和实时通道通过同一个域名访问，由 Nginx 或 Vite 把 `/io` 转发到 `3012`：

```js
import {io} from 'socket.io-client';

const socket = io({
  path: '/io',
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('token'),
  },
});
```

这样不需要在前端硬编码实时服务域名，也天然避开了跨域与证书问题。

### 直连实时服务

```js
const socket = io('https://socket.example.com', {
  path: '/io',
  transports: ['websocket'],
  auth: {
    token,
  },
});
```

此时需要正确配置 TLS、CORS 与 `allowRequest` / Origin 白名单。

## 服务端鉴权

不要在连接成功后才校验身份。推荐在握手阶段完成 JWT 校验，并把可信身份写入 `socket.data`：

```ts title="Node 侧（示意）"
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    const user = verifyToken(token); // 校验签名、过期时间与租户
    socket.data.userId = user.id;
    socket.data.tenantId = user.tenantId;
    next();
  } catch (error) {
    next(new Error('unauthorized'));
  }
});
```

之后的事件处理只使用 `socket.data` 中的身份，不要相信客户端在消息体里传入的 `userId` 或 `tenantId`。

## 房间模型

房间是实时广播的基本单位。建议至少建立以下几类房间：

| 房间 | 命名示例 | 用途 |
| --- | --- | --- |
| 租户 | `tenant:acme` | 租户级公告、配置与全局事件 |
| 用户 | `user:1024` | 个人通知、多端同步 |
| 业务房间 | `order:20261108` | 单个订单 / 会话 / 设备的实时状态 |
| 管理端 | `admin:tenant:acme` | 运营后台订阅 |

```js
socket.join(`tenant:${socket.data.tenantId}`);
socket.join(`user:${socket.data.userId}`);
```

广播时严格限定房间：

```js
io.to(`tenant:${tenantId}`).emit('notice:published', payload);
```

不要把包含敏感信息的消息广播到全局，也不要用客户端可控的房间名直接加入房间。

## 多实例与 Redis Adapter

单机运行时，所有连接都在同一个 Node 进程中。多实例部署时，客户端可能连接到不同进程，必须通过
`@socket.io/redis-adapter` 共享广播：

```text
Client A ──→ Node #1 ──┐
                       ├── Redis Pub/Sub ──→ 所有 Node 实例
Client B ──→ Node #2 ──┘
```

注意：

- 所有实例连接同一个 Redis，并使用相同的 key 前缀；
- Redis 连接失败可能导致广播失效，应将连接状态纳入健康检查；
- 使用 HTTP 长轮询回退时，负载均衡需要会话保持（sticky session）；只使用 WebSocket 时可减少该依赖；
- 在线状态建议写入 Redis，而不是只保存在进程内存。

## Nginx 配置

```nginx
location /io {
    proxy_pass http://127.0.0.1:3012;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_read_timeout 75s;
    proxy_send_timeout 75s;
}
```

如果使用云负载均衡，需要确认：

- 监听器支持 WebSocket Upgrade；
- 空闲超时时间大于心跳周期；
- 后端健康检查不会误判长连接；
- TLS 证书链完整。

## 消息可靠性

Socket.IO 的实时消息默认是“尽力送达”，不是消息队列。重要消息应遵循：

1. **先落库，再推送**：数据库是事实来源，实时通道只负责通知；
2. **客户端补偿**：重连后按游标 / 时间拉取缺失消息；
3. **幂等**：消息带唯一 ID，客户端与服务端都能去重；
4. **顺序**：不要假设跨实例全局有序，关键业务使用版本号或序列号；
5. **确认**：对关键指令使用 ACK 或业务回执，而不是只依赖 `emit` 成功。

## 扩展与限流

- 为每个连接设置最大订阅房间数；
- 对高频事件做合并与节流，例如设备遥测按秒聚合；
- 限制单条消息大小，避免大对象阻塞事件循环；
- 对连接数、消息速率、错误率与 Redis 延迟建立监控；
- 大规模广播前先评估房间规模，避免“一个事件打爆所有连接”。

## 排查顺序

实时消息异常时，按以下顺序检查：

1. 浏览器 Network → WS 是否成功握手到 `/io`；
2. Nginx 是否转发 `Upgrade` 与 `Connection`；
3. `wss_base`、前端 `path` 与代理路径是否完全一致；
4. Redis 是否可用，Adapter 是否初始化成功；
5. 服务端日志中是否有鉴权失败或房间加入失败；
6. 多实例时，广播是否经过 Redis，而不是只发往当前进程。

更多启动问题见[常见问题](./faq.md)。