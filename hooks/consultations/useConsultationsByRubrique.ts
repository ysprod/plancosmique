import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';

export interface Consultation {
  id: string;
  titre: string;
  description?: string;
  date?: string;
  [key: string]: any;
}

export function useConsultationsByRubrique(rubriqueId: string) {
  const [consultations, setConsultations] = useState<Consultation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    api.get(`/consultations/rubrique/${rubriqueId}`)
      .then(res => {
        console.log('API response for consultations:', res);
        let result = null;
        if (Array.isArray(res.data)) {
          result = res.data;
        } else if (res.data && Array.isArray(res.data.consultations)) {
          result = res.data.consultations;
        } else if (res.data && Array.isArray(res.data.data)) {
          result = res.data.data;
        }
        if (isMounted) setConsultations(result);
      })
      .catch(err => {
        if (isMounted) setError(err?.response?.data?.message || 'Erreur lors du chargement des consultations');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [rubriqueId]);

  console.log('Consultations fetched:', consultations);

  return { consultations, loading, error };
}
