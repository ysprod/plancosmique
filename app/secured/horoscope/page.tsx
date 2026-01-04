'use client';
import HoroscopeListLoading from '@/components/horoscope/HoroscopeListLoading';
import ResultDisplay from '@/components/horoscope/ResultDisplay';
import HoroscopeForm from '@/components/horoscope/page/HoroscopeForm';
import HoroscopeHeader from '@/components/horoscope/page/HoroscopeHeader';
import HoroscopeList from '@/components/horoscope/page/HoroscopeList';
import HoroscopeTabs from '@/components/horoscope/page/HoroscopeTabs';
import useHoroscopePage from '@/hooks/horoscope/useHoroscopePage';
import { Tab } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { memo } from 'react';

function HoroscopePageComponent() {
  const {
    loadingUser, activeTab, result, error,
    loadingHoroscopes, tabs, filteredHoroscopes,
    handleRedirect, handleTabChange, handleHoroscopeClick
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

        {loadingHoroscopes && <HoroscopeListLoading />}

        {result && !loadingHoroscopes && (
          <ResultDisplay key="result" result={result} />
        )}
      </div>
    </div>
  );
}

export default memo(HoroscopePageComponent, () => true);