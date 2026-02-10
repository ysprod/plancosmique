"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X } from "lucide-react";
import { memo, useState } from "react";
import type { ConsultationChoice, Offering } from "@/lib/interfaces";

interface ChoiceCreateViewProps {
  onSave: (choice: ConsultationChoice) => void;
  onCancel: () => void;
  offerings: Offering[];
}

const ChoiceCreateView = memo(function ChoiceCreateView({ onSave, onCancel, offerings }: ChoiceCreateViewProps) {
  const [newChoice, setNewChoice] = useState<ConsultationChoice>({
    title: "",
    description: "",
    frequence: undefined,
    participants: undefined,
    offering: {
      alternatives: [
        { category: "animal", offeringId: "", quantity: 1 },
        { category: "vegetal", offeringId: "", quantity: 1 },
        { category: "beverage", offeringId: "", quantity: 1 },
      ],
    },
    order: 0,
    choiceId: "",
    choiceTitle: "",
    buttonStatus: 'CONSULTER',
    consultButtonStatus: 'CONSULTER',
    hasActiveConsultation: false,
    consultationId: null,
    consultationCount: 0,
  });

  const handleSave = () => {
    if (!newChoice.title.trim()) {
      alert("Le titre est requis");
      return;
    }
    onSave(newChoice);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4 rounded-2xl border-2 border-violet-300 bg-gradient-to-br from-violet-50 to-purple-50 p-4 dark:from-violet-950/20 dark:to-purple-950/20"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-violet-200 pb-3 dark:border-violet-800">
        <motion.button
          onClick={onCancel}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          className="rounded-lg p-2 text-slate-600 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-zinc-800/50"
        >
          <ArrowLeft className="h-4 w-4" />
        </motion.button>
        <h4 className="text-sm font-black text-slate-900 dark:text-white">Nouveau choix de consultation</h4>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">Titre *</label>
          <input
            type="text"
            value={newChoice.title}
            onChange={(e) => setNewChoice({ ...newChoice, title: e.target.value })}
            placeholder="Ex: Consultation simple"
            className="w-full rounded-lg border-2 border-violet-200 px-3 py-2 text-sm font-semibold focus:border-violet-500 focus:ring-2 focus:ring-violet-300 dark:border-violet-800 dark:bg-zinc-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
          <textarea
            value={newChoice.description}
            onChange={(e) => setNewChoice({ ...newChoice, description: e.target.value })}
            placeholder="Description du choix..."
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-300 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">Fréquence</label>
            <select
              value={newChoice.frequence || ""}
              onChange={(e) =>
                setNewChoice({
                  ...newChoice,
                  frequence: (e.target.value || undefined) as any,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-300 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <option value="">-- Sélectionner --</option>
              <option value="UNE_FOIS_VIE">Une fois dans la vie</option>
              <option value="ANNUELLE">Annuelle</option>
              <option value="MENSUELLE">Mensuelle</option>
              <option value="QUOTIDIENNE">Quotidienne</option>
              <option value="LIBRE">Libre</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-slate-700 dark:text-slate-300">Participants</label>
            <select
              value={newChoice.participants || ""}
              onChange={(e) =>
                setNewChoice({
                  ...newChoice,
                  participants: (e.target.value || undefined) as any,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-300 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <option value="">-- Sélectionner --</option>
              <option value="SOLO">Solo</option>
              <option value="AVEC_TIERS">Avec une tierce personne</option>
              <option value="POUR_TIERS">Pour une personne tierce</option>
              <option value="GROUPE">Groupe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 border-t border-violet-200 pt-3 dark:border-violet-800">
        <motion.button
          onClick={onCancel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-slate-300 px-3 py-2 text-xs font-bold transition-colors hover:bg-slate-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <X className="h-4 w-4" />
          Annuler
        </motion.button>
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-2 text-xs font-bold text-white shadow-lg transition-all hover:from-violet-700 hover:to-purple-700"
        >
          <Check className="h-4 w-4" />
          Créer
        </motion.button>
      </div>
    </motion.div>
  );
});

ChoiceCreateView.displayName = "ChoiceCreateView";

export default ChoiceCreateView;