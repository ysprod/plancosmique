import { useMemo } from "react";
 
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Star = { top: string; left: string; opacity: number; scaleMax: number; delay: number; duration: number };

function makeStars(seed: number, count = 6): Star[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const top = `${Math.round((18 + rnd() * 70) * 100) / 100}%`;
    const left = `${Math.round((8 + rnd() * 84) * 100) / 100}%`;
    const opacity = 0.25 + rnd() * 0.55;
    const scaleMax = 1.6 + rnd() * 1.2;
    const delay = i * 0.22;
    const duration = 2.2 + rnd() * 1.6;
    return { top, left, opacity, scaleMax, delay, duration };
  });
}

export function useConsultationCardStars(id: string | undefined) {
  const starSeed = useMemo(() => {
    const s = String(id || "0");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return Math.abs(h);
  }, [id]);

  const stars = useMemo(() => makeStars(starSeed, 6), [starSeed]);

  return stars;
}
