"use client";
import RubriquesOverviewPage from '@/app/admin/rubriques/overview/page';
import { RubriquesEditorPanel } from '@/components/admin/rubriques/RubriquesEditorPanel';
import { RubriquesEmptyState } from '@/components/admin/rubriques/RubriquesEmptyState';
import { RubriquesHeader } from '@/components/admin/rubriques/RubriquesHeader';
import { RubriquesList } from '@/components/admin/rubriques/RubriquesList';
import { RubriquesLoader } from '@/components/admin/rubriques/RubriquesLoader';
import { RubriquesToast } from '@/components/admin/rubriques/RubriquesToast';
import { RubriquesTabs } from '@/components/admin/rubriques/RubriquesTabs';
import { useAdminRubriquesPage } from '@/hooks/admin/useAdminRubriquesPage';
import { Rubrique } from '@/lib/interfaces';
import { useState } from 'react';

export default function RubriquesAdminPage() {
  const [activeTab, setActiveTab] = useState<'gestion' | 'overview'>('gestion');
  const {
    handleCreate, setSelectedRubrique, handleDelete, setToast,
    selectedRubrique, editingRubrique, loading, saving, toast, rubriques,
    offerings, offeringsLoading, setEditingRubrique, handleSave,
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
              onCreate={handleCreate}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                {rubriques.length > 0 ? (
                  <RubriquesList
                    rubriques={rubriques}
                    selectedRubrique={selectedRubrique}
                    onSelect={(rub: Rubrique) => {
                      setSelectedRubrique(rub);
                      setEditingRubrique(rub);
                    }}
                    onDelete={handleDelete}
                  />
                ) : (
                  <RubriquesEmptyState />
                )}
              </div>

              <div className="lg:col-span-2">
                <RubriquesEditorPanel
                  editingRubrique={editingRubrique}
                  setEditingRubrique={setEditingRubrique}
                  onSave={handleSave}
                  onCancel={() => setEditingRubrique(null)}
                  isSaving={saving}
                  offerings={offerings}
                />
              </div>
            </div>
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