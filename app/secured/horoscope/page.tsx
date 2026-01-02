'use client';
import ResultDisplay from '@/components/horoscope/ResultDisplay';
import HoroscopeForm from '@/components/horoscope/page/HoroscopeForm';
import HoroscopeHeader from '@/components/horoscope/page/HoroscopeHeader';
import HoroscopeList from '@/components/horoscope/page/HoroscopeList';
import HoroscopeTabs from '@/components/horoscope/page/HoroscopeTabs';
import useHoroscopePage from '@/hooks/horoscope/useHoroscopePage';
import { motion } from 'framer-motion';
import React, { memo } from 'react';

export type HoroscopeTypeId = 'mensuel' | 'annuel';

export interface Tab {
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

function HoroscopePageComponent() {
  const {
    loadingUser,
    activeTab,
    result,
    error,
    loadingHoroscopes,
    tabs,
    filteredHoroscopes,
    handleRedirect,
    handleTabChange,
    handleHoroscopeClick
  } = useHoroscopePage();

  const typedTabs = tabs as Tab[];

  return (
    <div className="bg-white">
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
        <HoroscopeHeader />
        <HoroscopeTabs tabs={typedTabs} activeTab={activeTab} onTabChange={handleTabChange} />
        <HoroscopeList horoscopes={filteredHoroscopes} activeTab={activeTab} onHoroscopeClick={handleHoroscopeClick} />
        <HoroscopeForm loadingUser={loadingUser} activeTab={activeTab} filteredHoroscopesLength={filteredHoroscopes.length} error={error} onSubmit={handleRedirect} />
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
                <span className="block w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
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
      </div>
    </div>
  );
}

export default memo(HoroscopePageComponent, () => true);