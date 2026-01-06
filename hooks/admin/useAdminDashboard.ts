import { useAdminStats } from '@/hooks/admin/useAdminStats';
import { useCallback, useMemo, useState } from 'react';

export function useAdminDashboard() {
  const { stats, loading, error, refetch, lastUpdated } = useAdminStats();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const derivedStats = useMemo(() => {
    if (!stats) return null;
    return {
      userGrowthRate: ((stats.users.new / stats.users.total) * 100).toFixed(1),
      consultationSuccessRate: ((stats.consultations.completed / stats.consultations.total) * 100).toFixed(1),
      paymentSuccessRate: ((stats.payments.completed / stats.payments.total) * 100).toFixed(1),
      averageRevenue: (stats.consultations.revenue / (stats.consultations.completed || 1)).toFixed(0),
      activeUserRate: ((stats.users.active / stats.users.total) * 100).toFixed(0),
    };
  }, [stats]);

  return {
    stats,
    loading,
    error,
    refetch,
    lastUpdated,
    isRefreshing,
    handleRefresh,
    derivedStats,
  };
}
