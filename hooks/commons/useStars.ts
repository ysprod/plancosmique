import { useMemo } from 'react';

const STARS_COUNT = 15;

export interface StarConfig {
  index: number;
  top: number;
  left: number;
  delay: number;
  duration: number;
}

import { useEffect, useState } from 'react';

export function useStars() {
  const [stars, setStars] = useState<StarConfig[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: STARS_COUNT }, (_, i) => ({
      index: i,
      top: Math.random() * 85 + 5,
      left: Math.random() * 85 + 5,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setStars(generated);
  }, []);

  return stars;
}
