"use client";
import { api } from "@/lib/api/client";
import { offeringsService, type Offering } from '@/lib/api/services/offerings.service';
import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  Package,
  Plus,
  Trash2
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import RubriqueEditor from "./components/RubriqueEditor";
import Toast from "./components/Toast";

type OfferingCategory = "animal" | "vegetal" | "beverage";

export interface ConsultationOffering {
  category: OfferingCategory;
  offeringId: string;
  quantity: number;
}

export interface ConsultationChoice {
  id?: string;
  title: string;
  description: string;
  offering: {
    alternatives: ConsultationOffering[];
  };
}

export interface Rubrique {
  _id?: string;
  titre: string;
  description: string;
  categorie: string;
  consultationChoices: ConsultationChoice[];
  createdAt?: string;
  updatedAt?: string;
}  

export default function RubriquesAdminPage() {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [selectedRubrique, setSelectedRubrique] = useState<Rubrique | null>(null);
  const [editingRubrique, setEditingRubrique] = useState<Rubrique | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [offeringsLoading, setOfferingsLoading] = useState(false);

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
      consultationChoices: []
    };
    setEditingRubrique(newRubrique);
    setSelectedRubrique(null);
  }, []);


  const handleSave = useCallback(async () => {
    if (!editingRubrique) return;

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
    } catch (error: any) {
      setToast({
        type: "error",
        message: error.response?.data?.message || "Erreur de sauvegarde"
      });
    } finally {
      setSaving(false);
    }
  }, [editingRubrique, fetchRubriques]);

  // Delete rubrique
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

  if (loading || offeringsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
        <p className="text-sm text-slate-600">
          {loading ? "Chargement rubriques..." : "Chargement offrandes..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Gestion des rubriques</h1>
              <p className="text-sm text-slate-600">
                {rubriques.length} rubriques • {offerings.length} offrandes
              </p>
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r 
                     from-violet-600 to-purple-600 text-white font-bold 
                     hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nouvelle rubrique
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-3">
            {rubriques.map((rub) => (
              <motion.div
                key={rub._id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedRubrique(rub);
                  setEditingRubrique(rub);
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedRubrique?._id === rub._id
                  ? "border-violet-500 bg-violet-50 shadow-lg"
                  : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{rub.titre}</h3>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {rub.description}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      # {rub._id}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-violet-600">
                        {rub.consultationChoices.length} choix
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(rub._id!);
                    }}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {rubriques.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Aucune rubrique</p>
              </div>
            )}
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {editingRubrique ? (
                <RubriqueEditor
                  key={editingRubrique._id || "new"}
                  rubrique={editingRubrique}
                  onUpdate={setEditingRubrique}
                  onSave={handleSave}
                  onCancel={() => setEditingRubrique(null)}
                  isSaving={saving}
                  offerings={offerings}
                />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-slate-400 py-20"
                >
                  <Package className="w-16 h-16 mb-4 opacity-50" />
                  <p>Sélectionnez une rubrique pour l'éditer</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}