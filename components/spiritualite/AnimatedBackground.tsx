import React from 'react';
import { motion, Variants } from 'framer-motion';

const blobVariants: Variants = {
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 90, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const AnimatedBackground = React.memo(() => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20" aria-hidden="true">
    {/* Blob 1 - Violet */}
    <motion.div
      className="absolute -top-[40%] -left-[20%] h-[60rem] w-[60rem] rounded-full bg-gradient-to-br from-violet-400/20 to-purple-500/10 blur-3xl"
      variants={blobVariants}
      animate="animate"
    />
    {/* Blob 2 - Rose */}
    <motion.div
      className="absolute -bottom-[40%] -right-[20%] h-[60rem] w-[60rem] rounded-full bg-gradient-to-tl from-pink-400/20 to-rose-500/10 blur-3xl"
      variants={blobVariants}
      animate="animate"
      style={{ animationDelay: '-12s' }}
    />
  </div>
));

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;
