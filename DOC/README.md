# ESCore 文档站

ESCore 的官方文档与项目主页，基于 [Docusaurus 3](https://docusaurus.io) 构建，发布到 GitHub Pages。

站点包含：

- 项目首页与简介（架构图、适用场景、技术栈）
- 企业中台 / 微服务文档（安装、快速开始、架构、配置、开发、实时通道、IoT、部署、FAQ）
- Windows 桌面端文档（Electron、截图位、开发、打包）
- 移动 App 文档（uni-app、HBuilderX、截图位、开发、打包）
- 鸣谢开源
- 关于作者与联系方式

## 本地开发

环境要求：Node.js ≥ 20。

```bash
cd DOC
npm install
npm run start
```

默认地址：`http://localhost:3000/ESCore/`（`baseUrl` 默认为 `/ESCore/`）。

## 构建

```bash
npm run build
npm run serve
```

构建产物在 `build/`，是纯静态文件。

## 目录

```text
DOC/
├─ docs/                        企业中台与微服务
├─ desktop/                     Windows 桌面端
├─ app/                         移动 App
├─ src/
│  ├─ pages/                    首页、简介、鸣谢、关于
│  ├─ components/               页面组件
│  └─ css/custom.css            全局主题
├─ static/img/
│  ├─ architecture.png          原始架构图
│  ├─ architecture.webp         页面使用的架构图
│  └─ screenshots/              软件截图（可直接替换）
├─ deploy/
│  └─ escore-docs-pages.yml     放到 ESCore 根目录使用的工作流模板
├─ docusaurus.config.js         站点配置
├─ sidebars*.js                 三个文档板块的侧边栏
├─ scripts/generate-assets.py   生成占位图与社交分享图
├─ DEPLOY.md                    GitHub Pages 部署说明
└─ README.md
```

## 替换截图

### Windows 桌面端

```text
static/img/screenshots/windows/windows-main.png
static/img/screenshots/windows/windows-realtime.png
static/img/screenshots/windows/windows-settings.png
```

推荐尺寸 `1440 × 900`。

### 移动 App

```text
static/img/screenshots/app/app-home.png
static/img/screenshots/app/app-messages.png
static/img/screenshots/app/app-profile.png
```

推荐尺寸 `750 × 1624`。

覆盖同名文件后刷新页面即可。重命名或新增图片时，需要同步修改 `desktop/intro.mdx` 或 `app/intro.mdx` 中的数组。

## 修改内容

- 首页：`src/pages/index.js` + `src/pages/index.module.css`
- 简介：`src/pages/intro.mdx`
- 鸣谢：`src/pages/thanks.mdx`
- 关于作者：`src/pages/about.js`
- 文档：`docs/`、`desktop/`、`app/`
- 主题色与全局样式：`src/css/custom.css`
- 站点标题、导航、页脚、部署地址：`docusaurus.config.js`

新增文档、调整侧边栏、替换架构图等详细说明见
[扩展文档站](https://newlan.github.io/ESCore/docs/extend)。

## 部署

完整步骤见 [DEPLOY.md](./DEPLOY.md)。

**推荐方案**：文档放在 `ESCore/DOC/`，把 `deploy/escore-docs-pages.yml` 复制到
`ESCore/.github/workflows/docs-pages.yml`，然后在仓库 **Settings → Pages** 中选择
**GitHub Actions**。

站点地址：

```text
https://newlan.github.io/ESCore/
```

> GitHub 只读取仓库根目录的 `.github/workflows/`。`DOC/.github/workflows/` 不会在
> ESCore 主仓库中自动执行，必须使用根目录工作流，或把文档站作为独立仓库发布。

## 技术栈

- Docusaurus 3.10
- React 19
- 本地中文搜索：`@easyops-cn/docusaurus-search-local`
- 图片放大：`docusaurus-plugin-image-zoom`
- 部署：GitHub Actions + GitHub Pages

## 许可

文档内容与 ESCore 项目保持一致，除特别说明外采用 ISC License。第三方依赖与商标归各自作者 / 组织所有。