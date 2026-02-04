
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '@/lib/api/client';
import type { User } from '@/lib/interfaces';
import type { BackendHoroscope, HoroscopeResult, HoroscopeTypeId } from '@/lib/interfaces';

function getZodiacSymbol(sign: string): string {
  const symbols: Record<string, string> = {
    'bélier': '♈', 'taureau': '♉', 'gémeaux': '♊',
    'cancer': '♋', 'lion': '♌', 'vierge': '♍',
    'balance': '♎', 'scorpion': '♏', 'sagittaire': '♐',
    'capricorne': '♑', 'verseau': '♒', 'poissons': '♓'
  };
  return symbols[sign.toLowerCase()] || '⭐';
}

function getZodiacElement(sign: string): string {
  const elements: Record<string, string> = {
    'bélier': 'Feu', 'lion': 'Feu', 'sagittaire': 'Feu',
    'taureau': 'Terre', 'vierge': 'Terre', 'capricorne': 'Terre',
    'gémeaux': 'Air', 'balance': 'Air', 'verseau': 'Air',
    'cancer': 'Eau', 'scorpion': 'Eau', 'poissons': 'Eau'
  };
  return elements[sign.toLowerCase()] || 'Éther';
}

function transformBackendToResult(backend: BackendHoroscope): HoroscopeResult | null {
  if (!backend.resultData?.horoscope) return null;
  const horoscope = backend.resultData.horoscope;
  const positions = backend.formData?.carteDuCiel?.carteDuCiel?.positions || [];
  const sunPosition = positions.find(p => p.planete.toLowerCase().includes('soleil'));
  const zodiacSign = sunPosition?.signe || 'Inconnu';
  return {
    zodiacSign,
    symbol: getZodiacSymbol(zodiacSign),
    element: getZodiacElement(zodiacSign),
    period: backend.title.toLowerCase().includes('annuel') ? 'Cette année' : 'Ce mois',
    horoscopeType: backend.title,
    generalForecast: horoscope.generalForecast,
    love: horoscope.love,
    work: horoscope.work,
    health: horoscope.health,
    spiritualAdvice: horoscope.spiritualAdvice,
    luckyColor: horoscope.luckyColor,
    dominantPlanet: horoscope.dominantPlanet
  };
}

export default function useHoroscopePage() {

  const [userData, setUserData] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeTab, setActiveTab] = useState<HoroscopeTypeId>('mensuel');
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [error, setError] = useState<string>('');
  const [horoscopes, setHoroscopes] = useState<BackendHoroscope[]>([]);
  const [loadingHoroscopes, setLoadingHoroscopes] = useState(false);
  const hasFetchedUserRef = useRef(false);
  const hasFetchedHoroscopesRef = useRef(false);

  useEffect(() => {
    if (hasFetchedUserRef.current) return;
    hasFetchedUserRef.current = true;
    api.get<User>('/users/me')
      .then(res => setUserData(res.data))
      .catch(() => { })
      .finally(() => setLoadingUser(false));
  }, []);

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
      } catch {
        setHoroscopes([]);
      } finally {
        setLoadingHoroscopes(false);
      }
    };
    fetchHoroscopes();
  }, []);

  const tabs = useMemo(() => [
    { id: 'mensuel', icon: require('lucide-react').Calendar, title: 'Mensuel', subtitle: 'Ce mois' },
    { id: 'annuel', icon: require('lucide-react').TrendingUp, title: 'Annuel', subtitle: 'Cette année' }
  ], []);

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

  const handleRedirect = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/star/analysehoroscope?tab=${activeTab}`;
  }, [activeTab]);

  const handleTabChange = useCallback((tabId: HoroscopeTypeId) => {
    setActiveTab(tabId);
    setResult(null);
  }, []);

  const handleHoroscopeClick = useCallback((horoscope: BackendHoroscope) => {
    const transformedResult = transformBackendToResult(horoscope);
    if (transformedResult) {
      setResult(transformedResult);
      setError('');
    } else {
      setError('Impossible d\'afficher cet horoscope');
    }
  }, []);

  useEffect(() => {
    if (latestHoroscope && !loadingHoroscopes) {
      const transformedResult = transformBackendToResult(latestHoroscope);
      if (transformedResult) {
        setResult(transformedResult);
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [latestHoroscope, loadingHoroscopes, activeTab]);

  return {
    userData,
    loadingUser,
    activeTab,
    setActiveTab,
    result,
    setResult,
    error,
    setError,
    horoscopes,
    loadingHoroscopes,
    tabs,
    filteredHoroscopes,
    handleRedirect,
    handleTabChange,
    handleHoroscopeClick
  };
}