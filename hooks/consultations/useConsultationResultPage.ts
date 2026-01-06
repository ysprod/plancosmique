import { useConsultationResult } from '@/hooks/consultations/useConsultationResult';

export default function useConsultationResultPage() {
  const { loading, error, analyse, handleBack, handleDownloadPDF } = useConsultationResult();
  return { loading, error, analyse, handleBack, handleDownloadPDF };
}
