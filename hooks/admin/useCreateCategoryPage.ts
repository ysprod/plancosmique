import { useAdminRubriquesPage } from "@/hooks/admin/useAdminRubriquesPage";
import { createCategory } from "@/lib/api/services/categories.service";

import { useState } from "react";

export function useCreateCategoryPage() {

  const { rubriques, loading: rubriquesLoading } = useAdminRubriquesPage();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [rubriqueIds, setRubriqueIds] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [banner, setBanner] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const selectedRubriques = (rubriques ?? []).filter((r) => rubriqueIds.includes(r._id!));
  const canCreate = nom.trim().length > 0 && !busy;

  async function handleCreate() {
    if (!canCreate) return;
    setBusy(true);
    setBanner(null);
    try {
      await createCategory({
        nom: nom.trim(),
        description: description.trim(),
        rubriques: rubriqueIds,
      });
      setBanner({ type: "success", message: "Catégorie créée !" });
      setTimeout(() => { window.location.href = "/admin/categories"; }, 1200);
    } catch {
      setBanner({ type: "error", message: "Erreur lors de la création." });
    } finally {
      setBusy(false);
    }
  }

  function toggleRubrique(id: string) {
    setRubriqueIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function goBack() {
    window.location.href = "/admin/categories";
  }

  return {
    nom,
    setNom,
    description,
    setDescription,
    rubriqueIds,
    setRubriqueIds,
    rubriques,
    rubriquesLoading,
    busy,
    banner,
    canCreate,
    selectedRubriques,
    handleCreate,
    toggleRubrique,
    goBack, 
  };
}
