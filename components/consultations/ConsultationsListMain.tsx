import ConsultationCard from '@/components/consultations/ConsultationCard';
import NumerologyConsultationCard from '@/components/consultations/NumerologyConsultationCard';
import ConsultationsEmpty from '@/components/consultations/list/ConsultationsEmpty';
import ConsultationsError from '@/components/consultations/list/ConsultationsError';
import ConsultationsFilters from '@/components/consultations/list/ConsultationsFilters';
import ConsultationsHeader from '@/components/consultations/list/ConsultationsHeader';
import ConsultationsListLoading from './ConsultationsListLoading';
import { useConsultationsListMain } from '@/hooks/useConsultationsListMain';

export default function ConsultationsListMain() {
  const {
    consultations, filteredConsultations, loading, searchQuery, error,
    setSearchQuery,
    setTypeFilter,
    setStatusFilter,
    handleView,
    handleDownload
  } = useConsultationsListMain();

  if (loading) {
    return <ConsultationsListLoading />;
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
              (consultation.type === 'NOMBRES_PERSONNELS' || consultation.type === 'CYCLES_PERSONNELS') ? (
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
