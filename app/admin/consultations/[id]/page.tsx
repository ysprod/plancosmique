/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import DisplayConsultationCard from '@/components/admin/consultations/DisplayConsultationCard';
import { api } from '@/lib/api/client';
import { AnalyseAstrologique } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ErrorState from './components/ErrorState';
import LoadingSkeleton from './components/LoadingSkeleton';
import PageHeader from './components/PageHeader';
import Toast from './components/Toast';

export default function ConsultationResultPage() {
  const params = useParams();
  const router = useRouter();
  const consultationId = params?.id as string;

  const [analyse, setAnalyse] = useState<AnalyseAstrologique | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

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
      } else {
        throw new Error('Analyse non disponible');
      }
    } catch (err: any) {
      console.error('❌ Erreur récupération analyse:', err);
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
    router.push(`/secured/genereanalyse?id=${id}`);
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
      console.error('❌ Erreur notification:', err);
      showToast('❌ Erreur lors de l\'envoi', 'error');
    }
  }, [showToast]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !analyse) {
    return <ErrorState error={error || 'Analyse introuvable'} onRetry={handleBack} />;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <PageHeader onBack={handleBack} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 25,
          delay: 0.1
        }}
        className="max-w-7xl mx-auto"
      >
        <DisplayConsultationCard
          consultation={analyse}
          onModifyAnalysis={handleModifyAnalysis}
          onNotifyUser={handleNotifyUser}
        />
      </motion.div>
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}