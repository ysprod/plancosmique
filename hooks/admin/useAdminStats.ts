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
  const [dashboardStats, setDashboardStats] = useState<AdminStats | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchDashboardStats = useCallback(async () => {
    try {
      setDashboardLoading(true);
      setDashboardError(null);

      const response = await api.get('/admin/stats');

      setDashboardStats(response.data);
      setLastUpdated(new Date().toISOString());
    } catch (err: any) {
      setDashboardError(err.response?.data?.message || err.message || 'Erreur inconnue');
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  return { stats: dashboardStats, loading: dashboardLoading, error: dashboardError, refetch: fetchDashboardStats, lastUpdated };
}
