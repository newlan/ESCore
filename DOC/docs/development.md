---
sidebar_position: 6
title: 开发指南
description: ESCore 的目录结构、后端领域模块、前端页面与实时事件的开发约定。
---

# 开发指南

ESCore 的开发方式可以概括为：**先找领域，再定接口，最后接实时**。

- **领域**决定代码放在哪个模块，避免所有逻辑堆进入口文件；
- **接口**决定前后端如何协作，包括路径、鉴权、参数与错误语义；
- **实时**决定哪些状态变化需要主动推送，而不是靠前端轮询。

下面以“新增一个业务模块”为主线，说明推荐的开发路径。具体函数名与文件组织以仓库现有代码为准。

## 目录结构

```text
ESCore/
├─ Node/                        后端（TypeScript）
│  ├─ server.ts                 入口：Express + uWebSockets + Socket.IO
│  ├─ config.ts                 全局配置：debug / production
│  ├─ pm.json                   PM2 部署配置
│  ├─ dist/                     tsc 编译产物
│  └─ src/libs/
│     ├─ io.ts                  业务上下文与实时通道装配
│     ├─ uWebSockets/           uWebSockets.js 预编译 .node
│     ├─ sys/mqtt.ts            MQTT 设备接入
│     ├─ db/                    数据访问、分页与数据表
│     └─ api/                   业务 API（用户、商户、订单、支付、微信等）
├─ Vue/                         前端（Vue 3 + Vite）
│  ├─ src/                      页面、组件、状态与工具
│  └─ .env.development / .env.production
├─ public/                      前端构建产物
├─ types/                       全局类型声明
├─ DOC/                         项目文档站
├─ vite.config.ts               前端构建与开发代理
├─ tsnode.json                  后端编译配置
└─ package.json                 依赖与 npm 脚本
```

## 后端：新增一个领域模块

### 1. 明确边界

先写清楚这个模块负责什么、不负责什么。例如“公告模块”负责公告的创建、发布、撤回与已读状态，
不负责用户权限模型本身，也不直接处理支付。

一个领域模块通常包含：

| 层 | 职责 | 不应该做 |
| --- | --- | --- |
| Route / Controller | 解析请求、鉴权、参数校验、调用 Service | 写复杂业务逻辑 |
| Service | 领域规则、事务编排、事件触发 | 直接拼 SQL、返回 Express 对象 |
| DB / Repository | 数据查询与持久化 | 处理 HTTP 状态码 |
| Type / Model | 领域模型、入参出参类型 | 依赖具体框架 |

### 2. 定义类型与数据表

```ts title="types/notice.ts（示意）"
export interface Notice {
  id: number;
  tenantId: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'revoked';
  createdAt: Date;
}
```

数据表字段应和领域模型保持一致，并为租户、状态、创建时间等常用查询条件建立索引。
涉及金额、库存、支付状态等关键字段时，使用事务与幂等键，避免并发覆盖。

### 3. 编写 Service

```ts title="Node/src/libs/api/notice/service.ts（示意）"
import type {Notice} from '../../../../types/notice';

export async function publishNotice(notice: Notice, operatorId: number) {
  if (notice.status === 'published') {
    return notice;
  }

  // 1. 校验权限与租户
  // 2. 更新状态并写入审计日志
  // 3. 通过实时通道推送 notice:published
  return {...notice, status: 'published' as const};
}
```

Service 不依赖 `req` / `res`，这样才能被 HTTP、定时任务、MQTT 回调或消息消费者复用。

### 4. 注册路由

```ts title="Node/src/libs/api/notice/index.ts（示意）"
import {Router} from 'express';
import {publishNotice} from './service';

const router = Router();

router.post('/notice/:id/publish', async (req, res, next) => {
  try {
    // 鉴权、参数校验与租户校验
    const result = await publishNotice(req.body.notice, req.user.id);
    res.json({ok: true, data: result});
  } catch (error) {
    next(error);
  }
});

export default router;
```

新增接口应继续使用 `http_base`（默认 `/app`）作为基础路径，并复用现有的鉴权、错误处理与日志中间件。
不要在每个模块里重复实现一套登录校验。

### 5. 接入实时事件

状态变化需要通知其他端时，通过统一的 `io` 上下文推送：

```ts title="实时推送（示意）"
io.to(`tenant:${notice.tenantId}`).emit('notice:published', {
  id: notice.id,
  title: notice.title,
  publishedAt: Date.now(),
});
```

事件命名建议使用 `领域:动作` 的形式，例如：

```text
order:created
order:paid
notice:published
device:online
device:telemetry
agent:stream
```

事件负载只放前端真正需要的字段，避免把完整数据库行或敏感信息推送到所有客户端。

## 前端：页面与数据流

前端使用 Vue 3 + Vite。新增一个页面通常涉及：

1. `src/views` 下的页面组件；
2. `src/router` 中的路由与权限配置；
3. `src/api` 中的请求封装；
4. `src/store`（Pinia）中的跨页面状态；
5. 需要实时更新的数据，通过 Socket.IO 事件订阅。

```ts title="前端请求（示意）"
import request from '@/utils/request';

export function publishNotice(id: number) {
  return request.post(`/notice/${id}/publish`);
}
```

请求层应统一处理：

- Token 注入与过期跳转；
- 业务错误提示；
- 超时、取消请求与重试策略；
- 租户 / 环境标识等公共请求头。

### 实时事件与页面状态

```ts title="前端订阅（示意）"
import {onMounted, onBeforeUnmount} from 'vue';
import {socket} from '@/utils/socket';

function useNoticeRealtime(onPublished: (payload: NoticePayload) => void) {
  onMounted(() => {
    socket.on('notice:published', onPublished);
  });

  onBeforeUnmount(() => {
    socket.off('notice:published', onPublished);
  });
}
```

组件卸载时务必移除监听，避免重复订阅与内存泄漏。页面切换、断线重连后，应重新拉取一次关键数据，
不能假设实时事件一定不会丢失。

## 接口协作约定

- 路径使用小写与复数资源名，例如 `/orders`、`/notices`；
- 所有业务接口默认需要鉴权，公开接口显式标注；
- 入参校验失败返回明确的字段错误，而不是只返回“参数错误”；
- 金额、时间、枚举等字段在前后端使用统一的格式；
- 列表接口明确分页、排序与过滤参数；
- 破坏性变更需要版本化或兼容期，不要静默修改已有字段语义。

## 数据库与事务

- 涉及多表一致性时使用事务；
- 支付回调、设备指令、消息重试必须幂等；
- 大列表查询避免 `SELECT *` 与无索引条件；
- 对软删除、租户隔离与数据权限做统一封装；
- 迁移脚本与代码一起评审，生产环境先备份。

## 开发完成检查

- [ ] 新模块有清晰的领域边界和类型定义
- [ ] 接口已接入统一鉴权、校验与错误处理
- [ ] 关键写操作有事务、幂等或唯一约束
- [ ] 实时事件有明确的命名、房间与负载
- [ ] 前端组件卸载时移除事件监听
- [ ] 日志不包含密码、Token、证书与用户隐私
- [ ] 已在本地验证 HTTP、WebSocket 与断线重连
- [ ] 已补充必要的文档或接口说明

## 相关阅读

- [架构设计](./architecture.mdx)
- [实时通道设计](./realtime.md)
- [MQTT 与 IoT](./mqtt-iot.md)
- [生产部署](./deploy.md)