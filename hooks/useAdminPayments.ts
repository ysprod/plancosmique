import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api/client';

interface Payment {
  id: string;
  reference: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  method: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  completedAt?: string;
}

interface UseAdminPaymentsOptions {
  search?: string;
  status?: string;
  method?: string;
  page?: number;
  limit?: number;
}

export function useAdminPayments(options: UseAdminPaymentsOptions = {}) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchPayments = useCallback(async () => {
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
        method: options.method || 'all',
        page: String(options.page || 1),
        limit: String(options.limit || 18),
      });

      const response = await api.get(`/admin/payments?${params}`, {
        signal: abortControllerRef.current.signal,
        timeout: 10000,
      });

      setPayments(response.data.payments || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
      if (err.name === 'AbortError' || err.name === 'CanceledError') {
        return;
      }

      console.error('Erreur lors du chargement des paiements:', err);

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
  }, [options.search, options.status, options.method, options.page, options.limit]);

  useEffect(() => {
    fetchPayments();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPayments]);

  return { payments, total, loading, error, refetch: fetchPayments };
}
