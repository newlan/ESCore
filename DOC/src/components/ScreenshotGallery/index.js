import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

function Screenshot({item, type}) {
  const src = useBaseUrl(item.src);

  return (
    <figure className={clsx(styles.item, styles[type], item.wide && styles.wide)}>
      <div className={styles.frame}>
        {type === 'app' ? <div className={styles.phoneSpeaker} aria-hidden="true" /> : null}
        <img
          className="zoomable"
          src={src}
          alt={item.alt}
          loading="lazy"
          width={type === 'app' ? 750 : 1440}
          height={type === 'app' ? 1624 : 900}
        />
      </div>
      <figcaption>
        <div className={styles.captionTop}>
          <strong>{item.title}</strong>
          {item.tag ? <span>{item.tag}</span> : null}
        </div>
        <p>{item.description}</p>
        <code>{item.src}</code>
      </figcaption>
    </figure>
  );
}

export default function ScreenshotGallery({type = 'desktop', items}) {
  return (
    <div className={clsx(styles.gallery, styles[`${type}Gallery`])}>
      {items.map((item) => (
        <Screenshot key={item.src} item={item} type={type} />
      ))}
    </div>
  );
}