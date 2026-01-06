import { AnimatePresence, motion } from 'framer-motion';
import Slide4Section from '@/components/vie-personnelle/Slide4Section';
import { NumerologieConsultationSection } from '@/components/numerologie/NumerologieConsultationSection';
import { Rubrique } from '@/lib/interfaces';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ConsultationSectionProps {
  rubrique: Rubrique;
 
}

export function ConsultationSection({ rubrique }: ConsultationSectionProps) {
  const router = useRouter();
   useEffect(() => {
    if (rubrique.typeconsultation === 'HOROSCOPE') {
      router.push('/secured/horoscope');
    }
  }, [rubrique.typeconsultation, router]);

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
          {(rubrique.typeconsultation === 'CYCLES_PERSONNELS' || rubrique.typeconsultation === 'NOMBRES_PERSONNELS') ? (
            <NumerologieConsultationSection rubriqueId={rubrique._id!} typeconsultation={rubrique.typeconsultation} />
          ) : (
            <Slide4Section rubriqueId={rubrique._id!} typeconsultation={rubrique.typeconsultation} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
