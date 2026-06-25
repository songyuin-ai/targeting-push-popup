import styles from './ConsentDetail.module.css';

interface Props {
  title: string;
  body: string;
  onClose: () => void;
}

export function ConsentDetail({ title, body, onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={e => e.stopPropagation()}>
        <div className={styles.handle} />
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">✕</button>
        </div>
        <div className={styles.body}>
          {body.split('\n').map((line, i) => (
            <p key={i} className={line === '' ? styles.spacer : undefined}>{line}</p>
          ))}
        </div>
        <div className={styles.footer}>
          <button className={styles.confirmBtn} onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
}
