---
sidebar_position: 9
title: 生产部署
description: 使用 PM2、Nginx 与 Linux 部署 ESCore，包括构建、反向代理、WebSocket、证书与上线检查。
---

# 生产部署

本章部署的是 **ESCore 应用本身**（HTTP API、实时通道与前端静态资源），不是当前这个文档站。
文档站发布到 GitHub Pages 的步骤见项目根目录的 `DEPLOY.md`。

推荐的生产拓扑：

```text
Internet
   │  HTTPS / WSS
   ▼
Nginx（TLS、静态资源、反向代理）
   ├── /            → /var/www/escore/public
   ├── /api/        → 127.0.0.1:3011
   └── /io          → 127.0.0.1:3012（WebSocket Upgrade）
                       │
                       ├── MySQL
                       ├── Redis
                       ├── EMQX
                       └── 对象存储 / 消息队列
```

## 1. 构建

在项目根目录执行：

```bash
# 编译后端 TypeScript
npm run tsc
# 产物：Node/dist

# 构建前端
npm run build
# 产物：public/
```

构建前确认 `NODE_ENV` 与前端环境变量已切换到生产值：

```bash
NODE_ENV=production npm run tsc
```

```powershell title="Windows PowerShell"
$env:NODE_ENV = "production"; npm run tsc
```

## 2. 上传产物

将以下内容部署到服务器：

- `Node/dist`：后端编译产物；
- `Node/pm.json`：PM2 配置；
- `Node/package.json` 与生产依赖（如果 `dist` 需要外部依赖）；
- `public/`：前端静态资源；
- 运行所需的证书、配置与 `.env`（不要放进 Git）。

建议部署目录：

```text
/opt/escore/
├── Node/
│   ├── dist/
│   ├── node_modules/
│   └── pm.json
├── public/
└── shared/
    └── config.local.ts
```

## 3. 使用 PM2 启动

`pm.json` 使用相对路径，因此启动时 **cwd 必须是 `Node` 目录**：

```bash
cd /opt/escore/Node
pm2 start pm.json
pm2 status
pm2 logs WS
```

常用命令：

```bash
pm2 restart WS
pm2 stop WS
pm2 delete WS
pm2 save
pm2 startup
```

`pm2 startup` 会输出一条需要以 root 执行的命令，用于配置开机自启；执行后再 `pm2 save` 保存当前进程列表。

### 多实例

在 `pm.json` 中增加 `instances` 或使用 cluster 模式前，确认：

- 所有实例连接同一个 Redis；
- Socket.IO 使用 Redis Adapter；
- 如启用 long-polling，负载均衡配置了会话保持；
- 定时任务只在一个实例执行，避免重复；
- 日志按实例可区分。

## 4. Nginx 配置

```nginx title="/etc/nginx/conf.d/escore.conf"
upstream escore_http {
    server 127.0.0.1:3011;
    keepalive 32;
}

upstream escore_ws {
    server 127.0.0.1:3012;
    keepalive 16;
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    root /opt/escore/public;
    index index.html;

    client_max_body_size 50m;

    # 前端 SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # HTTP API
    location /api/ {
        proxy_pass http://escore_http;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 后端基础路径（如果前端直接请求 /app）
    location /app/ {
        proxy_pass http://escore_http;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 实时通道
    location /io {
        proxy_pass http://escore_ws;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 75s;
        proxy_send_timeout 75s;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|webp|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

> `/api/` 与 `/app/` 的具体转发规则应与 `vite.config.ts` 中的开发代理和前端请求前缀保持一致。
> 如果前端把 `/api` 重写为 `/app`，请在 Nginx 中保持相同的 rewrite，避免“本地正常、线上 404”。

检查并重载：

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 5. HTTPS 与证书

- 使用 Let's Encrypt、云厂商证书或企业证书；
- 证书链完整，避免部分客户端握手失败；
- 开启 HSTS 前确认所有子域都已支持 HTTPS；
- 证书到期前设置自动续期与告警；
- WebSocket 同样通过 `wss://`，不要混用 `ws://`。

## 6. 密钥与配置

生产环境的敏感配置不要进入仓库：

1. 在部署机上维护 `config.local.ts` 或环境变量；
2. 文件权限限制为运行用户可读；
3. 数据库、Redis、微信支付、短信、对象存储使用独立凭证；
4. 定期轮换密钥并保留回滚方案；
5. 日志中禁止输出 Token、密码、证书和完整用户隐私。

## 7. 上线检查清单

- [ ] `npm run tsc` 与 `npm run build` 均成功
- [ ] MySQL 已备份，迁移脚本已执行
- [ ] Redis 可用，Adapter 连接正常
- [ ] EMQX 已启动（如启用 IoT）
- [ ] `NODE_ENV=production`
- [ ] JWT、数据库、支付等密钥已替换
- [ ] Nginx `/io` 已正确 Upgrade
- [ ] HTTPS / WSS 证书有效
- [ ] PM2 已设置开机自启与日志轮转
- [ ] 防火墙只开放 80 / 443，不暴露 3011 / 3012
- [ ] 已验证登录、核心业务、实时消息与设备链路
- [ ] 已配置监控、告警与备份

## 8. 回滚

发布前保留上一版本的 `Node/dist` 与 `public/`。出现问题时：

```bash
pm2 stop WS
# 恢复上一版本产物与配置
pm2 start pm.json
```

如果包含数据库变更，回滚代码前先评估迁移是否可逆，避免旧代码读取新结构导致二次故障。

## 常见部署问题

| 现象 | 排查 |
| --- | --- |
| 页面 404 / 刷新 404 | `try_files` 与 `index.html` 是否正确 |
| API 404 | `/api` 前缀、rewrite 与 `http_base` 是否一致 |
| WebSocket 连接失败 | `Upgrade`、`Connection`、超时与证书 |
| 静态资源 404 | `root` 是否指向 `public/`，是否配置了 base 路径 |
| 启动后立即退出 | 查看 `pm2 logs WS`，检查端口、数据库、Redis 与配置 |
| 多实例广播丢失 | Redis Adapter 是否连同一个 Redis |

更多问题见[常见问题](./faq.md)。