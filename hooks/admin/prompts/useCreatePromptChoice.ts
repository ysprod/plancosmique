import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';

export function useCreatePromptChoice(choiceId: string | null) {
  const [choice, setChoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!choiceId) {
      setLoading(false);
      return;
    }
    async function fetchChoice() {
      try {
        const response = await api.get(`/consultation-choices/${choiceId}/raw`);
        setChoice(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors du chargement du choix de consultation');
      } finally {
        setLoading(false);
      }
    }
    fetchChoice();
  }, [choiceId]);

  return { choice, loading, error };
}
