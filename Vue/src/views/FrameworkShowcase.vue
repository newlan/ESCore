<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { kxyk } from 'smkj'
const prompt = ref('')
const keyDialog = ref(false)
const active = ref('组件')
const paletteOpen = ref(false)
const layoutOpen = ref(false)
const chatReply = ref('我可以帮你了解框架能力、组件用法，或一起设计一个 Agent。想从哪里开始？')
const chatSending = ref(false)
const checkedAt = ref('正在获取后端状态…')
type ServiceState = 'online' | 'offline' | 'ready' | 'unconfigured'
type Service = { id: string; name: string; state: ServiceState; detail: string }
const services = ref<Service[]>([])
const wss = computed(() => services.value.find(item => item.id === 'wss'))
const onlineCount = computed(() => services.value.filter(item => item.state === 'online' || item.state === 'ready').length)
const stateText = (state: ServiceState) => ({ online: '运行中', ready: '已准备', offline: '未运行', unconfigured: '待配置' }[state])
const loadHealth = () => {
  kxyk.sk.be('framework_health', {}, (res: any) => {
    if (res?.status && res.db?.services) {
      services.value = res.db.services
      checkedAt.value = new Date(res.db.checkedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    } else checkedAt.value = '后端状态暂不可用'
  }, false)
}
const sendChat = () => {
  const message = prompt.value.trim()
  if (!message || chatSending.value) return
  chatSending.value = true
  kxyk.sk.be('framework_chat', { message }, (res: any) => {
    chatSending.value = false
    chatReply.value = res?.db?.message || res?.msg || '服务暂时无法响应，请稍后重试。'
    if (res?.db?.type === 'key_required') keyDialog.value = true
  }, false)
}
onMounted(loadHealth)
const sections = [{ title: '基础组件', icon: '▦', items: ['Color 色彩', 'Layout 布局', 'Cell 单元格'] }, { title: '表单组件', icon: '⌑', items: ['Input 输入框', 'Select 选择器', 'Checkbox 复选框', 'Switch 开关', 'Form 表单'] }, { title: '数据展示', icon: '▤', items: ['Table 表格', 'Card 卡片', 'Avatar 头像', 'Timeline 时间线', 'Empty 空状态'] }]


</script>

<template>
  <main class="page" id="top">
    <header class="header"><a href="#top" class="brand"><span class="logo">ES</span><span><b>ESCore</b><small>ENTERPRISE
            SOCKET FRAMEWORK</small></span></a>
      <span :class="['online', wss?.state || 'offline']"><i></i>{{ wss ? `WSS ${stateText(wss.state)} · :3012` : '正在检查 WSS…' }}</span>
    </header>

    <section class="health-panel"><div class="health-head"><div><span class="eyebrow"></span><h2>后端服务状态</h2><p>加载首页后向后端实时查询。最后检查：{{ checkedAt }}</p></div><button @click="loadHealth">刷新状态 ↻</button></div><div class="health-grid"><article v-for="service in services" :key="service.id"><span :class="['status-dot', service.state]"></span><div><b>{{ service.name }}</b><small>{{ service.detail }}</small></div><em :class="service.state">{{ stateText(service.state) }}</em></article><p v-if="!services.length" class="health-loading">正在等待后端健康检查返回…</p></div><div class="health-summary"><span>{{ onlineCount }} 个服务已可用</span><span>状态由 Node 后端实时返回</span></div></section>
    <section class="">
      <a class="docs-cta" href="/docs"><span><small>DEVELOPER
            DOCUMENTATION</small><b>查看开发文档</b></span><i>→</i></a>
    </section>
    <section class="components" id="components">
      <div class="component-tabs"><button v-for="s in sections" :key="s.title" :class="{ chosen: active === s.title }"
          @click="active = s.title">{{ s.title }}</button><span class="library-badge">ELEMENT PLUS <i>+</i> ANT DESIGN
          VUE</span></div>
      <div class="component-grid">
        <article v-for="(item, i) in sections.find(s => s.title === active)?.items" :key="item" class="component-row" @click="item.startsWith('Color') ? paletteOpen = true : item.startsWith('Layout') ? layoutOpen = true : null"><span
            class="component-icon" :class="'tone-' + i">{{ ['◉', '✣', '▧', '▣', 'T', '▤', '☷', '✦', '◆', '◌'][i % 10]
            }}</span><span>{{ item }}</span><span class="chevron">›</span></article>
      </div>
      <div class="demo-box">
        <div><span class="eyebrow">LIVE PREVIEW</span>
          <h3>组件预览</h3>
          <p>点击“Color 色彩”或“Layout 布局”可打开完整演示。</p>
        </div>
        <div class="demo-controls"><el-button type="primary">主要操作</el-button><el-button>次要操作</el-button><el-tag
            type="success">运行正常</el-tag><a-button type="primary">Ant Design</a-button></div>
      </div>
    </section>
    <footer><a class="brand" href="#top"><span class="logo">ES</span><span><b>ESCore</b><small>ENTERPRISE SOCKET
            FRAMEWORK</small></span></a><span>为连接与智能应用而构建。</span><a href="#top">回到顶部 ↑</a></footer>
    <el-dialog v-model="keyDialog" title="绑定模型 API Key" width="min(440px, 92vw)" align-center>
      <div class="dialog-content">
        <div class="key-lock">⌑</div>
        <h3>启用 AI 助手</h3>
        <p>AI 对话需要配置模型服务商的 API Key。请在项目的服务端环境配置中绑定 Key，保障密钥安全后即可开始对话。</p>
        <div class="key-note">支持通过 LangChain 接入兼容模型服务</div>
      </div><template #footer><el-button @click="keyDialog = false">知道了</el-button></template>
    </el-dialog>
    <el-dialog v-model="paletteOpen" title="Color 色彩" width="min(620px, 92vw)" align-center>
      <div class="palette"><span v-for="color in ['#3478F6','#5B94FF','#8AB7FF','#EAF2FF','#27A87C','#61C8A5','#EAF8F2','#8765DF','#B29AF2','#F2EFFF','#E89B39','#F7C77D','#FFF5E8','#DF7690','#F2A2B5','#FFF0F3']" :key="color"><i :style="{ background: color }"></i><b>{{ color }}</b></span></div>
    </el-dialog>
    <el-dialog v-model="layoutOpen" title="Layout 布局 · 24 种组合" width="min(680px, 92vw)" align-center>
      <div class="layout-gallery"><div v-for="number in 24" :key="number" :class="['layout-sample', 'layout-' + number % 6]"><b>Layout {{ String(number).padStart(2, '0') }}</b><i></i><i></i><i></i></div></div>
    </el-dialog>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');

:global(*) {
  box-sizing: border-box
}

:global(html),
:global(body),
:global(#app) {
  margin: 0;
  min-height: 100%;
  background: #fff !important
}

.page {
  --blue: #3478f6;
  --ink: #202938;
  --muted: #768195;
  --line: #e9edf2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 7%;
  background: #fff;
  color: #202938 !important;
  font-family: 'DM Sans', 'Microsoft YaHei', sans-serif;
  text-align: left !important;
  min-height: 100vh
}

.header {
  height: 78px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  text-decoration: none
}

.brand>span:last-child {
  display: flex;
  flex-direction: column
}

.brand b {
  font: 800 18px Manrope, sans-serif;
  letter-spacing: -.5px
}

.brand small {
  font: 7px 'DM Mono', monospace;
  letter-spacing: 1px;
  color: #8590a1;
  margin-top: 2px
}

.logo {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(140deg, #4d94ff, #2763df);
  color: #fff;
  display: grid;
  place-items: center;
  font: 800 14px Manrope;
  box-shadow: 0 5px 13px #3478f630
}

.header nav {
  display: flex;
  align-items: center;
  gap: 26px
}

.header nav a {
  font-size: 11px;
  color: #697487;
  text-decoration: none
}

.header nav a:hover {
  color: var(--blue)
}

.header nav .docs-link {
  color: #3478f6;
  border: 1px solid #d6e4ff;
  border-radius: 5px;
  padding: 7px 9px
}

.online {
  font: 9px 'DM Mono', monospace;
  color: #388969;
  background: #eef9f4;
  padding: 9px 11px;
  border-radius: 20px
}

.online i,
.connected i {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #28bb83;
  border-radius: 50%;
  margin-right: 5px;
  box-shadow: 0 0 7px #28bb8366
}

.hero {
  padding: 72px 0 65px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8%;
  align-items: center;
  background: radial-gradient(ellipse at 85% 15%, #f0f6ff 0, transparent 45%)
}

.eyebrow,
.section-title>span {
  font: 9px 'DM Mono', monospace;
  letter-spacing: 1.7px;
  color: #728198
}

.hero-copy>.eyebrow {
  color: #397cf1
}

.hero h1 {
  font: 800 clamp(42px, 5vw, 64px)/1.14 Manrope, 'Microsoft YaHei', sans-serif;
  letter-spacing: -2.6px;
  color: #202938;
  margin: 17px 0
}

.hero h1 em,
.protocol h2 em {
  font-style: normal;
  color: var(--blue)
}

.hero-copy>p {
  font-size: 13px;
  line-height: 1.9;
  color: #687489;
  max-width: 485px
}

.pills {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 21px
}

.pills span {
  font-size: 9px;
  color: #5d6b80;
  background: #f2f5f9;
  border: 1px solid #ebeff4;
  border-radius: 4px;
  padding: 6px 9px
}

.chat-card {
  border: 1px solid #e6ebf2;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 18px 55px #dce7f5;
  overflow: hidden
}

.chat-head {
  height: 66px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #eff2f6
}

.bot-icon,
.mini-bot {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  color: #3478f6;
  background: #edf4ff;
  font-size: 17px
}

.chat-head>div:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 3px
}

.chat-head b {
  font-size: 11px;
  color: #283448
}

.chat-head small {
  font-size: 8px;
  color: #929bad
}

.chat-ready {
  margin-left: auto;
  color: #45a77e;
  font: 8px 'DM Mono', monospace
}

.chat-ready i {
  display: inline-block;
  width: 5px;
  height: 5px;
  background: #37c18c;
  border-radius: 50%;
  margin-right: 4px
}

.chat-body {
  padding: 20px 18px 13px;
  min-height: 155px
}

.assistant-msg {
  display: flex;
  gap: 10px
}

.mini-bot {
  flex: none;
  width: 25px;
  height: 25px;
  font-size: 13px
}

.assistant-msg b {
  font-size: 10px;
  color: #364255
}

.assistant-msg p {
  font-size: 10px;
  line-height: 1.7;
  color: #758196;
  margin: 6px 0 0
}

.suggestions {
  margin: 16px 0 0 35px;
  display: flex;
  gap: 7px;
  flex-wrap: wrap
}

.suggestions button {
  border: 1px solid #e7edf5;
  border-radius: 5px;
  padding: 7px 9px;
  background: #fff;
  color: #627188;
  font-size: 8px;
  cursor: pointer
}

.suggestions button span {
  color: #4382f5;
  margin-left: 5px
}

.chat-input {
  margin: 0 14px;
  border: 1px solid #e5eaf1;
  border-radius: 7px;
  display: flex;
  padding: 5px;
  box-shadow: 0 2px 5px #e9eef5
}

.chat-input input {
  border: 0;
  outline: 0;
  flex: 1;
  padding: 7px;
  font: 10px inherit;
  min-width: 0
}

.chat-input input::placeholder {
  color: #a2aaba
}

.chat-input button {
  border: 0;
  border-radius: 5px;
  background: #3478f6;
  color: #fff;
  width: 29px;
  height: 29px;
  font-size: 17px;
  cursor: pointer
}

.key-hint {
  padding: 10px 16px 13px;
  text-align: center;
  color: #929bad;
  font-size: 8px
}

.key-hint button {
  border: 0;
  background: none;
  color: #3478f6;
  font: inherit;
  cursor: pointer
}

.feature-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 19px 0;
  gap: 14px
}

.feature-strip>div {
  display: grid;
  grid-template-columns: 38px 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  column-gap: 10px
}

.feature-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  font-size: 17px
}

.feature-icon.blue {
  color: #3478f6;
  background: #edf4ff
}

.feature-icon.green {
  color: #27a87c;
  background: #eaf8f2
}

.feature-icon.purple {
  color: #8765df;
  background: #f2efff
}

.feature-icon.orange {
  color: #e89b39;
  background: #fff5e8
}

.feature-strip .feature-icon {
  grid-row: span 2
}

.feature-strip b {
  align-self: end;
  font-size: 10px;
  color: #344054
}

.feature-strip small {
  align-self: start;
  font-size: 8px;
  color: #8993a3;
  margin-top: 3px
}

.intro {
  padding: 72px 0
}

.section-title {
  text-align: center
}

.section-title>span {
  color: #4382ed
}

.section-title h2 {
  font: 700 28px Manrope, 'Microsoft YaHei', sans-serif;
  letter-spacing: -.8px;
  margin: 10px 0 7px;
  color: #263246
}

.section-title p {
  font-size: 11px;
  color: #8490a2;
  margin: 0
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 31px
}

.feature-grid article {
  position: relative;
  border: 1px solid #e9edf2;
  border-radius: 8px;
  padding: 20px;
  background: linear-gradient(145deg, #fff, #fbfcfe)
}

.number {
  position: absolute;
  right: 17px;
  top: 17px;
  color: #dce2eb;
  font: 10px 'DM Mono', monospace
}

.feature-grid .feature-icon {
  margin-bottom: 13px
}

.feature-grid h3 {
  font: 600 13px Manrope;
  color: #303c50;
  margin: 0 0 8px
}

.feature-grid p {
  font-size: 10px;
  line-height: 1.8;
  color: #7b8799;
  min-height: 54px;
  margin: 0
}

.tags,
.stack-tags {
  display: flex;
  gap: 6px;
  margin-top: 15px;
  flex-wrap: wrap
}

.tags i,
.stack-tags i {
  font: 8px 'DM Mono', monospace;
  font-style: normal;
  background: #f2f5f9;
  color: #758196;
  border-radius: 3px;
  padding: 5px 7px
}

.stack-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 14px
}

.stack-summary>div {
  border: 1px solid #e7edf5;
  background: #f9fbfe;
  border-radius: 8px;
  padding: 20px
}

.stack-summary h3 {
  margin: 9px 0 7px;
  color: #354157;
  font-size: 13px
}

.stack-summary p {
  margin: 0;
  color: #788497;
  line-height: 1.8;
  font-size: 10px
}

.stack-summary p b {
  color: #3f5270
}

.docs-cta {
  margin: 16px auto 0;
  max-width: 390px;
  background: #3478f6;
  border-radius: 7px;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 8px 18px #3478f62e
}

.docs-cta span {
  display: flex;
  flex-direction: column;
  gap: 3px
}

.docs-cta small {
  font: 7px 'DM Mono', monospace;
  letter-spacing: 1px;
  color: #d9e8ff
}

.docs-cta b {
  font-size: 11px
}

.docs-cta i {
  font-style: normal;
  font-size: 18px
}

.protocol {
  border-radius: 10px;
  background: #f5f8fc;
  padding: 32px 35px;
  display: grid;
  grid-template-columns: .9fr 1.1fr;
  align-items: center;
  gap: 8%
}

.protocol h2 {
  font: 700 25px Manrope;
  margin: 10px 0;
  color: #253147
}

.protocol>div:first-child>p {
  font-size: 10px;
  color: #7e899a
}

.protocols>div {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border: 1px solid #e7ecf3;
  border-radius: 6px;
  background: #fff;
  margin: 7px 0
}

.picon {
  width: 29px;
  height: 29px;
  border-radius: 7px;
  display: grid;
  place-items: center;
  font-size: 15px
}

.pblue {
  color: #3478f6;
  background: #edf4ff
}

.ppurple {
  color: #8765df;
  background: #f2efff
}

.pgreen {
  color: #27a87c;
  background: #eaf8f2
}

.protocols span {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px
}

.protocols strong {
  font-size: 10px;
  color: #344054
}

.protocols small {
  font-size: 8px;
  color: #8993a3
}

.protocols label {
  font: 7px 'DM Mono', monospace;
  color: #8994a5
}

.protocols label.connected {
  color: #289b70
}

.components {
  padding: 74px 0
}

.component-tabs {
  margin-top: 27px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 22px
}

.component-tabs button {
  border: 0;
  background: none;
  padding: 10px 1px 12px;
  font: 10px inherit;
  color: #7d8798;
  cursor: pointer;
  position: relative
}

.component-tabs button.chosen {
  color: #3478f6;
  font-weight: 600
}

.component-tabs button.chosen:after {
  content: '';
  height: 2px;
  background: #3478f6;
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0
}

.library-badge {
  margin-left: auto;
  color: #8591a4;
  font: 7px 'DM Mono', monospace;
  letter-spacing: .5px
}

.library-badge i {
  font-style: normal;
  color: #3478f6
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px
}

.component-row {
  height: 51px;
  border-bottom: 1px solid #eef1f5;
  display: flex;
  align-items: center;
  gap: 11px;
  color: #475469;
  font-size: 10px
}

.component-icon {
  width: 25px;
  height: 25px;
  border: 1px solid #e9edf2;
  border-radius: 6px;
  display: grid;
  place-items: center;
  color: #5989dc;
  background: #f9fbfe;
  font-size: 12px
}

.tone-1,
.tone-8 {
  color: #8972d2
}

.tone-2,
.tone-6 {
  color: #36a986
}

.tone-3,
.tone-7 {
  color: #e89b39
}

.tone-4,
.tone-9 {
  color: #df7690
}

.chevron {
  margin-left: auto;
  color: #abb4c0;
  font-size: 20px
}

.demo-box {
  margin-top: 27px;
  border: 1px solid #e9edf2;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fbfcfe
}

.demo-box h3 {
  font-size: 12px;
  color: #364255;
  margin: 7px 0
}

.demo-box p {
  font-size: 9px;
  color: #8993a3;
  margin: 0
}

.demo-controls {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  justify-content: flex-end
}

.demo-controls :deep(.el-button),
.demo-controls :deep(.ant-btn),
.demo-controls :deep(.el-tag) {
  font-size: 9px
}

footer {
  border-top: 1px solid var(--line);
  padding: 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between
}

footer>span {
  font-size: 9px;
  color: #8791a1
}

footer>a:last-child {
  font-size: 9px;
  text-decoration: none;
  color: #5b79a8
}

.dialog-content {
  text-align: center;
  padding: 4px 12px 13px
}

.key-lock {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #edf4ff;
  color: #3478f6;
  font-size: 22px;
  display: grid;
  place-items: center;
  margin: 0 auto 11px
}

.dialog-content h3 {
  font-size: 15px;
  color: #2a3548;
  margin: 0 0 8px
}

.dialog-content p {
  font-size: 11px;
  line-height: 1.8;
  color: #758196
}

.key-note {
  background: #f5f8fc;
  border-radius: 5px;
  padding: 9px;
  color: #718096;
  font-size: 9px
}

.health-panel{padding:46px 0;border-bottom:1px solid var(--line)}.health-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}.health-head h2{font:700 23px Manrope,'Microsoft YaHei',sans-serif;margin:7px 0;color:#263246}.health-head p{margin:0;color:#8490a2;font-size:10px}.health-head button{border:1px solid #d9e5f7;background:#fff;border-radius:5px;color:#3478f6;padding:8px 10px;font-size:10px;cursor:pointer;white-space:nowrap}.health-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.health-grid article{min-height:69px;border:1px solid #e5ebf2;border-radius:7px;padding:12px;display:flex;align-items:flex-start;gap:8px;background:#fff}.status-dot{width:7px;height:7px;border-radius:50%;margin-top:4px;flex:none}.status-dot.online,.status-dot.ready{background:#28bb83;box-shadow:0 0 8px #28bb8366}.status-dot.offline{background:#e27575}.status-dot.unconfigured{background:#d6a046}.health-grid article>div{display:flex;flex-direction:column;gap:5px;min-width:0;flex:1}.health-grid b{font-size:10px;color:#354157}.health-grid small{font-size:8px;color:#8993a3;line-height:1.35}.health-grid em{font:7px 'DM Mono',monospace;font-style:normal;white-space:nowrap}.health-grid em.online,.health-grid em.ready{color:#289b70}.health-grid em.offline{color:#c66060}.health-grid em.unconfigured{color:#b47a22}.health-loading{grid-column:1/-1;text-align:center;color:#8993a3;font-size:10px;margin:10px}.health-summary{display:flex;justify-content:space-between;color:#7f8b9e;font-size:9px;margin-top:13px}.palette{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.palette span{display:flex;align-items:center;gap:7px;border:1px solid #eef1f5;border-radius:6px;padding:8px}.palette i{width:22px;height:22px;border-radius:5px;display:block}.palette b{font:9px 'DM Mono',monospace;color:#5e6d83}.layout-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.layout-sample{height:104px;border:1px solid #e6ebf2;border-radius:6px;padding:8px;display:grid;gap:5px;background:#fafcff}.layout-sample b{font:8px 'DM Mono',monospace;color:#758198}.layout-sample i{display:block;background:#dce8fb;border-radius:2px}.layout-1{grid-template-columns:1fr 1fr}.layout-1 b{grid-column:span 2}.layout-2 i:first-of-type{grid-row:span 2}.layout-3{grid-template-columns:1fr 2fr}.layout-3 b{grid-column:span 2}.layout-4{grid-template-columns:repeat(3,1fr)}.layout-4 b{grid-column:span 3}.layout-5 i:last-of-type{background:#cfe3ff}.component-row{cursor:pointer}
@media(max-width:760px) {
  .page {
    padding: 0 20px
  }

  .header {
    height: 65px
  }

  .header nav {
    display: none
  }

  .brand b {
    font-size: 16px
  }

  .online {
    font-size: 7px;
    padding: 8px
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 45px 0 38px;
    gap: 25px;
    background: radial-gradient(ellipse at 90% 4%, #f0f6ff, transparent 40%)
  }

  .hero h1 {
    font-size: 45px;
    letter-spacing: -2px;
    margin: 15px 0
  }

  .hero-copy>p {
    font-size: 12px
  }

  .chat-card {
    box-shadow: 0 12px 35px #dce7f5
  }

  .feature-strip {
    grid-template-columns: 1fr 1fr;
    gap: 18px 9px;
    padding: 18px 0
  }

  .intro,
  .components {
    padding: 53px 0
  }

  .section-title h2 {
    font-size: 23px
  }

  .section-title p {
    font-size: 10px;
    line-height: 1.7
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 9px;
    margin-top: 22px
  }

  .health-panel{padding:37px 0}.health-head{align-items:flex-start;flex-direction:column}.health-grid{grid-template-columns:1fr 1fr}.health-grid article{min-height:65px;padding:10px}.health-grid em{display:none}.palette{grid-template-columns:repeat(2,1fr)}.layout-gallery{grid-template-columns:repeat(2,1fr)}

  .feature-grid article {
    padding: 16px
  }

  .feature-grid p {
    min-height: 0
  }

  .stack-summary {
    grid-template-columns: 1fr
  }

  .stack-summary>div {
    padding: 16px
  }

  .protocol {
    display: block;
    padding: 23px 17px
  }

  .protocol h2 {
    font-size: 22px
  }

  .protocols {
    margin-top: 19px
  }

  .protocols label {
    font-size: 6px
  }

  .components {
    padding-bottom: 48px
  }

  .component-tabs {
    gap: 15px;
    overflow: auto
  }

  .component-tabs button {
    white-space: nowrap
  }

  .library-badge {
    display: none
  }

  .component-grid {
    grid-template-columns: 1fr
  }

  .component-row {
    height: 53px;
    font-size: 12px
  }

  .demo-box {
    display: block;
    padding: 16px
  }

  .demo-controls {
    justify-content: flex-start;
    margin-top: 14px
  }

  footer {
    gap: 8px;
    flex-wrap: wrap
  }

  footer>span {
    order: 3;
    flex-basis: 100%
  }
}
</style>
