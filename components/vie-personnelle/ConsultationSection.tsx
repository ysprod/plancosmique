'use client';

import { NumerologieConsultationSection } from '@/components/numerologie/NumerologieConsultationSection';
import Slide4Section from '@/components/vie-personnelle/Slide4Section';
import { Rubrique } from '@/lib/interfaces';
import HoroscopeConsultationSection from './HoroscopeConsultationSection';

interface ConsultationSectionProps {
  rubrique: Rubrique;
}

export function ConsultationSection({ rubrique }: ConsultationSectionProps) {
  return (
    <div className="max-w-8xl mx-auto">
      {rubrique.typeconsultation === 'HOROSCOPE' ? (
        <HoroscopeConsultationSection />
      ) : (rubrique.typeconsultation === 'CYCLES_PERSONNELS' || rubrique.typeconsultation === 'NOMBRES_PERSONNELS') ? (
        <NumerologieConsultationSection rubriqueId={rubrique._id!} typeconsultation={rubrique.typeconsultation} />
      ) : (
        <Slide4Section rubrique={rubrique} />
      )}
    </div>
  );
}