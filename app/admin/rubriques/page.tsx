"use client";
import { useAdminRubriquesPage } from '@/hooks/useAdminRubriquesPage';
import { RubriquesHeader } from '@/components/admin/rubriques/RubriquesHeader';
import { RubriquesList } from '@/components/admin/rubriques/RubriquesList';
import { RubriquesEditorPanel } from '@/components/admin/rubriques/RubriquesEditorPanel';
import { RubriquesLoader } from '@/components/admin/rubriques/RubriquesLoader';
import { RubriquesEmptyState } from '@/components/admin/rubriques/RubriquesEmptyState';
import { RubriquesToast } from '@/components/admin/rubriques/RubriquesToast';

export default function RubriquesAdminPage() {
  const {
    rubriques,
    selectedRubrique,
    setSelectedRubrique,
    editingRubrique,
    setEditingRubrique,
    loading,
    saving,
    toast,
    setToast,
    offerings,
    offeringsLoading,
    handleCreate,
    handleSave,
    handleDelete,
  } = useAdminRubriquesPage();

  if (loading || offeringsLoading) {
    return <RubriquesLoader loading={loading} offeringsLoading={offeringsLoading} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
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
                onSelect={(rub: any) => {
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
      </div>
      <RubriquesToast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}