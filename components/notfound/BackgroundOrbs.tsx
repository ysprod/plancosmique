import { memo } from 'react';
import { motion } from 'framer-motion';

const BackgroundOrbs = memo(() => (
  <>
    {/* Orb 1 - Purple */}
    <motion.div
      className="absolute top-10 sm:top-20 left-5 sm:left-10 
               w-24 h-24 sm:w-32 sm:h-32
               bg-purple-500/25 rounded-full blur-2xl sm:blur-3xl"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.15, 0.35, 0.15]
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />

    {/* Orb 2 - Pink */}
    <motion.div
      className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 
               w-32 h-32 sm:w-48 sm:h-48
               bg-pink-500/20 rounded-full blur-2xl sm:blur-3xl"
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.1, 0.25, 0.1]
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1
      }}
    />

    {/* Orb 3 - Indigo */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-40 h-40 sm:w-64 sm:h-64
               bg-indigo-500/15 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.05, 0.2, 0.05]
      }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 2
      }}
    />
  </>
));

BackgroundOrbs.displayName = 'BackgroundOrbs';
export default BackgroundOrbs;
