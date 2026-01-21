'use client';
import { EnrichedChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { memo, useMemo } from 'react';
import { ConsultationButton } from './ConsultationButton';
import { ConsultationCardHeader } from './ConsultationCardHeader';
import { ConsultationStatusBadge } from './ConsultationStatusBadge';

interface RubriqueConsultationCardProps {
  enrichedChoice: EnrichedChoice;
  onSelect: () => void;
  index?: number;
}

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -6, scale: 1.01 }
};

const RubriqueConsultationCard = memo<RubriqueConsultationCardProps>(
  function RubriqueConsultationCard({ enrichedChoice, onSelect, index = 0 }) {
    const { choice, status } = enrichedChoice;
    const shimmerDelay = useMemo(() => index * 0.15, [index]);

    // Fallback frontend stricte selon la logique métier
    let fallbackButtonStatus: 'CONSULTER' | 'RÉPONSE EN ATTENTE' | "VOIR L'ANALYSE" = 'CONSULTER';
    // On suppose que status contient potentiellement isPaid et analysisNotified (sinon, on reste sur 'CONSULTER')
    const isPaid = (status as any).isPaid;
    const analysisNotified = (status as any).analysisNotified;

    if (!status.consultationId || isPaid === false) {
      fallbackButtonStatus = 'CONSULTER';
    } else if (isPaid === true && analysisNotified !== true) {
      fallbackButtonStatus = 'RÉPONSE EN ATTENTE';
    } else if (analysisNotified === true) {
      fallbackButtonStatus = "VOIR L'ANALYSE";
    }

    return (
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="
          group relative h-full
          flex flex-col items-center
          overflow-hidden rounded-xl
          bg-white dark:bg-gray-800/50
          shadow-sm hover:shadow-xl
          border border-purple-100 dark:border-purple-800/50
          backdrop-blur-sm
          transition-all duration-300
        "
      >
        <div className="
          absolute inset-0 
          bg-gradient-to-br from-purple-50 via-transparent to-fuchsia-50 
          dark:from-purple-950/10 dark:via-transparent dark:to-fuchsia-950/10 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-500
        " />
        <div className="relative z-10 flex-1 flex flex-col items-center w-full p-4 sm:p-5">
          <ConsultationCardHeader title={choice.title} description={choice.description} />
          <ConsultationStatusBadge hasActiveConsultation={status.hasActiveConsultation} />

          <div className="mt-auto w-full">
            <ConsultationButton
              status={fallbackButtonStatus}
              consultationId={status.consultationId}
              onConsult={onSelect}
            />
          </div>
        </div>

        {/* Effet shimmer subtil */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden opacity-60">
          <motion.div
            className="h-full w-1/4 bg-gradient-to-r from-transparent via-purple-400 dark:via-purple-500 to-transparent blur-sm"
            animate={{ x: ['-100%', '500%'] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 6,
              delay: shimmerDelay,
              ease: 'linear',
            }}
          />
        </div>
      </motion.article>
    );
  }
);

export default RubriqueConsultationCard;