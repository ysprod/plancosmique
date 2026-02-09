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
import { ToutPromptTab } from './choices/ToutPromptTab';

const MemoConsultationChoicesHeader = React.memo(ConsultationChoicesHeader);
const MemoConsultationChoicesSearch = React.memo(ConsultationChoicesSearch);
const MemoConsultationChoicesTabs = React.memo(ConsultationChoicesTabs);
const MemoSansPromptTab = React.memo(SansPromptTab);
const MemoAvecPromptTab = React.memo(AvecPromptTab);

export default function ConsultationChoicesList() {
  const {
    loading, error, choicesWithPrompt, choicesWithoutPrompt, headerProps,
    searchProps, tabsProps, tab,filteredChoices
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
        <MemoAvecPromptTab choicesWithPrompt={choicesWithPrompt} />
      )}
      {tab === 'sans' && (
        <MemoSansPromptTab choicesWithoutPrompt={choicesWithoutPrompt} />
      )}
      {tab === 'tout' && (
        <>          <ToutPromptTab choicesWithoutPrompt={filteredChoices} />
        </>
      )}
    </div>
  );
}