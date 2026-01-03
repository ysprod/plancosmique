import { api } from '@/lib/api/client';
import { useState, useCallback, useEffect } from 'react';
import type { Consultation } from '@/lib/interfaces';

export function useNumerologieConsultation(id: string) {
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/consultations/${id}`);
      if (response.status !== 200) throw new Error('Consultation introuvable');
      const data = response.data.consultation;
      if (data.type !== 'NOMBRES_PERSONNELS' && data.type !== 'CYCLES_PERSONNELS') {
        throw new Error('Type de consultation non valide');
      }
      setConsultation(data);
    } catch (err: any) {
      setError(err.message || 'Impossible de charger la consultation');
      setConsultation(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchConsultation();
  }, [id, fetchConsultation]);

  return { consultation, loading, error, fetchConsultation };
}
