import ConsultationChoiceCardSansPrompt from '@/components/admin/consultations/ConsultationChoiceCardSansPrompt';
import { ReactNode, useMemo } from 'react';

export function useConsultationChoicesSectionSansPrompts(
  choices: any[]
): ReactNode[] | null {
  return useMemo(() => {
    if (!choices || choices.length === 0) return null;
    return choices.map((choice) => (
      <ConsultationChoiceCardSansPrompt
        key={choice._id}
        choice={choice}
      />
    ));
  }, [choices]);
}