'use client';
import { motion } from 'framer-motion';
import React, { memo } from 'react';

interface ShieldOrbitProps {
  radius: number;
  duration: number;
  reverse?: boolean;
}

const ShieldOrbit = memo<ShieldOrbitProps>(({ radius, duration, reverse = false }) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    <div
      className="absolute top-1/2 left-1/2 w-1 h-1 bg-violet-400 rounded-full shadow-lg shadow-violet-400/50"
      style={{
        transform: `translate(-50%, -50%) translateY(-${radius}px)`
      }}
    />
  </motion.div>
), (prev, next) => prev.radius === next.radius);

ShieldOrbit.displayName = 'ShieldOrbit';

export default ShieldOrbit;