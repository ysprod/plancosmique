import { useState, useEffect } from 'react';
import { promptService } from '@/lib/api/services/prompt.service';
import { Prompt } from '@/lib/types/prompt.types';

export function useEditPromptPage(promptId: string) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    promptService.findById(promptId)
      .then((data) => {
        if (mounted) setPrompt(data);
      })
      .catch((err: any) => {
        if (mounted) setError(err.response?.data?.message || err.message || 'Erreur lors du chargement');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [promptId]);

  return { prompt, error, loading };
}
