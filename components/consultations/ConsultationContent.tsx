"use client";
import NumerologyConsultationCardClient from "@/components/consultations/NumerologyConsultationCardClient";
import { useHoroscopeSummary } from "@/hooks/consultations/useHoroscopeSummary";
import type { Consultation } from "@/lib/interfaces";
import { memo } from "react";
import AlternativesList from "./content/AlternativesList";
import ConsultationDescription from "./content/ConsultationDescription";
import ConsultationHeader from "./content/ConsultationHeader";
import ConsultationUserInfo from "./content/ConsultationUserInfo";
import HoroscopeSummary from "./content/HoroscopeSummary";


const ConsultationContent = memo(
  function ConsultationContent({ consultation }: { consultation: Consultation }) {
    if (!consultation) return null;

    // Détection du type de consultation pour afficher le bon composant
    const type = consultation.type?.toString().toLowerCase();

    if (type === 'nombres-personnels' || type === 'cycles-personnels' || type === 'numerologie') {
      return (
        <section className="mx-auto w-full flex flex-col items-center justify-center text-center px-3 py-4 sm:px-4 sm:py-6">
          <NumerologyConsultationCardClient consultation={consultation} />
        </section>
      );
    }

    const horoscope = useHoroscopeSummary(consultation);

    return (
      <section className="mx-auto w-full flex flex-col items-center justify-center text-center px-3 py-4 sm:px-4 sm:py-6">
        <ConsultationHeader
          titre={consultation.titre}
          title={consultation.title}
          prenoms={consultation.prenoms}
          nom={consultation.nom}
          dateNaissance={consultation.dateNaissance}
        />
        <div className="my-8 w-full">
          <HoroscopeSummary horoscope={horoscope} />
        </div>
        <AlternativesList alternatives={consultation.alternatives || []} />
        <ConsultationDescription description={consultation.description} />
        <ConsultationUserInfo formData={consultation.formData} />
      </section>
    );
  },
  (prev, next) => prev.consultation === next.consultation
);

ConsultationContent.displayName = "ConsultationContent";
export default ConsultationContent;
