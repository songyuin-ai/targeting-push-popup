import { useState, useMemo } from 'react';
import type { ConsentCase, ConsentItemCode, ConsentItemConfig } from '../types/consent';

export function useConsentPopup(items: ConsentItemConfig[], consentCase: ConsentCase) {
  const [checked, setChecked] = useState<Record<ConsentItemCode, boolean>>({
    B: false, C: false, D1: false,
  });

  const visibleCodes = useMemo(() => items.map(i => i.code), [items]);

  const allChecked = visibleCodes.length > 0 && visibleCodes.every(code => checked[code]);

  function toggleItem(code: ConsentItemCode) {
    setChecked(prev => {
      const next = { ...prev, [code]: !prev[code] };
      // Case1: C와 D1 완전 동기화
      if (consentCase === 'CASE1') {
        if (code === 'C') next.D1 = next.C;
        if (code === 'D1') next.C = next.D1;
      }
      return next;
    });
  }

  function toggleAll() {
    const next = !allChecked;
    setChecked(prev => {
      const updated = { ...prev };
      visibleCodes.forEach(code => { updated[code] = next; });
      return updated;
    });
  }

  function reset() {
    setChecked({ B: false, C: false, D1: false });
  }

  const agreedItems = visibleCodes.filter(code => checked[code]);
  const ctaEnabled = visibleCodes.length > 0 && visibleCodes.every(code => checked[code]);

  return { checked, allChecked, toggleItem, toggleAll, reset, ctaEnabled, agreedItems };
}
