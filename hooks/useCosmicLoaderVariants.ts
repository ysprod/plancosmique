import { useMemo } from 'react';
import { Variants } from 'framer-motion';

export const useCosmicLoaderVariants = () => {
  return useMemo<Variants>(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.85 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 18,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.25 },
    },
  }), []);
};