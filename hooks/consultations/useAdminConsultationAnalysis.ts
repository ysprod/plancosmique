import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { AnalyseAstrologique } from '@/lib/interfaces';

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
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/consultations/analysis/${consultationId}`);
      if (response.status !== 200) {
        throw new Error('Analyse non trouvée');
      }
      const data = response.data;
      if (data?.analyse) {
        setAnalyse(data.analyse);
        setNotified(data.analysisNotified === true);
      } else {
        throw new Error('Analyse non disponible');
      }
    } catch (err: any) {
      setError(err.message || 'Impossible de récupérer l\'analyse');
    } finally {
      setLoading(false);
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
    try {
      const res = await api.post(`/consultations/${id}/notify-user`);
      if (res.status === 200 || res.status === 201) {
        showToast('📧 Notification envoyée avec succès !', 'success');
      } else {
        throw new Error('Échec de l\'envoi');
      }
    } catch (err: any) {
      showToast('❌ Erreur lors de l\'envoi', 'error');
    }
  }, [showToast]);

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
