import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { itemVariants } from './resultDisplayConstants';

interface SpiritualAdviceCardProps {
  spiritualAdvice: string;
  prefersReducedMotion: boolean | null;
}

export const SpiritualAdviceCard = memo<SpiritualAdviceCardProps>(({
  spiritualAdvice,
  prefersReducedMotion
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 
                 rounded-3xl p-6 border-2 border-amber-300 overflow-hidden group"
    >
      {/* Decorative stars */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-4 right-4 text-amber-300/30"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            <Star className="w-16 h-16" fill="currentColor" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-orange-300/30"
            animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
            transition={{ duration: 15, repeat: Infinity }}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Star className="w-6 h-6 text-amber-600" fill="currentColor" />
          </motion.div>
          <h4 className="font-bold text-amber-900 text-base sm:text-lg">
            Sagesse Ancestrale
          </h4>
        </div>
        <blockquote className="text-amber-800 italic leading-relaxed text-sm sm:text-base
                             border-l-4 border-amber-400 pl-4">
          "{spiritualAdvice}"
        </blockquote>
      </div>
    </motion.div>
  );
});

SpiritualAdviceCard.displayName = 'SpiritualAdviceCard';
