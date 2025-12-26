import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api/client';

interface Consultation {
  id: string;
  title: string;
  type: 'SPIRITUALITE' | 'TAROT' | 'ASTROLOGIE' | 'NUMEROLOGIE';
  status: 'PENDING' | 'GENERATING' | 'COMPLETED' | 'ERROR';
  clientName?: string;
  clientEmail?: string;
  clientId?: {
    email: string;
  };
  price: number;
  isPaid: boolean;
  rating?: number;
  review?: string;
  createdAt: string;
  completedAt?: string;
  resultData?: any;
  formData?: {
    prenoms: string;
    nom: string;
    numeroSend?: string;
    paysNaissance?: string;
    villeNaissance?: string;
  };
  [key: string]: any;
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
        timeout: 10000,
      });

      setConsultations(response.data.consultations || []);
      setTotal(response.data.total || 0);
    } catch (err: any) {
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
    // Pas d'annulation nécessaire sans AbortController
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchConsultations]);

  return { consultations, total, loading, error, refetch: fetchConsultations };
}
