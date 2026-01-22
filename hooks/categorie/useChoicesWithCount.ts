import { useCallback, useEffect, useState } from 'react';
import { getChoicesWithCount } from '@/lib/api/services/rubrique.service';
import { Rubrique } from '@/lib/interfaces';

export interface ChoicesWithCountResult {
  count: number;
  [key: string]: any;
}

export function useChoicesWithCount(rubriqueId: string, userId: string) {
  const [data, setData] = useState<Rubrique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChoices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getChoicesWithCount(rubriqueId, userId);
      setData(result);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, [rubriqueId, userId]);

  useEffect(() => {
    if (rubriqueId && userId) {
      fetchChoices();
    }
  }, [rubriqueId, userId, fetchChoices]);

  return { data, loading, error, refetch: fetchChoices };
}
