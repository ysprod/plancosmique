"use client";
import type { Rubrique } from "@/lib/interfaces";
import { NumerologieConsultationSection } from "../numerologie/NumerologieConsultationSection";
import HoroscopeConsultationSection from "../vie-personnelle/HoroscopeConsultationSection";
import Slide4Section from "../vie-personnelle/Slide4Section";
import RubriqueHeader from "./RubriqueHeader";
import { useRubriqueDerived } from "./useRubriqueDerived";

export function RubriqueView({ rubrique }: { rubrique: Rubrique }) {
  const derived = useRubriqueDerived(rubrique);
  return (
    <div className="relative mx-auto max-w-4xl">
      <RubriqueHeader title={derived.title} description={derived.desc} />
      <div className="max-w-8xl mx-auto">
        {rubrique.typeconsultation === 'HOROSCOPE' ? (
          <HoroscopeConsultationSection />
        ) : (rubrique.typeconsultation === 'CYCLES_PERSONNELS' || rubrique.typeconsultation === 'NOMBRES_PERSONNELS') ? (
          <NumerologieConsultationSection rubriqueId={rubrique._id!} typeconsultation={rubrique.typeconsultation} />
        ) : (
          <Slide4Section rubrique={rubrique} />
        )}
      </div>
    </div>
  );
}