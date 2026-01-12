"use client";
import Slide4SectionMain from '@/components/cinqetoiles/Slide4SectionMain';
import { memo } from 'react';

function Slide4Section() {

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <Slide4SectionMain />
    </div>
  );
}

export default memo(Slide4Section);