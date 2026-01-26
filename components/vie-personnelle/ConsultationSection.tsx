'use client';

import Slide4Section from '@/components/vie-personnelle/Slide4Section';
import { Rubrique } from '@/lib/interfaces';

interface ConsultationSectionProps {
  rubrique: Rubrique;
}

export function ConsultationSection({ rubrique }: ConsultationSectionProps) {
  return (
    <div className="max-w-8xl mx-auto">
              <Slide4Section rubrique={rubrique} />

      
    </div>
  );
}