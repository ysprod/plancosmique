import { useMemo } from "react";

/**
 * Hook pour extraire l'ID d'un objet (supporte _id, id, $oid)
 */
export function useGetId() {
  return useMemo(() => {
    return function getId(x: any): string | null {
      const raw = x?._id ?? x?.id;
      if (!raw) return null;
      if (typeof raw === "string") return raw;
      if (typeof raw === "object" && typeof raw.$oid === "string") return raw.$oid;
      if (typeof raw?.toString === "function") {
        const s = raw.toString();
        return s && s !== "[object Object]" ? s : null;
      }
      return null;
    };
  }, []);
}

/**
 * Fonction utilitaire pour sécuriser le texte
 */
export function safeText(v: any): string {
  return String(v ?? "").trim();
}

/**
 * Fonction utilitaire pour raccourcir une description
 */
export function shortDesc(desc: string, max = 110) {
  const d = desc.replace(/\s+/g, " ").trim();
  return d.length > max ? d.slice(0, max - 1) + "…" : d;
}
