import HoroscopeSummary from './content/HoroscopeSummary';
import type { Consultation } from '@/lib/interfaces';
import { motion } from 'framer-motion';

export default function ConsultationHoroscopeView({ consultation }: { consultation: Consultation }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <HoroscopeSummary horoscope={consultation.analyse?.horoscope || consultation.resultData?.horoscope} />
    </motion.div>
  );
}
