'use client';

import { memo } from 'react';
import { motion } from 'framer-motion'; 

interface FloatingParticleProps {
  delay: number;
  x: string;
  y: string;
}

const FloatingParticleComponent = ({ delay, x, y }: FloatingParticleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.2, 0.8, 0.2],
        y: [0, -20, 0]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay
      }}
      className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-300 rounded-full"
      style={{ left: x, top: y }}
    />
  );
};

export const FloatingParticle = memo(FloatingParticleComponent, (prev, next) => {
  return prev.delay === next.delay && 
         prev.x === next.x && 
         prev.y === next.y;
});
