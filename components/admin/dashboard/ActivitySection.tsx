import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, DollarSign, Activity, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface ActivityItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  percent: string;
  trend?: number;
}

const activityCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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

const LiveBadge = memo(() => (
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

const ActivityCardItem = memo(({ item, index }: { item: ActivityItem; index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white/15 rounded-lg p-3 backdrop-blur-md border border-white/20 shadow-md transition-transform"
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

const ActivitySection = memo<ActivitySectionProps>(({ stats, derivedStats }) => {
  const activityItems = useMemo<ActivityItem[]>(() => [
    {
      icon: Users,
      label: 'Utilisateurs',
      value: stats.activity.todayUsers,
      percent: `+${((stats.activity.todayUsers / stats.users.total) * 100).toFixed(1)}%`
    },
    {
      icon: FileText,
      label: 'Consultations',
      value: stats.activity.todayConsultations,
      percent: `+${((stats.activity.todayConsultations / stats.consultations.total) * 100).toFixed(1)}%`
    },
    {
      icon: DollarSign,
      label: 'Revenu',
      value: `${stats.activity.todayRevenue.toLocaleString()} F`,
      percent: derivedStats?.averageRevenue ? `Moy: ${derivedStats.averageRevenue} F` : ''
    },
    {
      icon: Activity,
      label: 'Croissance',
      value: `${Math.abs(stats.activity.growth)}%`,
      percent: stats.activity.growth >= 0 ? 'Positive' : 'Négative',
      trend: stats.activity.growth
    }
  ], [stats, derivedStats]);

  return (
    <motion.div
      variants={activityCardVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-48 h-48 bg-white rounded-full blur-3xl"
        />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Activité du jour</h2>
              <p className="text-white/80 text-xs">Statistiques en temps réel</p>
            </div>
          </div>
          <LiveBadge />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {activityItems.map((item, index) => (
            <ActivityCardItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

ActivitySection.displayName = 'ActivitySection';

export default ActivitySection;
