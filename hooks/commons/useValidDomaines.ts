import { useMemo } from 'react';

export function useValidDomaines(domaines: any[]) {
  return useMemo(() =>
    Array.isArray(domaines)
      ? domaines.filter((d) => d && typeof d.id === 'string' && d.id.trim() !== '')
      : [],
    [domaines]
  );
}