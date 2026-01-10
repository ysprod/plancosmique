import React, { memo } from 'react';
import { motion } from 'framer-motion';

const shimmerVariants = {
  shimmer: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

const AnimatedBadge = memo<{ text: string; color: string }>(({ text, color }) => (
  <motion.span
    whileHover={{ scale: 1.1, rotate: 2 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-1.5 ${color} rounded-full font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-shadow cursor-default relative overflow-hidden`}
  >
    <motion.div
      variants={shimmerVariants}
      animate="shimmer"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      style={{ backgroundSize: '200% 100%' }}
    />
    <span className="relative z-10">{text}</span>
  </motion.span>
));
AnimatedBadge.displayName = 'AnimatedBadge';
export default AnimatedBadge;
