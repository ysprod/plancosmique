'use client';

import { api } from '@/lib/api/client';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  BarChart3,
  DollarSign,
  Download,
  Filter,
  Loader2,
  TrendingDown,
  TrendingUp,
  Users
} from 'lucide-react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// =====================================================
// TYPES
// =====================================================
interface BackendStats {
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

interface ReportMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  subLabel?: string;
}

interface ChartDataPoint {
  name: string;
  consultations: number;
  revenue: number;
  users: number;
}

type ReportType = 'overview' | 'consultations' | 'revenue' | 'users';
type DateRangeType = '7' | '30' | '90' | '365';

// =====================================================
// CONSTANTS
// =====================================================
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

// =====================================================
// ANIMATION VARIANTS
// =====================================================
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.05, type: 'spring', stiffness: 200, damping: 20 }
  })
};

// =====================================================
// CUSTOM TOOLTIP
// =====================================================
const CustomTooltip = memo(({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-xl 
               shadow-2xl border border-white/10"
    >
      <p className="font-bold text-sm mb-2">{label}</p>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="font-bold">{entry.value}</span>
        </div>
      ))}
    </motion.div>
  );
});
CustomTooltip.displayName = 'CustomTooltip';

// =====================================================
// LOADING STATE
// =====================================================
const LoadingState = memo(() => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className="w-12 h-12 text-blue-600" />
    </motion.div>
    <p className="text-slate-600 dark:text-slate-400 font-medium">
      Chargement des rapports...
    </p>
  </div>
));
LoadingState.displayName = 'LoadingState';

// =====================================================
// ERROR STATE
// =====================================================
const ErrorState = memo(({ error }: { error: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center min-h-screen gap-4 p-6"
  >
    <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 max-w-md text-center
                  border border-red-200 dark:border-red-800">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        Erreur de chargement
      </h3>
      <p className="text-red-600 dark:text-red-400">{error}</p>
    </div>
  </motion.div>
));
ErrorState.displayName = 'ErrorState';

// =====================================================
// METRIC CARD
// =====================================================
const MetricCard = memo(({
  metric,
  index
}: {
  metric: ReportMetric;
  index: number;
}) => {
  const isPositive = metric.change >= 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      className="rounded-xl border border-slate-200 dark:border-slate-700 
               bg-white dark:bg-slate-900 p-4 sm:p-5 transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            {metric.label}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 truncate">
            {metric.value}
          </p>
          {metric.subLabel && (
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
              {metric.subLabel}
            </p>
          )}
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
            ) : (
              <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-600 flex-shrink-0" />
            )}
            <p className={`text-[10px] sm:text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
              {isPositive ? '+' : ''}{metric.change}%
            </p>
            <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
              ce mois
            </span>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white
                   shadow-lg flex-shrink-0`}
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5">
            {metric.icon}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});
MetricCard.displayName = 'MetricCard';

// =====================================================
// ACTIVITY ITEM
// =====================================================
const ActivityItem = memo(({
  type,
  user,
  action,
  time,
  index
}: {
  type: string;
  user: string;
  action: string;
  time: string;
  index: number;
}) => {
  const getColor = () => {
    switch (type) {
      case 'consultation': return 'bg-blue-500';
      case 'payment': return 'bg-green-500';
      case 'registration': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center justify-between py-2.5 sm:py-3 border-b border-slate-100 
               dark:border-slate-800 last:border-0 hover:bg-slate-50 
               dark:hover:bg-slate-800/50 transition-colors rounded-lg px-2"
    >
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`w-2 h-2 rounded-full ${getColor()} flex-shrink-0`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
            {user}
          </p>
          <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
            {action}
          </p>
        </div>
      </div>
      <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
        {time}
      </span>
    </motion.div>
  );
});
ActivityItem.displayName = 'ActivityItem';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRangeType>('30');
  const [selectedReport, setSelectedReport] = useState<ReportType>('overview');
  const [stats, setStats] = useState<BackendStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Métriques calculées
  const metrics = useMemo<ReportMetric[]>(() => {
    if (!stats) return [];

    return [
      {
        label: 'Total Consultations',
        value: stats.consultations.total,
        change: stats.activity.growth,
        icon: <BarChart3 className="w-full h-full" />,
        color: 'from-blue-500 to-blue-600',
        subLabel: `${stats.consultations.completed} complétées`
      },
      {
        label: 'Revenus',
        value: `${stats.consultations.revenue.toLocaleString()}`,
        change: stats.activity.growth,
        icon: <DollarSign className="w-full h-full" />,
        color: 'from-green-500 to-green-600',
        subLabel: `${stats.payments.completed} paiements`
      },
      {
        label: 'Utilisateurs Actifs',
        value: stats.users.active,
        change: stats.activity.growth,
        icon: <Users className="w-full h-full" />,
        color: 'from-purple-500 to-purple-600',
        subLabel: `${stats.users.total} au total`
      },
      {
        label: 'Croissance',
        value: `${stats.activity.growth.toFixed(1)}%`,
        change: stats.activity.growth,
        icon: <TrendingUp className="w-full h-full" />,
        color: 'from-orange-500 to-orange-600',
        subLabel: `${stats.activity.todayConsultations} aujourd'hui`
      },
    ];
  }, [stats]);

  // Données de graphique avec données de démo réalistes
  const chartData = useMemo<ChartDataPoint[]>(() => {
    if (!stats) return [];

    // Générer des données simulées pour démonstration
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
    return months.map((month, index) => ({
      name: month,
      consultations: Math.floor(stats.consultations.total * (0.7 + Math.random() * 0.6)),
      revenue: Math.floor(stats.consultations.revenue * (0.7 + Math.random() * 0.6)),
      users: Math.floor(stats.users.active * (0.8 + Math.random() * 0.4))
    }));
  }, [stats]);

  // Configuration du graphique selon le type sélectionné
  const chartConfig = useMemo(() => {
    switch (selectedReport) {
      case 'consultations':
        return {
          dataKey: 'consultations',
          color: CHART_COLORS.consultations,
          title: 'Consultations par Mois'
        };
      case 'revenue':
        return {
          dataKey: 'revenue',
          color: CHART_COLORS.revenue,
          title: 'Revenus par Mois'
        };
      case 'users':
        return {
          dataKey: 'users',
          color: CHART_COLORS.users,
          title: 'Utilisateurs Actifs par Mois'
        };
      default:
        return {
          dataKey: 'all',
          color: CHART_COLORS.consultations,
          title: 'Tendances Globales'
        };
    }
  }, [selectedReport]);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de chargement';
      setError(message);
      console.error('❌ Erreur fetch stats:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
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

      {/* Date Range */}
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} index={index} />
        ))}
      </div>

      {/* Report Tabs */}
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

      {/* Chart Section */}
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

        {/* Recharts Bar Chart */}
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

      {/* Recent Activity */}
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
