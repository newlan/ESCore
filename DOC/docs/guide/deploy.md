---
sidebar_position: 5
title: 部署指南
---

# 部署指南

构建产物是纯静态文件，放在任何能托管静态资源的地方都可以。

```bash
npm run build   # 产物在 build/
```

## 部署前必改的配置

打开 `docusaurus.config.js`，把三处改成你自己的：

```js {2,4,5}
  url: 'https://your-domain.com',
  baseUrl: '/',
  organizationName: 'your-github-name',
  projectName: 'doc',
```

部署到**项目页**（`https://<用户名>.github.io/<仓库名>/`）时，`baseUrl` 必须写成 `/<仓库名>/`；部署到**用户主页**（`https://<用户名>.github.io/`）或独立域名时才用 `/`。

## 方案一：GitHub Pages

仓库已带工作流 `.github/workflows/deploy.yml`：推到 `main` 分支即自动构建并发布。

前提（只需设置一次）：

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**；
2. 如果站点不在仓库根目录（比如项目在 `DOC/` 子目录），把工作流里的 `working-directory` 改成对应目录，或把 `DOC/` 单独建一个仓库。

也可以不用 Actions，手动发布到 `gh-pages` 分支：

```bash
npm run deploy
```

## 方案二：Vercel / Netlify

- **Vercel**：导入仓库，Framework Preset 选 Docusaurus，Build Command `npm run build`，Output Directory `build`。
- **Netlify**：Build command `npm run build`，Publish directory `build`。

两者都自带 HTTPS 和 CDN，不需要改 `baseUrl`（保持 `/` 即可）。

## 方案三：自己的服务器 / Nginx

把 `build/` 整个目录传到服务器，例如 `/var/www/doc`：

```nginx title="/etc/nginx/conf.d/doc.conf"
server {
    listen 80;
    server_name doc.example.com;
    root /var/www/doc;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html /404.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

`try_files` 里的 `$uri.html` 是为了兼容 `trailingSlash: false` 的路径风格。

## 方案四：对象存储

阿里云 OSS、腾讯云 COS、七牛等都可以直接托管静态网站，把 `build/` 上传后开启静态网站托管，再把 404 页面指向 `404.html` 即可。

## 部署到子路径

如果只能部署在 `https://example.com/docs/` 这样的子路径下：

```js
url: 'https://example.com',
baseUrl: '/docs/',
```

所有资源引用和站内链接都会自动加上前缀，不需要手改内容。