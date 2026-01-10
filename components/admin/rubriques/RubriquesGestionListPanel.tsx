import { RubriquesList } from './RubriquesList';
import { RubriquesEmptyState } from './RubriquesEmptyState';
import { Rubrique } from '@/lib/interfaces';
import React from 'react';

interface RubriquesGestionListPanelProps {
  rubriques: Rubrique[];
  selectedRubrique: Rubrique | null;
  onSelect: (rub: Rubrique) => void;
  onDelete: (id: string) => void;
}

export function RubriquesGestionListPanel({ rubriques, selectedRubrique, onSelect, onDelete }: RubriquesGestionListPanelProps) {
  return (
    <div>
      {rubriques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rubriques.map((rub) => (
            <div key={rub._id}>
              <RubriquesList
                rubriques={[rub]}
                selectedRubrique={selectedRubrique}
                onSelect={onSelect}
                onDelete={onDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <RubriquesEmptyState />
      )}
      <div className="flex items-center justify-center mt-8">
        <span className="text-slate-400">Sélectionnez une rubrique pour l'éditer ou créez-en une nouvelle.</span>
      </div>
    </div>
  );
}
