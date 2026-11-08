import clsx from 'clsx';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryLink,
  primaryLabel,
  secondaryLink,
  secondaryLabel,
  children,
  compact = false,
}) {
  return (
    <header className={clsx(styles.hero, compact && styles.compact)}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={clsx(styles.glow, styles.glowOne)} aria-hidden="true" />
      <div className={clsx(styles.glow, styles.glowTwo)} aria-hidden="true" />
      <div className="container">
        <div className={styles.inner}>
          {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
          <h1 className={styles.title}>{title}</h1>
          {description ? <p className={styles.description}>{description}</p> : null}
          {(primaryLink || secondaryLink) && (
            <div className={styles.actions}>
              {primaryLink ? (
                <Link className={styles.primaryButton} to={primaryLink}>
                  {primaryLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
              {secondaryLink ? (
                <Link className={styles.secondaryButton} to={secondaryLink}>
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          )}
          {children}
        </div>
      </div>
    </header>
  );
}