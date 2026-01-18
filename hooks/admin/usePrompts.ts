import { useState, useEffect, useCallback } from 'react';
import { promptService } from '@/lib/api/services/prompt.service';
import { Prompt, PromptWithUsage } from '@/lib/types/prompt.types';

export function usePrompts() {
  const [prompts, setPrompts] = useState<PromptWithUsage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await promptService.findAll();
      setPrompts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors du chargement des prompts');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleActive = useCallback(async (id: string) => {
    try {
      const updated = await promptService.toggleActive(id);
      setPrompts(prev => prev.map(p => p._id === id ? updated : p));
      return updated;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la modification du statut');
    }
  }, []);

  const deletePrompt = useCallback(async (id: string) => {
    try {
      await promptService.delete(id);
      setPrompts(prev => prev.filter(p => p._id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return {
    prompts,
    loading,
    error,
    refetch: fetchPrompts,
    toggleActive,
    deletePrompt
  };
}
