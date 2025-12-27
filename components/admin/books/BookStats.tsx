import React from 'react';
import { BookOpen, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookStatsProps {
  stats: {
    total: number;
    active: number;
    totalRevenue: number;
    totalPages: number;
    averagePrice: number;
  };
}

export const BookStats: React.FC<BookStatsProps> = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-2 border-indigo-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 font-semibold mb-1">Total Livres</p>
          <p className="text-3xl font-black text-gray-900">{stats.total}</p>
        </div>
        <BookOpen className="w-10 h-10 text-indigo-600 opacity-20" />
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 font-semibold mb-1">Actifs</p>
          <p className="text-3xl font-black text-green-600">{stats.active}</p>
        </div>
        <Eye className="w-10 h-10 text-green-600 opacity-20" />
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 font-semibold mb-1">Revenu Total</p>
          <p className="text-xl font-black text-gray-900">
            {stats.totalRevenue.toLocaleString('fr-FR')} F
          </p>
        </div>
        <div className="text-3xl">💰</div>
      </div>
    </motion.div>
  </div>
);
