import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    icon: '✍️',
    title: '写作即 Markdown',
    description: (
      <>
        文档就是 <code>docs/</code> 下的 Markdown 文件，目录即侧边栏，
        支持提示块、代码高亮、表格、标签页和 MDX 组件。
      </>
    ),
  },
  {
    icon: '🔍',
    title: '纯前端中文搜索',
    description: (
      <>
        构建时生成本地索引，支持中英文分词与关键词高亮，
        不需要 Algolia 账号，也不依赖任何第三方服务。
      </>
    ),
  },
  {
    icon: '🚀',
    title: '一键静态部署',
    description: (
      <>
        构建产物是一堆静态文件，GitHub Pages、Vercel、对象存储、
        自有 Nginx 都能直接放，仓库里已带 Actions 工作流。
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon} aria-hidden="true">
          {icon}
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}