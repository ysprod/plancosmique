import { memo, useCallback } from 'react';
import { Filter, Download, BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { DateRangeType } from '@/hooks/admin/useAdminReportsPage';

interface DateRange {
  value: string;
  label: string;
}

interface ReportsHeaderProps {
  dateRange: DateRangeType;
  setDateRange: (v: DateRangeType) => void;
  DATE_RANGES: DateRange[];
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const ActionButton = memo(({ icon: Icon, label, variant = 'outline' }: { icon: any, label: string, variant?: 'outline' | 'primary' }) => (
  <motion.button
    variants={itemVariants}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`
      group relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm
      transition-all duration-300 shadow-lg backdrop-blur-sm overflow-hidden
      ${variant === 'primary' 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/40 hover:shadow-blue-500/60' 
        : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
      }
    `}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    <Icon className="w-4 h-4 relative z-10" />
    <span className="relative z-10 hidden sm:inline">{label}</span>
  </motion.button>
));
ActionButton.displayName = 'ActionButton';

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

const ReportsHeader = memo<ReportsHeaderProps>(({ dateRange, setDateRange, DATE_RANGES }) => {
  const handleDateRangeChange = useCallback((value: DateRangeType) => {
    setDateRange(value);
  }, [setDateRange]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6 text-center"
    >
      {/* Hero Section */}
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

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-3">
        <ActionButton icon={Filter} label="Filtrer" variant="outline" />
        <ActionButton icon={Download} label="Exporter" variant="primary" />
      </motion.div>

      {/* Date Range Pills */}
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
