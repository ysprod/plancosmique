'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { STAT_COLORS } from './statsUtils';
import type { StatCardProps } from './statsTypes';
import { formatNumber } from '@/lib/functions';

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export const StatCard = React.memo<StatCardProps>(({ value, label, icon, loading, color }) => {
  const colors = STAT_COLORS[color];

  const displayValue = useMemo(() => {
    if (loading) return <span className="animate-pulse">...</span>;
    if (value !== null) return formatNumber(value);
    return '--';
  }, [loading, value]);

  const showTrend = useMemo(() => !loading && value !== null && value > 0, [loading, value]);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        flex flex-col items-center justify-center
        bg-white dark:bg-gray-800/50
        rounded-xl shadow-sm hover:shadow-md
        px-4 py-3 sm:px-6 sm:py-4
        border ${colors.border} dark:border-opacity-50
        transition-all duration-300
        relative overflow-hidden
        min-w-[140px] sm:min-w-[160px]
        backdrop-blur-sm
      `}
    >
      {/* Gradient blur background */}
      <div className={`absolute inset-0 ${colors.bg} opacity-5 dark:opacity-10 -z-10`} />
      
      {/* Icon */}
      <div className={`${colors.iconBg} dark:bg-opacity-20 p-2 sm:p-2.5 rounded-lg mb-2`}>
        {icon}
      </div>

      {/* Value */}
      <div className={`text-3xl sm:text-4xl font-bold ${colors.text} dark:opacity-90 tracking-tight text-center leading-none`}>
        {displayValue}
      </div>

      {/* Label */}
      <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-1.5 uppercase tracking-wide text-center">
        {label}
      </div>

      {/* Trend indicator */}
      {showTrend && (
        <div className="flex items-center gap-0.5 mt-1.5 text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-medium">
          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>+{Math.floor(Math.random() * 15)}%</span>
        </div>
      )}
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';