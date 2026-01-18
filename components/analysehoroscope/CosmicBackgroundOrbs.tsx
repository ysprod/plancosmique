'use client';
import { memo } from 'react';
import { motion } from 'framer-motion';

const CosmicBackgroundOrbs = memo(() => (
  <div className="absolute inset-0 -z-10">
    <motion.div
      className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-300/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.5, 0.3, 0.5],
      }}
      transition={{ duration: 5, repeat: Infinity }}
    />
  </div>
));

CosmicBackgroundOrbs.displayName = 'CosmicBackgroundOrbs';

export default CosmicBackgroundOrbs;