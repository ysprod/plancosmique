import { api } from '@/lib/api/client';
import { Consultation } from '@/lib/interfaces';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type ConsultationStatus = 'all' | 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
export type ConsultationType = 'all' | 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';

const ITEMS_PER_PAGE = 10;

export function useAdminConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ConsultationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<ConsultationType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [notifyingIds, setNotifyingIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const options = {
    search: searchQuery,
    status: statusFilter,
    type: typeFilter,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        search: options.search || '',
        status: options.status || 'all',
        type: options.type || 'all',
        page: String(options.page || 1),
        limit: String(options.limit || 18),
      });

      const response = await api.get(`/admin/consultations?${params}`, {
        headers: { 'Cache-Control': 'no-cache' },
        timeout: 30000, // 30 secondes pour les données volumineuses
      });

      setConsultations(response.data.consultations || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      console.error('Erreur lors du chargement des consultations:', err);

      let errorMessage = 'Erreur inconnue';

      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Délai dépassé : la requête a pris trop de temps. Veuillez réessayer.';
      } else if (err.response) {
        errorMessage = err.response.data?.message ||
          `Erreur ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Erreur de connexion au serveur';
      } else if (err.message === 'Network Error') {
        errorMessage = 'Erreur réseau : vérifiez votre connexion internet';
      } else {
        errorMessage = err.message || 'Erreur inconnue';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [options.search, options.status, options.type, options.page, options.limit]);

  useEffect(() => {
    fetchConsultations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchConsultations]);

  const totalPages = useMemo(() => Math.ceil(total / ITEMS_PER_PAGE), [total]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchConsultations();
    setTimeout(() => setIsRefreshing(false), 500);
  }, [fetchConsultations]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleGenerateAnalysis = useCallback(async (id: string) => {
    window.location.href = `/admin/consultations/${id}`;
  }, []);

  const handleToastClose = useCallback(() => {
    setToastMessage(null);
  }, []);

  const tabs = useMemo(() => [
    { key: 'all', label: 'Toutes' },
    { key: 'COMPLETED', label: 'Terminées' },
    { key: 'PENDING', label: 'En attente' },
    { key: 'ERROR', label: 'Erreur' },
  ], []);

  return {
    searchQuery, setSearchQuery, statusFilter, setStatusFilter, typeFilter,
    setTypeFilter, currentPage, setCurrentPage, notifyingIds, setNotifyingIds,
    toastMessage, setToastMessage, consultations, total, loading, tabs, error,
    fetchConsultations, isRefreshing, setIsRefreshing, totalPages,
    handleRefresh, handlePageChange, handleGenerateAnalysis, handleToastClose,
  };
}