# DOC 文档站

基于 [Docusaurus 3](https://docusaurus.io) 的中文文档站骨架：官网首页 + 文档 + 博客 + 本地中文搜索 + 图片放大 + GitHub Pages 部署。

## 环境要求

- Node.js ≥ 20（当前机器可用 `nvm use 22` 切换）
- npm

## 快速开始

```bash
npm install
npm run start      # 开发预览 http://localhost:3000
npm run build      # 构建到 build/
npm run serve      # 预览构建产物
```

## 目录说明

```text
DOC/
├── docs/                  # 文档内容，目录即侧边栏
│   ├── intro.md           # 简介
│   ├── install.md         # 安装与运行
│   ├── faq.md             # 常见问题
│   ├── quick-start/       # 快速开始
│   └── guide/             # 写作指南、部署指南
├── blog/                  # 博客文章（authors.yml 管理作者）
├── src/
│   ├── css/custom.css     # 主题色、字体、正文样式
│   ├── pages/index.js     # 首页
│   └── components/HomepageFeatures/  # 首页三张特性卡片
├── static/img/            # 静态资源，引用路径为 /img/xxx
├── docusaurus.config.js   # 站点主配置
├── sidebars.js            # 侧边栏（按目录自动生成）
└── .github/workflows/     # GitHub Pages 自动部署
```

## 第一次改成自己的

1. `docusaurus.config.js`：`title`、`tagline`、`url`、`baseUrl`、`organizationName`、`projectName`、导航栏与页脚链接；
2. `src/css/custom.css`：改 `--ifm-color-primary` 系列变量换主题色；
3. `static/img/logo.svg`：替换成自己的 logo（文件名保持不变最省事）；
4. `docs/`：删除示例、开始写自己的内容。

## 部署

### GitHub Pages（已配好工作流）

仓库 Settings → Pages → Source 选 **GitHub Actions**，推到 `main` 即自动发布。

- 站点在仓库根目录：工作流可直接用；
- 站点在 `DOC/` 子目录：把 `.github/workflows/deploy.yml` 挪到仓库根目录，并在 build 步骤前设置 `working-directory: DOC`、`cache-dependency-path: DOC/package-lock.json`、产物路径 `DOC/build`；
- 部署到项目页时 `baseUrl` 必须是 `/<仓库名>/`。

### 其它平台

Vercel / Netlify：构建命令 `npm run build`，输出目录 `build`。自有服务器：把 `build/` 上传到 Nginx 的站点目录，详见 `docs/guide/deploy.md`。

## 说明

- 构建时若提示 `Sorry, the last update options require Git`，是因为当前目录还不是 Git 仓库；纳入版本管理后会自动显示「最后更新时间/作者」，不需要该功能可在 `docusaurus.config.js` 里删掉 `showLastUpdateAuthor` / `showLastUpdateTime`。
- 依赖安装时 npm 会在 `D:\github\tt\.npm-cache` 里存缓存（本机沙箱限制所致），可随时删除；想改回默认缓存，删掉该目录并去掉 `npm_config_cache` 环境变量即可。