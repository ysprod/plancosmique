import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api/client';

interface Consultation {
  id: string;
  type: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  clientName: string;
  clientEmail: string;
  price: number;
  createdAt: string;
  completedAt?: string;
}

interface UseAdminConsultationsOptions {
  search?: string;
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export function useAdminConsultations(options: UseAdminConsultationsOptions = {}) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchConsultations = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

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
        signal: abortControllerRef.current.signal,
        timeout: 10000,
      });

      setConsultations(response.data.consultations || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        return;
      }

      console.error('Erreur lors du chargement des consultations:', err);

      let errorMessage = 'Erreur inconnue';

      if (err.response) {
        errorMessage = err.response.data?.message || 
                      `Erreur ${err.response.status}`;
      } else if (err.request) {
        errorMessage = 'Erreur de connexion au serveur';
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [options.search, options.status, options.type, options.page, options.limit]);

  useEffect(() => {
    fetchConsultations();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchConsultations]);

  return { consultations, total, loading, error, refetch: fetchConsultations };
}
