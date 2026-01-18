'use client';
import { motion } from 'framer-motion';
import React, { memo } from 'react';

const particleVariants = {
  float: (custom: number) => ({
    y: [0, -20, 0],
    x: [0, custom * 5, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: custom * 0.2
    }
  })
};

interface FloatingParticleProps {
  Icon: React.ElementType;
  delay: number;
  x: string;
  y: string;
  color: string;
}

const FloatingParticle = memo<FloatingParticleProps>(({ Icon, delay, x, y, color }) => (
  <motion.div
    className="absolute"
    style={{ left: x, top: y }}
    custom={delay}
    variants={particleVariants}
    animate="float"
  >
    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
  </motion.div>
), (prev, next) => prev.delay === next.delay);

FloatingParticle.displayName = 'FloatingParticle';

export default FloatingParticle;