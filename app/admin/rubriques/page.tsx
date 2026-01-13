"use client";
import RubriquesOverviewPage from '@/app/admin/rubriques/overview/page';
import { RubriquesEditorPanel } from '@/components/admin/rubriques/RubriquesEditorPanel';
import { RubriquesGestionListPanel } from '@/components/admin/rubriques/RubriquesGestionListPanel';
import { RubriquesHeader } from '@/components/admin/rubriques/RubriquesHeader';
import { RubriquesLoader } from '@/components/admin/rubriques/RubriquesLoader';
import { RubriquesTabs } from '@/components/admin/rubriques/RubriquesTabs';
import { RubriquesToast } from '@/components/admin/rubriques/RubriquesToast';
import { useAdminRubriquesPage } from '@/hooks/admin/useAdminRubriquesPage';

export default function RubriquesAdminPage() {
  const {
    loading, saving, toast, rubriques, offerings, offeringsLoading, activeTab,
    editingRubrique, gestionView, selectedRubrique, setEditingRubrique, handleSave,
    setActiveTab, handleSelectRubrique, handleCreateRubrique, handleBackToList,
    handleCreate, setToast, handleDelete,
  } = useAdminRubriquesPage();

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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 flex flex-col">
                  <button
                    onClick={handleBackToList}
                    className="mb-4 self-start px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                  >
                    ← Retour à la liste
                  </button>
                  <RubriquesEditorPanel
                    editingRubrique={editingRubrique}
                    setEditingRubrique={setEditingRubrique}
                    onSave={() => {
                      handleSave();
                      handleBackToList();
                    }}
                    onCancel={handleBackToList}
                    isSaving={saving}
                    offerings={offerings}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'overview' && (<RubriquesOverviewPage />)}

      </div>
      <RubriquesToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}