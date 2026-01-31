import { api } from '@/lib/api/client';
import { analysesService } from '@/lib/api/services/analyses.service';
import { Analysis, Consultation } from '@/lib/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export function useConsultationResult() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  useEffect(() => {
    if (!consultationId) return;
    const loadConsultation = async () => {
      try {
          const response = await api.get(`/analyses/by-consultation/${consultationId}`);
          console.log("useConsultationResult fetched analysis:", response);
        const data = response.data;
        if (data=="") {
         router.push(`/secured/consultations/${consultationId}/generate`);
          setLoading(false);
          return;
        }
          setAnalyse(data);
        //const response = await analysesService.get(consultationId);
      console.log("Fetched consultation:", response);
      } catch (err) {
        setError('Impossible de récupérer l\'analyse');
      } finally {
        setLoading(false);
      }
    };
    loadConsultation();
  }, [consultationId]);

  const handleBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('retour') === 'cinqportes') {
        router.push('/secured/cinqportes');
        return;
      }
    }
    router.push('/secured/consultations');
  }, [router]);

  const handleDownloadPDF = useCallback(() => {
    const url = `/api/consultations/${consultationId}/download-pdf`;
    window.open(url, '_blank');
  }, [consultationId]);

  return { loading, error, consultation: analyse, handleBack, handleDownloadPDF };
}
