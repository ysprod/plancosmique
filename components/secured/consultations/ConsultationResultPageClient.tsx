'use client';
import ConsultationContent from '@/components/consultations/ConsultationContent';
import ConsultationError from '@/components/consultations/ConsultationError';
import CosmicLoader from '@/components/consultations/CosmicLoader';
import { useConsultationResult } from '@/hooks/consultations/useConsultationResult';

export default function ConsultationResultPageClient() {
  const { analyse, loading, error, handleBack, handleDownloadPDF } = useConsultationResult();
  if (loading) { return (<CosmicLoader />); }
  if (error || !analyse) { return <ConsultationError error={error} onBack={handleBack} />; }

  return (
    <ConsultationContent analyse={analyse!} onBack={handleBack} onDownloadPDF={handleDownloadPDF} />
  );
}