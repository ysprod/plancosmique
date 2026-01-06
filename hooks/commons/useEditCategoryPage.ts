import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { getCategory, updateCategory } from "@/lib/api/services/categories.service";
import { useAdminRubriquesPage } from "@/hooks/admin/useAdminRubriquesPage";
import { Rubrique } from "@/lib/interfaces";
import { getRubriqueId, rubriqueLabel } from "@/lib/functions";

export type Banner = { type: "success" | "error" | "info"; message: string } | null;
export type ViewMode = "edit" | "preview" | "success";

export function useEditCategoryPage() {
  const params = useParams();
  const categoryId = useMemo(() => String((params as any)?.id ?? ""), [params]);

  const { rubriques, loading: rubriquesLoading } = useAdminRubriquesPage();

  const [view, setView] = useState<ViewMode>("edit");
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const [rubriqueIds, setRubriqueIds] = useState<string[]>([]);
  const selectedSet = useMemo(() => new Set(rubriqueIds), [rubriqueIds]);

  const [pageLoading, setPageLoading] = useState(true);

  // ui
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<Banner>(null);
  const bannerTimer = useRef<number | null>(null);

  const showBanner = useCallback((b: Banner) => {
    if (bannerTimer.current) window.clearTimeout(bannerTimer.current);
    setBanner(b);
    if (b) bannerTimer.current = window.setTimeout(() => setBanner(null), 2400);
  }, []);

  const hydrateFromBackend = useCallback((cat: any) => {
    setNom(String(cat?.nom ?? ""));
    setDescription(String(cat?.description ?? ""));

    const idsFromRubriques =
      Array.isArray(cat?.rubriques) && cat.rubriques.length > 0
        ? cat.rubriques.map(getRubriqueId).filter(Boolean)
        : [];

    const idsFromRubriqueIds =
      Array.isArray(cat?.rubriqueIds) && cat.rubriqueIds.length > 0
        ? cat.rubriqueIds.map(String)
        : [];

    const ids = idsFromRubriques.length > 0 ? idsFromRubriques : idsFromRubriqueIds;

    setRubriqueIds(Array.from(new Set(ids)));
  }, []);

  useEffect(() => {
    let alive = true;

    async function fetchCategory() {
      if (!categoryId) return;
      setPageLoading(true);
      try {
        const cat = await getCategory(categoryId);
        if (!alive) return;
        hydrateFromBackend(cat);
        showBanner({ type: "info", message: "Catégorie chargée." });
      } catch {
        if (!alive) return;
        showBanner({ type: "error", message: "Erreur lors du chargement." });
      } finally {
        if (alive) setPageLoading(false);
      }
    }

    fetchCategory();
    return () => {
      alive = false;
    };
  }, [categoryId, hydrateFromBackend, showBanner]);

  // Map rubriques dispo (liste globale) -> pour aperçu & chips
  const rubriquesById = useMemo(() => {
    const m = new Map<string, Rubrique>();
    (rubriques ?? []).forEach((r: any) => {
      const id = getRubriqueId(r);
      if (id) m.set(id, r);
    });
    return m;
  }, [rubriques]);

  const selectedRubriques = useMemo(() => {
    const out: Rubrique[] = [];
    for (const id of rubriqueIds) {
      const r = rubriquesById.get(id);
      if (r) out.push(r);
    }
    return out;
  }, [rubriqueIds, rubriquesById]);

  const selectionSummary = useMemo(() => {
    if (selectedRubriques.length === 0) return "Aucune rubrique sélectionnée.";
    const names = selectedRubriques.map(rubriqueLabel);
    return names.slice(0, 3).join(" • ") + (names.length > 3 ? " • …" : "");
  }, [selectedRubriques]);

  const canEdit = useMemo(() => nom.trim().length > 0 && !busy, [nom, busy]);

  const toggleRubrique = useCallback((id: string) => {
    setRubriqueIds((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return Array.from(s);
    });
  }, []);

  const clearSelection = useCallback(() => setRubriqueIds([]), []);

  const goPreview = useCallback(() => {
    if (!nom.trim()) {
      showBanner({ type: "error", message: "Le nom est requis." });
      return;
    }
    setView("preview");
  }, [nom, showBanner]);

  const goEdit = useCallback(() => setView("edit"), []);
  const goSuccess = useCallback(() => setView("success"), []);

  const handleEdit = useCallback(async () => {
    if (!canEdit || !categoryId) return;

    setBusy(true);
    setBanner(null);

    try {
      // ✅ Payload cohérent : rubriqueIds (comme votre createCategory)
      await updateCategory(categoryId, {
        nom: nom.trim(),
        description: description.trim(),
        rubriques: rubriqueIds,
      });

      showBanner({ type: "success", message: "Catégorie modifiée avec succès." });
      goSuccess();
    } catch {
      showBanner({ type: "error", message: "Erreur lors de la modification." });
      setView("edit");
    } finally {
      setBusy(false);
    }
  }, [canEdit, categoryId, nom, description, rubriqueIds, goSuccess, showBanner]);

  return {
    rubriques,
    rubriquesLoading,
    pageLoading,
    view,
    setView,
    nom,
    setNom,
    description,
    setDescription,
    rubriqueIds,
    selectedSet,
    busy,
    banner,
    selectedRubriques,
    selectionSummary,
    toggleRubrique,
    clearSelection,
    goPreview,
    goEdit,
    goSuccess,
    handleEdit,
  };
}
