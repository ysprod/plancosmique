import { useMemo } from 'react';

const STARS_COUNT = 15;

export interface StarConfig {
  index: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

export function useStars() {
  return useMemo<StarConfig[]>(() =>
    Array.from({ length: STARS_COUNT }, (_, i) => ({
      index: i,
      top: Math.random() * 85 + 5,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    })),
    []
  );
}
