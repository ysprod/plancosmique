'use client';
import ConsultationContent from '@/components/consultations/ConsultationContent';
 import ConsultationError from '@/components/consultations/ConsultationError';
import ConsultationHeader from '@/components/consultations/ConsultationHeader';
import CosmicLoader from '@/components/consultations/CosmicLoader';
import { useConsultationResult } from '@/hooks/consultations/useConsultationResult';

export default function ConsultationResultPageClient() {
  const { consultation,loading, error, handleBack, handleDownloadPDF } = useConsultationResult();

  if (loading) { return (<CosmicLoader />); }
  if (error || !consultation) { return <ConsultationError error={error} onBack={handleBack} />; }
  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <ConsultationHeader onBack={handleBack} onDownloadPDF={handleDownloadPDF} />
      <ConsultationContent consultation={consultation} />
    </div>
  );
}
