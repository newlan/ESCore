---
sidebar_position: 2
title: 桌面端开发
description: Electron 主进程、预加载桥、渲染进程与 ESCore 实时通道的开发实践。
---

# 桌面端开发

本文假设你已经有 Electron 工程，或者准备创建一个新工程。重点不是脚手架命令，而是**进程边界、安全策略与 ESCore 接入方式**。

## 环境准备

| 工具 | 建议版本 |
| --- | --- |
| Node.js | 20 LTS |
| npm / pnpm | npm 10+ / pnpm 9+ |
| Electron | 30+ |
| 构建工具 | electron-vite、Vite 或 Electron Forge |
| 安装包 | electron-builder + NSIS |

开发机建议使用 Windows 10/11 x64；如果同时发布 macOS，需要在 macOS 上完成签名与公证。

## 推荐目录

```text
desktop/
├─ electron/
│  ├─ main.ts              主进程入口
│  ├─ preload.ts           安全桥
│  └─ ipc/                 IPC 处理
├─ src/                    渲染进程（Vue 3）
│  ├─ pages/
│  ├─ components/
│  ├─ stores/
│  ├─ api/
│  └─ utils/socket.ts
├─ resources/              图标、安装包资源
├─ electron-builder.yml    打包配置
└─ package.json
```

具体目录可以按团队习惯调整，但要把主进程、预加载与渲染进程分开，不要让页面代码直接引用 Node 模块。

## 主进程

```ts title="electron/main.ts"
import {app, BrowserWindow, ipcMain, shell} from 'electron';
import path from 'node:path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 640,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.once('ready-to-show', () => mainWindow?.show());

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // 外部链接交给系统浏览器
  mainWindow.webContents.setWindowOpenHandler(({url}) => {
    shell.openExternal(url);
    return {action: 'deny'};
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

生产环境还需要：

- 单实例锁：`app.requestSingleInstanceLock()`；
- 崩溃恢复与日志；
- 禁止任意新窗口与导航；
- 限制 `will-navigate`；
- 配置 CSP；
- 自动更新只在签名版本启用。

## 预加载桥

```ts title="electron/preload.ts"
import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('escoreDesktop', {
  getVersion: () => ipcRenderer.invoke('app:version'),
  openFile: () => ipcRenderer.invoke('dialog:open-file'),
  saveToken: (token: string) => ipcRenderer.invoke('secure:save-token', token),
  onUpdateAvailable: (callback: (info: unknown) => void) => {
    const listener = (_event: unknown, info: unknown) => callback(info);
    ipcRenderer.on('update:available', listener);
    return () => ipcRenderer.removeListener('update:available', listener);
  },
});
```

只暴露业务真正需要的方法，不要暴露通用 `ipcRenderer.invoke(channel, ...args)`，否则页面可以获得任意主进程能力。

## 渲染进程连接 ESCore

```ts title="src/utils/socket.ts"
import {io} from 'socket.io-client';

export function createSocket(token: string) {
  return io(import.meta.env.VITE_API_ORIGIN, {
    path: '/io',
    transports: ['websocket'],
    auth: {token},
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 8000,
  });
}
```

页面卸载或退出登录时调用 `socket.disconnect()`，避免后台保留无效连接。

### Token 与安全存储

桌面端比浏览器更容易受到本地文件与恶意进程影响。建议：

- Token 由主进程写入 Windows Credential Manager / macOS Keychain；
- 渲染进程通过 preload 请求 Token，不写入 `localStorage`；
- 退出登录时同时清理内存、磁盘与自动登录状态；
- 不在日志中打印 Token。

## IPC 设计

IPC 通道按领域命名：

```text
app:version
window:minimize
dialog:open-file
secure:save-token
update:check
```

主进程必须校验参数，不要假设渲染进程传来的路径、URL 或命令是安全的：

```ts title="electron/ipc/dialog.ts"
ipcMain.handle('dialog:open-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{name: 'Documents', extensions: ['pdf', 'docx']}],
  });
  return result.canceled ? null : result.filePaths[0];
});
```

## 开发与调试

1. 启动 Vite 开发服务器；
2. 启动 Electron，加载开发服务器地址；
3. 渲染进程使用 Chromium DevTools；
4. 主进程使用 VS Code 附加调试或 `--inspect`；
5. 预加载脚本修改后需要重启 Electron。

常用调试点：

- `webContents.on('console-message')` 收集渲染进程日志；
- `app.getPath('logs')` 写入主进程日志；
- `--enable-logging` 查看 Chromium 日志；
- 使用 `electron-log` 做文件日志与轮转。

## 常见问题

### 页面 HTTPS，接口连接失败

从 `https://` 页面连接 `ws://` 会被浏览器 / Chromium 拦截。使用 `wss://`，或通过本地反向代理统一协议。

### 自签名证书不被信任

开发环境可以在受控范围内忽略证书错误，但生产环境必须使用受信任证书。不要在正式版本中关闭证书校验。

### CORS 或 Origin 被拒绝

Electron 的 Origin 可能是 `file://`、`app://` 或自定义协议。服务端需要把桌面端 Origin 加入白名单，
或让桌面端通过同源网关访问 API。

### 自动更新失败

检查：

- 安装包是否签名；
- `publish` 配置与更新源是否可访问；
- 版本号是否递增；
- 是否存在阻塞的本地文件写入。

## 质量检查

- [ ] `contextIsolation: true`、`nodeIntegration: false`
- [ ] 预加载只暴露白名单 API
- [ ] 外部链接由系统浏览器打开
- [ ] 已配置 CSP 与导航限制
- [ ] 断线重连、休眠唤醒与网络切换已测试
- [ ] Token 使用安全存储
- [ ] 安装包签名与自动更新已验证

下一步：[桌面端打包](./build.md)。