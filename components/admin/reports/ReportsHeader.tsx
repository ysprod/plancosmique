import React from 'react';
import { Filter, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DateRange {
  value: string;
  label: string;
}

import { DateRangeType } from '@/hooks/useAdminReportsPage';
interface ReportsHeaderProps {
  dateRange: DateRangeType;
  setDateRange: (v: DateRangeType) => void;
  DATE_RANGES: DateRange[];
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({ dateRange, setDateRange, DATE_RANGES }) => (
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
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Filtrer</span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
      >
        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Exporter</span>
      </motion.button>
    </div>
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
          onClick={() => setDateRange(range.value as DateRangeType)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${dateRange === range.value
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
          {range.label}
        </motion.button>
      ))}
    </motion.div>
  </motion.div>
);

export default ReportsHeader;
