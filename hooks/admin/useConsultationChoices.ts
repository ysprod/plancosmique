import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api/client';
import { ConsultationChoice } from '@/lib/interfaces';
import { Prompt } from '@/lib/types/prompt.types';

export interface ConsultationChoiceWithPrompt extends ConsultationChoice {
  prompt?: Prompt;
  rubriqueTitle?: string;
}

export function useConsultationChoices() {
  const [choices, setChoices] = useState<ConsultationChoiceWithPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
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
  }, [fetchChoices]);

  return {
    choices,
    loading,
    error,
    refetch: fetchChoices,
    assignPrompt
  };
}
