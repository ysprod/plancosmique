"use client";
import ActivitySection from '@/components/admin/dashboard/ActivitySection';
import AdminHeader from '@/components/admin/dashboard/AdminHeader';
import { DetailsGrid } from '@/components/admin/dashboard/DetailsGrid';
import ErrorState from '@/components/admin/dashboard/ErrorState';
import LoadingState from '@/components/admin/dashboard/LoadingState';
import RefreshBanner from '@/components/admin/dashboard/RefreshBanner';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import { useAdminDashboardPage } from '@/hooks/admin/useAdminDashboardPage';
import { AnimatePresence, motion } from 'framer-motion';
import ReportsActivity from '../reports/ReportsActivity';
import ReportsChart from '../reports/ReportsChart';
import ReportsHeader from '../reports/ReportsHeader';
import ReportsMetricsGrid from '../reports/ReportsMetricsGrid';
import ReportsTabs from '../reports/ReportsTabs';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function AdminDashboardPage() {
  const {
    stats, loading, error, lastUpdated, dateRange, selectedReport, metrics,
    showRefreshBanner, isRefreshing, derivedStats, chartData, chartConfig,
    handleRefresh, setDateRange, setSelectedReport,
  } = useAdminDashboardPage();

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <ErrorState
        error={error}
        isRefreshing={isRefreshing}
        onRetry={handleRefresh}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <AdminHeader
        lastUpdated={lastUpdated!}
        isRefreshing={isRefreshing}
        loading={loading}
        onRefresh={handleRefresh}
      />
      <motion.div
        className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {showRefreshBanner && (
            <RefreshBanner
              isRefreshing={isRefreshing}
              loading={loading}
              show={showRefreshBanner}
            />
          )}
        </AnimatePresence>
        <ActivitySection stats={stats} derivedStats={derivedStats} />
        <StatsGrid stats={stats} derivedStats={derivedStats} />
        <DetailsGrid stats={stats} derivedStats={derivedStats} />
      </motion.div>

      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        <ReportsHeader dateRange={dateRange} setDateRange={setDateRange} DATE_RANGES={require('@/hooks/admin/useAdminReportsPage').DATE_RANGES} />
        <ReportsMetricsGrid metrics={metrics} />
        <ReportsTabs selectedReport={selectedReport} setSelectedReport={setSelectedReport} REPORT_TABS={require('@/hooks/admin/useAdminReportsPage').REPORT_TABS} />
        <ReportsChart chartData={chartData} chartConfig={chartConfig} selectedReport={selectedReport} />
        <ReportsActivity stats={stats} />
      </div>
    </div>
  );
}