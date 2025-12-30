import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Package, Plus, Save, X } from "lucide-react";
import { Key, memo, useCallback } from "react";
import ConsultationChoiceCard from "./ConsultationChoiceCard";
 
import { Offering } from "@/lib/api/services/offerings.service";
import { ConsultationChoice } from "@/lib/interfaces";

const RubriqueEditor = memo(({
  rubrique,
  onUpdate,
  onSave,
  onCancel,
  isSaving,
  offerings
}: {
  rubrique: any;
  onUpdate: (updated: any) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  offerings: Offering[];
}) => {
  const handleAddChoice = useCallback(() => {
    const newChoice: any = {
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
      consultationChoices: rubrique.consultationChoices.filter((_: unknown, i: number) => i !== index)
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
            {rubrique.consultationChoices.map((choice: any, index:any) => (
              <ConsultationChoiceCard
                key={index}
                choice={choice}
                index={index!}
                onUpdate={(updated) => handleUpdateChoice(index!, updated)}
                onDelete={() => handleDeleteChoice(index!)}
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
export default RubriqueEditor;