'use client';

import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface Props {
  error: string;
  onRetry: () => void;
}

const SpiritualiteError = ({ error, onRetry }: Props) => (
  <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-md w-full text-center"
    >
      <AlertCircle className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
        Erreur de chargement
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-6">{error}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Réessayer
      </button>
    </motion.div>
  </div>
);

export default SpiritualiteError;
