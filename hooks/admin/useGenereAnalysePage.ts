import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from '@/lib/api/client';
import { AnalyseAstrologique, GenerationStep } from '@/lib/interfaces';

export function useGenereAnalysePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const consultationId = searchParams?.get('id') || null;
  
  const [step, setStep] = useState<GenerationStep>('loading');
  const [analyseData, setAnalyseData] = useState<AnalyseAstrologique | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!consultationId) {
      setError('ID consultation manquant');
      setStep('error');
      return;
    }

    const loadAnalysis = async () => {
      try {
        setStep('fetching');
        console.log('Fetching analysis for consultation ID:', consultationId);
        const response = await api.get(`/consultations/analysis/${consultationId}`);
        console.log('Response:', response);
        if (response.status !== 200) {
          throw new Error('Analyse non trouvée');
        }
        const data = response.data;
        if (data.analyse) {
          setAnalyseData(data.analyse);
          setStep('success');
        } else {
          setError('Analyse non disponible');
          setStep('error');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Impossible de récupérer l\'analyse');
        setStep('error');
      }
    };

    loadAnalysis();
  }, [consultationId, searchParams]);

  const saveAnalysis = async (data: AnalyseAstrologique) => {
    if (!consultationId) {
      throw new Error('ID consultation manquant');
    }

    setIsSaving(true);
    try {
      const res = await api.put(`/consultations/${consultationId}/analysis`, data);
      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Erreur de sauvegarde');
      }
      setAnalyseData(res.data?.analyse || data);
      // Retourner à la liste après succès
      router.push('/admin/consultations');
    } catch (err: any) {
      throw new Error(err.response?.data?.message || err.message || 'Erreur de sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleRetry = useCallback(() => {
    if (consultationId) {
      setError(null);
      setStep('loading');
      window.location.reload();
    }
  }, [consultationId]);

  const handleBack = useCallback(() => {
    router.push('/admin/consultations');
  }, [router]);

  return {
    step,
    analyseData,
    error,
    isSaving,
    handleRetry,
    handleBack,
    saveAnalysis,
    setStep,
  };
}