'use client';
import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/admin/commons/StatCard';
import { Users, FileText, CreditCard, DollarSign } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.5,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

interface StatsGridProps {
  stats: any;
  derivedStats: any;
}

const StatsGrid = memo<StatsGridProps>(({ stats, derivedStats }) => {
  const statsData = useMemo(() => [
    {
      title: "Utilisateurs",
      value: stats.users.total.toLocaleString('fr-FR'),
      icon: Users,
      color: "blue" as const,
      trend: {
        value: parseFloat(derivedStats?.userGrowthRate || '0'),
        isPositive: stats.users.new > 0
      }
    },
    {
      title: "Consultations",
      value: stats.consultations.total.toLocaleString('fr-FR'),
      icon: FileText,
      color: "green" as const,
      trend: {
        value: parseFloat(derivedStats?.consultationSuccessRate || '0'),
        isPositive: stats.consultations.completed > stats.consultations.pending
      }
    },
    {
      title: "Paiements",
      value: stats.payments.completed.toLocaleString('fr-FR'),
      icon: CreditCard,
      color: "purple" as const,
      trend: {
        value: parseFloat(derivedStats?.paymentSuccessRate || '0'),
        isPositive: stats.payments.completed > stats.payments.failed
      }
    },
    {
      title: "Revenu",
      value: `${stats.consultations.revenue.toLocaleString('fr-FR')} F`,
      icon: DollarSign,
      color: "orange" as const,
      trend: {
        value: 23.1,
        isPositive: true
      }
    }
  ], [stats, derivedStats]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
});

StatsGrid.displayName = 'StatsGrid';

export default StatsGrid;