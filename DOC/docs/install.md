---
sidebar_position: 2
title: 安装与环境
description: 准备 ESCore 运行所需的 Node.js、MySQL、Redis、MQTT 与端口环境。
---

# 安装与环境

ESCore 前后端共用同一个仓库，依赖通过根目录的 `package.json` 安装。开始之前，请先确认本机具备以下环境。

## 环境要求

| 依赖 | 建议版本 | 用途 |
| --- | --- | --- |
| Node.js | 18 / 20 LTS | 运行后端、Vite 与构建脚本 |
| npm | 8+ | 安装依赖、执行脚本 |
| MySQL | 5.7 / 8.0 | 业务数据存储 |
| Redis | 6 / 7 | 缓存、会话与 Socket.IO 多实例广播 |
| Docker | 20+ | 可选，用于一键运行 EMQX |
| EMQX | 5.x | 可选，IoT 设备接入所需的 MQTT Broker |

:::warning uWebSockets.js 与 Node ABI
uWebSockets.js 依赖与 Node ABI 严格匹配的 `.node` 文件。仓库已经内置了 ABI 83–147（Node 14–24）的预编译产物；
如果启动时报 `This version of µWS is not compatible with your Node.js build`，请先切换到 LTS 版本，
或参考[常见问题](./faq.md#node-abi)重新获取匹配的二进制。
:::

## 1. 获取代码

```bash
git clone https://github.com/newlan/ESCore.git ESCore
cd ESCore
```

如果你已经拿到项目压缩包，直接解压并进入项目根目录即可。

## 2. 安装依赖

```bash
npm install
```

国内网络下载较慢时，可以临时使用镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

安装完成后，确认 `node_modules` 与 `package-lock.json` 均已生成。

## 3. 准备 MySQL

创建一个空的业务数据库，并准备一个具备该库读写权限的账号。表结构可以通过项目内的 SQL 脚本或现有数据表初始化；
具体库名与账号以你的环境为准。

建议在开发环境使用独立数据库，避免与生产数据混用。

## 4. 准备 Redis

本地启动 Redis，默认监听 `127.0.0.1:6379`：

```bash
redis-server
```

如果使用 Docker：

```bash
docker run -d --name escore-redis -p 6379:6379 redis:7-alpine
```

如果 Redis 设置了密码，需要同步填写到 `Node/config.ts` 的 `redis.pass`。

## 5. 配置应用

后端配置集中在 `Node/config.ts`，按环境分为 `debug` 与 `production` 两套对象。
开发环境至少要检查以下项目：

```ts title="Node/config.ts（节选）"
const debug = {
  env: 'D',
  http_port: 3011,
  http_base: '/app',
  wss_port: 3012,
  wss_base: '/io',
  redis: {
    host: '127.0.0.1',
    port: 6379,
    pass: '',
    prefix: 'newlan:',
  },
  // MySQL、MQTT、第三方服务的配置也在此处
};
```

> 实际字段以仓库中的 `Node/config.ts` 为准。不要把真实生产密钥提交到 Git。

完整的配置说明见[配置说明](./configuration.md)。

## 6. 可选：启动 MQTT

如果暂时不使用 IoT 设备接入，可以跳过这一步。需要设备能力时，先启动 EMQX：

```bash
docker run -d \
  --name escore-mqtt \
  --restart unless-stopped \
  -p 1883:1883 \
  -p 8083:8083 \
  -p 18083:18083 \
  -e EMQX_DASHBOARD__DEFAULT_PASSWORD='ESCore@123' \
  emqx/emqx:5.8.0
```

Windows PowerShell 不支持行尾的 `\` 续行，请把命令写成一行，或使用反引号 `` ` `` 续行。
设备接入的完整步骤见 [MQTT 与 IoT](./mqtt-iot.md)。

## 7. 检查端口

ESCore 默认使用以下端口：

| 端口 | 服务 | 说明 |
| --- | --- | --- |
| `3011` | HTTP API | Express，默认基础路径 `/app` |
| `3012` | 实时通道 | uWebSockets + Socket.IO，路径 `/io` |
| `443` | 前端开发服务器 | Vite 自签名 HTTPS，可修改 |
| `1883` | MQTT | 仅在启用 EMQX 时需要 |

检查端口是否被占用：

```powershell title="Windows PowerShell"
netstat -ano | findstr :3011
netstat -ano | findstr :3012
```

```bash title="Linux / macOS"
lsof -i:3011
lsof -i:3012
```

## 下一步

环境准备好之后，进入[快速开始](./quick-start.md)启动服务。如果遇到依赖或版本问题，先看[常见问题](./faq.md)。