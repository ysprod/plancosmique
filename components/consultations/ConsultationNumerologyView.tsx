import NumerologyConsultationCardClient from './NumerologyConsultationCardClient';
import type { Consultation } from '@/lib/interfaces';

export default function ConsultationNumerologyView({ consultation }: { consultation: Consultation }) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto animate-fade-in-up">
      <NumerologyConsultationCardClient consultation={consultation} />
    </div>
  );
}
