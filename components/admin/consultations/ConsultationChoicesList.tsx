'use client';
import { useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import { useConsultationChoicesFilter } from '@/hooks/admin/useConsultationChoicesFilter';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { ConsultationChoicesError } from './choices/ConsultationChoicesError';
import { ConsultationChoicesLoader } from './choices/ConsultationChoicesLoader';
import { ConsultationChoicesHeader } from './choices/ConsultationChoicesHeader';
import { ConsultationChoicesSearch } from './choices/ConsultationChoicesSearch';
import { ConsultationChoicesSection } from './choices/ConsultationChoicesSection';
import { useConsultationChoicesSection } from '@/hooks/admin/useConsultationChoicesSection';

export default function ConsultationChoicesList() {
  const {
    choices, loading, error, handleDeletePrompt, filteredChoices,
    choicesWithPrompt, choicesWithoutPrompt, search, setSearch
  } = useConsultationChoices();
  console.log('Choices:', choices); 

  if (loading) {
    return <ConsultationChoicesLoader />;
  }

  if (error) {
    return <ConsultationChoicesError error={error} />;
  }

  const withoutPromptCards = useConsultationChoicesSection(choicesWithoutPrompt, false, handleDeletePrompt);
  const withPromptCards = useConsultationChoicesSection(choicesWithPrompt, true, handleDeletePrompt);

  return (
    <div className="space-y-6 flex flex-col items-center justify-center">
      <ConsultationChoicesHeader
        total={choices.length}
        withPrompt={choicesWithPrompt.length}
        withoutPrompt={choicesWithoutPrompt.length}
      />
      <ConsultationChoicesSearch search={search} setSearch={setSearch} />

      {choicesWithoutPrompt.length > 0 && (
        <ConsultationChoicesSection
          icon={<AlertCircle className="w-5 h-5 text-amber-600" />}
          title={`Sans prompt (${choicesWithoutPrompt.length})`}
        >
          {withoutPromptCards as React.ReactNode}
        </ConsultationChoicesSection>
      )}

      {choicesWithPrompt.length > 0 && (
        <ConsultationChoicesSection
          icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          title={`Avec prompt (${choicesWithPrompt.length})`}
        >
          {withPromptCards as React.ReactNode}
        </ConsultationChoicesSection>
      )}

      {filteredChoices.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-zinc-400">
          Aucune consultation trouvée
        </div>
      )}
    </div>
  );
}
