
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { CONSULTATION_CHOICES } from './consultation.constants';
import { ConsultationChoice } from '@/lib/interfaces';
import ConsultationCard from '../../vie-personnelle/slidesection/ConsultationCard';

interface Props {
  onSelect: (choice: ConsultationChoice) => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1 },
};

const ConsultationSelection: React.FC<Props> = React.memo(({ onSelect }) => {
  const handleSelect = useCallback((choice: ConsultationChoice) => {
    onSelect(choice);
  }, [onSelect]);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center px-2 py-4 sm:px-6 sm:py-8"
      style={{ minHeight: '40vh' }}
    >

      <h2 className="text-lg sm:text-xl font-bold text-cosmic-100 mb-2 tracking-tight animate-glow">
          Les 5 portes de votre étoile
        </h2>
        <p className="text-xs sm:text-sm text-cosmic-200 leading-snug mb-1">
          Découvrez les 5 forces qui structurent votre identité cosmique&nbsp;:
        </p>
        <ol className="flex flex-col gap-2 items-center text-cosmic-300 text-xs sm:text-sm mb-2 list-none">
          {[
            'Essence',
            'Présence',
            'Âme intime',
            'Direction de vie',
            'Relation à l’Autre',
          ].map((label, idx) => (
            <li
              key={label}
              className="w-full max-w-xs relative px-2 py-1 rounded bg-cosmic-800/40 flex items-center gap-1 shadow-sm animate-fadein"
            >
              <span className="inline-block w-5 h-5 mr-1 rounded-full bg-gradient-to-br from-cosmic-600 to-cosmic-400 text-cosmic-950 font-bold text-[0.85em] flex items-center justify-center shadow-md animate-pulse">
                {idx + 1}
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs sm:text-sm text-cosmic-300">
          Une étape fondamentale pour comprendre qui vous êtes, comment vous vibrez et la manière dont vous vous reliez au monde.
        </p><br/><br/>
    
      <motion.div
        variants={containerVariants}
        className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5"
      >
        {CONSULTATION_CHOICES.map((choice) => (
          <motion.div
            key={choice.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, boxShadow: '0 0 16px #fff3' }}
            whileTap={{ scale: 0.97 }}
            className="transition-transform duration-200"
          >
            <ConsultationCard
              choice={choice}
              onSelect={() => handleSelect(choice)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
});

ConsultationSelection.displayName = 'ConsultationSelection';

export default ConsultationSelection;
