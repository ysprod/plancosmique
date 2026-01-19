'use client';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Clock } from 'lucide-react';
import { memo } from 'react';

interface RubriqueStatsBarProps {
  stats: {
    total: number;
    consulted: number;
    pending: number;
    completed: number;
  };
}

export const RubriqueStatsBar = memo<RubriqueStatsBarProps>(function RubriqueStatsBar({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-6 mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
    >
      {/* Total consultations */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50 border border-violet-200 dark:border-violet-800">
        <BookOpen className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        <span className="text-sm font-semibold text-violet-900 dark:text-violet-100">
          {stats.total} consultation{stats.total > 1 ? 's' : ''}
        </span>
      </div>

      {/* Completed consultations */}
      {stats.completed > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200 dark:border-emerald-800">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            {stats.completed} terminée{stats.completed > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Pending consultations */}
      {stats.pending > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 border border-amber-200 dark:border-amber-800">
          <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="text-sm font-semibold text-amber-900 dark:text-amber-100">
            {stats.pending} en attente
          </span>
        </div>
      )}
    </motion.div>
  );
});
