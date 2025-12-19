import React from 'react';
import { motion } from 'framer-motion';
import { Sparkle } from 'lucide-react';

const FloatingCTA: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
    className="fixed bottom-8 right-8 z-50"
  >
    <button
      onClick={() => alert('Fonction pack complet à implémenter')}
      className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center gap-2"
    >
      <Sparkle className="w-5 h-5" />
      <span className="hidden sm:inline">Pack Complet</span>
    </button>
  </motion.div>
);

export default FloatingCTA;
