import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api/client';

interface AdminStats {
  users: {
    total: number;
    active: number;
    new: number;
    inactive: number;
  };
  consultations: {
    total: number;
    pending: number;
    completed: number;
    revenue: number;
  };
  payments: {
    total: number;
    pending: number;
    completed: number;
    failed: number;
  };
  activity: {
    todayUsers: number;
    todayConsultations: number;
    todayRevenue: number;
    growth: number;
  };
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/admin/stats');

      setStats(response.data);
      setLastUpdated(new Date().toISOString());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats, lastUpdated };
}
