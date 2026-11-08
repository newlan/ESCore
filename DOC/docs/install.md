---
sidebar_position: 2
title: 安装与运行
---

# 安装与运行

## 环境要求

- **Node.js ≥ 20**（本项目用 Docusaurus 3.10，Node 18 会报引擎不匹配）
- npm 或 pnpm 任选其一

先确认版本：

```bash
node -v   # 期望 v20.x 或更高
npm -v
```

如果机器上装了 nvm，可以切到 20/22：

```bash
nvm use 22
```

## 安装依赖

在 `DOC` 目录下执行：

```bash
npm install
```

国内网络较慢时可以临时换镜像：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 本地开发

```bash
npm run start
```

默认打开 `http://localhost:3000`，改 Markdown 会热更新，不需要重启。

换端口：

```bash
npm run start -- --port 4000
```

## 构建与预览

```bash
npm run build     # 产物在 build/，可上传到任意静态服务器
npm run serve     # 本地预览 build/ 的产物
```

## 常用清理

改了配置或插件后出现奇怪的缓存问题时：

```bash
npm run clear
```

它会删掉 `.docusaurus/` 缓存，再 `npm run start` 即可。