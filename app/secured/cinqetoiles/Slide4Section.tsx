"use client";
import { memo } from 'react';
import Slide4SectionMain from '@/components/cinqetoiles/Slide4SectionMain';


import { User } from '@/lib/interfaces';

interface Slide4SectionProps {
  userdata?: User;
}

function Slide4Section({ userdata }: Slide4SectionProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900">
      <Slide4SectionMain userdata={userdata} />
    </div>
  );
}

export default memo(Slide4Section);