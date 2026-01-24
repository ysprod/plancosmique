import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { AnalyseAstrologique } from '@/lib/interfaces';

export function useConsultationResult() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [consultation, setConsultation] = useState<any | null>(null);
  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);

  useEffect(() => {
    if (!consultationId) return;
    const loadConsultation = async () => {
      try {
        const response = await api.get(`/consultations/${consultationId}`);
        if (response.status !== 200) throw new Error('Consultation non trouvée');
        const data = response.data;
        console.log('Consultation data loaded:', data.consultation);
        setConsultation(data.consultation);
        if (data.analyse) {
          setAnalyse(data.analyse);
        } else {
          setAnalyse(null);
        }
        setLoading(false);
      } catch (err) {
        setError('Impossible de récupérer la consultation');
        setLoading(false);
      }
    };
    loadConsultation();
  }, [consultationId]);

  const handleBack = useCallback(() => {
    router.push('/secured/consultations');
  }, [router]);

  const handleDownloadPDF = useCallback(() => {
    const url = `/api/consultations/${consultationId}/download-pdf`;
    window.open(url, '_blank');
  }, [consultationId]);

  return { loading, error, consultation, analyse, handleBack, handleDownloadPDF };
}
