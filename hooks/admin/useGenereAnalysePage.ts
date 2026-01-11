import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from '@/lib/api/client';
import { AnalyseData, GenerationStep } from '@/lib/interfaces';

export function useGenereAnalysePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<GenerationStep>('loading');
  const [analyseData, setAnalyseData] = useState<AnalyseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateAnalysis = async (consultationId: string) => {
    try {
      setStep('fetching');
      const res = await api.post(`/consultations/${consultationId}/generate-analysis`);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data?.message || 'Erreur de génération');
      }
      const analyse = res.data?.analyse;
      if (!analyse) {
        throw new Error('Aucune analyse reçue');
      }
      setAnalyseData(analyse);
      setStep('success');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Erreur inconnue');
      setStep('error');
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      setError('ID consultation manquant');
      setStep('error');
      return;
    }
    generateAnalysis(id);
    // eslint-disable-next-line
  }, [searchParams]);

  const handleRetry = () => {
    const id = searchParams.get('id');
    if (id) {
      setError(null);
      setStep('loading');
      generateAnalysis(id);
    }
  };

  const handleBack = () => {
    router.push('/admin/consultations');
  };

  return {
    step,
    analyseData,
    error,
    handleRetry,
    handleBack,
    setStep,
  };
}
