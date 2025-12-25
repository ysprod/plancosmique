/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { api } from '@/lib/api/client';
import type { UserData } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  Loader2,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ResultDisplay from './ResultDisplay';

const ZODIAC_SYMBOLS: Record<string, string> = {
  "Bélier": "♈", "Taureau": "♉", "Gémeaux": "♊", "Cancer": "♋",
  "Lion": "♌", "Vierge": "♍", "Balance": "♎", "Scorpion": "♏",
  "Sagittaire": "♐", "Capricorne": "♑", "Verseau": "♒", "Poissons": "♓"
};

const ZODIAC_ELEMENTS: Record<string, string> = {
  "Bélier": "Feu", "Lion": "Feu", "Sagittaire": "Feu",
  "Taureau": "Terre", "Vierge": "Terre", "Capricorne": "Terre",
  "Gémeaux": "Air", "Balance": "Air", "Verseau": "Air",
  "Cancer": "Eau", "Scorpion": "Eau", "Poissons": "Eau"
};

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

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 25,
      duration: 0.3
    }
  }
};

const getZodiacSign = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Bélier";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taureau";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gémeaux";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Lion";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Vierge";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Balance";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpion";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittaire";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorne";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Verseau";
  return "Poissons";
};

const getZodiacSymbol = (sign: string): string => ZODIAC_SYMBOLS[sign] || "✨";

const getZodiacElement = (sign: string): string => ZODIAC_ELEMENTS[sign] || "Inconnu";

const formatDateForInput = (date: Date | string | undefined): string => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
};

const generateHoroscope = async (
  zodiacSign: string,
  horoscopeType: string,
  birthDate: Date
): Promise<HoroscopeResult> => {
  const element = getZodiacElement(zodiacSign);
  const symbol = getZodiacSymbol(zodiacSign);

  try {
    console.log('[Horoscope] 📡 Génération...', { zodiacSign, horoscopeType });
    const response = await fetch('/api/horoscope/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        zodiacSign,
        horoscopeType,
        birthDate: birthDate.toISOString(),
        element,
        symbol
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data.horoscope;

  } catch (error) {
    console.error('[Horoscope] ❌ Erreur:', error);
    throw error;
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

    console.log('[User] 📡 Fetch user data...');

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
  const { userData, loadingUser } = useUserData();

  const [activeTab, setActiveTab] = useState<HoroscopeTypeId>('mensuel');
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<HoroscopeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const tabs: Tab[] = useMemo(() => [
    { id: 'mensuel', icon: Calendar, title: "Mensuel", subtitle: "Ce mois" },
    { id: 'annuel', icon: TrendingUp, title: "Annuel", subtitle: "Cette année" },
  ], []);

  useEffect(() => {
    if (userData?.dateNaissance) {
      const formattedDate = formatDateForInput(userData.dateNaissance);
      if (formattedDate) {
        setBirthDate(formattedDate);
        console.log('[Horoscope] ✅ Date auto-remplie:', formattedDate);
      }
    }
  }, [userData]);

  const currentTabTitle = useMemo(() =>
    tabs.find(t => t.id === activeTab)?.title || 'Mensuel',
    [activeTab, tabs]
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (!birthDate) {
      setError('Veuillez entrer votre date de naissance');
      return;
    }

    const date = new Date(birthDate);
    if (isNaN(date.getTime())) {
      setError('Date de naissance invalide');
      return;
    }

    const zodiacSign = getZodiacSign(date);
    setLoading(true);

    console.log('[Horoscope] 🎯 Génération pour:', zodiacSign, currentTabTitle);

    try {
      const horoscope = await generateHoroscope(zodiacSign, currentTabTitle, date);
      setResult(horoscope);
    } catch (err) {
      setError('Erreur lors de la génération de l\'horoscope. Veuillez réessayer.');
      console.error('[Horoscope] ❌', err);
    } finally {
      setLoading(false);
    }
  }, [birthDate, currentTabTitle]);

  const handleTabChange = useCallback((tabId: HoroscopeTypeId) => {
    setActiveTab(tabId);
    setResult(null); // Reset result when changing tab
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Background subtil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-5 sm:py-6 max-w-3xl">
        {/* Header */}
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

        {/* Formulaire */}
        <motion.div
          variants={formVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-xl p-5 sm:p-6 border-2 border-gray-200 shadow-sm mb-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                disabled={loadingUser}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-all outline-none text-gray-900
                         disabled:bg-gray-50 disabled:cursor-not-allowed"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                {loadingUser ? 'Chargement des données...' : ''}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

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
          </form>
        </motion.div>

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

          {!loading && !result && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl 
                       p-8 sm:p-10 border-2 border-purple-200 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full 
                            flex items-center justify-center shadow-md">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Prêt à découvrir votre destinée ?
              </h3>
              <p className="text-gray-600 text-sm">
                Remplissez le formulaire pour voir votre horoscope personnalisé
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(HoroscopePageComponent, () => true);
