export type ConsentValue = 'Y' | 'N';

export interface TargetingConsent {
  B: ConsentValue;
  C: ConsentValue;
  D1: ConsentValue;
}

export type AdChannel = 'SMS' | 'EMAIL';

export interface ConsentApiResponse {
  targetingConsent: TargetingConsent;
  activeAdChannels: AdChannel[];
}

export type ConsentCase = 'CASE1' | 'CASE2' | 'CASE3' | 'NONE';

export type ConsentItemCode = 'B' | 'C' | 'D1';

export interface ConsentItemConfig {
  code: ConsentItemCode;
  label: string;
  hasDetail: boolean;
}
