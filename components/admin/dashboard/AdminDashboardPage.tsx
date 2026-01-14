"use client";
import ActivitySection from '@/components/admin/dashboard/ActivitySection';
import AdminHeader from '@/components/admin/dashboard/AdminHeader';
import { DetailsGrid } from '@/components/admin/dashboard/DetailsGrid';
import ErrorState from '@/components/admin/dashboard/ErrorState';
import LoadingState from '@/components/admin/dashboard/LoadingState';
import RefreshBanner from '@/components/admin/dashboard/RefreshBanner';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import { useAdminDashboardPage } from '@/hooks/admin/useAdminDashboardPage';
import { AnimatePresence } from 'framer-motion';

export default function AdminDashboardPage() {
  const { stats, loading, error, lastUpdated, showRefreshBanner,
    isRefreshing, derivedStats, handleRefresh,
  } = useAdminDashboardPage();

  if (loading) { return <LoadingState />; }

  if (error || !stats) {
    return (
      <ErrorState
        error={error}
        isRefreshing={isRefreshing}
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminHeader
        lastUpdated={lastUpdated!}
        isRefreshing={isRefreshing}
        loading={loading}
        onRefresh={handleRefresh}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        <AnimatePresence>
          <RefreshBanner
            isRefreshing={isRefreshing}
            loading={loading}
            show={showRefreshBanner}
          />
        </AnimatePresence>

        <ActivitySection stats={stats} derivedStats={derivedStats} />

        <StatsGrid stats={stats} derivedStats={derivedStats} />
        <DetailsGrid stats={stats} derivedStats={derivedStats} />
      </div>
    </div>
  );
}
