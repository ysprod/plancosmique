import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ReportsLoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center  gap-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className="w-12 h-12 text-blue-600" />
    </motion.div>
    <p className="text-slate-600 dark:text-slate-400 font-medium">
      Chargement des rapports...
    </p>
  </div>
);

export default ReportsLoadingState;
