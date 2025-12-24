"use client";
import React, { useState, useCallback, useMemo, memo, useEffect } from "react";
import { offeringsService, type Offering } from '@/lib/api/services/offerings.service';
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
  CheckCircle,
  Package,
  DollarSign,
  Search
} from "lucide-react";
import { api } from "@/lib/api/client";

// =====================================================
// TYPES
// =====================================================
type OfferingCategory = "animal" | "vegetal" | "beverage";

interface ConsultationOffering {
  category: OfferingCategory;
  offeringId: string;
  quantity: number;
}

interface ConsultationChoice {
  id?: string;
  title: string;
  description: string;
  offering: {
    alternatives: ConsultationOffering[];
  };
}

interface Rubrique {
  _id?: string;
  titre: string;
  description: string;
  categorie: string;
  consultationChoices: ConsultationChoice[];
  createdAt?: string;
  updatedAt?: string;
}

// =====================================================
// CONSTANTS
// =====================================================
const CATEGORY_CONFIG: Record<OfferingCategory, { icon: string; label: string; color: string; bgColor: string }> = {
  animal: { 
    icon: "🐾", 
    label: "Animal", 
    color: "text-amber-700 border-amber-300", 
    bgColor: "bg-amber-50" 
  },
  vegetal: { 
    icon: "🌿", 
    label: "Végétal", 
    color: "text-green-700 border-green-300", 
    bgColor: "bg-green-50" 
  },
  beverage: { 
    icon: "🥤", 
    label: "Boisson", 
    color: "text-blue-700 border-blue-300", 
    bgColor: "bg-blue-50" 
  }
};

// =====================================================
// TOAST NOTIFICATION
// =====================================================
const Toast = memo(({ 
  type, 
  message, 
  onClose 
}: { 
  type: "success" | "error"; 
  message: string; 
  onClose: () => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-xl shadow-2xl border
                ${type === "success" 
                  ? "bg-green-50 border-green-200" 
                  : "bg-red-50 border-red-200"
                }`}
    >
      <div className="flex items-center gap-3">
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-600" />
        )}
        <p className={`text-sm font-medium ${
          type === "success" ? "text-green-900" : "text-red-900"
        }`}>
          {message}
        </p>
        <button onClick={onClose} className="ml-auto">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
});
Toast.displayName = "Toast";

// =====================================================
// OFFERING SELECTOR (Amélioré avec recherche)
// =====================================================
const OfferingSelector = memo(({
  alternative,
  offerings,
  onChange
}: {
  alternative: ConsultationOffering;
  offerings: Offering[];
  onChange: (updated: ConsultationOffering) => void;
}) => {
  const [search, setSearch] = useState("");
  
  const config = CATEGORY_CONFIG[alternative.category];
  
  // Filtrer par catégorie et recherche
  const filteredOfferings = useMemo(() => 
    offerings
      .filter(o => o.category === alternative.category)
      .filter(o => 
        search === "" || 
        o.name.toLowerCase().includes(search.toLowerCase())
      ),
    [offerings, alternative.category, search]
  );

  // Offrande sélectionnée
  const selectedOffering = useMemo(() => 
    offerings.find(o => o._id === alternative.offeringId),
    [offerings, alternative.offeringId]
  );

  return (
    <motion.div
      layout
      className={`p-3 rounded-xl border-2 ${config.color} ${config.bgColor} space-y-2`}
    >
      {/* Header avec catégorie */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{config.icon}</span>
          <span className="text-xs font-bold">{config.label}</span>
        </div>
        {selectedOffering && (
          <div className="flex items-center gap-1 text-xs font-semibold">
            <DollarSign className="w-3 h-3" />
            {selectedOffering.price} FCFA
          </div>
        )}
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-slate-300 
                   focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   bg-white"
        />
      </div>

      {/* Select dropdown */}
      <select
        value={alternative.offeringId}
        onChange={(e) => {
          onChange({ ...alternative, offeringId: e.target.value });
          setSearch(""); // Reset search
        }}
        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 
                 focus:ring-2 focus:ring-violet-500 focus:border-transparent
                 bg-white font-medium"
      >
        <option value="">Sélectionner</option>
        {filteredOfferings.map((offering) => (
          <option key={offering._id} value={offering._id}>
            {offering.icon} {offering.name} - {offering.price} FCFA
          </option>
        ))}
      </select>

      {/* Quantité */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-semibold">Quantité:</label>
        <input
          type="number"
          min={1}
          max={10}
          value={alternative.quantity}
          onChange={(e) => onChange({ ...alternative, quantity: Number(e.target.value) })}
          className="w-20 px-3 py-2 text-sm rounded-lg border border-slate-300 
                   focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   bg-white font-bold text-center"
        />
      </div>

      {/* Offrande sélectionnée (détails) */}
      {selectedOffering && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pt-2 border-t border-slate-200"
        >
          <p className="text-xs text-slate-600 line-clamp-2">
            {selectedOffering.description}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs">
            <span className="font-semibold">
              Total: {selectedOffering.price * alternative.quantity} FCFA
            </span>
            <span className="text-slate-500">
              (${(selectedOffering.priceUSD * alternative.quantity).toFixed(2)})
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});
OfferingSelector.displayName = "OfferingSelector";

// =====================================================
// CONSULTATION CHOICE CARD
// =====================================================
const ConsultationChoiceCard = memo(({
  choice,
  onUpdate,
  onDelete,
  offerings,
  index
}: {
  choice: ConsultationChoice;
  onUpdate: (updated: ConsultationChoice) => void;
  onDelete: () => void;
  offerings: Offering[];
  index: number;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAlternativeChange = useCallback((idx: number, updated: ConsultationOffering) => {
    const newAlternatives = [...choice.offering.alternatives];
    newAlternatives[idx] = updated;
    onUpdate({ ...choice, offering: { alternatives: newAlternatives } });
  }, [choice, onUpdate]);

  // Calculer le coût total
  const totalCost = useMemo(() => {
    return choice.offering.alternatives.reduce((sum, alt) => {
      const offering = offerings.find(o => o._id === alt.offeringId);
      return sum + (offering ? offering.price * alt.quantity : 0);
    }, 0);
  }, [choice.offering.alternatives, offerings]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, y: -10 }}
      className="border-2 border-slate-200 rounded-xl p-4 bg-white shadow-md
               hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={choice.title}
            onChange={(e) => onUpdate({ ...choice, title: e.target.value })}
            placeholder="Titre du choix"
            className="w-full px-3 py-2 text-sm font-bold rounded-lg border-2 border-violet-300 
                     focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
          />
          <textarea
            value={choice.description}
            onChange={(e) => onUpdate({ ...choice, description: e.target.value })}
            placeholder="Description du choix"
            rows={2}
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 
                     focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-violet-100 transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-violet-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-violet-600" />
            )}
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Coût total (toujours visible) */}
      {totalCost > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-violet-50 to-purple-50 
                      rounded-lg border border-violet-200 mb-3">
          <DollarSign className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-bold text-violet-900">
            Coût total: {totalCost} FCFA
          </span>
        </div>
      )}

      {/* Alternatives (expandable) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 overflow-hidden"
          >
            <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Alternatives d'offrandes (3 requises)
            </p>
            {choice.offering.alternatives.map((alt, idx) => (
              <OfferingSelector
                key={alt.category}
                alternative={alt}
                offerings={offerings}
                onChange={(updated) => handleAlternativeChange(idx, updated)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});
ConsultationChoiceCard.displayName = "ConsultationChoiceCard";

// =====================================================
// RUBRIQUE EDITOR
// =====================================================
const RubriqueEditor = memo(({
  rubrique,
  onUpdate,
  onSave,
  onCancel,
  isSaving,
  offerings
}: {
  rubrique: Rubrique;
  onUpdate: (updated: Rubrique) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  offerings: Offering[];
}) => {
  const handleAddChoice = useCallback(() => {
    const newChoice: ConsultationChoice = {
      title: "Nouveau choix",
      description: "",
      offering: {
        alternatives: [
          { category: "animal", offeringId: "", quantity: 1 },
          { category: "vegetal", offeringId: "", quantity: 1 },
          { category: "beverage", offeringId: "", quantity: 1 }
        ]
      }
    };
    onUpdate({
      ...rubrique,
      consultationChoices: [...rubrique.consultationChoices, newChoice]
    });
  }, [rubrique, onUpdate]);

  const handleUpdateChoice = useCallback((index: number, updated: ConsultationChoice) => {
    const newChoices = [...rubrique.consultationChoices];
    newChoices[index] = updated;
    onUpdate({ ...rubrique, consultationChoices: newChoices });
  }, [rubrique, onUpdate]);

  const handleDeleteChoice = useCallback((index: number) => {
    if (!confirm("Supprimer ce choix ?")) return;
    onUpdate({
      ...rubrique,
      consultationChoices: rubrique.consultationChoices.filter((_, i) => i !== index)
    });
  }, [rubrique, onUpdate]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6 border-2 border-slate-200 rounded-2xl bg-gradient-to-br from-white to-slate-50 shadow-xl"
    >
      {/* Header */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={rubrique.titre}
          onChange={(e) => onUpdate({ ...rubrique, titre: e.target.value })}
          placeholder="Titre de la rubrique"
          className="w-full px-4 py-3 text-lg font-black rounded-xl border-2 border-violet-300 
                   focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
        />
        <textarea
          value={rubrique.description}
          onChange={(e) => onUpdate({ ...rubrique, description: e.target.value })}
          placeholder="Description de la rubrique"
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-slate-300 
                   focus:ring-2 focus:ring-violet-500 focus:border-transparent"
        />
      </div>

      {/* Choices */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-violet-600" />
            Choix de consultations ({rubrique.consultationChoices.length})
          </h3>
          <button
            onClick={handleAddChoice}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r 
                     from-violet-600 to-purple-600 text-white text-sm font-bold 
                     hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Ajouter un choix
          </button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {rubrique.consultationChoices.map((choice, index) => (
              <ConsultationChoiceCard
                key={index}
                choice={choice}
                index={index}
                onUpdate={(updated) => handleUpdateChoice(index, updated)}
                onDelete={() => handleDeleteChoice(index)}
                offerings={offerings}
              />
            ))}
          </AnimatePresence>

          {rubrique.consultationChoices.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Aucun choix ajouté</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                   rounded-xl border-2 border-slate-300 hover:bg-slate-100 
                   transition-colors font-bold"
        >
          <X className="w-5 h-5" />
          Annuler
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 
                   rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 
                   text-white font-bold hover:from-violet-700 hover:to-purple-700 
                   disabled:opacity-50 transition-all shadow-lg"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
});
RubriqueEditor.displayName = "RubriqueEditor";

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function RubriquesAdminPage() {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [selectedRubrique, setSelectedRubrique] = useState<Rubrique | null>(null);
  const [editingRubrique, setEditingRubrique] = useState<Rubrique | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [offeringsLoading, setOfferingsLoading] = useState(false);

  // Fetch offerings
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

  // Fetch rubriques
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

  // Create new rubrique
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

  // Save rubrique
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
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRubrique?._id === rub._id
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