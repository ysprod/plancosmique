import { api } from '@/lib/api/client';
import type { BackendHoroscope } from '@/lib/interfaces';
import { useEffect, useMemo, useRef, useState } from 'react';

type HoroscopeTypeId = 'mensuel' | 'annuel';

const useHoroscopes = (activeTab: HoroscopeTypeId) => {
  const [horoscopes, setHoroscopes] = useState<BackendHoroscope[]>([]);
  const [loadingHoroscopes, setLoadingHoroscopes] = useState(false);
  const hasFetchedHoroscopesRef = useRef(false);

  useEffect(() => {
    if (hasFetchedHoroscopesRef.current) return;
    hasFetchedHoroscopesRef.current = true;

    const fetchHoroscopes = async () => {
      try {
        setLoadingHoroscopes(true);
        const response = await api.get('/consultations/my?type=HOROSCOPE');
        let consultations: BackendHoroscope[] = [];
        if (response.data && Array.isArray(response.data.consultations)) {
          consultations = response.data.consultations;
        } else if (Array.isArray(response.data)) {
          consultations = response.data;
        } else {
          consultations = [];
        }
        setHoroscopes(consultations);
      } catch (err: any) {
        console.error('🔮 ❌ Erreur horoscopes:', err);
        setHoroscopes([]);
      } finally {
        setLoadingHoroscopes(false);
      }
    };
    fetchHoroscopes();
  }, []);

  const filteredHoroscopes = useMemo(() => {
    return horoscopes.filter(h =>
      h.title.toLowerCase().includes(activeTab) &&
      h.status === 'COMPLETED'
    );
  }, [horoscopes, activeTab]);

  const latestHoroscope = useMemo(() =>
    filteredHoroscopes[0] || null,
    [filteredHoroscopes]
  );

  return { horoscopes, filteredHoroscopes, latestHoroscope, loadingHoroscopes };
};

export default useHoroscopes;
