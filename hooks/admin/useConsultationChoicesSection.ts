import { useMemo } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import ConsultationChoiceCard from '@/components/admin/consultations/ConsultationChoiceCard';

import { ReactNode } from 'react';

export function useConsultationChoicesSection(
  choices: any[],
  hasPrompt: boolean,
  handleDeletePrompt: (choice: any) => void
): ReactNode[] | null {
  return useMemo(() => {
    if (!choices || choices.length === 0) return null;
    return choices.map((choice) => (
      <ConsultationChoiceCard
        key={choice._id}
        choice={choice}
        onDelete={hasPrompt ? () => handleDeletePrompt(choice) : () => {}}
        hasPrompt={hasPrompt}
      />
    )) as ReactNode[];
  }, [choices, hasPrompt, handleDeletePrompt]);
}
