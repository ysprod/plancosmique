import { memo } from 'react';
import { motion } from 'framer-motion';

export const FormBackgroundOrbs = memo(function FormBackgroundOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-0 right-0 w-72 h-72 bg-purple-400/10 dark:bg-purple-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </>
  );
});
