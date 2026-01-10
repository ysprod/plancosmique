// Fonctions utilitaires pour Rubrique
import type { Rubrique } from '@/lib/interfaces';

export function clampText(s: string, max = 120) {
  if (!s) return "";
  const x = typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "";
  return x.length > max ? x.slice(0, max - 1) + "…" : x;
}

/** Hash déterministe (rapide) */
export function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function getStableRubriqueId(r: Rubrique): string {
  const anyRub: any = r as any;
  const raw = String(anyRub?._id ?? "");
  if (raw) return raw;

  const t = String(anyRub?.titre ?? "");
  const d = String(anyRub?.description ?? "");
  const h = hashString(`${t}|${d}`);
  return `rub_${h.toString(16)}`; // stable
}
