---
sidebar_position: 10
title: 常见问题
description: ESCore 启动、实时通信、Redis、MQTT、构建与部署中的常见问题。
---

# 常见问题

## Node ABI 不兼容 {#node-abi}

**现象**：启动时报 `This version of µWS is not compatible with your Node.js build`。

uWebSockets.js 的 `.node` 二进制与 Node ABI 严格对应。仓库内已内置 ABI 83–147（Node 14–24）的预编译产物；
如果仍然报错，说明当前 Node 版本不在覆盖范围内。

处理方式：

1. 切换到 Node 18 / 20 LTS；
2. 删除 `Node/src/libs/uWebSockets` 后重新安装匹配的二进制；
3. 不要在多个 Node 主版本之间复用同一个 `node_modules`。

```bash
node -v
npm rebuild
```

## 端口被占用

**现象**：启动时报 `EADDRINUSE`。

```powershell title="Windows"
netstat -ano | findstr :3011
netstat -ano | findstr :3012
```

```bash title="Linux / macOS"
lsof -i:3011
lsof -i:3012
```

修改端口时，需要同步修改：

- `Node/config.ts` 的 `http_port` / `wss_port`；
- `vite.config.ts` 的 `server.port` 与代理目标；
- 生产环境 Nginx 的 `proxy_pass`。

## 前端能打开，但实时消息没有反应

按顺序排查：

1. 浏览器 Network 中 WebSocket 是否连接到 `/io`；
2. 页面是 HTTPS 时，实时地址是否也是 `wss://` 或同源代理；
3. Redis 是否已启动，Socket.IO Redis Adapter 是否初始化成功；
4. Nginx 是否转发了 `Upgrade` 与 `Connection`；
5. 服务端是否因为 JWT 校验失败拒绝连接；
6. 多实例时，消息是否发到了另一个实例而没有经过 Redis。

## Redis 连接失败

检查：

```bash
redis-cli ping
```

如果返回 `PONG`，再核对 `Node/config.ts` 中的 host、port、密码与前缀。Docker 中的 Redis 还需要确认端口映射，
以及容器网络是否能被 Node 进程访问。

## MQTT 一直重连

1. `docker ps` 确认 `escore-mqtt` 处于 `Up`；
2. 确认 `1883` 端口可达，防火墙已放行；
3. 核对 `lock_server` 的地址与协议；
4. 在 EMQX 中确认账号、密码与 ACL；
5. 查看后端日志中的具体错误码。

如果暂时不使用 IoT，可以关闭 MQTT 模块或忽略相关重连日志，但不要把重连失败当作“已经连接”。

## 浏览器提示证书不安全

开发环境的 Vite 使用自签名证书，浏览器提示属于正常现象。选择继续访问即可。

生产环境必须使用受信任的证书，并确保：

- 证书链完整；
- 域名与证书匹配；
- 前端 HTTPS 与 WebSocket WSS 同时启用；
- 没有把开发证书带到线上。

## 跨域 / CORS 错误

开发环境优先使用 Vite 代理，让请求保持同源。生产环境建议：

- 前端与 API 使用同一域名，通过 Nginx 路径转发；
- 如果必须跨域，明确配置 `Access-Control-Allow-Origin`，不要使用 `*` 搭配凭证；
- WebSocket 的 Origin 校验单独配置；
- 预检请求 `OPTIONS` 不要被鉴权中间件拦截。

## 数据库连接失败

检查：

- MySQL 服务是否启动；
- 主机、端口、库名、账号、密码是否正确；
- 账号是否具备该库权限；
- 服务器防火墙 / 安全组是否放行；
- 连接池是否耗尽。

生产环境建议使用独立账号，并限制来源 IP。

## `npm run build` 失败

先看完整错误，不要只看最后一行。常见原因：

- TypeScript 类型错误：修复类型或运行 `npm run tsc` 单独检查；
- Node 版本不匹配：切换到 LTS；
- 依赖缺失：删除 `node_modules` 与 `package-lock.json` 后重新安装；
- 内存不足：增加构建机内存或调整 Node 内存参数。

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

Windows 上删除目录请使用资源管理器或 `Remove-Item -Recurse -Force`。

## 部署后刷新页面 404

前端是单页应用时，Nginx 需要回退到 `index.html`：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

如果只有某个子路径 404，检查 `base` 配置与静态资源路径。

## 部署后 API 404

检查三件事：

1. 前端实际请求前缀是 `/api` 还是 `/app`；
2. Nginx 是否把该前缀转发到 `3011`；
3. 是否需要 rewrite 到后端的 `http_base`。

本地正常、线上 404，通常就是代理前缀与 rewrite 不一致。

## 如何升级 ESCore

1. 备份数据库与当前构建产物；
2. 拉取新版本并查看变更说明；
3. 安装依赖；
4. 执行数据库迁移；
5. 重新构建并重启；
6. 验证登录、支付、实时消息与设备链路。

不要在未备份的生产环境直接覆盖 `dist` 与 `public`。

## 文档中的性能数字可以直接用于容量规划吗？

不可以。10–30× 与 1–3 KB 是参考指标，实际表现受协议、TLS、消息大小、广播范围、业务逻辑、网络与硬件影响。
请在你的目标环境进行压测，并预留足够余量。