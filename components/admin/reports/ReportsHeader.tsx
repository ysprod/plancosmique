import { memo, useCallback } from 'react';
import { Filter, Download, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { DateRangeType } from '@/hooks/admin/useAdminReportsPage';
import ActionButton from './ActionButton';
import DateRangeButton from './DateRangeButton';
import { useReportsHeaderAnimation } from '../../../hooks/admin/useReportsHeaderAnimation';

interface DateRange {
  value: string;
  label: string;
}

interface ReportsHeaderProps {
  dateRange: DateRangeType;
  setDateRange: (v: DateRangeType) => void;
  DATE_RANGES: DateRange[];
}

const ReportsHeader = memo<ReportsHeaderProps>(({ dateRange, setDateRange, DATE_RANGES }) => {
  const handleDateRangeChange = useCallback((value: DateRangeType) => {
    setDateRange(value);
  }, [setDateRange]);

  const { containerVariants, itemVariants } = useReportsHeaderAnimation();
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6 text-center"
    >
      <motion.div variants={itemVariants} className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/40 to-slate-50/40 dark:from-slate-900/40 dark:to-slate-800/40 rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-2 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
            >
              <BarChart3 className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent">
              Rapports & Analyses
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <TrendingUp className="w-4 h-4" />
            <p className="text-sm sm:text-base font-medium">
              Statistiques en temps réel et insights stratégiques
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex gap-3">
        <ActionButton icon={Filter} label="Filtrer" variant="outline" />
        <ActionButton icon={Download} label="Exporter" variant="primary" />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex gap-2 overflow-x-auto pb-2 px-2 scrollbar-hide max-w-full"
      >
        {DATE_RANGES.map((range) => (
          <DateRangeButton
            key={range.value}
            range={range}
            isActive={dateRange === range.value}
            onClick={() => handleDateRangeChange(range.value as DateRangeType)}
          />
        ))}
      </motion.div>
    </motion.div>
  );
});

ReportsHeader.displayName = 'ReportsHeader';

export default ReportsHeader;