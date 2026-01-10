import { useState } from 'react';
import { Rubrique } from '@/lib/interfaces';

export function useRubriquesGestionView() {
  const [gestionView, setGestionView] = useState<'list' | 'edit'>('list');
  const [selectedRubrique, setSelectedRubrique] = useState<Rubrique | null>(null);
  const [editingRubrique, setEditingRubrique] = useState<Rubrique | null>(null);

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

  return {
    gestionView,
    setGestionView,
    selectedRubrique,
    setSelectedRubrique,
    editingRubrique,
    setEditingRubrique,
    handleSelectRubrique,
    handleCreateRubrique,
    handleBackToList,
  };
}
