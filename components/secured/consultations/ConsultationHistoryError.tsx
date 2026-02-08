'use client';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ConsultationHistoryErrorProps {
  error: string;
}

export function ConsultationHistoryError({ error }: ConsultationHistoryErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl"
    >
      <div className="rounded-lg border border-red-200/60 bg-gradient-to-r from-red-50/80 to-orange-50/60 dark:from-red-950/40 dark:to-orange-950/30 px-4 py-4 dark:border-red-800/40">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">
              Erreur lors du chargement
            </h4>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
