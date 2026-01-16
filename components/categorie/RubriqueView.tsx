"use client";
import { memo, useMemo, lazy, Suspense } from "react";
import type { Rubrique } from "@/lib/interfaces";
import { useRubriqueDerived } from "../../hooks/commons/useRubriqueDerived";
import RubriqueHeader from "./RubriqueHeader";

// Lazy loading des composants lourds pour optimiser le bundle
const HoroscopeConsultationSection = lazy(() => import("../vie-personnelle/HoroscopeConsultationSection"));
const Slide4Section = lazy(() => import("../vie-personnelle/Slide4Section"));

// Composant de fallback pendant le chargement
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
  </div>
);

interface RubriqueViewProps {
  rubrique: Rubrique;
}

export const RubriqueView = memo<RubriqueViewProps>(function RubriqueView({ rubrique }) {
  const derived = useRubriqueDerived(rubrique);
  
  // Mémoïser le type de consultation pour éviter les recalculs
  const consultationType = useMemo(() => rubrique.typeconsultation, [rubrique.typeconsultation]);
  
  const isHoroscope = consultationType === 'HOROSCOPE';
  const isNumerologie = consultationType === 'CYCLES_PERSONNELS' || consultationType === 'NOMBRES_PERSONNELS';
  
  // Sélection du composant approprié
  const ConsultationContent = useMemo(() => {
    if (isHoroscope) {
      return <HoroscopeConsultationSection />;
    }
    return <Slide4Section rubrique={rubrique} />;
  }, [isHoroscope, rubrique]);
  
  return (
    <div className="relative mx-auto max-w-4xl">
      <RubriqueHeader title={derived.title} description={derived.desc} />
      <div className="max-w-8xl mx-auto">
        <Suspense fallback={<LoadingFallback />}>
          {ConsultationContent}
        </Suspense>
      </div>
    </div>
  );
});