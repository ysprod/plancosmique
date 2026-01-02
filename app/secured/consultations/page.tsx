/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ConsultationCard from '@/components/consultations/ConsultationCard';
import ConsultationsEmpty from '@/components/consultations/list/ConsultationsEmpty';
import ConsultationsError from '@/components/consultations/list/ConsultationsError';
import ConsultationsFilters from '@/components/consultations/list/ConsultationsFilters';
import ConsultationsHeader from '@/components/consultations/list/ConsultationsHeader';
import useConsultationsListPage from '@/hooks/consultations/useConsultationsListPage';
import { Loader2 } from 'lucide-react';

export default function ConsultationsListPage() {
  const {
    consultations, filteredConsultations,
    loading, searchQuery, error,
    setSearchQuery,
    setTypeFilter,
    setStatusFilter,
    handleView,
    handleDownload
  } = useConsultationsListPage();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Chargement de vos consultations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ConsultationsHeader consultationsCount={consultations.length} filteredCount={filteredConsultations.length} />
        <ConsultationsFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} consultationsLength={consultations.length} />
        <ConsultationsError error={error} />
        {filteredConsultations.length === 0 ? (
          <ConsultationsEmpty
            consultationsLength={consultations.length}
            setSearchQuery={setSearchQuery}
            setTypeFilter={setTypeFilter}
            setStatusFilter={setStatusFilter}
          />
        ) : (
          <div className="grid gap-6">
            {filteredConsultations.map((consultation, index) => (
              <ConsultationCard
                key={consultation._id}
                consultation={consultation}
                index={index}
                onView={handleView}
                onDownload={handleDownload}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}