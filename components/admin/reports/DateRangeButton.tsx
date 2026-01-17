"use client";
import { memo } from 'react';
import { motion } from 'framer-motion';

interface DateRange {
  value: string;
  label: string;
}

const DateRangeButton = memo(({ range, isActive, onClick }: { range: DateRange, isActive: boolean, onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.08, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      relative px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap flex-shrink-0
      transition-all duration-300 overflow-hidden
      ${isActive
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/50 scale-105'
        : 'bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
      }
    `}
  >
    {isActive && (
      <motion.div
        layoutId="activeTab"
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <span className="relative z-10">{range.label}</span>
  </motion.button>
));

DateRangeButton.displayName = 'DateRangeButton';

export default DateRangeButton;