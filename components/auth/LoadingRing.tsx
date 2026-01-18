'use client';
import { motion } from 'framer-motion';
import React, { memo } from 'react';

interface LoadingRingProps {
  delay: number;
  duration: number;
  size: string;
  color: string;
}

const LoadingRing = memo<LoadingRingProps>(({ delay, duration, size, color }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration: 0.4, type: 'spring' }}
    className={`absolute ${size} border-4 ${color} rounded-full`}
  >
    <motion.div
      className="absolute inset-0 border-4 border-transparent rounded-full"
      style={{
        borderTopColor: 'currentColor',
        borderRightColor: 'currentColor'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  </motion.div>
), (prev, next) => prev.delay === next.delay);

LoadingRing.displayName = 'LoadingRing';

export default LoadingRing;