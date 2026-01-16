'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import UsersStats from '@/components/admin/users/UsersStats';

interface StatsSectionProps {
  stats: any;
}

export const StatsSection = memo(function StatsSection({ stats }: StatsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      className="flex justify-center"
    >
      {stats && <UsersStats stats={stats} />}
    </motion.div>
  );
});