'use client';
import { ConsultationChoiceWithPrompt, useConsultationChoices } from '@/hooks/admin/useConsultationChoices';
import React, { useCallback, useState } from 'react';
import { AvecPromptTab } from './choices/AvecPromptTab';
import { ConsultationChoicesError } from './choices/ConsultationChoicesError';
import { ConsultationChoicesHeader } from './choices/ConsultationChoicesHeader';
import { ConsultationChoicesLoader } from './choices/ConsultationChoicesLoader';
import { ConsultationChoicesSearch } from './choices/ConsultationChoicesSearch';
import { ConsultationChoicesTabs } from './choices/ConsultationChoicesTabs';
import { SansPromptTab } from './choices/SansPromptTab';
import { ToutPromptTab } from './choices/ToutPromptTab';
import { InlinePromptEditor } from './InlinePromptEditor';

const MemoConsultationChoicesHeader = React.memo(ConsultationChoicesHeader);
const MemoConsultationChoicesSearch = React.memo(ConsultationChoicesSearch);
const MemoConsultationChoicesTabs = React.memo(ConsultationChoicesTabs);
const MemoSansPromptTab = React.memo(SansPromptTab);
const MemoAvecPromptTab = React.memo(AvecPromptTab);

type ViewMode = 'list' | 'edit';

export default function ConsultationChoicesList() {
  const {
    loading, error, choicesWithPrompt, choicesWithoutPrompt, headerProps,
    searchProps, tabsProps, tab, filteredChoices, refetch,
  } = useConsultationChoices();

  const [view, setView] = useState<ViewMode>('list');
  const [editingChoice, setEditingChoice] = useState<ConsultationChoiceWithPrompt | null>(null);

  const handleEditPrompt = useCallback((choice: ConsultationChoiceWithPrompt) => {
    setEditingChoice(choice);
    setView('edit');
  }, []);

  const handleBackToList = useCallback(() => {
    setEditingChoice(null);
    setView('list');
  }, []);

  const handleSaveDone = useCallback(() => {
    refetch();
    setEditingChoice(null);
    setView('list');
  }, [refetch]);

  if (loading) {
    return <ConsultationChoicesLoader />;
  }

  if (error) {
    return <ConsultationChoicesError error={error} />;
  }

  if (view === 'edit' && editingChoice) {
    return (
      <div className="w-full space-y-4">
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
          <button
            type="button"
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-100"
          >
            Retour à la liste
          </button>
        </div>
        <InlinePromptEditor choice={editingChoice} onDone={handleSaveDone} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 flex flex-col items-center justify-center">
      <MemoConsultationChoicesHeader {...headerProps} />
      <MemoConsultationChoicesSearch {...searchProps} />
      <MemoConsultationChoicesTabs {...tabsProps} />
      {tab === 'avec' && (
        <MemoAvecPromptTab choicesWithPrompt={choicesWithPrompt} onEditPrompt={handleEditPrompt} />
      )}
      {tab === 'sans' && (
        <MemoSansPromptTab choicesWithoutPrompt={choicesWithoutPrompt} onEditPrompt={handleEditPrompt} />
      )}
      {tab === 'tout' && (
        <>          <ToutPromptTab choicesWithoutPrompt={filteredChoices} onEditPrompt={handleEditPrompt} />
        </>
      )}
    </div>
  );
}