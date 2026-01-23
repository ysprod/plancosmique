import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { AnalyseAstrologique, Consultation } from '@/lib/interfaces';

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useAdminConsultationAnalysis() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);
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
      // 1. Charger la consultation
      console.log('[loadAnalysis] GET /consultations/' + consultationId);
      const consultationRes = await api.get(`/consultations/${consultationId}`);
      console.log('[loadAnalysis] consultationRes', consultationRes);
      if (consultationRes.status !== 200 || !consultationRes.data) {
        console.error('[loadAnalysis] Consultation introuvable', consultationRes);
        throw new Error('Consultation introuvable');
      }
      const consultation: Consultation = consultationRes.data.consultation;
      console.log('[loadAnalysis] consultation', consultation);
      // 2. Si la consultation n'est pas terminée, générer l'analyse
      if (consultation.status !== 'COMPLETED') {
        console.log('[loadAnalysis] Consultation pas terminée, POST /consultations/' + consultationId + '/generate-analysis');
        const genRes = await api.post(`/consultations/${consultationId}/generate-analysis`);
        console.log('[loadAnalysis] genRes', genRes);
        if (genRes.status !== 200 && genRes.status !== 201) {
          console.error('[loadAnalysis] Erreur génération analyse', genRes);
          throw new Error('Erreur lors de la génération de l\'analyse');
        }
      }
      // 3. Charger l'analyse
      console.log('[loadAnalysis] GET /consultations/analysis/' + consultationId);
      const response = await api.get(`/consultations/analysis/${consultationId}`);
      console.log('[loadAnalysis] analysis response', response);
      if (response.status !== 200) {
        console.error('[loadAnalysis] Analyse non trouvée', response);
        throw new Error('Analyse non trouvée');
      }
      const data = response.data;
      if (data?.analyse) {
        setAnalyse(data.analyse);
        setNotified(data.analyse.analysisNotified === true);
        console.log('[loadAnalysis] Analyse chargée', data.analyse);
      } else {
        console.error('[loadAnalysis] Analyse non disponible', data);
        throw new Error('Analyse non disponible');
      }
    } catch (err: any) {
      setError(err.message || 'Impossible de récupérer l\'analyse');
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
    const notifyId = (analyse && (analyse.consultationId || analyse._id)) || consultationId;
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
  }, [showToast, analyse, consultationId]);

  return {
    analyse,
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
