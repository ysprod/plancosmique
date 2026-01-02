
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { offeringsService, type Offering } from '@/lib/api/services/offerings.service';
import type { Rubrique } from '@/lib/interfaces';

export function useAdminRubriquesPage() {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [selectedRubrique, setSelectedRubrique] = useState<Rubrique | null>(null);
  const [editingRubrique, setEditingRubrique] = useState<Rubrique | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<any>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [offeringsLoading, setOfferingsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOfferings = async () => {
      setOfferingsLoading(true);
      try {
        const data = await offeringsService.list();
        setOfferings(data);
      } catch (err) {
        setToast({ type: "error", message: "Erreur chargement offrandes" });
      } finally {
        setOfferingsLoading(false);
      }
    };
    fetchOfferings();
  }, []);

  const fetchRubriques = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/rubriques");
      setRubriques(response.data);
    } catch (error) {
      setToast({ type: "error", message: "Erreur de chargement" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRubriques();
  }, [fetchRubriques]);

  const handleCreate = useCallback(() => {
    const newRubrique = {
      titre: "Nouvelle rubrique",
      description: "",
      categorie: "GENERAL",
      consultationChoices: []
    };
    setEditingRubrique(newRubrique);
    setSelectedRubrique(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!editingRubrique) return;
    console.log("Saving rubrique:", editingRubrique);
    setSaving(true);
    try {
      if (editingRubrique._id) {
        await api.put(`/rubriques/${editingRubrique._id}`, editingRubrique);
        setToast({ type: "success", message: "Rubrique mise à jour" });
      } else {
        await api.post("/rubriques", editingRubrique);
        setToast({ type: "success", message: "Rubrique créée" });
      }
      await fetchRubriques();
      setEditingRubrique(null);
    } catch (error) {
      const err = error as any;
      setToast({ type: "error", message: err.response?.data?.message || "Erreur de sauvegarde" });
    } finally {
      setSaving(false);
    }
  }, [editingRubrique, fetchRubriques]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Supprimer cette rubrique ?")) return;
    try {
      await api.delete(`/rubriques/${id}`);
      setToast({ type: "success", message: "Rubrique supprimée" });
      await fetchRubriques();
      setSelectedRubrique(null);
      setEditingRubrique(null);
    } catch (error) {
      setToast({ type: "error", message: "Erreur de suppression" });
    }
  }, [fetchRubriques]);

  return {
    rubriques,
    selectedRubrique,
    setSelectedRubrique,
    editingRubrique,
    setEditingRubrique,
    loading,
    saving,
    toast,
    setToast,
    offerings,
    offeringsLoading,
    handleCreate,
    handleSave,
    handleDelete,
  };
}
