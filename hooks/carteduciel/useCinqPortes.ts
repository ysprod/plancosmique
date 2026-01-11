import { useMemo } from 'react';
 
import { extractCinqPortes } from '@/lib/functions'; 
import { CarteDuCielData } from '@/lib/interfaces';

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
