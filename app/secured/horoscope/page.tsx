'use client';
import { api } from '@/lib/api/client';
import type { UserData } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HoroscopeCard from './HoroscopeCard';
import ResultDisplay from './ResultDisplay';

type HoroscopeTypeId = 'mensuel' | 'annuel';

interface Tab {
  id: HoroscopeTypeId;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

export interface HoroscopeResult {
  zodiacSign: string;
  symbol: string;
  element: string;
  period: string;
  horoscopeType: string;
  generalForecast: string;
  love: string;
  work: string;
  health: string;
  spiritualAdvice: string;
  luckyColor: string;
  dominantPlanet: string;
}

export interface BackendHoroscope {
  _id: string;
  title: string;
  description: string;
  status: string;
  resultData?: {
    horoscope?: {
      generalForecast: string;
      love: string;
      work: string;
      health: string;
      spiritualAdvice: string;
      luckyColor: string;
      dominantPlanet: string;
    };
  };
  formData?: {
    carteDuCiel?: {
      carteDuCiel?: {
        positions?: Array<{
          planete: string;
          signe: string;
        }>;
      };
    };
  };
  completedDate?: string;
  createdAt: string;
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

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

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    api.get<UserData>('/users/me')
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        console.error('👤 ❌ Erreur utilisateur:', err);
      })
      .finally(() => setLoadingUser(false));
  }, []);

  return { userData, loadingUser };
};

function HoroscopePageComponent() {
  const router = useRouter();
  const { userData, loadingUser } = useUserData();

  const [activeTab, setActiveTab] = useState<HoroscopeTypeId>('mensuel');
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [error, setError] = useState<string>('');
  const [horoscopes, setHoroscopes] = useState<BackendHoroscope[]>([]);
  const [loadingHoroscopes, setLoadingHoroscopes] = useState(false);

  const hasFetchedHoroscopesRef = useRef(false);

  const tabs: Tab[] = useMemo(() => [
    { id: 'mensuel', icon: Calendar, title: 'Mensuel', subtitle: 'Ce mois' },
    { id: 'annuel', icon: TrendingUp, title: 'Annuel', subtitle: 'Cette année' }
  ], []);

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

        if (!consultations.length) {
          console.warn('Aucun horoscope trouvé dans la réponse du backend.');
        }

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

  const handleRedirect = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/secured/analysehoroscope?tab=${activeTab}`);
  }, [router, activeTab]);

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

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-5 sm:py-6 max-w-3xl">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-6"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-2">
            HOROSCOPE
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
            Découvrez votre horoscope personnalisé inspiré des sagesses astrologiques africaines
          </p>
        </motion.div>

        <div className="mb-6">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-3 rounded-xl border-2 transition-all ${activeTab === tab.id
                  ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-600 text-white shadow-lg'
                  : 'bg-white border-gray-200 hover:border-purple-300 text-gray-700'
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <tab.icon
                    className={`w-5 h-5 mx-auto mb-1 ${activeTab === tab.id ? 'text-white' : 'text-gray-600'
                      }`}
                  />
                  <div
                    className={`font-bold text-sm ${activeTab === tab.id ? 'text-white' : 'text-gray-900'
                      }`}
                  >
                    {tab.title}
                  </div>
                  <div
                    className={`text-xs mt-0.5 ${activeTab === tab.id ? 'text-purple-100' : 'text-gray-500'
                      }`}
                  >
                    {tab.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {filteredHoroscopes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Vos horoscopes {activeTab}s
            </h2>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filteredHoroscopes.slice(0, 3).map(horoscope => (
                  <HoroscopeCard
                    key={horoscope._id}
                    horoscope={horoscope}
                    onClick={() => handleHoroscopeClick(horoscope)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleRedirect} className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full 
                          flex items-center justify-center shadow-md">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {filteredHoroscopes.length > 0
                ? 'Générer un nouvel horoscope'
                : 'Prêt à découvrir votre destinée ?'}
            </h3>
            <p className="text-gray-600 text-sm">
              Cliquez sur le bouton ci-dessous pour obtenir votre horoscope personnalisé
            </p>
          </div>

          <button
            type="submit"
            disabled={loadingUser}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 
                     text-white py-3 rounded-xl font-bold 
                     hover:shadow-xl transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed 
                     flex items-center justify-center gap-2"
          >
            {loadingUser ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Chargement...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Voir mon horoscope {activeTab}
              </>
            )}
          </button>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}
        </form>

        <AnimatePresence mode="wait">
          {loadingHoroscopes && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-sm mt-6"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-14 h-14 mx-auto mb-3 text-purple-600"
                >
                  <Sparkles className="w-full h-full" />
                </motion.div>
                <p className="text-gray-600 text-sm">
                  Chargement de vos horoscopes...
                </p>
              </div>
            </motion.div>
          )}

          {result && !loadingHoroscopes && (
            <ResultDisplay key="result" result={result} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(HoroscopePageComponent, () => true);