import type { ConsentApiResponse, ConsentCase, ConsentItemConfig, TargetingConsent } from '../types/consent';

export const MOCK_CASES: Record<string, ConsentApiResponse> = {
  CASE1: { targetingConsent: { B: 'N', C: 'N', D1: 'N' }, activeAdChannels: [] },
  CASE2: { targetingConsent: { B: 'N', C: 'Y', D1: 'N' }, activeAdChannels: ['SMS', 'EMAIL'] },
  CASE2_SMS: { targetingConsent: { B: 'N', C: 'Y', D1: 'N' }, activeAdChannels: ['SMS'] },
  CASE3: { targetingConsent: { B: 'N', C: 'Y', D1: 'Y' }, activeAdChannels: [] },
  NONE: { targetingConsent: { B: 'Y', C: 'Y', D1: 'Y' }, activeAdChannels: [] },
};

export function resolveCase(consent: TargetingConsent): ConsentCase {
  if (consent.B === 'Y') return 'NONE';
  if (consent.C === 'N') return 'CASE1';   // B=N, C=N (D1도 N)
  if (consent.D1 === 'N') return 'CASE2';  // B=N, C=Y, D1=N
  return 'CASE3';                           // B=N, C=Y, D1=Y
}

export function buildItemConfigs(consentCase: ConsentCase): ConsentItemConfig[] {
  switch (consentCase) {
    case 'CASE1':
      return [
        { code: 'B', label: '맞춤형 마케팅을 위한 개인정보 수집·이용 동의', hasDetail: true },
        { code: 'C', label: '광고성 정보 수신 동의', hasDetail: true },
        { code: 'D1', label: '앱 푸시', hasDetail: false },
      ];
    case 'CASE2':
      return [
        { code: 'B', label: '맞춤형 마케팅을 위한 개인정보 수집·이용 동의', hasDetail: true },
        { code: 'D1', label: '광고성 푸시 수신', hasDetail: false },
      ];
    case 'CASE3':
      return [
        { code: 'B', label: '맞춤형 마케팅을 위한 개인정보 수집·이용 동의', hasDetail: true },
      ];
    default:
      return [];
  }
}

export const DETAIL_CONTENT: Record<'B' | 'C', { title: string; body: string }> = {
  B: {
    title: '맞춤형 마케팅을 위한 개인정보 수집·이용 동의서',
    body: `1. 수집 목적\n맞춤형 광고 및 혜택 정보 제공\n\n2. 수집 항목\n구매 이력, 앱 이용 기록, 위치 정보 등\n\n3. 보유 및 이용 기간\n동의 철회 시까지\n\n4. 동의 거부 권리 및 불이익\n동의 거부 시 맞춤 혜택 정보를 받을 수 없으며, 기본 서비스 이용에는 제한이 없습니다.\n\n* 본 내용은 placeholder이며 법무 검토 후 최종본으로 교체됩니다.`,
  },
  C: {
    title: '광고성 정보 수신 동의서',
    body: `1. 수신 목적\n쿠폰, 이벤트, 할인 등 광고성 정보 발송\n\n2. 수신 채널\n문자(SMS), 이메일, 앱 푸시\n\n3. 수신 동의 철회\n알림설정 메뉴에서 언제든 변경 가능\n\n* 본 내용은 placeholder이며 법무 검토 후 최종본으로 교체됩니다.`,
  },
};
