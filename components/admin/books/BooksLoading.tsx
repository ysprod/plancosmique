'use client';
import { memo } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BooksLoading = memo(() => (
  <div className="flex items-center justify-center min-h-[40vh] sm:min-h-screen w-full bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 max-w-xs w-full mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: [0.8, 1.05, 0.95, 1], opacity: [0.7, 1, 0.9, 1], boxShadow: [
          '0 0 0px #6366f1',
          '0 0 12px #6366f1',
          '0 0 6px #6366f1',
          '0 0 0px #6366f1'
        ] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-2 sm:mb-3"
      >
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide"
      >
        Chargement des livres...
      </motion.p>
    </div>
  </div>
));

export { BooksLoading };