import { useState, useEffect } from 'react';
import { api } from '@/lib/api/client';
import { Offering } from '@/lib/interfaces';

export function useOfferings() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchOfferings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/offerings');
        if (!isMounted) return;
        if (response.status === 200 && response.data?.offerings) {
          const normalizedOfferings = response.data.offerings.map((offering: any) => {
            const normalizedId = offering._id || offering.id;
            return {
              ...offering,
              _id: normalizedId,
              id: normalizedId,
            };
          });
          setOfferings(normalizedOfferings);
        } else {
          throw new Error('Format de réponse invalide');
        }
      } catch (err: any) {
        if (!isMounted) return;
        setError(
          err.response?.data?.message ||
          'Impossible de charger les offrandes. Veuillez réessayer.'
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchOfferings();
    return () => {
      isMounted = false;
    };
  }, []);

  return { offerings, loading, error };
}
