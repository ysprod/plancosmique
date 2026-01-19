'use client';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { memo } from 'react';

interface ConsultationStatusBadgeProps {
  hasActiveConsultation: boolean;
}

export const ConsultationStatusBadge = memo<ConsultationStatusBadgeProps>(
  function ConsultationStatusBadge({ hasActiveConsultation }) {
    if (!hasActiveConsultation) return null;

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 mb-3"
      >
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Active</span>
      </motion.div>
    );
  }
);
