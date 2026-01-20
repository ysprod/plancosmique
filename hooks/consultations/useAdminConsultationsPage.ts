import { useCallback, useMemo, useState } from 'react';
import { useAdminConsultations } from '@/hooks/consultations/useAdminConsultations';
import { api } from '@/lib/api/client';

export type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
export type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 10;

export function useAdminConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const [notifyingIds, setNotifyingIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { consultations, total, loading, error, refetch } = useAdminConsultations({
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const totalPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total]);

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
  }, [refetch]);

  const handleToastClose = useCallback(() => {
    setToastMessage(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    generatingIds,
    setGeneratingIds,
    notifyingIds,
    setNotifyingIds,
    toastMessage,
    setToastMessage,
    consultations,
    total,
    loading,
    error,
    refetch,
    isRefreshing,
    setIsRefreshing,
    totalPages,
    handleRefresh,
    handlePageChange,
    handleGenerateAnalysis,
    handleToastClose,
  };
}
