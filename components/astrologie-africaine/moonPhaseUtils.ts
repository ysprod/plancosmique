import { useRef, useCallback } from "react";

export const useThrottle = <T extends any[]>(callback: (...args: T) => void, delay: number) => {
  const lastCall = useRef(0);
  return useCallback((...args: T) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};

export const getAdvice = (illumination: number) => {
  if (illumination < 25) return "Période d'introspection. Temps idéal pour planifier et méditer.";
  if (illumination < 75) return "Énergie croissante. Poussez vos projets vers l'avant.";
  return "Culmination énergétique. Récoltez les fruits de vos efforts.";
};

export const normalizeIllumination = (value: any): number => {
  const num = typeof value === 'string' ? parseFloat(value) : Number(value);
  if (isNaN(num) || !isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
};
 
export const getPhaseConfig = (phaseName: string) => {
  const PHASE_CONFIG = {
    nouvelle: { badge: "from-indigo-500 to-purple-600", ring: "ring-indigo-500/30", emoji: "🌑" },
    pleine: { badge: "from-amber-400 to-yellow-500", ring: "ring-amber-500/30", emoji: "🌕" },
    croissant: { badge: "from-blue-400 to-cyan-500", ring: "ring-blue-500/30", emoji: "🌒" },
    décroissant: { badge: "from-purple-400 to-pink-500", ring: "ring-purple-500/30", emoji: "🌘" },
    default: { badge: "from-gray-400 to-gray-600", ring: "ring-gray-500/30", emoji: "🌓" }
  } as const;
  const phase = phaseName.toLowerCase();
  for (const [key, config] of Object.entries(PHASE_CONFIG)) {
    if (phase.includes(key)) return config;
  }
  return PHASE_CONFIG.default;
};