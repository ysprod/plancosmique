import { api } from "@/lib/api/client";
import { offeringsService } from '@/lib/api/services/offerings.service';
import type { Offering, Rubrique } from '@/lib/interfaces';
import { ConsultationType } from '@/lib/interfaces';
import { useCallback, useEffect, useState } from "react";

export function useAdminRubriquesPage() {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [selectedRubrique, setSelectedRubrique] = useState<Rubrique | null>(null);
  const [editingRubrique, setEditingRubrique] = useState<Rubrique | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<any>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [offeringsLoading, setOfferingsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'gestion' | 'overview'>('gestion');
  const [gestionView, setGestionView] = useState<'list' | 'edit'>('list');

  const handleSelectRubrique = (rub: Rubrique) => {
    setSelectedRubrique(rub);
    setEditingRubrique(rub);
    setGestionView('edit');
  };

  const handleCreateRubrique = (handleCreate: () => void) => {
    handleCreate();
    setGestionView('edit');
  };

  const handleBackToList = () => {
    setEditingRubrique(null);
    setSelectedRubrique(null);
    setGestionView('list');
  };

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
    const newRubrique: Rubrique = {
      titre: "Nouvelle rubrique",
      description: "",
      categorie: "GENERAL",
      consultationChoices: [],
      type: ConsultationType.AUTRE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      typeconsultation: ConsultationType.AUTRE,
    };
    setEditingRubrique(newRubrique);
    setSelectedRubrique(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!editingRubrique) return;
    setSaving(true);
    // Mapping pour respecter le DTO backend
    const mappedRubrique = {
      ...editingRubrique,
   
      consultationChoices: (editingRubrique.consultationChoices || []).map(choice => {
        let offering = choice.offering;
        // S'assurer que offering est bien un objet avec alternatives tableau
        if (!offering || typeof offering !== 'object' || !Array.isArray(offering.alternatives)) {
          offering = { alternatives: [] };
        } else {
          offering = {
            alternatives: offering.alternatives.map((alt: any) => ({
              category: alt.category,
              offeringId: alt.offeringId,
              quantity: alt.quantity ?? 1,
            }))
          };
        }
        return {
          promptId: choice.promptId||undefined,
          title: choice.title,
          description: choice.description,
          frequence: choice.frequence,
          participants: choice.participants,
          order: choice.order,
          offering,       
        };
      })
    };
    try {
      if (editingRubrique._id) {
        await api.put(`/rubriques/${editingRubrique._id}`, mappedRubrique);
        setToast({ type: "success", message: "Rubrique mise à jour" });
      } else {
        await api.post("/rubriques", mappedRubrique);
        setToast({ type: "success", message: "Rubrique créée" });
      }
      await fetchRubriques();
      setEditingRubrique(null);
      setSelectedRubrique(null);
      setGestionView('list');
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
    gestionView,
    setGestionView,
    handleSelectRubrique,
    handleCreateRubrique,
    handleBackToList,
    activeTab,
    setActiveTab,
  };
}