'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';

export const BackgroundOrbs = memo(function BackgroundOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/20 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
});
