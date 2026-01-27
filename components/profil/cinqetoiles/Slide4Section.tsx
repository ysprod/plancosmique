"use client";
import { Slide4SectionSelection } from '@/components/cinqetoiles/Slide4SectionSelection';
import { useSlide4Section } from '@/hooks/cinqetoiles/useSlide4Section';
import { memo } from 'react';

function Slide4Section() {
  const { choices, loading, handleSelect } = useSlide4Section();

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <Slide4SectionSelection
        loading={loading}
        choices={choices}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default memo(Slide4Section);