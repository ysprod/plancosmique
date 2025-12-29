'use client';
import ActivityItem from '@/components/admin/reports/ActivityItem';
import ErrorState from '@/components/admin/reports/ErrorState';
import MetricCard from '@/components/admin/reports/MetricCard';
import { useAdminReportsPage } from '@/hooks/useAdminReportsPage';
import { motion } from 'framer-motion';
import { Download, Filter } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import LoadingState from './LoadingState';

type ReportType = 'overview' | 'consultations' | 'revenue' | 'users';
type DateRangeType = '7' | '30' | '90' | '365';

const DATE_RANGES: { value: DateRangeType; label: string }[] = [
  { value: '7', label: '7 jours' },
  { value: '30', label: '30 jours' },
  { value: '90', label: '90 jours' },
  { value: '365', label: 'Année' }
];

const REPORT_TABS: { value: ReportType; label: string }[] = [
  { value: 'overview', label: 'Aperçu' },
  { value: 'consultations', label: 'Consultations' },
  { value: 'revenue', label: 'Revenus' },
  { value: 'users', label: 'Utilisateurs' }
];

const CHART_COLORS = {
  consultations: '#3b82f6', // blue-500
  revenue: '#10b981', // green-500
  users: '#8b5cf6', // purple-500
  gradient: ['#3b82f6', '#60a5fa', '#93c5fd'] // blue gradient
};

export default function ReportsPage() {
  const {
    dateRange,
    setDateRange,
    selectedReport,
    setSelectedReport,
    stats,
    loading,
    error,
    metrics,
    chartData,
    chartConfig
  } = useAdminReportsPage();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
            Rapports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Analyses et statistiques
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl 
                     border border-slate-200 dark:border-slate-700 
                     hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Filtrer</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl 
                     bg-blue-600 text-white hover:bg-blue-700 transition-colors
                     shadow-lg shadow-blue-500/30"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Exporter</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide"
      >
        {DATE_RANGES.map((range) => (
          <motion.button
            key={range.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDateRange(range.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all 
                     whitespace-nowrap flex-shrink-0 ${dateRange === range.value
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
          >
            {range.label}
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-b border-slate-200 dark:border-slate-700"
      >
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {REPORT_TABS.map((tab) => (
            <motion.button
              key={tab.value}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedReport(tab.value)}
              className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all 
                       whitespace-nowrap flex-shrink-0 ${selectedReport === tab.value
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-slate-200 dark:border-slate-700 
                 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-lg"
      >
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
          {chartConfig.title}
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          {selectedReport === 'overview' ? (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Bar
                dataKey="consultations"
                name="Consultations"
                fill={CHART_COLORS.consultations}
                radius={[8, 8, 0, 0]}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS.gradient[index % CHART_COLORS.gradient.length]}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="revenue"
                name="Revenus"
                fill={CHART_COLORS.revenue}
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="users"
                name="Utilisateurs"
                fill={CHART_COLORS.users}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey={chartConfig.dataKey}
                fill={chartConfig.color}
                radius={[8, 8, 0, 0]}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? chartConfig.color : `${chartConfig.color}cc`}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-slate-200 dark:border-slate-700 
                 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-lg"
      >
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
          Activité Récente
        </h2>
        <div className="space-y-1 sm:space-y-2">
          {stats && [
            {
              type: 'consultation',
              user: 'Consultations',
              action: `${stats.consultations.completed} complétées`,
              time: 'Actuel'
            },
            {
              type: 'payment',
              user: 'Paiements',
              action: `${stats.payments.completed} traités`,
              time: 'Actuel'
            },
            {
              type: 'registration',
              user: 'Utilisateurs',
              action: `${stats.users.new} nouveaux`,
              time: 'Actuel'
            },
          ].map((activity, index) => (
            <ActivityItem key={index} {...activity} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}