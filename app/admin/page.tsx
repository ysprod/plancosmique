'use client';
import ActivitySection from '@/components/admin/dashboard/ActivitySection';
import AdminHeader from '@/components/admin/dashboard/AdminHeader';
import ErrorState from '@/components/admin/dashboard/ErrorState';
import LoadingState from '@/components/admin/dashboard/LoadingState';
import RefreshBanner from '@/components/admin/dashboard/RefreshBanner';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  TrendingUp,
  Users
} from 'lucide-react';
import Link from 'next/link';
import React, { memo, useMemo } from 'react';

interface ActivityItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  percent: string;
  trend?: number;
}

interface DetailItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color: string;
}

// ============================================================================
// VARIANTS D'ANIMATION (isolées pour performance)
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

interface LiveBadgeProps {}

const LiveBadge = memo<LiveBadgeProps>(() => (
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1"
  >
    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
    <span className="text-xs font-semibold">LIVE</span>
  </motion.div>
));
LiveBadge.displayName = 'LiveBadge';

interface ActivityCardItemProps {
  item: ActivityItem;
  index: number;
}

const ActivityCardItem = memo<ActivityCardItemProps>(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    whileHover={{ scale: 1.03 }}
    className="
      bg-white/15 rounded-lg p-3 backdrop-blur-md 
      border border-white/20 shadow-md
      transition-transform
    "
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <item.icon className="w-3.5 h-3.5 text-white/80" />
      <p className="text-white/90 text-xs font-medium">{item.label}</p>
    </div>
    <div className="flex items-center gap-1.5">
      <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
      {item.trend !== undefined && (
        item.trend >= 0 ? (
          <ArrowUpRight className="w-5 h-5" />
        ) : (
          <ArrowDownRight className="w-5 h-5" />
        )
      )}
    </div>
    <p className="text-white/70 text-xs mt-0.5">{item.percent}</p>
  </motion.div>
));
ActivityCardItem.displayName = 'ActivityCardItem';

interface ActivitySectionProps {
  stats: any;
  derivedStats: any;
}


interface DetailCardItemProps {
  item: DetailItem;
  index: number;
}

const DetailCardItem = memo<DetailCardItemProps>(({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ x: 3 }}
    className="
      flex items-center justify-between py-2 px-3 
      rounded-lg hover:bg-gray-50 transition-all
    "
  >
    <span className="text-gray-700 flex items-center gap-2 text-sm font-medium">
      <div className={`p-1 bg-${item.color}-100 rounded`}>
        <item.icon className={`w-3 h-3 text-${item.color}-600`} />
      </div>
      {item.label}
    </span>
    <span className="font-bold text-gray-900 text-sm">{item.value}</span>
  </motion.div>
));
DetailCardItem.displayName = 'DetailCardItem';

interface ProgressBarProps {
  percentage: string | number;
  label: string;
  delay?: number;
  color?: string;
}

const ProgressBar = memo<ProgressBarProps>(({ 
  percentage, 
  label, 
  delay = 0,
  color = 'blue'
}) => (
  <div className="mt-4 pt-3 border-t border-gray-100">
    <div className="flex justify-between text-xs mb-1.5">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-900">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: 'easeOut', delay }}
        className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full`}
      />
    </div>
  </div>
));
ProgressBar.displayName = 'ProgressBar';

interface DetailCardProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  items: DetailItem[];
  progressLabel: string;
  progressValue: string | number;
  progressColor: string;
  progressDelay: number;
  linkHref: string;
}

const DetailCard = memo<DetailCardProps>(({
  title,
  icon: Icon,
  iconColor,
  items,
  progressLabel,
  progressValue,
  progressColor,
  progressDelay,
  linkHref
}) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -3 }}
    className="
      bg-white rounded-xl shadow-sm hover:shadow-md 
      border border-gray-100 p-4 transition-all
    "
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 bg-${iconColor}-50 rounded-lg`}>
          <Icon className={`w-4 h-4 text-${iconColor}-600`} />
        </div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>
      <Link
        href={linkHref}
        className="
          text-blue-600 hover:text-blue-700 text-xs font-semibold
          hover:underline transition-colors
        "
      >
        Voir tout →
      </Link>
    </div>

    <div className="space-y-2.5">
      {items.map((item, index) => (
        <DetailCardItem key={index} item={item} index={index} />
      ))}
    </div>

    <ProgressBar
      percentage={progressValue}
      label={progressLabel}
      delay={progressDelay}
      color={progressColor}
    />
  </motion.div>
));
DetailCard.displayName = 'DetailCard';

interface DetailsGridProps {
  stats: any;
  derivedStats: any;
}

const DetailsGrid = memo<DetailsGridProps>(({ stats, derivedStats }) => {
  const usersItems = useMemo<DetailItem[]>(() => [
    { icon: CheckCircle, label: 'Actifs', value: stats.users.active, color: 'green' },
    { icon: TrendingUp, label: 'Nouveaux', value: stats.users.new, color: 'blue' },
    { icon: Clock, label: 'Inactifs', value: stats.users.inactive, color: 'gray' },
  ], [stats.users]);

  const consultationsItems = useMemo<DetailItem[]>(() => [
    { icon: Clock, label: 'En attente', value: stats.consultations.pending, color: 'orange' },
    { icon: CheckCircle, label: 'Complétées', value: stats.consultations.completed, color: 'green' },
    { icon: DollarSign, label: 'Revenu', value: `${stats.consultations.revenue.toLocaleString()} F`, color: 'amber' },
  ], [stats.consultations]);

  const paymentsItems = useMemo<DetailItem[]>(() => [
    { icon: Clock, label: 'En attente', value: stats.payments.pending, color: 'orange' },
    { icon: CheckCircle, label: 'Réussis', value: stats.payments.completed, color: 'green' },
    { icon: AlertCircle, label: 'Échoués', value: stats.payments.failed, color: 'red' },
  ], [stats.payments]);

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
    >
      <DetailCard
        title="Utilisateurs"
        icon={Users}
        iconColor="blue"
        items={usersItems}
        progressLabel="Taux d'activation"
        progressValue={derivedStats?.activeUserRate || 0}
        progressColor="blue"
        progressDelay={0}
        linkHref="/admin/users"
      />

      <DetailCard
        title="Consultations"
        icon={FileText}
        iconColor="green"
        items={consultationsItems}
        progressLabel="Taux de complétion"
        progressValue={derivedStats?.consultationSuccessRate || 0}
        progressColor="green"
        progressDelay={0.2}
        linkHref="/admin/consultations"
      />

      <DetailCard
        title="Paiements"
        icon={CreditCard}
        iconColor="purple"
        items={paymentsItems}
        progressLabel="Taux de succès"
        progressValue={derivedStats?.paymentSuccessRate || 0}
        progressColor="purple"
        progressDelay={0.4}
        linkHref="/admin/payments"
      />
    </motion.div>
  );
});
DetailsGrid.displayName = 'DetailsGrid';

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function AdminDashboard() {
  // ─────────────────────────────────────────────────────────────────────────
  // HOOKS & STATE
  // ─────────────────────────────────────────────────────────────────────────
  const {
    stats,
    loading,
    error,
    lastUpdated,
    isRefreshing,
    handleRefresh,
    derivedStats,
  } = useAdminDashboard();

  // ─────────────────────────────────────────────────────────────────────────
  // VALEURS MÉMOÏSÉES
  // ─────────────────────────────────────────────────────────────────────────
  const showRefreshBanner = useMemo(
    () => !!(isRefreshing || loading) && !!stats,
    [isRefreshing, loading, stats]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER CONDITIONS
  // ─────────────────────────────────────────────────────────────────────────
  if (loading && !stats) {
    return <LoadingState />;
  }

  if (error || !stats) {
    return (
      <ErrorState
        error={error}
        isRefreshing={isRefreshing}
        onRetry={handleRefresh}
      />
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <AdminHeader
        lastUpdated={lastUpdated!}
        isRefreshing={isRefreshing}
        loading={loading}
        onRefresh={handleRefresh}
      />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4">
        {/* Bannière de rafraîchissement */}
        <AnimatePresence>
          <RefreshBanner
            isRefreshing={isRefreshing}
            loading={loading}
            show={showRefreshBanner}
          />
        </AnimatePresence>

        {/* Contenu animé */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Section Activité */}
          <ActivitySection stats={stats} derivedStats={derivedStats} />

          {/* Grille de statistiques */}
          <StatsGrid stats={stats} derivedStats={derivedStats} />

          {/* Grille de détails */}
          <DetailsGrid stats={stats} derivedStats={derivedStats} />
        </motion.div>
      </div>
    </div>
  );
}
