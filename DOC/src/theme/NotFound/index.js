import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import styles from './styles.module.css';

export default function NotFound() {
  return (
    <Layout
      title="页面未找到"
      description="请求的页面不存在，返回 ESCore 文档首页继续浏览。">
      <main className={styles.main}>
        <div className={styles.grid} aria-hidden="true" />
        <div className={styles.glow} aria-hidden="true" />
        <div className="container">
          <div className={styles.panel}>
            <span className={styles.code}>404</span>
            <span className={styles.kicker}>CONNECTION NOT FOUND</span>
            <h1>这条连接没有建立</h1>
            <p>
              页面可能已经被移动、重命名，或者链接中出现了拼写错误。
              你可以返回首页，或者从文档目录重新找到需要的内容。
            </p>
            <div className={styles.actions}>
              <Link className={styles.primary} to="/">返回首页 <span aria-hidden="true">→</span></Link>
              <Link className={styles.secondary} to="/docs/intro">浏览文档</Link>
              <Link className={styles.ghost} to="/docs/architecture">查看架构</Link>
            </div>
            <div className={styles.quickLinks}>
              <span>常用入口</span>
              <Link to="/docs/quick-start">快速开始</Link>
              <Link to="/desktop/intro">Windows 桌面端</Link>
              <Link to="/app/intro">移动 App</Link>
              <Link to="/about">关于作者</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}