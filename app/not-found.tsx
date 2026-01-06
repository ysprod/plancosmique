'use client';
import { motion } from 'framer-motion';
import { Sparkles, Star, Moon, Sun, Home } from 'lucide-react';
import Link from 'next/link';
import { memo, useMemo } from 'react';

const STARS_COUNT = 15;  
const ANIMATION_DURATION = 0.6;  

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: ANIMATION_DURATION
    }
  }
};

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const iconGroupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.1
    }
  }
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300 }
  }
};


interface AnimatedStarProps {
  index: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

const AnimatedStar = memo<AnimatedStarProps>(({ index, top, left, delay, duration }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top: `${top}%`, left: `${left}%` }}
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut'
    }}
  >
    <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white/60 drop-shadow-glow" />
  </motion.div>
), (prev, next) => prev.index === next.index);

AnimatedStar.displayName = 'AnimatedStar';

// ============================================================
// COMPOSANT: BackgroundOrbs (Mémoïsé)
// ============================================================

const BackgroundOrbs = memo(() => (
  <>
    {/* Orb 1 - Purple */}
    <motion.div
      className="absolute top-10 sm:top-20 left-5 sm:left-10 
               w-24 h-24 sm:w-32 sm:h-32
               bg-purple-500/25 rounded-full blur-2xl sm:blur-3xl"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.35, 0.15]
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    {/* Orb 2 - Pink */}
    <motion.div
      className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 
               w-32 h-32 sm:w-48 sm:h-48
               bg-pink-500/20 rounded-full blur-2xl sm:blur-3xl"
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.1, 0.25, 0.1]
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1
      }}
    />

    {/* Orb 3 - Indigo (nouveau pour plus de profondeur) */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-40 h-40 sm:w-64 sm:h-64
               bg-indigo-500/15 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.2, 0.05]
      }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2
      }}
    />
  </>
));

BackgroundOrbs.displayName = 'BackgroundOrbs';

// ============================================================
// COMPOSANT: IconGroup (Mémoïsé)
// ============================================================

const IconGroup = memo(() => (
  <motion.div
    variants={iconGroupVariants}
    initial="hidden"
    animate="visible"
    className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4"
  >
    <motion.div variants={iconVariants}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Moon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-300" />
      </motion.div>
    </motion.div>

    <motion.div variants={iconVariants}>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
      </motion.div>
    </motion.div>

    <motion.div variants={iconVariants}>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-orange-200" />
      </motion.div>
    </motion.div>
  </motion.div>
));

IconGroup.displayName = 'IconGroup';

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

function NotFoundComponent() {
  // Génération des positions d'étoiles mémoïsées
  const stars = useMemo(() =>
    Array.from({ length: STARS_COUNT }, (_, i) => ({
      index: i,
      top: Math.random() * 85 + 5, // 5-90% pour éviter les bords
      left: Math.random() * 85 + 5,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2 // 2-4s
    })),
    []
  );

  return (
    <div className=" flex flex-col items-center justify-center 
                  bg-gradient-to-br from-purple-900 via-indigo-900 to-black 
                  relative overflow-hidden px-4">

      {/* Animations de fond */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 -z-10"
      >
        {/* Orbs de fond */}
        <BackgroundOrbs />

        {/* Étoiles animées */}
        {stars.map((star) => (
          <AnimatedStar key={star.index} {...star} />
        ))}
      </motion.div>

      {/* Contenu principal */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-2xl"
      >
        {/* Groupe d'icônes */}
        <IconGroup />

        {/* 404 - Ultra-compact mobile */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-black text-white 
                   drop-shadow-2xl mb-3 sm:mb-4 tracking-tight"
          animate={{
            textShadow: [
              '0 0 20px rgba(168, 85, 247, 0.4)',
              '0 0 40px rgba(236, 72, 153, 0.6)',
              '0 0 20px rgba(168, 85, 247, 0.4)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          404
        </motion.h1>

        {/* Titre - Mobile-first */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-200 
                   mb-2 px-4"
        >
          Oups ! Étoile perdue...
        </motion.h2>

        {/* Description - Compact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-indigo-100 
                   mb-6 sm:mb-8 leading-relaxed px-4"
        >
          La page que tu cherches s'est égarée dans la galaxie.
          <br className="hidden sm:block" />
          <span className="block sm:inline"> Mais l'univers de </span>
          <span className="font-semibold text-purple-300">Mon Etoile</span>
          <span className="block sm:inline"> regorge de merveilles !</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2
                     px-6 py-3 sm:px-8 sm:py-4
                     rounded-full
                     bg-gradient-to-r from-purple-500 to-pink-600
                     text-white text-sm sm:text-base font-bold
                     shadow-lg hover:shadow-2xl
                     hover:scale-105 hover:from-pink-600 hover:to-purple-500
                     active:scale-95
                     transition-all duration-300
                     focus:outline-none focus:ring-4 focus:ring-purple-400/50"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Revenir à l'accueil</span>
          </Link>
        </motion.div>

        {/* Message secondaire - Très compact mobile */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 sm:mt-8 text-xs sm:text-sm text-indigo-300/70 
                   italic px-4"
        >
          "Chaque détour est une nouvelle constellation à découvrir ✨"
        </motion.p>
      </motion.div>
    </div>
  );
} 

export default memo(NotFoundComponent, () => true);
