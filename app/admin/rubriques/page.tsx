"use client";
import { useAdminRubriquesPage } from '@/hooks/admin/useAdminRubriquesPage';
import { RubriquesHeader } from '@/components/admin/rubriques/RubriquesHeader';
import { RubriquesList } from '@/components/admin/rubriques/RubriquesList';
import { RubriquesEditorPanel } from '@/components/admin/rubriques/RubriquesEditorPanel';
import { RubriquesLoader } from '@/components/admin/rubriques/RubriquesLoader';
import { RubriquesEmptyState } from '@/components/admin/rubriques/RubriquesEmptyState';
import { RubriquesToast } from '@/components/admin/rubriques/RubriquesToast';

export default function RubriquesAdminPage() {
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
        <div className="mb-4">
          <a
            href="/admin/rubriques/overview"
            className="inline-block px-4 py-2 rounded-lg bg-violet-100 text-violet-800 font-semibold hover:bg-violet-200 transition"
          >
            Voir l'aperçu des rubriques
          </a>
        </div>

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