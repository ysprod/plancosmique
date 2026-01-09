'use client';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

interface WisdomData {
  proverbe: string;
  source: string;
  lien: string;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const proverbeVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};

const lienVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.4,
    },
  },
};

// ============================================================================
// SECTION PRINCIPALE
// ============================================================================

interface Props {
  data: WisdomData;
}

export const WisdomSection = React.memo<Props>(({ data }) => (
  <motion.section
    variants={sectionVariants}
    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-800/60 to-orange-800/60 p-6 backdrop-blur-sm sm:p-10 lg:p-12"
    aria-labelledby="wisdom-title"
  >
    {/* Ornements décoratifs animés */}
    <motion.div
      className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
    <motion.div
      className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, -90, 0],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: 'linear',
      }}
    />

    {/* Contenu */}
    <div className="relative z-10">
      {/* En-tête */}
      <div className="mb-8 text-center">
        <motion.div
          className="mb-4 flex items-center justify-center gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BookOpen className="h-7 w-7 text-amber-300 sm:h-8 sm:w-8" />
          <h2
            id="wisdom-title"
            className="text-2xl font-bold text-amber-100 sm:text-3xl lg:text-4xl"
          >
            Sagesse Africaine
          </h2>
          <BookOpen className="h-7 w-7 text-amber-300 sm:h-8 sm:w-8" />
        </motion.div>
        <p className="text-sm text-amber-300/80">
          Parole ancestrale pour guider votre chemin
        </p>
      </div>

      {/* Proverbe */}
      <motion.blockquote
        variants={proverbeVariants}
        className="relative mb-8 rounded-2xl border-l-4 border-amber-400 bg-black/30 p-6 shadow-2xl backdrop-blur-md sm:p-8"
      >
        {/* Icône de citation */}
        <Sparkles className="mb-4 h-8 w-8 text-amber-400" />

        {/* Texte du proverbe */}
        <p className="mb-4 text-lg font-medium italic leading-relaxed text-amber-50 sm:text-xl lg:text-2xl">
          {data.proverbe}
        </p>

        {/* Source */}
        <footer className="flex items-center gap-2 border-t border-amber-500/30 pt-4 text-sm text-amber-300">
          <Heart className="h-4 w-4" />
          <span>{data.source}</span>
        </footer>

        {/* Effet de brillance */}
        <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-amber-400/5 blur-xl" />
      </motion.blockquote>

      {/* Lien avec le parcours */}
      <motion.div
        variants={lienVariants}
        className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 backdrop-blur-sm"
      >
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-amber-200 sm:text-xl">
          <span className="text-2xl">🔗</span>
          Lien avec votre parcours
        </h3>
        <p className="text-sm leading-relaxed text-amber-100 sm:text-base">
          {data.lien}
        </p>
      </motion.div>
    </div>
  </motion.section>
));

WisdomSection.displayName = 'WisdomSection';
