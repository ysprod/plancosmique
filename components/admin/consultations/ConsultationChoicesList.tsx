'use client';
import React, { useMemo, useCallback } from 'react';
import { useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import { useConsultationChoicesTabs } from '@/hooks/admin/useConsultationChoicesTabs';
import { AvecPromptTab } from './choices/AvecPromptTab';
import { ConsultationChoicesError } from './choices/ConsultationChoicesError';
import { ConsultationChoicesHeader } from './choices/ConsultationChoicesHeader';
import { ConsultationChoicesLoader } from './choices/ConsultationChoicesLoader';
import { ConsultationChoicesSearch } from './choices/ConsultationChoicesSearch';
import { ConsultationChoicesTabs } from './choices/ConsultationChoicesTabs';
import { SansPromptTab } from './choices/SansPromptTab';
import MissingChoicePromptsList from './MissingChoicePromptsList';

const MemoConsultationChoicesHeader = React.memo(ConsultationChoicesHeader);
const MemoConsultationChoicesSearch = React.memo(ConsultationChoicesSearch);
const MemoConsultationChoicesTabs = React.memo(ConsultationChoicesTabs);
const MemoSansPromptTab = React.memo(SansPromptTab);
const MemoAvecPromptTab = React.memo(AvecPromptTab);

export default function ConsultationChoicesList() {
  const {
    loading, error, choicesWithPrompt, choicesWithoutPrompt, search,
    setSearch, handleDeletePrompt,
  } = useConsultationChoices();

  const { tab, setTab } = useConsultationChoicesTabs('sans');

  const headerProps = useMemo(() => ({
    withPrompt: choicesWithPrompt.length,
    withoutPrompt: choicesWithoutPrompt.length,
  }), [choicesWithPrompt.length, choicesWithoutPrompt.length]);

  const searchProps = useMemo(() => ({ search, setSearch, }), [search, setSearch]);

  const tabsProps = useMemo(() => ({ tab, setTab, }), [tab, setTab]);

  const handleDeletePromptStable = useCallback(handleDeletePrompt, [handleDeletePrompt]);

  if (loading) {
    return <ConsultationChoicesLoader />;
  }

  if (error) {
    return <ConsultationChoicesError error={error} />;
  }

  return (
    <div className="w-full space-y-6 flex flex-col items-center justify-center">
      <MissingChoicePromptsList />
      <MemoConsultationChoicesHeader {...headerProps} />
      <MemoConsultationChoicesSearch {...searchProps} />
      <MemoConsultationChoicesTabs {...tabsProps} />

      {tab === 'sans' && (
        <MemoSansPromptTab choicesWithoutPrompt={choicesWithoutPrompt} />
      )}

      {tab === 'avec' && (
        <MemoAvecPromptTab choicesWithPrompt={choicesWithPrompt} handleDeletePrompt={handleDeletePromptStable} />
      )}
    </div>
  );
}