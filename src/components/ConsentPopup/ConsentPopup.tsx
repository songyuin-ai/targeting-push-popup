import { useState } from 'react';
import styles from './ConsentPopup.module.css';
import { ConsentItem } from './ConsentItem';
import { ConsentDetail } from './ConsentDetail';
import { useConsentPopup } from '../../hooks/useConsentPopup';
import { buildItemConfigs, DETAIL_CONTENT, resolveCase } from '../../api/consentApi';
import type { AdChannel, ConsentApiResponse, ConsentItemCode } from '../../types/consent';

const AD_CHANNEL_LABEL: Record<AdChannel, string> = {
  SMS: '문자',
  EMAIL: '이메일',
};

interface Props {
  data: ConsentApiResponse;
  onAgree: (agreedItems: ConsentItemCode[]) => void;
  onDismiss: () => void;
}

export function ConsentPopup({ data, onAgree, onDismiss }: Props) {
  const consentCase = resolveCase(data.targetingConsent);
  const items = buildItemConfigs(consentCase);
  const { checked, allChecked, toggleItem, toggleAll, ctaEnabled, agreedItems } = useConsentPopup(items, consentCase);
  const [detailCode, setDetailCode] = useState<'B' | 'C' | null>(null);

  const showSelectAll = items.length >= 2;
  // Case1에서 C와 D1은 함께 노출되므로 D1은 C 하위로 렌더
  const isCase1 = consentCase === 'CASE1';

  const caption = buildCaption(consentCase, data.activeAdChannels);

  function handleAgree() {
    if (!ctaEnabled) return;
    onAgree(agreedItems);
  }

  if (consentCase === 'NONE') return null;

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.popup}>
          <button className={styles.closeX} onClick={onDismiss} aria-label="닫기">✕</button>

          <div className={styles.header}>
            <h1 className={styles.headline}>놓치면 아까운 혜택,<br />가장 먼저 알려드릴게요</h1>
            {consentCase === 'CASE1' && (
              <p className={styles.sub}>쿠폰·이벤트·할인 정보를 실시간으로 받아보세요</p>
            )}
          </div>

          <div className={styles.body}>
            {showSelectAll && (
              <>
                <button
                  className={styles.selectAllRow}
                  onClick={toggleAll}
                  type="button"
                >
                  <span className={`${styles.selectAllBox} ${allChecked ? styles.selectAllChecked : ''}`}>
                    {allChecked && <CheckAllIcon />}
                  </span>
                  <span className={styles.selectAllLabel}>전체선택</span>
                </button>
                <div className={styles.divider} />
              </>
            )}

            <div className={styles.itemList}>
              {items.filter(item => !(isCase1 && item.code === 'D1')).map(item => (
                <div key={item.code}>
                  <ConsentItem
                    code={item.code}
                    label={item.label}
                    hasDetail={item.hasDetail}
                    checked={checked[item.code]}
                    onChange={toggleItem}
                    onDetailOpen={setDetailCode}
                  />
                  {isCase1 && item.code === 'C' && (
                    <ConsentItem
                      code="D1"
                      label="앱 푸시"
                      hasDetail={false}
                      checked={checked['D1']}
                      onChange={toggleItem}
                      onDetailOpen={setDetailCode}
                      sub
                    />
                  )}
                </div>
              ))}
            </div>

            {caption && (
              <p className={styles.caption}>{caption}</p>
            )}
          </div>

          <div className={styles.footer}>
            <button
              className={`${styles.cta} ${ctaEnabled ? styles.ctaActive : styles.ctaDisabled}`}
              onClick={handleAgree}
              disabled={!ctaEnabled}
              type="button"
            >
              동의하고 혜택 받기
            </button>
            <button className={styles.skip} onClick={onDismiss} type="button">
              다음에 하기
            </button>
          </div>
        </div>
      </div>

      {detailCode && (
        <ConsentDetail
          title={DETAIL_CONTENT[detailCode].title}
          body={DETAIL_CONTENT[detailCode].body}
          onClose={() => setDetailCode(null)}
        />
      )}
    </>
  );
}

function buildCaption(consentCase: string, activeAdChannels: AdChannel[]): string | null {
  if (consentCase !== 'CASE2') return null;
  if (activeAdChannels.length === 0) return null;
  const labels = activeAdChannels.map(ch => AD_CHANNEL_LABEL[ch]).join(', ');
  return `지금은 광고성 정보를 ${labels}로 받고 있어요. 설정 > 알림설정에서 변경할 수 있어요.`;
}

function CheckAllIcon() {
  return (
    <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
      <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
