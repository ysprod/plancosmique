import { AnimatePresence, motion } from 'framer-motion';
import Slide4Section from './Slide4Section';
 
interface ConsultationSectionProps {
  rubriqueId: string;
  typeconsultation: string;
}

export function NumerologieConsultationSection({ rubriqueId, typeconsultation }: ConsultationSectionProps) {
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
          <Slide4Section rubriqueId={rubriqueId} typeconsultation={typeconsultation} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
