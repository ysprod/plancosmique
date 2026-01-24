import { api } from '@/lib/api/client';
import { Consultation } from '@/lib/interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useAdminConsultationAnalysis() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [notified, setNotified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  }, []);

  const loadAnalysis = useCallback(async () => {
    if (!consultationId) {
      setError('ID de consultation manquant');
      setLoading(false);
      console.error('[loadAnalysis] consultationId manquant');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const consultationRes = await api.get(`/consultations/${consultationId}`);
      if (consultationRes.status !== 200 || !consultationRes.data) {
        console.error('[loadAnalysis] Consultation introuvable', consultationRes);
        throw new Error('Consultation introuvable');
      }
      let consultation: Consultation = consultationRes.data.consultation;
      if (consultation.status !== 'COMPLETED') {
        const genRes = await api.post(`/consultations/${consultationId}/generate-analysis`);
        console.log('[loadAnalysis] Génération analyse pour consultation non complétée', genRes);
        if (genRes.status !== 200 && genRes.status !== 201) {
          console.error('[loadAnalysis] Erreur génération analyse', genRes);
          throw new Error('Erreur lors de la génération de l\'analyse');
        }
        consultation = genRes.data.consultation;
      }
      setConsultation(consultation);
      setNotified(consultation.analysisNotified === true);
    } catch (err: any) {
      setError(err.message || 'Impossible de récupérer la consultation');
      console.error('[loadAnalysis] catch', err);
    } finally {
      setLoading(false);
      console.log('[loadAnalysis] FINISHED');
    }
  }, [consultationId]);

  useEffect(() => {
    loadAnalysis();
  }, [loadAnalysis]);

  const handleBack = useCallback(() => {
    router.push('/admin/consultations/');
  }, [router]);

  const handleModifyAnalysis = useCallback((id: string) => {
    router.push(`/admin/genereanalyse?id=${id}`);
  }, [router]);

  const handleNotifyUser = useCallback(async (id: string) => {
    // Always use the correct consultationId from the loaded analyse (astrology or numerology)
    const notifyId = (consultation && (consultation.consultationId || consultation._id)) || consultationId;
    try {
      const res = await api.post(`/consultations/${notifyId}/notify-user`);
      if (res.status === 200 || res.status === 201) {
        showToast('📧 Notification envoyée avec succès !', 'success');
      } else {
        throw new Error('Échec de l\'envoi');
      }
    } catch (err: any) {
      showToast('❌ Erreur lors de l\'envoi', 'error');
    }
  }, [showToast, consultation, consultationId]);

  return {
    consultation,
    loading,
    notified,
    error,
    toast,
    setToast,
    handleBack,
    handleModifyAnalysis,
    handleNotifyUser,
  };
}