'use client';
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import SectionCard from './SectionCard';
import { ResultHeader } from './ResultHeader';
import { GeneralForecastCard } from './GeneralForecastCard';
import { SpiritualAdviceCard } from './SpiritualAdviceCard';
import { ResultInfoGrid } from './ResultInfoGrid';
import { useResultDisplay } from '@/hooks/horoscope/useResultDisplay';
import { containerVariants, SECTION_ICONS, SECTION_COLORS } from './resultDisplayConstants';
import { HoroscopeResult } from '@/lib/interfaces';

interface ResultDisplayProps {
  result: HoroscopeResult;
}

const ResultDisplay = memo<ResultDisplayProps>(({ result }) => {
  const { prefersReducedMotion, sections } = useResultDisplay(result);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 mt-8"
    >
      {/* Header Section */}
      <ResultHeader
        symbol={result.symbol}
        zodiacSign={result.zodiacSign}
        period={result.period}
        element={result.element}
        horoscopeType={result.horoscopeType}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* General Forecast */}
      <GeneralForecastCard
        generalForecast={result.generalForecast}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Sections Grid */}
      <div className="grid gap-4">
        {sections.map(({ key, title, content }) => (
          <SectionCard
            key={key}
            icon={SECTION_ICONS[key]}
            title={title}
            content={content}
            colors={SECTION_COLORS[key]}
          />
        ))}
      </div>

      {/* Spiritual Advice */}
      <SpiritualAdviceCard
        spiritualAdvice={result.spiritualAdvice}
        prefersReducedMotion={prefersReducedMotion}
      />

      {/* Info Cards Grid */}
      <ResultInfoGrid
        dominantPlanet={result.dominantPlanet}
        luckyColor={result.luckyColor}
      />
    </motion.div>
  );
}, (prev, next) =>
  prev.result.zodiacSign === next.result.zodiacSign &&
  prev.result.generalForecast === next.result.generalForecast &&
  prev.result.love === next.result.love &&
  prev.result.work === next.result.work &&
  prev.result.health === next.result.health
);

ResultDisplay.displayName = 'ResultDisplay';

export default ResultDisplay;