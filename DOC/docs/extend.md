---
sidebar_position: 11
title: 扩展文档站
description: 如何新增文档、调整侧边栏、替换截图、修改样式并发布这个 Docusaurus 文档站。
---

# 扩展文档站

这个文档站本身也是一份可以持续维护的工程。下面说明常见扩展方式，方便后续新增章节、替换截图和调整设计。

## 目录结构

```text
DOC/
├─ docs/                        企业中台与微服务文档
├─ desktop/                     Windows 桌面端文档
├─ app/                         移动 App 文档
├─ src/
│  ├─ pages/
│  │  ├─ index.js               首页
│  │  ├─ intro.mdx              简介
│  │  ├─ thanks.mdx             鸣谢开源
│  │  └─ about.js               关于作者
│  ├─ components/               页面组件
│  └─ css/custom.css            全局主题
├─ static/img/
│  ├─ architecture.png          原始架构图
│  ├─ architecture.webp         页面实际使用的压缩图
│  └─ screenshots/              软件截图占位图
├─ sidebars.js                  企业中台侧边栏
├─ sidebarsDesktop.js           桌面端侧边栏
├─ sidebarsApp.js               移动端侧边栏
├─ docusaurus.config.js         站点主配置
└─ DEPLOY.md                    GitHub Pages 部署说明
```

## 新增一篇文档

在对应目录下新建 `.md` 或 `.mdx` 文件：

```md title="docs/my-topic.md"
---
title: 我的主题
description: 一句话说明这篇文档解决什么问题。
---

# 我的主题

正文内容。
```

然后在侧边栏中加入文档 ID。文档 ID 默认是相对于目录的路径，不含扩展名：

```js title="sidebars.js"
const sidebars = {
  docs: [
    'intro',
    // ...
    'my-topic',
  ],
};
```

如果是 `.mdx` 文件，也可以直接使用 React 组件：

```mdx
import ArchitectureFigure from '@site/src/components/ArchitectureFigure';

# 我的架构页

<ArchitectureFigure />
```

## 新增一个分类

```js title="sidebars.js"
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: '业务实践',
      collapsed: false,
      items: ['my-topic', 'another-topic'],
    },
  ],
};
```

分类会显示为可折叠菜单。`collapsed: false` 表示默认展开。

## 新增一个独立板块

桌面端和 App 文档使用了独立的 docs 插件实例：

```js title="docusaurus.config.js"
plugins: [
  [
    require.resolve('@docusaurus/plugin-content-docs'),
    {
      id: 'desktop',
      path: 'desktop',
      routeBasePath: 'desktop',
      sidebarPath: require.resolve('./sidebarsDesktop.js'),
    },
  ],
],
```

如果要增加第三个板块，复制一份配置，修改 `id`、`path`、`routeBasePath` 与侧边栏文件即可。
记得同步修改导航栏和本地搜索的 `docsRouteBasePath`。

## 替换软件截图

Windows 桌面端与移动 App 的截图位已经预留好，直接用同名图片覆盖即可。

### Windows 桌面端

```text
static/img/screenshots/windows/windows-main.png
static/img/screenshots/windows/windows-realtime.png
static/img/screenshots/windows/windows-settings.png
```

推荐尺寸：`1440 × 900`，PNG 或 JPG 均可（如果换成 JPG，需要同时修改组件中的文件扩展名）。

### 移动 App

```text
static/img/screenshots/app/app-home.png
static/img/screenshots/app/app-messages.png
static/img/screenshots/app/app-profile.png
```

推荐尺寸：`750 × 1624`。

替换后执行：

```bash
npm run start
```

如果截图没有更新，先清理浏览器缓存，或执行 `npm run clear` 后重启。

### 修改截图标题与说明

编辑：

- `desktop/intro.md` 中的 `ScreenshotGallery` 数据；
- `app/intro.md` 中的 `ScreenshotGallery` 数据。

如果新增截图，在对应数组中增加一项，并把图片放到相同目录。

## 替换架构图

根目录的 `架构图.png` 是原始文件，页面使用 `static/img/architecture.webp`。替换步骤：

1. 用新图覆盖 `static/img/architecture.png`；
2. 重新生成 WebP（需要 Pillow）：

```bash
python scripts/generate-assets.py
```

3. 刷新页面，确认图片清晰度与比例。

如果新图不是 16:9，请同步检查 `ArchitectureFigure` 组件的容器样式。

## 修改首页

首页文件是 `src/pages/index.js`，样式是 `src/pages/index.module.css`。

- 文案、能力卡片、场景、终端介绍都在 `index.js` 顶部的数据数组中；
- 颜色、间距、响应式布局在 `index.module.css`；
- 全局主色与字体在 `src/css/custom.css`。

修改后运行：

```bash
npm run start
```

## 修改站点信息

`docusaurus.config.js` 中需要关注：

| 配置 | 当前值 | 说明 |
| --- | --- | --- |
| `title` | ESCore 企业实时通信框架 | 浏览器标题与品牌名 |
| `tagline` | 以实时通信为内核…… | 首页副标题 |
| `url` | `https://newlan.github.io` | 站点域名 |
| `baseUrl` | `/ESCore/` | GitHub 项目页路径 |
| `organizationName` | `newlan` | GitHub 用户名 |
| `projectName` | `ESCore` | 仓库名 |
| `themeConfig.navbar` | 导航栏 | 新增板块时同步修改 |
| `themeConfig.footer` | 页脚 | 链接与版权 |

部署到独立文档仓库时，`baseUrl` 需要改成 `/文档仓库名/`，或通过环境变量覆盖（见 `DEPLOY.md`）。

## 内容写作约定

- 一篇文档只解决一个明确问题，标题尽量具体；
- 先给结论或步骤，再解释原因；
- 代码块标注语言，命令区分 Windows 与 Linux / macOS；
- 外部链接使用完整 URL，并加 `target="_blank"`（React 组件中）；
- 站内链接使用相对路径，例如 `./install.md`；
- 图片放在 `static/img/`，不要引用本地绝对路径；
- 不要把真实密钥、Token、证书、用户数据写进文档。

## 本地构建检查

```bash
npm run build
npm run serve
```

`npm run build` 会检查断链、Markdown 链接和路由。构建通过后再提交，能避免线上 404。

如果修改了插件、侧边栏或配置：

```bash
npm run clear
npm run start
```

## 发布

文档站的发布流程与 ESCore 应用部署是分开的。完整步骤见项目根目录的 [DEPLOY.md](https://github.com/newlan/ESCore/blob/master/DOC/DEPLOY.md)。

核心流程：

1. 提交并推送文档变更；
2. GitHub Actions 自动构建；
3. 构建产物发布到 GitHub Pages；
4. 在仓库 **Settings → Pages** 中确认 Source 为 **GitHub Actions**。

## 建议的维护节奏

- 新功能上线时同步补充对应文档；
- 每个版本更新后检查快速开始是否仍可执行；
- 定期检查外部链接与依赖版本；
- 截图变更时同步替换占位图，避免文档与产品脱节。