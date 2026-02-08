'use client';
import { motion } from 'framer-motion';

export function ConsultationHistoryLoading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="relative w-12 h-12">
          <motion.div
            className="absolute inset-0 rounded-full border-3 border-transparent border-t-purple-500 border-r-purple-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-transparent border-b-indigo-500 opacity-75"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Loading text */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-medium text-gray-600 dark:text-gray-300"
        >
          Chargement des analyses…
        </motion.div>

        {/* Loading skeleton cards */}
        <div className="w-full max-w-3xl mt-8 space-y-3">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="rounded-xl border border-purple-100/30 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 p-4"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="space-y-2"
              >
                <div className="h-5 bg-gray-300/40 dark:bg-gray-600/40 rounded-lg w-2/3" />
                <div className="h-4 bg-gray-300/30 dark:bg-gray-600/30 rounded-lg w-full" />
                <div className="h-4 bg-gray-300/30 dark:bg-gray-600/30 rounded-lg w-5/6" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
