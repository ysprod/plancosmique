import React, { memo } from 'react';
import { motion } from 'framer-motion';
import ZodiacSymbol from './ZodiacSymbol';
import AnimatedBadge from './AnimatedBadge';
import { headerVariants, itemVariants, pulseVariants } from './resultDisplayConstants';

interface ResultHeaderProps {
  symbol: string;
  zodiacSign: string;
  period: string;
  element: string;
  horoscopeType: string;
  prefersReducedMotion: boolean | null;
}

export const ResultHeader = memo<ResultHeaderProps>(({
  symbol,
  zodiacSign,
  period,
  element,
  horoscopeType,
  prefersReducedMotion
}) => {
  return (
    <motion.div
      variants={headerVariants}
      className="relative text-center pb-6 border-b-2 border-gray-200"
    >
      {/* Background glow */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className="w-64 h-64 bg-gradient-to-br from-purple-200 via-pink-200 to-amber-200 
                     rounded-full blur-3xl opacity-20"
          />
        </div>
      )}

      {/* Zodiac Symbol */}
      <div className="relative mb-4">
        <ZodiacSymbol symbol={symbol} />
      </div>

      {/* Zodiac Sign */}
      <motion.h3
        variants={itemVariants}
        className="text-3xl sm:text-4xl font-black text-gray-900 mb-3
                 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 
                 bg-clip-text text-transparent"
      >
        {zodiacSign}
      </motion.h3>

      {/* Period */}
      <motion.p
        variants={itemVariants}
        className="text-gray-600 font-semibold text-base mb-3"
      >
        {period}
      </motion.p>

      {/* Badges */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <AnimatedBadge text={element} color="bg-purple-50 text-purple-700" />
        <AnimatedBadge text={horoscopeType} color="bg-blue-50 text-blue-700" />
      </motion.div>
    </motion.div>
  );
});

ResultHeader.displayName = 'ResultHeader';
