'use client';
import ConsultationContent from '@/components/consultations/ConsultationContent';
import ConsultationError from '@/components/consultations/ConsultationError';
import ConsultationHeader from '@/components/consultations/ConsultationHeader';
import CosmicLoader from '@/components/consultations/CosmicLoader';
import useConsultationResultPage from '@/hooks/consultations/useConsultationResultPage';

export default function ConsultationResultPage() {
  const { analyse, loading, error, handleBack, handleDownloadPDF } = useConsultationResultPage();

  if (loading) { return (<CosmicLoader />); }
  if (error || !analyse) { return <ConsultationError error={error} onBack={handleBack} />; }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <ConsultationHeader onBack={handleBack} onDownloadPDF={handleDownloadPDF} />
      <ConsultationContent analyse={analyse} />
    </div>
  );
}