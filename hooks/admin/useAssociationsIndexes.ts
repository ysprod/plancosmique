import { useMemo } from "react";

/**
 * Hook pour indexer les offrandes par ID
 */
export function useOfferingsIndex(offerings: any[]) {
  const getId = (x: any): string | null => {
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

  return useMemo(() => {
    const m = new Map<string, any>();
    for (const o of offerings ?? []) {
      const id = getId(o);
      if (id) m.set(id, o);
    }
    return m;
  }, [offerings]);
}

/**
 * Hook pour indexer les consultations par rubrique
 */
export function useConsultationsByRubrique(consultations: any[]) {
  return useMemo(() => {
    const m = new Map<string, any[]>();
    for (const c of consultations ?? []) {
      const rid = String(c?.rubrique ?? "");
      if (!rid) continue;
      const arr = m.get(rid);
      if (arr) arr.push(c);
      else m.set(rid, [c]);
    }
    return m;
  }, [consultations]);
}

/**
 * Hook pour filtrer les rubriques ayant des consultations
 */
export function useRubriquesWithConsultations(
  rubriques: any[],
  consultationsByRubriqueId: Map<string, any[]>
) {
  const getId = (x: any): string | null => {
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

  const safeText = (v: any): string => String(v ?? "").trim();

  return useMemo(() => {
    const out: Array<{ id: string; titre: string; description: string; count: number; raw: any }> = [];
    for (const r of rubriques ?? []) {
      const id = getId(r);
      if (!id) continue;
      const titre = safeText(r?.titre ?? "Rubrique");
      const description = safeText(r?.description ?? "");
      const count = consultationsByRubriqueId.get(id)?.length ?? 0;

      if (count === 0) continue;

      out.push({ id, titre, description, count, raw: r });
    }
    out.sort((a, b) => b.count - a.count || a.titre.localeCompare(b.titre));
    return out;
  }, [rubriques, consultationsByRubriqueId]);
}
