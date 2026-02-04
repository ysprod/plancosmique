'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftCircle } from 'lucide-react';
import React, { useCallback } from 'react';

interface WalletActionsProps {
  toConsultation?: boolean;
  consultationId?: string;
  categoryId?: string;
}

const buttonVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { scale: 1.05, opacity: 1 },
  tap: { scale: 0.97, opacity: 0.9 },
};

export default function WalletActions({ toConsultation, consultationId, categoryId }: WalletActionsProps) {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (toConsultation && consultationId && categoryId) {
      window.location.href = `/star/category/${categoryId}/consulter?consultationId=${consultationId}`;
    } else if (toConsultation && consultationId) {
      window.location.href = `/star/consultations/${consultationId}`;
    } else if (toConsultation) {
      window.location.href = "/star/consultations";
    } else {
      window.location.href = "/";
    }
  }, [toConsultation, consultationId, categoryId]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[120px] w-full py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold shadow-lg transition-all duration-200
          bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900
          text-white dark:text-gray-100
          hover:from-purple-700 hover:to-pink-700 dark:hover:from-purple-800 dark:hover:to-pink-800
          focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-700
          text-base sm:text-lg
          w-full max-w-xs"
        aria-label={toConsultation ? "Retour à la consultation" : "Retour à l'accueil"}
      >
        <ArrowLeftCircle className="w-6 h-6 drop-shadow" />
        <span className="truncate">
          {toConsultation ? "Retour à la consultation" : "Retour à l'accueil"}
        </span>
      </motion.button>
      <motion.div
        className="mt-4 text-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-light"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {toConsultation
          ? "Revenez à votre consultation en toute simplicité."
          : "Retournez à l'accueil pour explorer d'autres services."}
      </motion.div>
    </motion.div>
  );
}
