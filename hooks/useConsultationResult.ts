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
  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);

  useEffect(() => {
    if (!consultationId) return;
    const loadAnalysis = async () => {
      try {
        const response = await api.get(`/consultations/analysis/${consultationId}`);
        if (response.status !== 200) throw new Error('Analyse non trouvée');
        console.log('Analysis response:', response);
        const data = response.data;
        if (data.analyse) {
          setAnalyse(data.analyse);
          setLoading(false);
        } else {
          setError('Analyse non disponible');
          setLoading(false);
        }
      } catch (err) {
        setError('Impossible de récupérer votre analyse');
        setLoading(false);
      }
    };
    loadAnalysis();
  }, [consultationId]);

  const handleBack = useCallback(() => {
    router.push('/secured/consultations');
  }, [router]);

  const handleDownloadPDF = useCallback(() => {
    const url = `/api/consultations/${consultationId}/download-pdf`;
    window.open(url, '_blank');
  }, [consultationId]);

  return { loading, error, analyse, handleBack, handleDownloadPDF };
}
