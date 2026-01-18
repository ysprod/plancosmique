'use client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

const LoadingState: React.FC = () => (
  <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center max-w-md"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="inline-block mb-6 relative"
      >
        <div className="absolute inset-0 bg-purple-400 rounded-full blur-xl opacity-50 animate-pulse" />
        <Loader2 className="w-16 h-16 text-purple-600 relative z-10" />
      </motion.div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        Vérification du paiement
      </h2>
      
      <p className="text-gray-600 text-sm md:text-base px-4">
        Veuillez patienter pendant que nous vérifions votre transaction...
      </p>
    </motion.div>
  </div>
);

export default LoadingState;