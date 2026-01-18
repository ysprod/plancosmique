'use client';
import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import React from 'react';

const ConsultationCard: React.FC<{
  choice: ConsultationChoice;
}> = React.memo(({ choice }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="flex flex-col items-center justify-center text-center  w-full   mx-auto px-8 py-6 sm:px-8 sm:py-6 bg-white dark:bg-zinc-900/90 shadow-md dark:shadow-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-200 cursor-pointer select-none gap-2"
    tabIndex={0}
    role="button"
    aria-label={choice.title}
    layout
  >
    <h2 className="font-semibold text-purple-700 dark:text-purple-300 text-base sm:text-lg mb-1   w-full" title={choice.title}>
      {choice.title}
    </h2>
    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-snug w-full">
      {choice.description}
    </p>
  </motion.div>
));

export default ConsultationCard;