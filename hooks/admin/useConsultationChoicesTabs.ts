import { useState } from 'react';

export function useConsultationChoicesTabs(initial: 'sans' | 'avec' | 'tout' = 'avec') {
  const [tab, setTab] = useState<'sans' | 'avec' | 'tout'>(initial);
  return { tab, setTab };
}
