'use client';
import ConsultationCard from '@/components/consultations/ConsultationCard';
import ConsultationsEmpty from '@/components/consultations/ConsultationsEmpty';
import ConsultationsError from '@/components/consultations/ConsultationsError';
import ConsultationsFilters from '@/components/consultations/ConsultationsFilters';
import ConsultationsHeader from '@/components/consultations/ConsultationsHeader';
import NumerologyConsultationCard from '@/components/consultations/NumerologyConsultationCard';
import useConsultationsListPage from '@/hooks/consultations/useConsultationsListPage';
import ConsultationsListLoading from './ConsultationsListLoading';

export default function ConsultationsListMain() {
  const {
    consultations, loading, searchQuery, error, setTypeFilter,
    setSearchQuery, setStatusFilter, handleView, handleDownload
  } = useConsultationsListPage();

  if (loading) {
    return <ConsultationsListLoading />;
  }

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ConsultationsHeader consultationsCount={consultations.length} filteredCount={consultations.length} />
        <ConsultationsFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} consultationsLength={consultations.length} />
        <ConsultationsError error={error} />
        {consultations.length === 0 ? (
          <ConsultationsEmpty
            consultationsLength={consultations.length}
            setSearchQuery={setSearchQuery}
            setTypeFilter={setTypeFilter}
            setStatusFilter={setStatusFilter}
          />
        ) : (
          <div className="grid gap-6">
            {consultations.map((consultation, index) => (
              (consultation.type === 'nombres-personnels' || consultation.type === 'cycles-personnels') ? (
                <NumerologyConsultationCard
                  key={consultation._id}
                  consultation={consultation}
                  index={index}
                  onView={handleView}
                  onDownload={handleDownload}
                />
              ) : (
                <ConsultationCard
                  key={consultation._id}
                  consultation={consultation}
                  index={index}
                  onView={handleView}
                  onDownload={handleDownload}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}