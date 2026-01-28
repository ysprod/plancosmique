import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { Consultation } from '@/lib/interfaces';

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
        let result = res.data.consultations;
        // Filtrer les consultations dont le titre contient "5 portes" (insensible à la casse)
        const filtered = Array.isArray(result)
          ? result.filter((c: Consultation) =>
              typeof c.title === 'string' && !c.title.toLowerCase().includes('5 portes') && !c.title.toLowerCase().includes('la carte')
            )
          : [];
        if (isMounted) setConsultations(filtered);
      })
      .catch(err => {
        if (isMounted) setError(err?.response?.data?.message || 'Erreur lors du chargement des consultations');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [rubriqueId]);

  return { consultations, loading, error };
}
