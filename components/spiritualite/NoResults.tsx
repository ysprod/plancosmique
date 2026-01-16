'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface NoResultsProps {
  onReset: () => void;
}

const NoResults = ({ onReset }: NoResultsProps) => (
  <motion.div
    key="no-results"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="text-center py-12 sm:py-16"
  >
    <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
      Aucun article trouvé
    </h3>
    <p className="text-sm sm:text-base text-gray-600 mb-6">
      Essayez de modifier vos critères de recherche
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onReset}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
    >
      Réinitialiser les filtres
    </motion.button>
  </motion.div>
);

export default NoResults;
