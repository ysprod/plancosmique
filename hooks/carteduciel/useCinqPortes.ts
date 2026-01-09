import { useMemo } from 'react';
import { CarteDuCielData } from '@/lib/types/astrology.types';
import { extractCinqPortes } from '@/lib/functions'; 

export function useCinqPortes(carteDuCiel: CarteDuCielData | null) {
  const cinqPortes = useMemo(() => extractCinqPortes(carteDuCiel), [carteDuCiel]);

  const portesArray = useMemo(() =>
    cinqPortes ? [
      cinqPortes.signesolaire,
      cinqPortes.ascendant,
      cinqPortes.signeLunaire,
      cinqPortes.milieuDuCiel,
      cinqPortes.descendant
    ] : [],
    [cinqPortes]
  );

  return {
    cinqPortes,
    portesArray,
  };
}
