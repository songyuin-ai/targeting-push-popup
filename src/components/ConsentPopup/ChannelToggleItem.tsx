import styles from './ChannelToggleItem.module.css';
import type { ConsentItemCode } from '../../types/consent';

interface Props {
  code: ConsentItemCode;
  label: string;
  checked: boolean;
  onChange: (code: ConsentItemCode) => void;
  sub?: boolean;
}

export function ChannelToggleItem({ code, label, checked, onChange, sub }: Props) {
  return (
    <div className={`${styles.row} ${sub ? styles.sub : ''}`}>
      <span className={styles.label}>{label}</span>
      <button
        className={`${styles.toggle} ${checked ? styles.on : ''}`}
        onClick={() => onChange(code)}
        role="switch"
        aria-checked={checked}
        type="button"
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}
