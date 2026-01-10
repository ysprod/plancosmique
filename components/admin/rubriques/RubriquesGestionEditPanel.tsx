import { RubriquesEditorPanel } from './RubriquesEditorPanel';
import React from 'react';
import { Rubrique } from '@/lib/interfaces';

interface RubriquesGestionEditPanelProps {
  editingRubrique: Rubrique | null;
  setEditingRubrique: (rub: Rubrique | null) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  offerings: any[];
  onBack: () => void;
}

export function RubriquesGestionEditPanel({
  editingRubrique,
  setEditingRubrique,
  onSave,
  onCancel,
  isSaving,
  offerings,
  onBack,
}: RubriquesGestionEditPanelProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3 flex flex-col">
        <button
          onClick={onBack}
          className="mb-4 self-start px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
        >
          ← Retour à la liste
        </button>
        <RubriquesEditorPanel
          editingRubrique={editingRubrique}
          setEditingRubrique={setEditingRubrique}
          onSave={onSave}
          onCancel={onCancel}
          isSaving={isSaving}
          offerings={offerings}
        />
      </div>
    </div>
  );
}
