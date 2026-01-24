import type { Consultation } from '@/lib/interfaces';
import ConsultationHeader from './content/ConsultationHeader';
import AlternativesList from './content/AlternativesList';
import ConsultationDescription from './content/ConsultationDescription';
import ConsultationUserInfo from './content/ConsultationUserInfo';
import { motion } from 'framer-motion';

export default function ConsultationDefaultView({ consultation }: { consultation: Consultation }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <ConsultationHeader
        titre={consultation.titre}
        title={consultation.title}
        dateNaissance={consultation.dateNaissance}
      />
      <div className="my-4 w-full">
        <ConsultationDescription description={consultation.description} />
      </div>
      <AlternativesList alternatives={consultation.alternatives || []} />
      <ConsultationUserInfo formData={consultation.formData} />
    </motion.div>
  );
}
