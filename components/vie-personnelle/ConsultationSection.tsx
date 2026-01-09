import { NumerologieConsultationSection } from '@/components/numerologie/NumerologieConsultationSection';
import Slide4Section from '@/components/vie-personnelle/Slide4Section';
import { Rubrique } from '@/lib/interfaces';
import { AnimatePresence, motion } from 'framer-motion';
import HoroscopeConsultationSection from './HoroscopeConsultationSection';

interface ConsultationSectionProps {
  rubrique: Rubrique;
}

export function ConsultationSection({ rubrique }: ConsultationSectionProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key="consultation"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white"
        >
          {rubrique.typeconsultation === 'HOROSCOPE' ? (
            <HoroscopeConsultationSection />
          ) : (rubrique.typeconsultation === 'CYCLES_PERSONNELS' || rubrique.typeconsultation === 'NOMBRES_PERSONNELS') ? (
            <NumerologieConsultationSection rubriqueId={rubrique._id!} typeconsultation={rubrique.typeconsultation} />
          ) : (
            <Slide4Section rubrique={rubrique} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}