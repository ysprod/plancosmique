import { api } from '@/lib/api/client';
import { Consultation, GenerationStep } from '@/lib/interfaces';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useGenereAnalysePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const consultationId = searchParams?.get('id') || null;
  const [step, setStep] = useState<GenerationStep>('loading');
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
        const consultationObj = response.data.consultation ?? response.data;
        setConsultation(consultationObj);
        setStep('success');
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Impossible de récupérer la consultation');
        setStep('error');
      }
    };

    loadConsultation();
  }, [consultationId, searchParams]);

  const saveAnalysis = async (data: Consultation) => {
    if (!consultationId) {
      throw new Error('ID consultation manquant');
    }
    setIsSaving(true);
    try {
      const res = await api.put(`/consultations/${consultationId}`, data);
      if (res.status !== 200) {
        throw new Error(res.data?.message || 'Erreur de sauvegarde');
      }
      setConsultation((prev: any) => ({ ...prev, analyse: res.data?.consultation || data }));
      router.push(`/admin/consultations/${consultationId}`);
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
    router.push(`/admin/consultations/${consultationId}`);
  }, [router]);

  return {
    step, consultation, error, isSaving,
    handleRetry, handleBack, saveAnalysis, setStep,
  };
}