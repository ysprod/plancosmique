'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export default function SecurityPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-white flex items-center gap-2">
        <Shield className="w-8 h-8 text-red-400" />
        Sécurité
      </h1>

      <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
        <p className="text-slate-400 text-center py-12">
          Paramètres de sécurité à implémenter
        </p>
      </div>
    </motion.div>
  );
}
