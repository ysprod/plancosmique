"use client";
import RubriquesOverviewPage from '@/app/admin/rubriques/overview/page';
import { RubriquesGestionEditPanel } from '@/components/admin/rubriques/RubriquesGestionEditPanel';
import { RubriquesGestionListPanel } from '@/components/admin/rubriques/RubriquesGestionListPanel';
import { RubriquesHeader } from '@/components/admin/rubriques/RubriquesHeader';
import { RubriquesLoader } from '@/components/admin/rubriques/RubriquesLoader';
import { RubriquesTabs } from '@/components/admin/rubriques/RubriquesTabs';
import { RubriquesToast } from '@/components/admin/rubriques/RubriquesToast';
import { useAdminRubriquesPage } from '@/hooks/admin/useAdminRubriquesPage';
import { useRubriquesGestionView } from '@/hooks/admin/useRubriquesGestionView';
import { useState } from 'react';

export default function RubriquesAdminPage() {
  const [activeTab, setActiveTab] = useState<'gestion' | 'overview'>('gestion');
  const { handleCreate, handleDelete, setToast, loading, saving, toast, rubriques,
    offerings, offeringsLoading, handleSave,
  } = useAdminRubriquesPage();

  const {
    editingRubrique, gestionView, selectedRubrique, setEditingRubrique,
    handleSelectRubrique, handleCreateRubrique, handleBackToList
  } = useRubriquesGestionView();

  if (loading || offeringsLoading) {
    return <RubriquesLoader loading={loading} offeringsLoading={offeringsLoading} />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <RubriquesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'gestion' && (
          <>
            <RubriquesHeader
              rubriquesCount={rubriques.length}
              offeringsCount={offerings.length}
              onCreate={() => handleCreateRubrique(handleCreate)}
            />

            {gestionView === 'list' && (
              <RubriquesGestionListPanel
                rubriques={rubriques}
                selectedRubrique={selectedRubrique}
                onSelect={handleSelectRubrique}
                onDelete={handleDelete}
              />
            )}

            {gestionView === 'edit' && (
              <RubriquesGestionEditPanel
                editingRubrique={editingRubrique}
                setEditingRubrique={setEditingRubrique}
                onSave={() => {
                  handleSave();
                  handleBackToList();
                }}
                onCancel={handleBackToList}
                isSaving={saving}
                offerings={offerings}
                onBack={handleBackToList}
              />
            )}
          </>
        )}
        {activeTab === 'overview' && (
          <RubriquesOverviewPage />
        )}
      </div>
      <RubriquesToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}