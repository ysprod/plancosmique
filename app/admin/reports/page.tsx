"use client";
import ReportsActivity from '@/components/admin/reports/ReportsActivity';
import ReportsChart from '@/components/admin/reports/ReportsChart';
import ReportsErrorState from '@/components/admin/reports/ReportsErrorState';
import ReportsHeader from '@/components/admin/reports/ReportsHeader';
import ReportsLoadingState from '@/components/admin/reports/ReportsLoadingState';
import ReportsMetricsGrid from '@/components/admin/reports/ReportsMetricsGrid';
import ReportsTabs from '@/components/admin/reports/ReportsTabs';
import { useAdminReportsPage } from '@/hooks/admin/useAdminReportsPage';

export default function ReportsPage() {
  const {
    setSelectedReport, setDateRange, selectedReport, dateRange, stats,
    error, metrics, chartData, loading, chartConfig
  } = useAdminReportsPage();

  if (loading) return <ReportsLoadingState />;

  if (error) return <ReportsErrorState error={error} />;

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      <ReportsHeader dateRange={dateRange} setDateRange={setDateRange} DATE_RANGES={require('@/hooks/admin/useAdminReportsPage').DATE_RANGES} />
      <ReportsMetricsGrid metrics={metrics} />

      <ReportsTabs selectedReport={selectedReport} setSelectedReport={setSelectedReport} REPORT_TABS={require('@/hooks/admin/useAdminReportsPage').REPORT_TABS} />

      <ReportsChart chartData={chartData} chartConfig={chartConfig} selectedReport={selectedReport} />
      <ReportsActivity stats={stats} />
    </div>
  );
}