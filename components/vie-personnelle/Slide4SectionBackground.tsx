import { motion } from 'framer-motion';
import React from 'react';

const Slide4SectionBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-32 -right-32 w-80 h-80 bg-purple-400/30 dark:bg-purple-500/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.03, 0.05, 0.03] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-400/30 dark:bg-pink-500/20 rounded-full blur-3xl"
    />
  </div>
);

export default Slide4SectionBackground;
