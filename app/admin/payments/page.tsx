'use client';

import { motion } from 'framer-motion';
import { CreditCard, Search, Filter } from 'lucide-react';

export default function PaymentsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-green-400" />
          Gestion des paiements
        </h1>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher un paiement..."
            className="w-full bg-slate-800 border border-slate-700 text-white px-10 py-2 rounded-lg focus:outline-none focus:border-green-500"
          />
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-sm"
      >
        <div className="p-6">
          <p className="text-slate-400 text-center py-8">
            Tableau des paiements à implémenter
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
