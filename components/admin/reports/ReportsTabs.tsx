import React from 'react';
import { motion } from 'framer-motion';

import { ReportType } from '@/hooks/useAdminReportsPage';
interface ReportsTabsProps {
  selectedReport: ReportType;
  setSelectedReport: (v: ReportType) => void;
  REPORT_TABS: { value: ReportType; label: string }[];
}

const ReportsTabs: React.FC<ReportsTabsProps> = ({ selectedReport, setSelectedReport, REPORT_TABS }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="border-b border-slate-200 dark:border-slate-700"
  >
    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
      {REPORT_TABS.map((tab) => (
        <motion.button
          key={tab.value}
          whileHover={{ y: -2 }}
          onClick={() => setSelectedReport(tab.value)}
          className={`px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex-shrink-0 ${selectedReport === tab.value
            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
            : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default ReportsTabs;
