import { memo } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/admin/commons/StatCard';
import { Users, FileText, CreditCard, DollarSign } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

interface StatsGridProps {
  stats: any;
  derivedStats: any;
}

const StatsGrid = memo<StatsGridProps>(({ stats, derivedStats }) => (
  <motion.div
    variants={itemVariants}
    className="grid grid-cols-2 lg:grid-cols-4 gap-6 m-8"
  >
    <StatCard
      title="Utilisateurs"
      value={stats.users.total.toLocaleString()}
      icon={Users}
      color="blue"
      trend={{
        value: parseFloat(derivedStats?.userGrowthRate || '0'),
        isPositive: stats.users.new > 0
      }}
    />
    <StatCard
      title="Consultations"
      value={stats.consultations.total.toLocaleString()}
      icon={FileText}
      color="green"
      trend={{
        value: parseFloat(derivedStats?.consultationSuccessRate || '0'),
        isPositive: stats.consultations.completed > stats.consultations.pending
      }}
    />
    <StatCard
      title="Paiements"
      value={stats.payments.completed.toLocaleString()}
      icon={CreditCard}
      color="purple"
      trend={{
        value: parseFloat(derivedStats?.paymentSuccessRate || '0'),
        isPositive: stats.payments.completed > stats.payments.failed
      }}
    />
    <StatCard
      title="Revenu"
      value={`${stats.consultations.revenue.toLocaleString()} F`}
      icon={DollarSign}
      color="orange"
      trend={{
        value: 23.1,
        isPositive: true
      }}
    />
  </motion.div>
));

StatsGrid.displayName = 'StatsGrid';

export default StatsGrid;
