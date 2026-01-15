import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import type { Stats } from './statsTypes';

export function useStatsData() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const trackVisit = useCallback(async () => {
    try {
      await api.post('/metrics/visit');
    } catch (err) {
      console.warn('Échec de l\'enregistrement de la visite:', err);
      // N'afficher pas d'erreur à l'utilisateur pour le tracking
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/stats');

      if (!res.data) {
        throw new Error('Aucune donnée reçue');
      }

      setStats({
        subscribers: res.data.subscribers ?? 0,
        visits: res.data.visits ?? 0,
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Erreur lors de la récupération des statistiques';
      setError(errorMessage);
      console.error('Erreur stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Track visit (ne bloque pas le chargement des stats)
    trackVisit();

    // Fetch stats
    fetchStats();

    // Optional: Auto-refresh toutes les 30 secondes
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, [fetchStats, trackVisit]);

  return {
    stats,
    loading,
    error,
    fetchStats,
  };
}
