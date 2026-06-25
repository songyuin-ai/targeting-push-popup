import { useState } from 'react';
import { ConsentPopup } from './components/ConsentPopup';
import { MOCK_CASES } from './api/consentApi';
import type { ConsentApiResponse, ConsentItemCode } from './types/consent';
import styles from './App.module.css';

type CaseKey = keyof typeof MOCK_CASES;
const CASE_LABELS: Record<CaseKey, string> = {
  CASE1: 'Case 1\nB=N C=N D1=N',
  CASE2: 'Case 2\nB=N C=Y D1=N\n(문자+이메일)',
  CASE2_SMS: 'Case 2\nB=N C=Y D1=N\n(문자만)',
  CASE3: 'Case 3\nB=N C=Y D1=Y',
  NONE: 'NONE\n(팝업 없음)',
};

export default function App() {
  const [activeCase, setActiveCase] = useState<CaseKey>('CASE1');
  const [data, setData] = useState<ConsentApiResponse>(MOCK_CASES.CASE1);
  const [showPopup, setShowPopup] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  function selectCase(key: CaseKey) {
    setActiveCase(key);
    setData(MOCK_CASES[key]);
    setShowPopup(true);
    setResult(null);
  }

  function handleAgree(agreedItems: ConsentItemCode[]) {
    setResult(`동의 완료: [${agreedItems.join(', ')}]`);
    setShowPopup(false);
  }

  function handleDismiss() {
    setResult('다음에 하기 선택 (상태 변경 없음)');
    setShowPopup(false);
  }

  return (
    <div className={styles.root}>
      <div className={styles.phoneFrame}>
        <div className={styles.screen}>
          <div className={styles.mainContent}>
            <p className={styles.appName}>해피포인트</p>
            <p className={styles.hint}>메인 화면 (배경)</p>

            <div className={styles.caseBar}>
              {(Object.keys(MOCK_CASES) as CaseKey[]).map(key => (
                <button
                  key={key}
                  className={`${styles.caseBtn} ${activeCase === key ? styles.caseBtnActive : ''}`}
                  onClick={() => selectCase(key)}
                >
                  {CASE_LABELS[key]}
                </button>
              ))}
            </div>

            {!showPopup && result && (
              <div className={styles.resultBox}>
                <p>{result}</p>
                <button className={styles.reopen} onClick={() => { setShowPopup(true); setResult(null); }}>
                  팝업 다시 열기
                </button>
              </div>
            )}
          </div>

          {showPopup && (
            <ConsentPopup
              data={data}
              onAgree={handleAgree}
              onDismiss={handleDismiss}
            />
          )}
        </div>
      </div>
    </div>
  );
}
