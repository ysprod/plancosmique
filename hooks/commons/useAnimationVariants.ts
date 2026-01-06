import { useMemo } from 'react';
import type { Variants } from 'framer-motion';

/**
 * Hook pour les variantes d'animation Framer Motion
 * Mémorisé pour éviter les recréations inutiles
 */
export function useAnimationVariants() {
  const containerVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          staggerChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 },
      },
    }),
    []
  );

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
      },
    }),
    []
  );

  const pulseVariants: Variants = useMemo(
    () => ({
      pulse: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    }),
    []
  );

  return { containerVariants, itemVariants, pulseVariants };
}