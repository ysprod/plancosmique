import { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';
import { HoroscopeResult } from '@/lib/interfaces';

export function useResultDisplay(result: HoroscopeResult) {
  const prefersReducedMotion = useReducedMotion();

  const sections = useMemo(() => [
    { key: 'love' as const, title: 'Amour & Relations', content: result.love },
    { key: 'work' as const, title: 'Travail & Carrière', content: result.work },
    { key: 'health' as const, title: 'Santé & Bien-être', content: result.health }
  ], [result.love, result.work, result.health]);

  return {
    prefersReducedMotion,
    sections
  };
}
