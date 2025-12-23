/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ConsultationCard from '@/components/admin/consultations/ConsultationCard';
import PaginationControls from '@/components/admin/consultations/PaginationControls';
import StatusBadge from '@/components/admin/consultations/StatusBadge';
import Toast from '@/components/admin/consultations/Toast';
import { useAdminConsultations } from '@/hooks/useAdminConsultations';
import { api } from '@/lib/api/client';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, FileText, Loader, RefreshCw, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 5;

export default function ConsultationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [notifyingIds, setNotifyingIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { consultations, total, loading, error, refetch } = useAdminConsultations({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [refetch]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGenerateAnalysis = useCallback(async (id: string) => {
    setGeneratingIds(prev => new Set(prev).add(id));
    try {
      const res = await api.post(`/consultations/${id}/generate-analysis`);
      if (res.status === 200 || res.status === 201) {
        await refetch();
        setToastMessage('✨ Analyse générée avec succès !');
      }
    } catch (err) {
      setToastMessage('❌ Erreur lors de la génération');
    } finally {
      setGeneratingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, [refetch, router]);

  const handleModifyAnalysis = useCallback((id: string) => {
    router.push(`/secured/genereanalyse?id=${id}`);
  }, [router]);

  const handleNotifyUser = useCallback(async (id: string) => {
    setNotifyingIds(prev => new Set(prev).add(id));
    try {
      const res = await api.post(`/consultations/${id}/notify-user`);
      if (res.status === 200 || res.status === 201) {
        setToastMessage('📧 Notification envoyée avec succès !');
      } else {
        setToastMessage('⚠️ Erreur lors de l\'envoi');
      }
    } catch (err) {
      setToastMessage('❌ Erreur lors de l\'envoi');
    } finally {
      setNotifyingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  }, []);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  if (loading && !consultations) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-2" />
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-2xl border 
                   border-gray-200 dark:border-gray-800 p-6"
        >
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">Erreur</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700
                     text-white rounded-lg font-bold hover:shadow-lg transition-all active:scale-95"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl 
                    border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-md">
                <FileText className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Consultations
                </h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  {total} au total
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className={`p-1.5 rounded-lg transition-all shadow-sm ${isRefreshing || loading
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 py-3 space-y-2.5">
        {consultations && consultations.length > 0 ? (
          <>
            <AnimatePresence mode="popLayout">
              {consultations.map((consultation: any) => (
                <div key={consultation.id} className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <StatusBadge status={consultation.status} />
                  </div>
                  <ConsultationCard
                    consultation={consultation}
                    onGenerateAnalysis={handleGenerateAnalysis}
                    isGenerating={generatingIds.has(consultation.id)}
                    isNotifying={notifyingIds.has(consultation.id)}
                  />
                </div>
              ))}
            </AnimatePresence>

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 
                     dark:border-gray-800 p-12 text-center"
          >
            <FileText className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1">
              Aucune consultation
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Les consultations apparaîtront ici
            </p>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}