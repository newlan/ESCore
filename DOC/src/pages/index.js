import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import ArchitectureFigure from '@site/src/components/ArchitectureFigure';
import Icon from '@site/src/components/Icons';

import styles from './index.module.css';

const techStack = [
  'uWebSockets.js',
  'Socket.IO',
  'Node.js',
  'TypeScript',
  'Vue 3',
  'Vite',
  'MySQL',
  'Redis',
  'EMQX',
  'Electron',
  'uni-app',
];

const capabilities = [
  {
    icon: 'bolt',
    title: '实时通信内核',
    description:
      'uWebSockets.js 以 C++ 原生模块驱动长连接，Socket.IO 兼容层降低接入成本，Redis Adapter 支撑多实例广播。',
    points: ['10–30× 吞吐参考', '1–3 KB 单连接内存', 'WSS / Socket.IO v4'],
    className: 'bentoWide',
    accent: 'cyan',
  },
  {
    icon: 'layers',
    title: '企业中台',
    description:
      '账号、商户、门店、订单、支付、权限、日志与定时任务沉淀为公共能力，业务系统不再重复造轮子。',
    points: ['统一账号与权限', '交易与支付链路', '审计与运营后台'],
    accent: 'blue',
  },
  {
    icon: 'radio',
    title: 'IoT 设备接入',
    description:
      'MQTT 5 与 EMQX 打通设备接入、心跳、指令下发和异步回执，让实时业务延伸到硬件现场。',
    points: ['MQTT / EMQX', '设备状态与指令', '边缘与网关'],
    accent: 'violet',
  },
  {
    icon: 'sparkles',
    title: 'AI Agent 服务',
    description:
      '接入模型服务与 Agent 编排，把流式结果通过实时通道推送到前端，构建可对话的业务入口。',
    points: ['流式输出', '会话上下文', '业务工具调用'],
    accent: 'amber',
  },
  {
    icon: 'devices',
    title: '多端统一体验',
    description:
      'Web、Windows / macOS 桌面端、iOS / Android App、微信小程序共享同一套实时通道与业务 API。',
    points: ['Electron 桌面端', 'uni-app 移动端', 'H5 / 小程序'],
    accent: 'emerald',
  },
];

const scenarios = [
  {
    icon: 'chat',
    title: '企业协作与 IM',
    description: '单聊、群聊、在线状态、消息已读、组织架构与多端同步。',
    tags: ['实时消息', '在线状态'],
  },
  {
    icon: 'cart',
    title: '电商与本地生活',
    description: '订单流转、商家门店、支付结算、履约通知与运营看板。',
    tags: ['交易中台', '支付'],
  },
  {
    icon: 'cpu',
    title: 'IoT 与智能硬件',
    description: '设备接入、远程控制、状态上报、告警推送与批量运维。',
    tags: ['MQTT', '设备管理'],
  },
  {
    icon: 'building',
    title: '行业 SaaS',
    description: '多租户隔离、权限体系、配置中心与可持续扩展的领域服务。',
    tags: ['多租户', '可扩展'],
  },
  {
    icon: 'sparkles',
    title: 'AI 业务助手',
    description: '把 AI 对话、流式结果与业务动作嵌入现有系统，而不是另起一套应用。',
    tags: ['AI Agent', '流式推送'],
  },
  {
    icon: 'cloud',
    title: '实时数据看板',
    description: '指标变化实时推送，多端一致呈现，适合运营、监控与调度场景。',
    tags: ['实时同步', '多端'],
  },
];

const terminalCards = [
  {
    eyebrow: 'WINDOWS / macOS',
    title: '桌面端，用 Electron 把体验做完整',
    description:
      '复用 Web 技术栈，同时获得原生窗口、系统托盘、消息通知、自动更新与本地文件能力。',
    imageKey: 'windows',
    link: '/desktop/intro',
    linkLabel: '进入桌面端文档',
    meta: ['Electron', 'Vue 3', '自动更新'],
  },
  {
    eyebrow: 'iOS / ANDROID / 小程序',
    title: '移动端，用 uni-app 一次开发多端发布',
    description:
      '在 HBuilderX 中完成开发、真机调试与云打包，一套代码覆盖 App、H5 与主流小程序。',
    imageKey: 'app',
    link: '/app/intro',
    linkLabel: '进入移动端文档',
    meta: ['uni-app', 'HBuilderX', '多端发布'],
  },
];

function SectionHeading({eyebrow, title, description, inverse = false}) {
  return (
    <div className={clsx(styles.sectionHeading, inverse && styles.inverse)}>
      <div className={styles.sectionEyebrow}>{eyebrow}</div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function TerminalCard({card, image}) {
  return (
    <article className={styles.terminalCard}>
      <div className={styles.terminalCopy}>
        <span className={styles.terminalEyebrow}>{card.eyebrow}</span>
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <div className={styles.terminalMeta}>
          {card.meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <Link className={styles.textLink} to={card.link}>
          {card.linkLabel} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={clsx(styles.terminalPreview, styles[`${card.imageKey}Preview`])}>
        <div className={styles.terminalBadge}>截图占位 · 可替换</div>
        <img src={image} alt={`${card.title} 界面截图占位`} loading="lazy" />
      </div>
    </article>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={clsx(styles.heroGlow, styles.heroGlowOne)} aria-hidden="true" />
      <div className={clsx(styles.heroGlow, styles.heroGlowTwo)} aria-hidden="true" />
      <div className="container">
        <div className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <div className={styles.versionBadge}>
              <span className={styles.pulseDot} />
              ESCore v3.6.2
              <span className={styles.badgeDivider} />
              企业级实时通信基座
            </div>
            <h1 className={styles.heroTitle}>
              让实时通信
              <br />
              <span className={styles.gradientText}>成为企业的底层能力</span>
            </h1>
            <p className={styles.heroLead}>
              {siteConfig.tagline}。以 uWebSockets.js 为通信内核，融合企业中台、IoT
              接入、AI Agent 与多端应用，一套框架覆盖从连接到业务的完整链路。
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} to="/docs/quick-start">
                快速开始
                <span aria-hidden="true">→</span>
              </Link>
              <Link className={styles.secondaryButton} to="/docs/architecture">
                查看架构
              </Link>
              <a
                className={styles.ghostLink}
                href="https://github.com/newlan/ESCore"
                target="_blank"
                rel="noreferrer">
                GitHub 源码 <span aria-hidden="true">↗</span>
              </a>
            </div>
            <dl className={styles.heroStats}>
              <div>
                <dt>10–30×</dt>
                <dd>通信吞吐参考</dd>
              </div>
              <div>
                <dt>1–3 KB</dt>
                <dd>单连接内存</dd>
              </div>
              <div>
                <dt>5 类</dt>
                <dd>终端形态覆盖</dd>
              </div>
            </dl>
          </div>

          <div className={styles.heroVisual}>
            <div className={clsx(styles.floatingTag, styles.floatingTagTop)}>
              Socket.IO v4
            </div>
            <div className={clsx(styles.floatingTag, styles.floatingTagBottom)}>
              Redis Adapter
            </div>
            <div className={styles.console}>
              <div className={styles.consoleTopbar}>
                <div className={styles.consoleDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <span className={styles.consoleTitle}>escore-runtime / io.ts</span>
                <span className={styles.livePill}>LIVE</span>
              </div>
              <div className={styles.consoleMetrics}>
                <div>
                  <span>transport</span>
                  <strong>WSS</strong>
                </div>
                <div>
                  <span>protocol</span>
                  <strong>Socket.IO 4</strong>
                </div>
                <div>
                  <span>adapter</span>
                  <strong>Redis</strong>
                </div>
              </div>
              <div className={styles.codeWindow}>
                <div className={styles.codeLineNumbers} aria-hidden="true">
                  <span>01</span>
                  <span>02</span>
                  <span>03</span>
                  <span>04</span>
                  <span>05</span>
                </div>
                <pre>
                  <code>
                    <span className={styles.codeCyan}>io</span>
                    <span>.on(</span>
                    <span className={styles.codeGreen}>'connection'</span>
                    <span>, socket =&gt; {'{'}</span>
                    {'\n'}
                    {'  '}socket.join(<span className={styles.codeGreen}>
                      'tenant:acme'
                    </span>
                    );
                    {'\n'}
                    {'  '}io.to(<span className={styles.codeGreen}>'tenant:acme'</span>
                    ).emit(
                    {'\n'}
                    {'    '}
                    <span className={styles.codeGreen}>'order:updated'</span>, payload);
                    {'\n'}
                    {'}'});
                  </code>
                </pre>
              </div>
              <div className={styles.eventFeed}>
                <div className={styles.eventFeedHead}>
                  <span>实时事件</span>
                  <span>rooms / broadcast</span>
                </div>
                <div className={styles.eventRow}>
                  <span className={styles.eventDot} />
                  <code>order:updated</code>
                  <span>tenant:acme</span>
                  <em>12 ms</em>
                </div>
                <div className={styles.eventRow}>
                  <span className={styles.eventDot} />
                  <code>device:online</code>
                  <span>iot:factory-01</span>
                  <em>08 ms</em>
                </div>
                <div className={styles.eventRow}>
                  <span className={styles.eventDot} />
                  <code>agent:stream</code>
                  <span>session:8f2a</span>
                  <em>24 ms</em>
                </div>
              </div>
              <div className={styles.consoleFooter}>
                <span className={styles.statusDot} />
                HTTP :3011
                <span className={styles.footerDivider} />
                WSS :3012/io
                <span className={styles.consoleHint}>界面示意</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TechStrip() {
  return (
    <section className={styles.techStrip} aria-label="技术栈">
      <div className="container">
        <div className={styles.techStripInner}>
          <span className={styles.techStripLabel}>BUILT WITH</span>
          <div className={styles.techList}>
            {techStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className={styles.section} id="capabilities">
      <div className="container">
        <SectionHeading
          eyebrow="CORE CAPABILITIES"
          title="不止是 Socket 框架"
          description="从连接、业务到设备与 AI，ESCore 把企业实时应用最常见的底层能力预先装配好。你只需要专注于自己的业务。"
        />
        <div className={styles.bento}>
          {capabilities.map((item) => (
            <article
              key={item.title}
              className={clsx(styles.bentoCard, item.className, styles[item.accent])}>
              <div className={styles.bentoTop}>
                <span className={styles.iconBox}>
                  <Icon name={item.icon} size={22} />
                </span>
                <span className={styles.bentoIndex}>
                  {String(capabilities.indexOf(item) + 1).padStart(2, '0')}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.pointList}>
                {item.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
              {item.title === '实时通信内核' ? (
                <div className={styles.bentoCode}>
                  <span>io:3012</span>
                  <code>subscribe('tenant:acme')</code>
                  <strong>connected</strong>
                </div>
              ) : null}
            </article>
          ))}
        </div>
        <p className={styles.metricNote}>
          注：10–30× 与 1–3 KB 为 uWebSockets 官方 / 项目参考指标，实际表现取决于协议、业务负载、
          连接模式与硬件环境，请以目标环境压测结果为准。
        </p>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section className={styles.architectureSection} id="architecture">
      <div className={styles.architectureGrid} aria-hidden="true" />
      <div className={clsx(styles.sectionGlow, styles.sectionGlowLeft)} aria-hidden="true" />
      <div className={clsx(styles.sectionGlow, styles.sectionGlowRight)} aria-hidden="true" />
      <div className="container">
        <div className={styles.architectureIntro}>
          <SectionHeading
            eyebrow="SYSTEM ARCHITECTURE"
            inverse
            title="一张图，看清从终端到数据层"
            description="接入层负责多端连接与安全校验，核心服务层拆分为实时、业务、IoT、文件消息与 AI Agent 服务，底部由统一的数据与运维体系兜底。"
          />
          <div className={styles.layerLegend}>
            <span>
              <b>01</b> 多端接入
            </span>
            <span>
              <b>02</b> 安全与网关
            </span>
            <span>
              <b>03</b> 核心服务
            </span>
            <span>
              <b>04</b> 基础设施
            </span>
          </div>
        </div>
        <ArchitectureFigure compact />
        <div className={styles.architectureLinks}>
          <Link to="/docs/architecture" className={styles.darkTextLink}>
            阅读架构设计 <span aria-hidden="true">→</span>
          </Link>
          <Link to="/docs/realtime" className={styles.darkTextLink}>
            实时通道设计 <span aria-hidden="true">→</span>
          </Link>
          <Link to="/docs/mqtt-iot" className={styles.darkTextLink}>
            IoT 接入方案 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Scenarios() {
  return (
    <section className={clsx(styles.section, styles.scenarioSection)} id="scenarios">
      <div className="container">
        <SectionHeading
          eyebrow="USE CASES"
          title="一套底座，支撑多种实时业务"
          description="当“实时”不再是附加功能，而是产品体验的一部分，ESCore 的通信内核、企业中台与多端能力可以组合成不同形态的业务系统。"
        />
        <div className={styles.scenarioGrid}>
          {scenarios.map((item) => (
            <article className={styles.scenarioCard} key={item.title}>
              <span className={styles.scenarioIcon}>
                <Icon name={item.icon} size={23} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.scenarioTags}>
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Terminals({images}) {
  return (
    <section className={styles.terminalsSection} id="multi-terminal">
      <div className="container">
        <SectionHeading
          eyebrow="MULTI-TERMINAL"
          title="同一个实时世界，连接每一块屏幕"
          description="通信层与业务层解耦之后，终端只负责体验。Web、桌面端、App 与小程序可以共享同一套账号、消息与业务能力。"
        />
        <div className={styles.terminals}>
          {terminalCards.map((card) => (
            <TerminalCard key={card.title} card={card} image={images[card.imageKey]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaPanel}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <div className={styles.ctaCopy}>
            <span className={styles.ctaEyebrow}>START BUILDING</span>
            <h2>从一次连接开始，构建你的实时业务</h2>
            <p>
              克隆仓库、安装依赖、启动双端口服务，再选择一个终端接入。文档会带你完成从本地运行到生产部署的全过程。
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link className={styles.primaryButton} to="/docs/quick-start">
              5 分钟快速开始 <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.ctaSecondary} to="/docs/deploy">
              查看上线部署
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const images = {
    windows: useBaseUrl('/img/screenshots/windows/windows-main.png'),
    app: useBaseUrl('/img/screenshots/app/app-home.png'),
  };

  return (
    <Layout
      title="企业级实时通信与业务中台框架"
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <TechStrip />
        <Capabilities />
        <ArchitectureSection />
        <Scenarios />
        <Terminals images={images} />
        <FinalCta />
      </main>
    </Layout>
  );
}