import { useState } from 'react';

export function useConsultationChoicesTabs(initial: 'sans' | 'avec' = 'sans') {
  const [tab, setTab] = useState<'sans' | 'avec'>(initial);
  return { tab, setTab };
}
