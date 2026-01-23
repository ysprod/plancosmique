'use client';
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