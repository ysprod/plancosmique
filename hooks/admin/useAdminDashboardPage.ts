import { useMemo } from 'react';
import { useAdminDashboard } from '@/hooks/admin/useAdminDashboard';

export function useAdminDashboardPage() {
  const {
    stats,
    loading,
    error,
    lastUpdated,
    isRefreshing,
    handleRefresh,
    derivedStats,
  } = useAdminDashboard();

  const showRefreshBanner = useMemo(
    () => !!(isRefreshing || loading) && !!stats,
    [isRefreshing, loading, stats]
  );

  return {
    stats,
    loading,
    error,
    lastUpdated,
    isRefreshing,
    handleRefresh,
    derivedStats,
    showRefreshBanner,
  };
}
