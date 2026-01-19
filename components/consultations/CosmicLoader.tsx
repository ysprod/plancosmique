'use client';

import { motion } from 'framer-motion';
import { Star, Sparkles, Moon, Sun } from 'lucide-react';
import { memo, useMemo } from 'react';

const orbitVariants = {
  rotate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const planetVariants = (delay: number) => ({
  orbit: {
    rotate: 360,
    transition: {
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "linear"
    }
  }
});

const pulseVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const CosmicLoader = memo(() => {
  const stars = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2
  })), []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-950 to-blue-950 dark:from-slate-950 dark:via-purple-950 dark:to-indigo-950 p-4 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            className="rounded-full bg-white"
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-3xl"
      />

      {/* Main loader card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/10 dark:bg-slate-900/40 backdrop-blur-2xl rounded-3xl sm:rounded-[2rem] p-6 sm:p-10 max-w-md w-full text-center border border-white/20 dark:border-purple-500/20 shadow-2xl"
      >
        {/* Cosmic orbit system */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 sm:mb-8">
          {/* Center sun */}
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-2xl shadow-orange-500/50 flex items-center justify-center"
          >
            <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
          </motion.div>

          {/* Outer orbit ring */}
          <motion.div
            variants={orbitVariants}
            animate="rotate"
            className="absolute inset-0 border-2 border-dashed border-purple-400/30 dark:border-purple-500/30 rounded-full"
          >
            <motion.div
              variants={planetVariants(0)}
              animate="orbit"
              className="absolute -top-2 left-1/2 -ml-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="white" />
            </motion.div>
          </motion.div>

          {/* Middle orbit ring */}
          <motion.div
            variants={orbitVariants}
            animate="rotate"
            className="absolute inset-4 border-2 border-dashed border-blue-400/30 dark:border-blue-500/30 rounded-full"
            style={{ animationDirection: 'reverse' }}
          >
            <motion.div
              variants={planetVariants(0.5)}
              animate="orbit"
              className="absolute -top-1.5 left-1/2 -ml-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg"
            >
              <Moon className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="white" />
            </motion.div>
          </motion.div>

          {/* Inner orbit ring */}
          <motion.div
            variants={orbitVariants}
            animate="rotate"
            className="absolute inset-8 border-2 border-dashed border-pink-400/30 dark:border-pink-500/30 rounded-full"
          >
            <motion.div
              variants={planetVariants(1)}
              animate="orbit"
              className="absolute -top-1 left-1/2 -ml-1 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 shadow-lg"
            >
              <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" fill="white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight mb-3 sm:mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
        >
          Chargement de votre analyse
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm sm:text-base text-purple-200 dark:text-purple-300 mb-6"
        >
          Préparation de votre thème natal complet...
        </motion.p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
});

CosmicLoader.displayName = 'CosmicLoader';

export default CosmicLoader;
