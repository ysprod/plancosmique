import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ReportsErrorStateProps {
  error: string;
}

const ReportsErrorState: React.FC<ReportsErrorStateProps> = ({ error }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center min-h-screen gap-4 p-6"
  >
    <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 max-w-md text-center border border-red-200 dark:border-red-800">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Erreur de chargement</h3>
      <p className="text-red-600 dark:text-red-400">{error}</p>
    </div>
  </motion.div>
);

export default ReportsErrorState;
