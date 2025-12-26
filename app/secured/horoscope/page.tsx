/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/lib/api/client';
import type { UserData } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ResultDisplay from './ResultDisplay';

type HoroscopeTypeId = 'mensuel' | 'annuel';

interface Tab {
  id: HoroscopeTypeId;
  icon: any;
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

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  }
};

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    api.get<UserData>('/users/me')
      .then(res => {
        setUserData(res.data);
        setLoadingUser(false);
        setErrorUser(null);
        console.log('[User] ✅ User data:', res.data);
      })
      .catch(err => {
        setUserData(null);
        setLoadingUser(false);
        setErrorUser(err?.response?.data?.message || err.message || 'Erreur utilisateur');
        console.error('[User] ❌', err);
      });
  }, []);

  return { userData, loadingUser, errorUser };
};


function HoroscopePageComponent() {
  const router = useRouter();
  const { userData, loadingUser } = useUserData();
  const [activeTab, setActiveTab] = useState<HoroscopeTypeId>('mensuel');
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const tabs: Tab[] = useMemo(() => [
    { id: 'mensuel', icon: Calendar, title: "Mensuel", subtitle: "Ce mois" },
    { id: 'annuel', icon: TrendingUp, title: "Annuel", subtitle: "Cette année" },
  ], []);

  const handleRedirect = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/secured/analysehoroscope?tab=${activeTab}`);
  }, [router, activeTab]);

  const handleTabChange = useCallback((tabId: HoroscopeTypeId) => {
    setActiveTab(tabId);
    setResult(null); 
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 z-50 origin-left"
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
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 text-center">
                  <tab.icon className={`w-5 h-5 mx-auto mb-1 ${activeTab === tab.id ? 'text-white' : 'text-gray-600'
                    }`} />
                  <div className={`font-bold text-sm ${activeTab === tab.id ? 'text-white' : 'text-gray-900'
                    }`}>
                    {tab.title}
                  </div>
                  <div className={`text-xs mt-0.5 ${activeTab === tab.id ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                    {tab.subtitle}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRedirect} className="space-y-4">
          
            <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full 
                            flex items-center justify-center shadow-md">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Prêt à découvrir votre destinée ?
            </h3>
            <p className="text-gray-600 text-sm">
              Cliquez sur le bouton ci-dessous pour voir votre horoscope personnalisé
            </p> 
            <button
              type="submit"
              disabled={loading || loadingUser}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 
                       text-white py-3 rounded-xl font-bold 
                       hover:shadow-xl transition-all duration-300 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Voir mon horoscope
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
        {/* Résultats */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-sm"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-14 h-14 mx-auto mb-3 text-purple-600"
                >
                  <Sparkles className="w-full h-full" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  🔮 Consultation des astres avec Mon Etoile
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Mon Etoile analyse votre thème astrologique...
                </p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                    <span>Calcul de votre signe zodiacal</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span>Analyse des énergies planétaires</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <span>Intégration de la sagesse africaine</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {result && !loading && (
            <ResultDisplay key="result" result={result} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(HoroscopePageComponent, () => true);
