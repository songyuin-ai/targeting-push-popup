import { useState, useMemo } from 'react';
import type { ConsentItemCode, ConsentItemConfig } from '../types/consent';

export function useConsentPopup(items: ConsentItemConfig[]) {
  const [checked, setChecked] = useState<Record<ConsentItemCode, boolean>>({
    B: false, C: false, D1: false,
  });

  const visibleCodes = useMemo(() => items.map(i => i.code), [items]);

  const allChecked = visibleCodes.length > 0 && visibleCodes.every(code => checked[code]);

  function toggleItem(code: ConsentItemCode) {
    setChecked(prev => ({ ...prev, [code]: !prev[code] }));
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
