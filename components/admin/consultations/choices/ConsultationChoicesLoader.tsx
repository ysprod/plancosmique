import { memo } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ConsultationChoicesLoader = memo(function ConsultationChoicesLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: [0.7, 1, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/30 via-indigo-400/20 to-pink-400/20 blur-xl animate-pulse" />
        <span className="relative z-10">
          <Sparkles className="w-14 h-14 text-purple-600 dark:text-purple-300 animate-spin-slow" />
        </span>
      </motion.div>
      <div className="mt-6 text-center text-base md:text-lg font-semibold text-purple-700 dark:text-purple-200 select-none">
        Chargement des choix de consultations...
      </div>
    </div>
  );
});
