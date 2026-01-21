import { useCallback, useState } from 'react';
import { api } from '@/lib/api/client';
import { User } from '@/lib/interfaces';

export function useAutoGrade(userId: string | undefined, onSuccess?: (user: User) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerAutoGrade = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.patch(`/users/${userId}/auto-grade`);
      if (res.status === 200 && res.data) {
        onSuccess?.(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur auto-grade');
    } finally {
      setLoading(false);
    }
  }, [userId, onSuccess]);

  return { triggerAutoGrade, loading, error };
}
