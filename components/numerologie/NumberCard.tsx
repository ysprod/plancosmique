'use client';

import React, { useState, useCallback } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // Custom easing
    },
  },
};

const contentVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const numberVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
};

// ============================================================================
// COMPOSANT
// ============================================================================

interface Props {
  title: string;
  icon: React.ReactNode;
  number: number | string;
  calcul: string;
  signification: string;
  interpretation: string;
  gradient: string;
  badge?: string;
}

export const NumberCard = React.memo<Props>(({
  title,
  icon,
  number,
  calcul,
  signification,
  interpretation,
  gradient,
  badge,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <motion.article
      variants={cardVariants}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 shadow-lg backdrop-blur-md transition-all hover:shadow-2xl hover:shadow-purple-500/30"
    >
      {/* Badge (si présent) */}
      {badge && (
        <div className="absolute right-3 top-3 z-10">
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.3 }}
            className="inline-block rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-yellow-900 shadow-lg"
          >
            {badge}
          </motion.span>
        </div>
      )}

      {/* En-tête */}
      <div className="p-5 sm:p-6">
        {/* Titre avec icône */}
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className={`rounded-xl bg-gradient-to-r ${gradient} p-2.5 text-white shadow-lg sm:p-3`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {icon}
          </motion.div>
          <h3 className="flex-1 text-base font-bold text-purple-100 sm:text-lg">
            {title}
          </h3>
        </div>

        {/* Nombre principal avec animation */}
        <div className="mb-4 text-center">
          <motion.div
            variants={numberVariants}
            initial="hidden"
            animate="visible"
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r ${gradient} text-4xl font-bold text-white shadow-2xl sm:h-24 sm:w-24 sm:text-5xl`}
          >
            {number}
          </motion.div>
        </div>

        {/* Signification */}
        <p className="mb-4 text-center text-xs italic leading-relaxed text-purple-300 sm:text-sm">
          {signification}
        </p>

        {/* Bouton d'expansion */}
        <motion.button
          onClick={toggleExpand}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium text-purple-200 transition-all hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
          aria-expanded={isExpanded}
          aria-controls={`details-${title.replace(/\s+/g, '-')}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{isExpanded ? 'Masquer les détails' : 'Voir les détails'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Contenu déroulant */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`details-${title.replace(/\s+/g, '-')}`}
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 bg-black/30 p-5 sm:p-6">
              {/* Calcul */}
              <div className="mb-5">
                <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-purple-400"></span>
                  Calcul
                </h4>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs leading-relaxed text-purple-200 sm:text-sm">
                    {calcul}
                  </p>
                </div>
              </div>

              {/* Interprétation */}
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-purple-400"></span>
                  Interprétation
                </h4>
                <div className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs leading-relaxed text-purple-100 sm:text-sm">
                    {interpretation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});

NumberCard.displayName = 'NumberCard';
