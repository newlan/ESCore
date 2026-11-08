<template>
  <main class="docs-page">
    <header><a href="/">← 返回 ESCore</a><strong>ESCore 开发文档</strong><span>v1.0</span></header>
    <section class="docs-hero"><p>DEVELOPER DOCUMENTATION</p><h1>从这里开始构建。</h1><span>ESCore 企业 Socket 框架的能力概览与开发入口。</span></section>
    <section class="docs-grid">
      <article><b>01</b><h2>UI 组件</h2><p>项目已集成 Element Plus 与 Ant Design Vue，可直接使用两套组件库构建桌面端和移动端业务界面。</p><code>Element Plus · Ant Design Vue</code></article>
      <article><b>02</b><h2>通信能力</h2><p>使用 HTTPS 承载标准接口，以 Socket / WSS 服务实时连接，并通过 MQTT 覆盖轻量消息发布订阅。</p><code>HTTPS · WSS :3012 · MQTT</code></article>
      <article><b>03</b><h2>AI Agent</h2><p>服务端已预集成 LangChain 与 LangGraph，可按业务流程创建带工具调用和状态流转能力的 Agent。</p><code>LangChain · LangGraph</code></article>
    </section>
    <section class="next"><span>准备开始？</span><h2>从项目中的 Vue 页面和服务端模块继续开发。</h2><a href="/">返回框架首页 →</a></section>
  </main>
</template>

<style scoped>
:global(body),:global(#app){margin:0;background:#fff!important}.docs-page{min-height:100vh;max-width:1100px;margin:0 auto;padding:0 7%;color:#263246;font-family:Arial,'Microsoft YaHei',sans-serif;text-align:left;background:#fff}.docs-page header{height:72px;border-bottom:1px solid #e9edf2;display:flex;align-items:center;gap:25px}.docs-page header a{font-size:12px;color:#397af0;text-decoration:none}.docs-page header strong{font-size:15px}.docs-page header span{margin-left:auto;color:#8b96a8;font-size:11px}.docs-hero{padding:82px 0 54px}.docs-hero p{font-size:10px;letter-spacing:1.5px;color:#397af0}.docs-hero h1{font-size:42px;margin:14px 0;color:#223047}.docs-hero>span{font-size:14px;color:#748094}.docs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.docs-grid article{border:1px solid #e5eaf1;border-radius:9px;padding:24px;min-height:210px}.docs-grid b{font-size:11px;color:#4d86ed}.docs-grid h2{font-size:18px;margin:23px 0 9px}.docs-grid p{font-size:12px;line-height:1.85;color:#738094}.docs-grid code{font-size:10px;color:#64718a;background:#f3f6fa;padding:6px;border-radius:4px}.next{margin:50px 0;padding:28px;border-radius:9px;background:#f3f7fe}.next span{font-size:11px;color:#5d83c9}.next h2{font-size:20px;margin:9px 0 20px}.next a{display:inline-block;background:#397af0;color:#fff;padding:10px 14px;border-radius:5px;text-decoration:none;font-size:12px}@media(max-width:650px){.docs-page{padding:0 20px}.docs-hero{padding:55px 0 35px}.docs-hero h1{font-size:32px}.docs-grid{grid-template-columns:1fr}.docs-grid article{min-height:0}.docs-page header strong{font-size:13px}}
</style>
