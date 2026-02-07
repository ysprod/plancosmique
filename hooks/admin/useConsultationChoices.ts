import { useState, useEffect, useCallback, useMemo } from 'react';
import { api } from '@/lib/api/client';
import { ConsultationChoice } from '@/lib/interfaces';
import { useConsultationChoicesFilter } from './useConsultationChoicesFilter';
import { promptService } from '@/lib/api/services/prompt.service';
import { useConsultationChoicesTabs } from './useConsultationChoicesTabs';

export interface ConsultationChoiceWithPrompt extends ConsultationChoice {

  rubriqueTitle?: string;
}

export function useConsultationChoices() {
  const [choices, setChoices] = useState<ConsultationChoiceWithPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchChoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/consultation-choices/with-prompts');
      setChoices(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  }, []);

  const assignPrompt = useCallback(async (choiceId: string, promptId: string | null) => {
    try {
      await api.patch(`/consultation-choices/${choiceId}/prompt`, { promptId });
      await fetchChoices();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erreur lors de l\'assignation');
    }
  }, [fetchChoices]);

  useEffect(() => {
    fetchChoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePrompt = useCallback(async (choice: any) => {
    if (!confirm(`Êtes-vous sûr de vouloir retirer le prompt de "${choice.title}" ?`)) {
      return;
    }
    try {
      if (choice.promptId) {
        await promptService.delete(choice.promptId);
      }
      await fetchChoices();
    } catch (err: any) {
      alert(err.message);
    }
  }, [assignPrompt]);

  const filteredChoices = useConsultationChoicesFilter(choices, search);
  const choicesWithPrompt = useMemo(() => filteredChoices.filter(c => c.prompt), [filteredChoices]);
  const choicesWithoutPrompt = useMemo(() => filteredChoices.filter(c => !c.prompt), [filteredChoices]);

  const { tab, setTab } = useConsultationChoicesTabs('avec');

  const headerProps = useMemo(() => ({
    withPrompt: choicesWithPrompt.length,
    withoutPrompt: choicesWithoutPrompt.length,
  }), [choicesWithPrompt.length, choicesWithoutPrompt.length]);

  const searchProps = useMemo(() => ({ search, setSearch, }), [search, setSearch]);

  const tabsProps = useMemo(() => ({ tab, setTab, }), [tab, setTab]);

  return {
    refetch: fetchChoices, setSearch, assignPrompt, setTab, handleDeletePrompt,
    filteredChoices, choicesWithPrompt, choicesWithoutPrompt, search,
    choices, loading, error, tab, headerProps, searchProps, tabsProps,
  };
}