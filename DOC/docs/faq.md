---
sidebar_position: 6
title: 常见问题
---

# 常见问题

## 启动时报 Node 版本不匹配

Docusaurus 3.10 要求 Node ≥ 20。用 `node -v` 确认，升级或切换：

```bash
nvm install 22
nvm use 22
```

删掉 `node_modules` 和 `package-lock.json` 后重装一次更稳妥。

## 改了配置没生效

```bash
npm run clear
npm run start
```

`.docusaurus/` 是构建缓存，改插件、侧边栏、i18n 配置后清一次最省事。

## 搜索框搜不到内容

本地搜索是在 `npm run build` 时生成索引的，开发模式下索引的是当前内容，通常没问题。如果线上搜不到：

1. 确认构建日志里没有搜索插件报错；
2. 确认 `docsRouteBasePath` 与实际文档路由一致（默认 `/docs`）；
3. 中文分词依赖 `@node-rs/jieba`，如果安装时跳过了可选依赖，重装一次即可。

## 站点样式丢失、链接 404

基本是 `baseUrl` 配错了。项目页必须是 `/<仓库名>/`，且结尾带斜杠。

## 部署后刷新 404

静态托管平台需要把未知路径回落到 `404.html`（GitHub Pages 自带），Nginx 参考[部署指南](./guide/deploy.md)里的 `try_files` 配置。

## 文档里的图片不显示

放在 `static/img/` 下的图片要用 `/img/xxx.png` 绝对路径引用，不要写 `static/img/xxx.png`。

## 想换成自己的主题色

改 `src/css/custom.css` 顶部的 `--ifm-color-primary` 系列变量即可，深浅色模式各有一套。

## 想接入 Algolia 搜索

去掉 `themes` 里的本地搜索，在 `themeConfig.algolia` 填入 Algolia DocSearch 的 `appId`、`apiKey`、`indexName`。没有备案或不想依赖外部服务时，本地搜索更省心。