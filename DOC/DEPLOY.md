# 部署到 GitHub Pages

这个文档站是纯静态站点，使用 Docusaurus 构建，通过 GitHub Actions 发布到 GitHub Pages。

- 仓库：`https://github.com/newlan/ESCore`
- 预计站点：`https://newlan.github.io/ESCore/`
- 构建目录：`build/`
- 部署方式：GitHub Actions → GitHub Pages

先读一个关键点：**GitHub 只会读取仓库根目录的 `.github/workflows/`**。如果文档站在 `ESCore/DOC/` 子目录，
`DOC/.github/workflows/deploy.yml` 不会自动执行。请根据你的仓库形态选择下面两种方案之一。

---

## 方案 A（推荐）：文档留在 ESCore 仓库的 DOC 目录

适合：希望文档和项目代码放在同一个仓库，地址为 `https://newlan.github.io/ESCore/`。

### 1. 确认文件位置

在 ESCore 仓库中：

```text
ESCore/
├── .github/
│   └── workflows/
│       └── docs-pages.yml        ← 需要放在这里
├── DOC/
│   ├── docs/
│   ├── src/
│   ├── static/
│   ├── package.json
│   └── ...
├── Node/
├── Vue/
└── ...
```

把当前文档站的**全部内容**放到 `ESCore/DOC/`。如果当前工作区就是 `D:\github\DOC`，直接复制整个目录即可。

### 2. 添加根仓库工作流

把本项目的：

```text
DOC/deploy/escore-docs-pages.yml
```

复制到：

```text
ESCore/.github/workflows/docs-pages.yml
```

PowerShell 示例：

```powershell
# 在 ESCore 仓库根目录执行
New-Item -ItemType Directory -Force .github\workflows | Out-Null
Copy-Item .\DOC\deploy\escore-docs-pages.yml .\.github\workflows\docs-pages.yml -Force
```

该工作流已经处理好：

- `working-directory: DOC`
- 依赖缓存路径：`DOC/package-lock.json`
- 产物路径：`DOC/build`
- `DOCS_BASE_URL=/ESCore/`（通过仓库名自动生成）

### 3. 开启 GitHub Pages

1. 打开仓库 **Settings → Pages**；
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**；
3. 如果仓库有分支保护或环境限制，确认 `github-pages` 环境允许部署。

### 4. 提交并推送

在 ESCore 仓库根目录执行：

```bash
git status
git add DOC .github/workflows/docs-pages.yml
git commit -m "docs: add ESCore documentation site"
git push origin master
```

如果默认分支是 `main`，把最后一行改成：

```bash
git push origin main
```

### 5. 等待发布

打开仓库的 **Actions** 页面，等待 `Deploy ESCore docs to GitHub Pages` 运行完成。

- 第一次构建通常需要 1–3 分钟；
- 成功后访问 `https://newlan.github.io/ESCore/`；
- 如果页面 404，先确认 Pages 的 Source 已选择 GitHub Actions。

---

## 方案 B：文档站作为独立仓库

适合：希望文档独立维护，或者不想改动 ESCore 主仓库的工作流。

### 1. 新建仓库

在 GitHub 新建一个空仓库，例如：

```text
newlan/ESCore-Docs
```

不要勾选自动生成 README、`.gitignore` 或 License，避免和本地文件冲突。

### 2. 把文档站放到仓库根目录

注意：**不要**把整个 `DOC` 目录再嵌套一层。`package.json`、`.github/` 应该直接在仓库根目录。

```text
ESCore-Docs/
├── .github/workflows/deploy.yml
├── docs/
├── desktop/
├── app/
├── src/
├── static/
├── package.json
└── DEPLOY.md
```

本项目根目录已经包含 `.github/workflows/deploy.yml`，复制时保留即可。

### 3. 初始化并推送

```bash
git init
git add .
git commit -m "docs: initialize ESCore documentation"
git branch -M main
git remote add origin https://github.com/newlan/ESCore-Docs.git
git push -u origin main
```

### 4. 开启 Pages

仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。

工作流会自动把 `DOCS_BASE_URL` 设置为 `/<仓库名>/`，因此站点地址是：

```text
https://newlan.github.io/ESCore-Docs/
```

### 5. 本地预览独立仓库

因为本地默认 `baseUrl` 是 `/ESCore/`，预览独立仓库时可以覆盖：

```powershell
$env:DOCS_BASE_URL = "/ESCore-Docs/"
npm start
```

然后访问 `http://localhost:3000/ESCore-Docs/`。

---

## 两种方案怎么选

| | 方案 A：ESCore/DOC | 方案 B：独立仓库 |
| --- | --- | --- |
| 地址 | `/ESCore/` | `/ESCore-Docs/` |
| 文档与代码同仓 | 是 | 否 |
| 工作流位置 | ESCore 根目录 | 文档仓库根目录 |
| 适合 | 希望随项目一起维护 | 希望独立发布、独立权限 |
| 注意 | 必须把工作流放仓库根目录 | 不要把 DOC 再套一层 |

如果你不确定，选**方案 A**。它最符合当前项目结构，也最接近 `https://newlan.github.io/ESCore/` 这个目标地址。

---

## 为什么工作流里要设置 DOCS_BASE_URL

项目页地址不是域名根目录，而是：

```text
https://newlan.github.io/ESCore/
```

如果 Docusaurus 的 `baseUrl` 还是 `/`，CSS、JS、图片和站内链接都会指向：

```text
https://newlan.github.io/assets/...
```

正确的前缀应该是：

```text
https://newlan.github.io/ESCore/assets/...
```

因此 `docusaurus.config.js` 读取 `DOCS_BASE_URL`，工作流构建时传入仓库名。这样：

- 方案 A：仓库名 `ESCore` → `/ESCore/`
- 方案 B：仓库名 `ESCore-Docs` → `/ESCore-Docs/`

本地默认值同样是 `/ESCore/`，所以本地和方案 A 的行为一致。

---

## 自定义域名（可选）

如果绑定 `docs.example.com`：

1. 在 `docusaurus.config.js` 或构建环境中设置：

```text
DOCS_URL=https://docs.example.com
DOCS_BASE_URL=/
```

2. 在 GitHub Pages 中配置 Custom domain；
3. 配置 DNS：
   - 子域名：`CNAME docs.example.com → newlan.github.io`
   - 根域名：使用 A 记录指向 GitHub Pages 地址；
4. 等待 DNS 与 HTTPS 证书签发。

自定义域名下 `baseUrl` 是 `/`，不要保留 `/ESCore/`。

---

## 常见问题

### Actions 里没有出现工作流

- 确认文件在仓库根目录 `.github/workflows/`；
- 确认 YAML 缩进正确；
- 确认推送的分支在 `on.push.branches` 中；
- 私有仓库需要确认 Actions 没有被禁用。

### Configure Pages 报 `Get Pages site failed` / `Not Found`

说明 **仓库还没有启用 GitHub Pages**，不是构建失败。

处理：

1. 打开 `https://github.com/newlan/ESCore/settings/pages`；
2. 在 **Build and deployment → Source** 中选择 **GitHub Actions**；
3. 回到 **Actions**，打开失败的运行，点击 **Re-run all jobs**。

启用后不需要修改工作流。`actions/configure-pages` 需要先能读取到 Pages 站点配置，否则会返回 404。

### 构建成功，但页面 404

- **Settings → Pages → Source** 是否选择了 **GitHub Actions**；
- `DOCS_BASE_URL` 是否与仓库名一致；
- 是否在 Actions 的 `deploy` job 中成功完成；
- 等待 1–2 分钟，Pages 发布有延迟。

### 页面能打开，但 CSS / JS 丢失

几乎都是 `baseUrl` 配错。项目页必须是 `/<仓库名>/`，结尾要带斜杠。

### 刷新子页面 404

GitHub Pages 对静态站点会回退到 `404.html`。Docusaurus 已经生成 `404.html`；
如果问题持续，检查是否误用了 Jekyll 或其它构建方式。本项目使用 Actions 发布，不经过 Jekyll。

### `npm ci` 失败

`package-lock.json` 与 `package.json` 不一致，或没有提交 lock 文件。本地执行：

```bash
npm install
git add package-lock.json
git commit -m "chore: update lockfile"
```

### 图片不显示

- 图片必须放在 `static/img/` 下；
- 代码中使用 `/img/...`，Docusaurus 会自动拼接 `baseUrl`；
- 不要在 Markdown 里写本地绝对路径（如 `D:\...`）；
- 文件名尽量使用英文，避免部署环境的大小写与编码差异。

### 想撤销自动部署

把 Pages 的 Source 改回 **Deploy from a branch**，或删除根目录工作流。已经发布的站点不会立刻消失。

---

## 发布前检查

- [ ] `npm run build` 本地通过
- [ ] `npm run serve` 本地预览正常
- [ ] `docusaurus.config.js` 中的仓库名与地址正确
- [ ] 根目录工作流位置正确
- [ ] Pages Source 已选择 GitHub Actions
- [ ] 截图已替换（如需要）
- [ ] 没有提交真实密钥、证书或用户数据

发布成功后，建议再检查一遍：

- 首页、简介、企业中台、Windows、App、鸣谢、关于作者；
- 深色模式；
- 搜索；
- 移动端宽度；
- 所有截图与代码块。