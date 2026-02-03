import { api } from '@/lib/api/client';
import { Analysis, Consultation, GenerationStep } from '@/lib/interfaces';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useGenereAnalysePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const consultationId = searchParams?.get('id') || null;
  const [step, setStep] = useState<GenerationStep>('loading');
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  useEffect(() => {
    if (!consultationId) {
      setError('ID consultation manquant');
      setStep('error');
      return;
    }

    const loadConsultation = async () => {
      try {
        setStep('loading');
        const response = await api.get(`/consultations/${consultationId}`);
        if (response.status !== 200) {
          throw new Error('Consultation non trouvée');
        }
        let consultationObj = response.data.consultation ?? response.data;
        setConsultation(consultationObj);
        // Charger aussi l'analyse liée à la consultation
        try {
          const analysisRes = await api.get(`/analyses/by-consultation/${consultationId}`);
          if (analysisRes.status === 200 && analysisRes.data) {
            setAnalyse(analysisRes.data);
          }
        } catch (err) {
          // L'analyse peut être absente, on ne bloque pas la consultation
        }


        setStep('success');
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Impossible de récupérer la consultation');
        setStep('error');
      }
    };

    loadConsultation();
  }, [consultationId, searchParams]);

  const handleRetry = useCallback(() => {
    if (consultationId) {
      setError(null);
      setStep('loading');
      window.location.reload();
    }
  }, [consultationId]);

  const handleBack = useCallback(() => {
    router.push(`/admin/consultations/${consultationId}`);
  }, [router]);

  return { step, consultation, analyse, error, handleRetry, handleBack, };
}