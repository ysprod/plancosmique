'use client';
import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { ConsultationButton } from './ConsultationButton';

interface RubriqueConsultationCardProps {
  enrichedChoice: ConsultationChoice;
  onSelect: () => void;
}

const cardVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  hover: { y: -4, scale: 1.015, boxShadow: '0 6px 24px 0 rgba(120, 51, 255, 0.10)' },
  tap: { scale: 0.98 },
};

const RubriqueConsultationCard = memo<RubriqueConsultationCardProps>(
  function RubriqueConsultationCard({ enrichedChoice, onSelect }) {
    return (
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        tabIndex={0}
        aria-label={enrichedChoice.title}
        className="group relative h-full flex flex-col items-center overflow-hidden rounded-2xl bg-white/90 dark:bg-zinc-900/80 shadow-sm hover:shadow-xl border border-purple-100 dark:border-purple-900/60 backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 transition-all duration-300  mx-auto"
      >
        <motion.div
          layoutId={`rubrique-bg-${enrichedChoice.choiceId}`}
          className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-fuchsia-50 dark:from-purple-950/20 dark:via-transparent dark:to-fuchsia-950/20 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
        <div className="relative z-10 flex-1 flex flex-col items-center w-full p-3 sm:p-4 gap-1">
          <h2 className="text-base sm:text-lg font-bold text-cosmic-indigo dark:text-white mb-0.5 text-center  w-full" title={enrichedChoice.title}>{enrichedChoice.title}</h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 mb-1 text-center whitespace-pre-line min-h-[2.5em]">{enrichedChoice.description}</p>
          <div className="mt-auto w-full flex items-end gap-2">
            <ConsultationButton
              enrichedChoice={enrichedChoice}
              onConsult={onSelect}
            />
          </div>
        </div>
      </motion.article>
    );
  }
);

export default RubriqueConsultationCard;