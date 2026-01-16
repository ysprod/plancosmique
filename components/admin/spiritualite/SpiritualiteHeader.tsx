'use client';

import { motion } from "framer-motion";
import { Database } from "lucide-react";

interface SpiritualiteHeaderProps {
  onCreate: () => void;
  loading: boolean;
  practicesCount: number;
  publishedCount: number;
  draftCount: number;
}

export function SpiritualiteHeader({
  onCreate,
  loading,
  practicesCount,
  publishedCount,
  draftCount,
}: SpiritualiteHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-600 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-700 to-red-600 bg-clip-text text-transparent">
            Gestion Spiritualité Africaine
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Créez et gérez les pratiques spirituelles
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <span className="hidden sm:inline">Nouvelle Pratique</span>
          <span className="sm:hidden">Créer</span>
        </motion.button>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 border border-purple-200">
          <div className="text-xl sm:text-2xl font-bold text-purple-700">
            {loading ? '-' : practicesCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Pratiques</div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 sm:p-4 border border-blue-200">
          <div className="text-xl sm:text-2xl font-bold text-blue-700">
            {loading ? '-' : publishedCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Publiées</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-200">
          <div className="text-xl sm:text-2xl font-bold text-green-700">
            {loading ? '-' : draftCount}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">Brouillons</div>
        </div>
      </div>
    </motion.div>
  );
}
