import { useCallback, useMemo, useState } from 'react';
import { useAdminConsultations } from '@/hooks/consultations/useAdminConsultations';
import { api } from '@/lib/api/client';
import { useRouter } from 'next/navigation';

export type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
export type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 10;

export function useAdminConsultationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('PENDING');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
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
    router.push(`/admin/consultations/${id}`);
  }, [router]);

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