'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const SpiritualiteLoading = () => (
  <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="inline-block mb-4"
      >
        <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600" />
      </motion.div>
      <p className="text-base sm:text-lg text-purple-800 font-medium">
        Chargement des articles...
      </p>
    </motion.div>
  </div>
);

export default SpiritualiteLoading;
