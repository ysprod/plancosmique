'use client';

import { motion } from 'framer-motion';

export default function HoroscopeListLoading() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-sm mt-6"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 mx-auto mb-3 text-purple-600"
        >
          <span className="block w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
        </motion.div>
        
        <p className="text-gray-600 text-sm">
          Chargement de vos horoscopes...
        </p>
      </div>
    </motion.div>
  );
}
