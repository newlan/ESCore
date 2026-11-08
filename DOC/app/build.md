---
sidebar_position: 3
title: 移动端打包与发布
description: 使用 HBuilderX 完成 App 云打包、H5 构建与小程序发布。
---

# 移动端打包与发布

uni-app 的发布目标不止一个：Android、iOS、H5 与各平台小程序。建议先完成 H5 与 Android 内测，
再逐步推进 iOS 与小程序审核。

## 版本与标识

发布前统一确认：

| 项目 | 说明 |
| --- | --- |
| 应用版本 | `manifest.json` 中的 `version.name`，展示给用户 |
| 版本号 | Android `versionCode` / iOS `build`，每次提交必须递增 |
| 包名 | Android `applicationId`，发布后不可随意修改 |
| Bundle ID | iOS 唯一标识，与证书和描述文件绑定 |
| AppID | DCloud 应用标识，云打包需要 |
| 渠道 | 各应用市场、企业分发或内测渠道 |

## Android 打包

### 1. 生成签名证书

```bash
keytool -genkeypair -v \
  -keystore escore-release.keystore \
  -alias escore \
  -keyalg RSA \
  -keysize 2048 \
  -validity 36500
```

妥善保存 keystore、alias 与密码。丢失签名证书后，已发布应用无法直接升级。

### 2. 配置 manifest

在 HBuilderX 中打开 `manifest.json`：

- **App 常用其它设置**：应用名称、版本；
- **App 图标**：各尺寸图标；
- **App 启动界面**：启动图或自定义；
- **App 权限配置**：只申请实际需要的权限；
- **App 模块配置**：推送、支付、地图、分享等；
- **App 原生插件**：按需引入；
- **Android 包名**：稳定的反向域名。

### 3. 云打包

HBuilderX → **发行 → 原生 App-云打包**：

1. 选择 Android；
2. 使用自有证书，填写 keystore 路径、alias 与密码；
3. 选择正式版；
4. 等待云端构建完成；
5. 下载 APK / AAB。

国内应用市场通常接受 APK；Google Play 需要 AAB。上架前确认目标市场的格式要求。

### 4. 隐私与权限

Android 上架审核越来越关注：

- 隐私政策是否在首次启动前展示；
- 是否在用户同意前收集设备信息；
- 权限申请是否与功能匹配；
- 是否存在后台定位、读取通讯录等敏感行为；
- 第三方 SDK 是否列出并说明用途。

不要为了“先跑起来”而申请全部权限。

## iOS 打包

需要 Apple Developer 账号（个人 / 公司 / 企业），并准备：

- Apple Distribution 证书；
- App ID；
- Provisioning Profile；
- App Store Connect 应用记录；
- 隐私政策与 App 隐私清单；
- 符合 App Store 审核指南的功能说明。

HBuilderX → **发行 → 原生 App-云打包**，选择 iOS，上传证书与描述文件。构建完成后通过 Transporter 或 Xcode
上传到 App Store Connect，再提交审核。

### 常见审核问题

- 使用第三方支付绕过 IAP（虚拟商品 / 订阅）；
- 没有提供账号删除入口；
- 权限说明不清晰；
- 隐私政策缺失或无法访问；
- 测试账号不可用；
- 崩溃、白屏或关键功能不可用。

## H5 发布

如果项目是 CLI 工程：

```bash
npm run build:h5
```

HBuilderX 工程可以在 **发行 → 网站-PC Web 或手机 H5** 中生成。

构建产物通常为 `dist/build/h5`（以实际配置为准），部署到 Nginx 或静态托管：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

如果部署在子路径：

```js
// manifest.json → h5 → router → base
"base": "/app/"
```

并确保 API / WSS 地址不会因路径前缀而错误拼接。

## 小程序发布

1. 在 `manifest.json` 中填写小程序 AppID；
2. 在 HBuilderX 中运行到对应小程序开发者工具；
3. 检查域名白名单与业务域名；
4. 上传代码，填写版本号与项目备注；
5. 在平台后台提交审核；
6. 审核通过后发布。

各平台差异较大，至少验证：

- 微信：登录、订阅消息、支付、隐私协议；
- 支付宝：授权、支付、会员；
- 抖音 / 字节：挂载、支付与内容规范；
- 百度 / QQ：登录与分享能力。

## 自动化构建（可选）

CLI 工程可以把 H5 与小程序构建接入 CI：

```yaml
- name: Build H5
  run: npm run build:h5

- name: Upload artifact
  uses: actions/upload-artifact@v4
  with:
    name: h5
    path: dist/build/h5
```

Android / iOS 云打包依赖 DCloud 与证书，通常无法完全脱离 HBuilderX；可以把证书与版本检查纳入发布流程，
但不要在 CI 日志中输出密码。

## 发布检查清单

### 通用

- [ ] 版本号与 build 号已递增
- [ ] API / WSS 使用生产域名与 HTTPS
- [ ] 隐私政策、用户协议、权限说明齐全
- [ ] 登录、支付、推送、实时消息已验证
- [ ] 弱网、断网、前后台切换已验证
- [ ] 图标、启动图、应用名称正确
- [ ] 无测试账号、调试入口与日志泄露

### Android

- [ ] 包名与签名证书正确
- [ ] 权限最小化
- [ ] 目标 SDK 满足应用市场要求
- [ ] APK / AAB 已在真机安装验证
- [ ] 已提供 64 位架构支持（如需要）

### iOS

- [ ] Bundle ID、证书、描述文件匹配
- [ ] 隐私清单与权限文案完整
- [ ] 测试账号与审核说明已填写
- [ ] 无第三方支付绕过 IAP
- [ ] 已通过 TestFlight 验证

### 小程序

- [ ] AppID 与后台配置一致
- [ ] 合法域名已配置
- [ ] 订阅消息模板已申请
- [ ] 审核类目与功能匹配
- [ ] 体验版已完成走查

## 发布之后

- 关注崩溃率、启动时长、页面白屏与网络错误；
- 实时连接失败率与推送到达率单独监控；
- 保留上一版本安装包与证书；
- 版本更新同步到[移动端介绍](./intro.mdx)中的截图与说明；
- 对重大变更准备回滚与公告。

截图替换路径见[扩展文档站](/docs/extend#替换软件截图)。