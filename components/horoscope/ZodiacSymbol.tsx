'use client';

import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

const symbolVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 12,
      delay: 0.2
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

const ZodiacSymbol = memo<{ symbol: string }>(({ symbol }) => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={symbolVariants}
      className="relative inline-block"
    >
      <motion.div
        variants={pulseVariants}
        animate="pulse"
        className="absolute inset-0 blur-2xl bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
      />
      <motion.div
        className="relative text-6xl sm:text-7xl md:text-8xl"
        animate={prefersReducedMotion ? {} : {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut'
        }}
      >
        {symbol}
      </motion.div>
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-2 -right-2 text-yellow-400"
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
          <motion.div
            className="absolute -bottom-2 -left-2 text-purple-400"
            animate={{
              scale: [0, 1, 0],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1.5,
              delay: 0.5
            }}
          >
            <Star className="w-4 h-4" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
});
ZodiacSymbol.displayName = 'ZodiacSymbol';
export default ZodiacSymbol;
