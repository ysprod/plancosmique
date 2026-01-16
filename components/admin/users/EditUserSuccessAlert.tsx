'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export function EditUserSuccessAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
    >
      <CheckCircle className="w-5 h-5 text-green-600" />
      <div>
        <p className="text-green-900 font-semibold">Modifications enregistrées</p>
        <p className="text-green-700 text-sm">Redirection en cours...</p>
      </div>
    </motion.div>
  );
}
