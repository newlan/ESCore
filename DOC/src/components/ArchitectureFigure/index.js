import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

export default function ArchitectureFigure({compact = false}) {
  const src = useBaseUrl('/img/architecture.webp');

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <img
          className="zoomable"
          src={src}
          alt="ESCore 企业 Socket 框架架构图：多端应用接入与安全层、核心服务、基础设施与数据、运维与管理"
          loading={compact ? 'lazy' : 'eager'}
        />
      </div>
      <figcaption className={styles.caption}>
        ESCore 总体架构：从多端接入、安全网关到实时服务、业务微服务、IoT 与 AI Agent 服务，
        统一运行在 MySQL、Redis、对象存储、消息队列与 Docker / Linux 基础设施之上。
        <span>点击图片可放大查看</span>
      </figcaption>
    </figure>
  );
}