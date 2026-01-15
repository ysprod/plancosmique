import { ConsultationChoice, ConsultationType, Offering } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Save, X } from "lucide-react";
import { memo, useCallback } from "react";
import ChoiceCreateView from "./ChoiceCreateView";
import ChoicesListHeader from "./ChoicesListHeader";
import ChoicesListView from "./ChoicesListView";
import type { Rubrique } from "@/lib/interfaces";
import { useChoiceEditorNavigation } from "./useChoiceEditorNavigation";

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
  const { view, showList, showCreate } = useChoiceEditorNavigation();

  const handleAddChoice = useCallback((newChoice: ConsultationChoice) => {
    onUpdate({
      ...rubrique,
      consultationChoices: [newChoice, ...rubrique.consultationChoices]
    });
    showList();
  }, [rubrique, onUpdate, showList]);

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

  const handleMoveChoice = useCallback((index: number, direction: 'up' | 'down') => {
    const newChoices = [...rubrique.consultationChoices];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newChoices.length) return;
    
    // Échanger les positions
    [newChoices[index], newChoices[targetIndex]] = [newChoices[targetIndex], newChoices[index]];
    
    onUpdate({ ...rubrique, consultationChoices: newChoices });
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
        {/* Champ type ConsultationType */}
        <select
          value={rubrique.typeconsultation || ''}
          onChange={e => onUpdate({ ...rubrique, typeconsultation: e.target.value as ConsultationType })}
          className="w-full px-4 py-3 rounded-xl border-2 border-violet-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white text-base font-semibold"
        >
          <option value="" disabled>Type de consultation</option>
          <option value="SPIRITUALITE">Spiritualité</option>
          <option value="VIE_PERSONNELLE">Vie personnelle</option>
          <option value="RELATIONS">Relations</option>
          <option value="PROFESSIONNEL">Professionnel</option>
          <option value="OFFRANDES">Offrandes</option>
          <option value="ASTROLOGIE_AFRICAINE">Astrologie africaine</option>
          <option value="HOROSCOPE">Horoscope</option>
          <option value="NOMBRES_PERSONNELS">Nombres personnels</option>
          <option value="CYCLES_PERSONNELS">Cycles personnels</option>
          <option value="CINQ_ETOILES">Cinq étoiles</option>
          <option value="NUMEROLOGIE">Numérologie</option>
          <option value="AUTRE">Autre</option>
        </select>
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
        <ChoicesListHeader choicesCount={rubrique.consultationChoices.length} onAddChoice={showCreate} />

        <div className="mt-4">
          <AnimatePresence mode="wait">
            {view === "list" ? (
              <ChoicesListView
                key="list"
                choices={rubrique.consultationChoices}
                onUpdateChoice={handleUpdateChoice}
                onDeleteChoice={handleDeleteChoice}
                onMoveChoice={handleMoveChoice}
                offerings={offerings}
              />
            ) : (
              <ChoiceCreateView key="create" onSave={handleAddChoice} onCancel={showList} offerings={offerings} />
            )}
          </AnimatePresence>
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