import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

import PageHero from '@site/src/components/PageHero';
import Icon from '@site/src/components/Icons';

import styles from './about.module.css';

const focusAreas = [
  {
    icon: 'bolt',
    title: '实时通信架构',
    description:
      '长连接、消息广播、房间模型、多实例扩展，以及 uWebSockets.js 与 Socket.IO 的工程化组合。',
  },
  {
    icon: 'layers',
    title: '企业中台',
    description:
      '账号、商户、订单、支付、权限、日志等公共能力的抽象与复用，让业务系统轻量起步。',
  },
  {
    icon: 'devices',
    title: '跨端产品',
    description:
      'Vue 3、Electron、uni-app 与 HBuilderX 在不同终端上的体验一致性与工程协作。',
  },
  {
    icon: 'code',
    title: '工程化与文档',
    description:
      'TypeScript、Vite、PM2、Nginx、Docker，以及让项目更容易理解和交接的文档体系。',
  },
];

const contacts = [
  {
    icon: 'code',
    label: 'GitHub',
    value: '@newlan',
    href: 'https://github.com/newlan',
    description: '查看项目与后续更新',
  },
  {
    icon: 'chat',
    label: 'Issue 反馈',
    value: 'newlan/ESCore Issues',
    href: 'https://github.com/newlan/ESCore/issues',
    description: '问题、建议与合作意向',
  },
  {
    icon: 'cloud',
    label: '电子邮箱',
    value: 'newlanliu@gmail.com',
    href: 'mailto:newlanliu@gmail.com',
    description: '适合较正式的沟通',
  },
  {
    icon: 'rocket',
    label: '项目仓库',
    value: 'github.com/newlan/ESCore',
    href: 'https://github.com/newlan/ESCore',
    description: '源码、README 与版本记录',
  },
];

function ProfileCard({avatar}) {
  return (
    <aside className={styles.profileCard}>
      <div className={styles.avatarWrap}>
        <img src={avatar} alt="newlan 的 GitHub 头像" className={styles.avatar} />
        <span className={styles.avatarStatus} title="Open to collaborate" />
      </div>
      <h2>newlan</h2>
      <p className={styles.role}>ESCore 作者 · 全栈工程师</p>
      <div className={styles.profileTags}>
        <span>实时通信</span>
        <span>企业中台</span>
        <span>多端应用</span>
      </div>
      <dl className={styles.profileFacts}>
        <div>
          <dt>项目</dt>
          <dd>ESCore</dd>
        </div>
        <div>
          <dt>版本</dt>
          <dd>v3.6.2</dd>
        </div>
        <div>
          <dt>始于</dt>
          <dd>2019</dd>
        </div>
        <div>
          <dt>许可</dt>
          <dd>ISC</dd>
        </div>
      </dl>
      <a
        className={styles.githubButton}
        href="https://github.com/newlan"
        target="_blank"
        rel="noreferrer">
        <span className={styles.githubIcon} aria-hidden="true" />
        关注 GitHub
        <span aria-hidden="true">↗</span>
      </a>
    </aside>
  );
}

export default function About() {
  const avatar = useBaseUrl('/img/author-newlan.png');

  return (
    <Layout
      title="关于作者"
      description="ESCore 作者 newlan 的技术经历、关注方向与联系方式。">
      <PageHero
        compact
        eyebrow="ABOUT THE AUTHOR"
        title={
          <>
            你好，我是 <span className="accent">newlan</span>
          </>
        }
        description="ESCore 的作者与主要维护者。长期关注实时通信、企业中台与跨端应用的产品化落地，喜欢把复杂的底层能力整理成团队可以直接复用的工程结构。"
        primaryLink="https://github.com/newlan"
        primaryLabel="访问 GitHub"
        secondaryLink="mailto:newlanliu@gmail.com"
        secondaryLabel="发送邮件"
      />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.layout}>
            <ProfileCard avatar={avatar} />

            <div className={styles.content}>
              <section className={styles.section}>
                <span className={styles.kicker}>THE STORY</span>
                <h2>把复杂留给框架，把简单留给业务</h2>
                <p>
                  ESCore 始于 2019 年。最初的出发点很朴素：实时通信、账号权限、订单支付、设备接入这些能力，
                  几乎每个企业项目都要重新做一遍，而且很多实现只停留在“能跑”的层面，缺少可持续维护的结构。
                </p>
                <p>
                  于是 ESCore 尝试把通信内核、业务中台与多端接入组织成一套可运行的框架：
                  通信层尽量接近系统底层，业务层尽量贴近真实场景，文档则尽量让新加入的人能够独立完成从启动到部署的全过程。
                  从第一行代码到现在，项目持续在真实需求中迭代，逐步形成了今天的 v3.6.2。
                </p>
                <p>
                  相比堆叠技术名词，我更在意一套系统是否容易理解、容易运行、容易交接。ESCore
                  不试图解决所有问题，而是把企业实时应用最常遇到的那部分问题，认真做好。
                </p>
              </section>

              <section className={styles.section}>
                <span className={styles.kicker}>FOCUS</span>
                <h2>关注方向</h2>
                <div className={styles.focusGrid}>
                  {focusAreas.map((area) => (
                    <article key={area.title} className={styles.focusCard}>
                      <span className={styles.focusIcon}>
                        <Icon name={area.icon} size={21} />
                      </span>
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <span className={styles.kicker}>CONTACT</span>
                <h2>联系方式</h2>
                <p className={styles.sectionLead}>
                  技术问题优先通过 GitHub Issue 沟通，便于留下上下文和解决过程；合作、咨询或其他事项可以发邮件。
                </p>
                <div className={styles.contactGrid}>
                  {contacts.map((contact) => (
                    <a
                      key={contact.label}
                      className={styles.contactCard}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noreferrer' : undefined}>
                      <span className={styles.contactIcon}>
                        <Icon name={contact.icon} size={20} />
                      </span>
                      <div>
                        <span className={styles.contactLabel}>{contact.label}</span>
                        <strong>{contact.value}</strong>
                        <small>{contact.description}</small>
                      </div>
                      <span className={styles.contactArrow} aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </section>

              <section className={styles.section}>
                <span className={styles.kicker}>THIS SITE</span>
                <h2>关于本站</h2>
                <p>
                  本站使用 <a href="https://docusaurus.io/" target="_blank" rel="noreferrer">Docusaurus</a>
                  {' '}构建，通过 GitHub Pages 发布。文档源码与 ESCore 项目一起维护；
                  如果发现内容错误、链接失效或想补充章节，欢迎直接提交 Issue 或 PR。
                </p>
                <div className={styles.siteLinks}>
                  <Link to="/docs/extend">如何扩展文档站 <span>→</span></Link>
                  <Link to="/thanks">鸣谢开源 <span>→</span></Link>
                  <a href="https://github.com/newlan/ESCore" target="_blank" rel="noreferrer">
                    查看源码 <span>↗</span>
                  </a>
                </div>
              </section>
            </div>
          </div>

          <section className={styles.bottomCta}>
            <div>
              <span className={styles.ctaKicker}>LET'S BUILD</span>
              <h2>有想法，欢迎从一条 Issue 开始</h2>
              <p>无论是使用问题、功能建议，还是想一起完善 ESCore，都可以找到我。</p>
            </div>
            <div className={styles.ctaActions}>
              <a
                className={styles.ctaPrimary}
                href="https://github.com/newlan/ESCore/issues/new"
                target="_blank"
                rel="noreferrer">
                提交 Issue <span>→</span>
              </a>
              <a className={styles.ctaSecondary} href="mailto:newlanliu@gmail.com">
                发送邮件
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}