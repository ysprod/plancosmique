import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/api/services/categories.service";
import { Rubrique } from "@/lib/interfaces";
import { useAdminRubriquesPage } from "@/hooks/admin/useAdminRubriquesPage";

export interface Categorie {
  _id: string;
  id: string;
  nom: string;
  description: string;
  rubriques: Rubrique[];
}

export type BannerType = "success" | "error" | "info";
export type BannerState = { type: BannerType; message: string } | null;

export function useAdminCategoriesPage() {
  const { rubriques } = useAdminRubriquesPage();
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [rubriquesLoading, setRubriquesLoading] = useState(false);
  const [rubriquesError, setRubriquesError] = useState<string | null>(null);
  const [banner, setBanner] = useState<BannerState>(null);
  const bannerTimer = useRef<number | null>(null);
  const [createNom, setCreateNom] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createRubriqueIds, setCreateRubriqueIds] = useState<string[]>([]);
  const [createBusy, setCreateBusy] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const showBanner = useCallback((b: BannerState) => {
    if (bannerTimer.current) window.clearTimeout(bannerTimer.current);
    setBanner(b);
    if (b) {
      bannerTimer.current = window.setTimeout(() => setBanner(null), 2200);
    }
  }, []);

  const rubriquesById = useMemo(() => {
    const m = new Map<string, Rubrique>();
    for (const r of rubriques ?? []) {
      if (r?._id) m.set(r._id, r);
    }
    return m;
  }, [rubriques]);

  const createSelectedRubriques = useMemo(() => {
    return createRubriqueIds
      .map((id) => rubriquesById.get(id))
      .filter(Boolean) as Rubrique[];
  }, [createRubriqueIds, rubriquesById]);

  const canCreate = useMemo(() => createNom.trim().length > 0 && !createBusy, [createNom, createBusy]);

  const fetchCategories = useCallback(async () => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      setCategoriesError("Impossible de charger les catégories.");
      showBanner({ type: "error", message: "Erreur: chargement des catégories." });
    } finally {
      setCategoriesLoading(false);
    }
  }, [showBanner]);

  const fetchRubriques = useCallback(async () => {
    setRubriquesLoading(true);
    setRubriquesError(null);
    try {
      await new Promise((r) => setTimeout(r, 250));
      showBanner({ type: "success", message: "Rubriques à jour." });
    } catch {
      setRubriquesError("Impossible de recharger les rubriques.");
      showBanner({ type: "error", message: "Erreur: chargement des rubriques." });
    } finally {
      setRubriquesLoading(false);
    }
  }, [showBanner]);

  useEffect(() => {
    fetchRubriques();
    fetchCategories();
  }, [fetchRubriques, fetchCategories]);

  const toggleCreateRubrique = useCallback((id: string) => {
    setCreateRubriqueIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const handleAddCategory = useCallback(async () => {
    const nom = createNom.trim();
    if (!nom || createBusy) return;
    setCreateBusy(true);
    try {
      await createCategory({
        nom,
        description: createDescription.trim(),
        rubriques: createRubriqueIds,
      });
      setCreateNom("");
      setCreateDescription("");
      setCreateRubriqueIds([]);
      showBanner({ type: "success", message: "Catégorie créée." });
      await fetchCategories();
    } catch {
      showBanner({ type: "error", message: "Erreur lors de la création." });
    } finally {
      setCreateBusy(false);
    }
  }, [createNom, createDescription, createRubriqueIds, createBusy, fetchCategories, showBanner]);

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      try {
        await deleteCategory(id);
        if (editingId === id) setEditingId(null);
        showBanner({ type: "info", message: "Catégorie supprimée." });
        await fetchCategories();
      } catch {
        showBanner({ type: "error", message: "Erreur lors de la suppression." });
      }
    },
    [editingId, fetchCategories, showBanner]
  );

  const startEdit = useCallback((id: string) => setEditingId(id), []);
  const stopEdit = useCallback(() => setEditingId(null), []);

  const saveEdit = useCallback(
    async (id: string, patch: Partial<Categorie>) => {
      try {
        await updateCategory(id, {
          nom: patch.nom ?? "",
          description: patch.description ?? "",
          rubriques: patch.rubriques?.map((r) => r._id!) ?? [],
        });
        setEditingId(null);
        showBanner({ type: "success", message: "Catégorie mise à jour." });
        await fetchCategories();
      } catch {
        showBanner({ type: "error", message: "Erreur lors de la mise à jour." });
      }
    },
    [fetchCategories, showBanner]
  );

  const counts = useMemo(() => {
    const rubCount = rubriques?.length ?? 0;
    const catCount = categories?.length ?? 0;
    return { rubCount, catCount };
  }, [rubriques, categories]);

  return {
    rubriques,
    categories,
    categoriesLoading,
    categoriesError,
    rubriquesLoading,
    rubriquesError,
    banner,
    showBanner,
    createNom,
    setCreateNom,
    createDescription,
    setCreateDescription,
    createRubriqueIds,
    setCreateRubriqueIds,
    createBusy,
    canCreate,
    editingId,
    setEditingId,
    startEdit,
    stopEdit,
    handleAddCategory,
    handleDeleteCategory,
    saveEdit,
    toggleCreateRubrique,
    fetchCategories,
    fetchRubriques,
    createSelectedRubriques,
    counts,
  };
}
