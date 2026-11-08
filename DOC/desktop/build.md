---
sidebar_position: 3
title: 桌面端打包与发布
description: 使用 electron-builder 生成 Windows 安装包，配置签名、自动更新与发布流程。
---

# 桌面端打包与发布

桌面端最终交付给用户的是一个可安装、可升级、可信任的 Windows 应用。推荐使用 **electron-builder** 生成 NSIS 安装包，
配合代码签名与 `electron-updater` 完成分发布。

## 构建流程

```text
Vue 渲染进程构建
        │
        ▼
dist/（HTML / JS / CSS）
        │
        ▼
Electron 主进程 / preload 编译
        │
        ▼
electron-builder 打包
        │
        ├── ESCore-Setup-3.6.2.exe
        └── latest.yml（自动更新元数据）
```

## 安装依赖

```bash
npm install -D electron electron-builder
npm install electron-updater
```

`package.json` 中增加脚本：

```json
{
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "dist:win": "npm run build && electron-builder --win nsis"
  }
}
```

## electron-builder 配置

```yaml title="electron-builder.yml"
appId: com.escore.desktop
productName: ESCore
copyright: Copyright © 2026 ESCore

directories:
  output: release
  buildResources: resources

files:
  - dist/**
  - electron/**
  - package.json

win:
  target:
    - target: nsis
      arch:
        - x64
  icon: resources/icon.ico
  artifactName: ESCore-Setup-${version}.${ext}
  signingHashAlgorithms:
    - sha256

nsis:
  oneClick: false
  perMachine: false
  allowToChangeInstallationDirectory: true
  createDesktopShortcut: true
  createStartMenuShortcut: true
  shortcutName: ESCore
  deleteAppDataOnUninstall: false

publish:
  provider: github
  owner: newlan
  repo: ESCore
```

`appId` 建议使用稳定、唯一的反向域名；一旦发布后不要随意修改，否则可能影响升级与系统关联。

## 图标与资源

准备：

- `icon.ico`：Windows 图标，建议包含 16 / 24 / 32 / 48 / 64 / 128 / 256 多尺寸；
- 安装向导图、应用内 Logo；
- 许可证文件；
- 版本号与公司信息。

图标不清晰、尺寸缺失会导致任务栏、开始菜单和安装包显示异常。

## 代码签名

未签名的安装包会触发 Windows SmartScreen 警告，用户需要额外点击“仍要运行”。正式发布建议使用：

- OV / EV 代码签名证书；
- 云签名服务（如 Azure Trusted Signing）；
- 企业内部的签名基础设施。

签名时注意：

1. 使用 SHA-256；
2. 添加可信时间戳；
3. 私钥与密码不进入仓库；
4. CI 中通过 Secrets 注入；
5. 发布前用 `signtool verify /pa` 验证。

不要为了“安装顺畅”而指导用户永久关闭 SmartScreen 或杀毒软件。

## 自动更新

```ts title="主进程（示意）"
import {autoUpdater} from 'electron-updater';

autoUpdater.autoDownload = false;
autoUpdater.on('update-available', (info) => {
  // 通知渲染进程：有新版本
});

export async function checkForUpdates() {
  await autoUpdater.checkForUpdates();
}
```

更新策略建议：

- 启动后延迟检查，避免影响首屏；
- 下载前提示用户，安装前保存未提交数据；
- 支持“稍后提醒”和“跳过此版本”；
- 灰度发布，先让小比例用户升级；
- 保留上一版本回滚方案；
- 更新源使用 HTTPS，并校验签名。

## 版本号

遵循语义化版本：

```text
主版本.次版本.修订号
3.6.2
```

- 修复问题：`3.6.3`
- 向后兼容的新功能：`3.7.0`
- 不兼容变更：`4.0.0`

每次发布前更新 `package.json` 的 `version`，否则自动更新无法判断新旧。

## 发布检查清单

- [ ] 渲染进程、主进程与 preload 均通过构建
- [ ] 安装包可在干净的 Windows 10/11 机器安装与卸载
- [ ] 桌面、开始菜单、任务栏图标正常
- [ ] 登录、实时消息、文件、通知与托盘功能验证
- [ ] 断网、休眠唤醒、代理与证书场景验证
- [ ] 安装包已签名并带时间戳
- [ ] `latest.yml` 与安装包一起上传
- [ ] 自动更新从旧版本升级成功
- [ ] 用户数据目录与卸载策略符合预期
- [ ] 发布说明包含变更、已知问题与回滚方式

## 分发方式

| 方式 | 适用 |
| --- | --- |
| 官网下载 | 面向外部用户，配合 CDN 与版本说明 |
| GitHub Releases | 开源项目、内测与历史版本归档 |
| 企业内部分发 | 通过 MDM、软件中心或内部下载站 |
| 自动更新 | 已安装用户的持续升级 |

无论哪种方式，都建议同时提供：

- 安装包 SHA-256；
- 版本说明；
- 系统要求；
- 卸载与数据清理说明；
- 安全问题反馈渠道。

## 与文档站联动

发布新版本后，同步更新：

- 桌面端介绍页的截图与功能说明；
- 版本号与更新日志；
- 兼容的 ESCore 服务端版本；
- 已知问题与回滚方式。

截图替换路径见[扩展文档站](/docs/extend#替换软件截图)。