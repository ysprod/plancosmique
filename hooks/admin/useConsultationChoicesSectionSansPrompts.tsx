import ConsultationChoiceCard from '@/components/admin/consultations/ConsultationChoiceCard';
import { ReactNode, useMemo } from 'react';

export function useConsultationChoicesSectionSansPrompts(
  choices: any[],
  onEditPrompt?: (choice: any) => void
): ReactNode[] | null {
  return useMemo(() => {
    if (!choices || choices.length === 0) return null;
    return choices.map((choice) => (
      <ConsultationChoiceCard
        key={choice._id}
        choice={choice}
        onEditPrompt={onEditPrompt}
      />
    ));
  }, [choices, onEditPrompt]);
}