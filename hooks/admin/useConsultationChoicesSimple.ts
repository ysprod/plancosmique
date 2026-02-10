 import { api } from '@/lib/api/client';
import { ConsultationChoice } from '@/lib/interfaces';
import { useCallback, useEffect, useState } from 'react'; 

export function useConsultationChoicesSimple(choiceId: string | null) {
  const [choices, setChoices] = useState<ConsultationChoice[]>([]);
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


  useEffect(() => {
    fetchChoices();
  }, [fetchChoices]);
 
  const choicesWithoutPrompt = choices.filter(c => !c);
  const choice = choicesWithoutPrompt.find((c: any) => c._id === choiceId);

  return {
    loading,
    error,
    choice,
  };
}