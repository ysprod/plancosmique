import { useCallback, useMemo } from 'react';
import type { Rubrique } from '@/lib/interfaces';

/**
 * Hook optimisé pour les utilitaires de rubrique
 * Utilise useCallback pour mémoïser les fonctions
 */
export function useRubriqueUtils() {
  // Mémoïser les fonctions pour éviter les re-créations inutiles
  const clampText = useCallback((s: string, max = 120) => {
    if (!s) return "";
    const x = typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "";
    return x.length > max ? x.slice(0, max - 1) + "…" : x;
  }, []);

  const hashString = useCallback((input: string): number => {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }, []);

  const getStableRubriqueId = useCallback((r: Rubrique): string => {
    const anyRub: any = r as any;
    const raw = String(anyRub?._id ?? "");
    if (raw) return raw;
    const t = String(anyRub?.titre ?? "");
    const d = String(anyRub?.description ?? "");
    const h = hashString(`${t}|${d}`);
    return `rub_${h.toString(16)}`;
  }, [hashString]);

  return useMemo(() => ({
    clampText,
    hashString,
    getStableRubriqueId
  }), [clampText, hashString, getStableRubriqueId]);
}
