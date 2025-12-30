
import RubriqueEditor from "@/components/admin/rubriques/RubriqueEditor";
import { AnimatePresence, motion } from "framer-motion";
 
import { Package } from "lucide-react";
import React from "react";

interface RubriquesEditorPanelProps {
  editingRubrique: any; // Remplacer 'any' par le type correct si disponible
  setEditingRubrique: (rubrique: any) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  offerings: any[];
}

export function RubriquesEditorPanel({ editingRubrique, setEditingRubrique, onSave, onCancel, isSaving, offerings }: RubriquesEditorPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {editingRubrique ? (
        <RubriqueEditor
          key={editingRubrique._id || "new"}
          rubrique={editingRubrique}
          onUpdate={setEditingRubrique}
          onSave={onSave}
          onCancel={onCancel}
          isSaving={isSaving}
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
  );
}
