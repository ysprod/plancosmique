import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { Consultation } from '@/lib/interfaces';

export function useNumerologieConsultation(id: string) {
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConsultation() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/consultations/${id}`);
        console.log(response);
        if (response.status !== 200) throw new Error('Not found');
        setConsultation(response.data.consultation);
      } catch (err: any) {
        setError('Consultation introuvable');
        setConsultation(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchConsultation();
  }, [id]);

  return { consultation, loading, error };
}
