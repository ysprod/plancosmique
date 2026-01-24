import AstrologyConsultationCardClient from './AstrologyConsultationCardClient';
import type { Consultation } from '@/lib/interfaces';

export default function ConsultationAstrologyView({ consultation }: { consultation: Consultation }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
      <AstrologyConsultationCardClient consultation={consultation} />
    </div>
  );
}
