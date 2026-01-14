import { useMemo } from 'react';
import { useCinqPortes } from '@/hooks/carteduciel/useCinqPortes';
import { CarteDuCielData } from '@/lib/interfaces';

/**
 * Hook personnalisé pour gérer la logique des 5 Portes
 * Mémorise les portes pour éviter les rerendus inutiles
 */
export function useCinqPortesData(carteDuCiel: CarteDuCielData | null) {
  const { cinqPortes, portesArray } = useCinqPortes(carteDuCiel);
  
  // Mémoriser pour éviter rerendus inutiles
  const memoizedPortes = useMemo(() => portesArray, [portesArray]);
  const memoizedCinqPortes = useMemo(() => cinqPortes, [cinqPortes]);

  return {
    cinqPortes: memoizedCinqPortes,
    portesArray: memoizedPortes
  };
}
