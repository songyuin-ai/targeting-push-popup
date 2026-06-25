import styles from './ConsentItem.module.css';
import type { ConsentItemCode } from '../../types/consent';

interface Props {
  code: ConsentItemCode;
  label: string;
  hasDetail: boolean;
  checked: boolean;
  onChange: (code: ConsentItemCode) => void;
  onDetailOpen: (code: 'B' | 'C') => void;
  sub?: boolean;
}

export function ConsentItem({ code, label, hasDetail, checked, onChange, onDetailOpen, sub }: Props) {
  return (
    <label className={`${styles.item} ${sub ? styles.subItem : ''}`} onClick={e => e.preventDefault()}>
      <button
        className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
        onClick={() => onChange(code)}
        aria-checked={checked}
        role="checkbox"
        type="button"
      >
        {checked && <CheckIcon />}
      </button>
      <span className={styles.label} onClick={() => onChange(code)}>{label}</span>
      {hasDetail && (code === 'B' || code === 'C') && (
        <button
          className={styles.detailBtn}
          onClick={() => onDetailOpen(code)}
          type="button"
        >
          보기
        </button>
      )}
    </label>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
