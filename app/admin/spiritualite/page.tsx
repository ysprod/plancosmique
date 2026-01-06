'use client';
import { SpiritualiteFormModal } from '@/components/admin/spiritualite/SpiritualiteFormModal';
import { SpiritualiteHeader } from '@/components/admin/spiritualite/SpiritualiteHeader';
import { SpiritualiteMessages } from '@/components/admin/spiritualite/SpiritualiteMessages';
import { SpiritualitePracticesList } from '@/components/admin/spiritualite/SpiritualitePracticesList';
import { useSpiritualitePage } from '@/hooks/commons/useSpiritualitePage';

export default function SpiritualiteAdmin() {
  const spiritualite = useSpiritualitePage();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <SpiritualiteHeader
          onCreate={spiritualite.handleCreate}
          loading={spiritualite.loading}
          practicesCount={spiritualite.practices.length}
          publishedCount={spiritualite.practices.filter(p => p.published).length}
          draftCount={spiritualite.practices.filter(p => !p.published).length}
        />
        <SpiritualiteMessages error={spiritualite.error} success={spiritualite.success} />

        <SpiritualiteFormModal
          show={spiritualite.showForm}
          onClose={() => spiritualite.setShowForm(false)}
          onSubmit={spiritualite.handleSubmit}
          formData={spiritualite.formData}
          setFormData={spiritualite.setFormData}
          editingPractice={spiritualite.editingPractice}
          saving={spiritualite.saving}
          expandedSections={spiritualite.expandedSections}
          toggleSection={spiritualite.toggleSection}
          addArrayItem={spiritualite.addArrayItem}
          removeArrayItem={spiritualite.removeArrayItem}
          updateArrayItem={spiritualite.updateArrayItem}
          availableIcons={spiritualite.availableIcons}
        />    
        
        <SpiritualitePracticesList
          practices={spiritualite.practices}
          expandedPractices={spiritualite.expandedPractices}
          loading={spiritualite.loading}
          deletingId={spiritualite.deletingId}
          onExpand={spiritualite.togglePracticeExpanded}
          onEdit={spiritualite.handleEdit}
          onDelete={spiritualite.handleDelete}
          onRefresh={spiritualite.fetchPractices}
        />
      </div>
    </div>
  );
}