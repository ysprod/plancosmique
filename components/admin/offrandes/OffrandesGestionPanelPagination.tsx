'use client';
import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OffrandesGestionPanelPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const OffrandesGestionPanelPagination = memo(function OffrandesGestionPanelPagination({ page, totalPages, setPage }: OffrandesGestionPanelPaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center w-full mt-4 sm:mt-6">
      <AnimatePresence mode="wait" initial={false}>
        <motion.nav
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, type: 'spring', bounce: 0.2 }}
          className="flex items-center gap-1 sm:gap-2 bg-white/80 dark:bg-gray-900/80 rounded-full px-2 py-1 shadow border border-gray-200 dark:border-gray-700"
        >
          <button
            aria-label="Page précédente"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold transition-colors hover:bg-violet-100 dark:hover:bg-violet-900 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <motion.span
              whileTap={{ scale: 0.85 }}
              className="text-lg"
            >←</motion.span>
          </button>
          <span className="min-w-[48px] text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 select-none">
            {page} <span className="opacity-60">/</span> {totalPages}
          </span>
          <button
            aria-label="Page suivante"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold transition-colors hover:bg-violet-100 dark:hover:bg-violet-900 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <motion.span
              whileTap={{ scale: 0.85 }}
              className="text-lg"
            >→</motion.span>
          </button>
        </motion.nav>
      </AnimatePresence>
    </div>
  );
});