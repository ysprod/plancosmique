'use client';
import { useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import React from 'react';
import { AvecPromptTab } from './choices/AvecPromptTab';
import { ConsultationChoicesError } from './choices/ConsultationChoicesError';
import { ConsultationChoicesHeader } from './choices/ConsultationChoicesHeader';
import { ConsultationChoicesLoader } from './choices/ConsultationChoicesLoader';
import { ConsultationChoicesSearch } from './choices/ConsultationChoicesSearch';
import { ConsultationChoicesTabs } from './choices/ConsultationChoicesTabs';
import { SansPromptTab } from './choices/SansPromptTab';

const MemoConsultationChoicesHeader = React.memo(ConsultationChoicesHeader);
const MemoConsultationChoicesSearch = React.memo(ConsultationChoicesSearch);
const MemoConsultationChoicesTabs = React.memo(ConsultationChoicesTabs);
const MemoSansPromptTab = React.memo(SansPromptTab);
const MemoAvecPromptTab = React.memo(AvecPromptTab);

export default function ConsultationChoicesList() {
  const {
    loading, error, choicesWithPrompt, choicesWithoutPrompt, headerProps, searchProps,
    tabsProps, tab, handleDeletePromptStable,
  } = useConsultationChoices();

  if (loading) {
    return <ConsultationChoicesLoader />;
  }

  if (error) {
    return <ConsultationChoicesError error={error} />;
  }

  return (
    <div className="w-full space-y-6 flex flex-col items-center justify-center">
      <MemoConsultationChoicesHeader {...headerProps} />
      <MemoConsultationChoicesSearch {...searchProps} />
      <MemoConsultationChoicesTabs {...tabsProps} />
      {tab === 'avec' && (
        <MemoAvecPromptTab choicesWithPrompt={choicesWithPrompt} handleDeletePrompt={handleDeletePromptStable} />
      )}
      {tab === 'sans' && (
        <MemoSansPromptTab choicesWithoutPrompt={choicesWithoutPrompt} />
      )}
    </div>
  );
}