---
sidebar_position: 8
title: MQTT 与 IoT
description: 使用 EMQX 和 MQTT 5 接入设备，处理心跳、遥测、指令与回执。
---

# MQTT 与 IoT

IoT 能力让 ESCore 不只服务“人使用的终端”，也能连接传感器、网关、门锁、摄像头等设备。

通信路径是：

```text
设备 ── MQTT ──→ EMQX ──→ Node mqtt.ts ──→ 设备服务 ──→ MySQL / Redis
                                                  │
                                                  └── Socket.IO ──→ 管理端
```

## 1. 启动 EMQX

MQTT 是设备接入的前置依赖。建议在启动后端之前完成部署，否则 `libs/sys/mqtt.ts` 会持续重连。

```bash
docker run -d \
  --name escore-mqtt \
  --restart unless-stopped \
  -p 1883:1883 \
  -p 8083:8083 \
  -p 8084:8084 \
  -p 8883:8883 \
  -p 18083:18083 \
  -e EMQX_DASHBOARD__DEFAULT_PASSWORD='ESCore@123' \
  -v escore-mqtt-data:/opt/emqx/data \
  emqx/emqx:5.8.0
```

Windows PowerShell 请把续行符 `\` 换成反引号 `` ` ``，或者把命令写成一行。

| 端口 | 协议 | 用途 |
| --- | --- | --- |
| `1883` | MQTT | 设备明文接入，生产环境建议仅内网开放 |
| `8083` | MQTT over WebSocket | 浏览器或 WebSocket 设备 |
| `8084` | MQTT over WSS | 加密 WebSocket |
| `8883` | MQTTS | TLS 设备接入 |
| `18083` | HTTP | EMQX Dashboard |

验证状态：

```bash
docker ps --filter name=escore-mqtt
docker exec -it escore-mqtt emqx ctl status
```

## 2. 创建认证账号

打开 `http://<服务器IP>:18083`，使用 Dashboard 管理员登录。进入 **Access Control → Authentication**，
新建 `Password-Based` + `Built-in Database` 认证器，并创建与后端配置一致的账号。

然后把 Broker 地址写入 `Node/config.ts`：

```ts
const debug = {
  lock_server: 'mqtt://127.0.0.1:1883',
  lock_name: 'd_backend_server',
};

const production = {
  lock_server: 'mqtt://127.0.0.1:1883',
  lock_name: 'p_backend_server',
};
```

生产环境建议：

- 使用 `mqtts://` 与 `8883`；
- Broker 仅监听内网，不直接暴露 `1883`；
- 为每个环境使用独立账号与 ACL；
- 禁止匿名接入，关闭不需要的监听器。

## 3. 主题设计

主题是设备侧的“接口协议”，一旦上线就要尽量稳定。推荐按设备 ID 与消息类型分层：

```text
device/{deviceId}/status        # 上线 / 离线 / 心跳
device/{deviceId}/telemetry     # 遥测数据
device/{deviceId}/event         # 告警、故障等事件
device/{deviceId}/command       # 平台下发指令
device/{deviceId}/ack           # 设备指令回执
```

约定：

- 设备只能发布自己的 `status`、`telemetry`、`event`、`ack`；
- 平台只发布 `command`；
- 在 EMQX ACL 中按 `clientId` / 用户名限制主题权限；
- 消息体使用稳定的 JSON 结构，并带 `msgId`、`ts`、`version`；
- 高频遥测建议批量上报或按时间窗口聚合。

示例消息：

```json
{
  "msgId": "01J8Z9K3X7",
  "ts": 1762560000000,
  "version": 1,
  "temperature": 26.4,
  "humidity": 58
}
```

## 4. 处理设备状态

后端收到消息后，建议按以下顺序处理：

1. 校验主题、设备身份与消息结构；
2. 使用 `msgId` 做幂等；
3. 更新设备在线状态与最后上报时间；
4. 写入遥测 / 事件数据；
5. 按需通过 Socket.IO 推送 `device:updated` 或 `device:event`；
6. 对关键指令等待 `ack`，超时后重试或标记失败。

设备离线可以通过两种方式判断：

- 设备主动发布离线消息；
- 服务端根据最后心跳时间与阈值判定，并由定时任务扫描。

不要只依赖 Broker 的断开事件，网络抖动与设备休眠都会造成误判。

## 5. 指令下发

```json
{
  "msgId": "cmd-20261108-001",
  "ts": 1762560000000,
  "action": "unlock",
  "params": {
    "duration": 5
  }
}
```

平台侧应记录指令的完整生命周期：

```text
created → sent → acked → succeeded / failed / timeout
```

对门锁、摄像头、工业设备等高风险场景，必须增加操作审计、二次确认、权限校验与超时兜底。

## 6. QoS 与保留消息

| QoS | 语义 | 适用 |
| --- | --- | --- |
| `0` | 最多一次 | 高频遥测，允许少量丢失 |
| `1` | 至少一次 | 大多数业务消息，需要幂等 |
| `2` | 恰好一次 | 代价较高，通常由业务层幂等替代 |

QoS 1 仍可能重复，因此 `msgId` 幂等是必须的。设备在线状态可以使用 retained message，让新订阅者立即获得最后状态，
但要注意清理与过期策略。

## 7. 本地联调

如果本机安装了 Mosquitto 客户端，可以快速验证：

```bash
mosquitto_sub -h 127.0.0.1 -p 1883 -t 'device/+/telemetry' -v
mosquitto_pub -h 127.0.0.1 -p 1883 -t 'device/demo-01/telemetry' -m '{"temperature":25}'
```

也可以使用 EMQX Dashboard 的 WebSocket 客户端或 MQTTX 进行调试。

## 常见问题

- **容器启动失败**：检查端口占用与 Docker 是否运行；
- **一直重连**：核对 `lock_server`、账号密码、防火墙与 Broker 状态；
- **能连上但收不到消息**：检查 ACL、主题通配符与 QoS；
- **设备频繁离线**：确认心跳周期、Keep Alive 与网络质量；
- **指令重复执行**：用 `msgId` 做幂等，不要只依赖 QoS。

更多内容见[常见问题](./faq.md)。