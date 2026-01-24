"use client";
import AstrologyConsultationCardClient from "@/components/consultations/AstrologyConsultationCardClient";
import { useHoroscopeSummary } from "@/hooks/consultations/useHoroscopeSummary";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import React, { memo, useMemo } from "react";
import ConsultationDescription from "./content/ConsultationDescription";
import ConsultationHeader from "./content/ConsultationHeader";
import HoroscopeSummary from "./content/HoroscopeSummary";
import { NumerologyAnalysisSection } from "@/components/admin/consultations/choices/numerologie/NumerologyAnalysisSection";

type Kind = "numerology" | "astrology" | "horoscope_fallback";

function normalizeType(t: any) {
  return String(t ?? "").trim().toLowerCase().replace(/_/g, "-");
}

function getKindFromType(typeRaw: any): Kind {
  const t = normalizeType(typeRaw);
  if (
    t === "nombres-personnels" || t === "cycles-personnels" || t === "numerologie" || t === "numerology"
  ) {
    return "numerology";
  }

  if (
    t === "vie-personnelle" || t === "astrologie-africaine" || t === "transits" || t === "astrologie" || t === "astro" || t === "carte-du-ciel"
  ) {
    return "astrology";
  }

  return "horoscope_fallback";
}

const Shell = memo(function Shell({ children, ariaLabel }: { children: React.ReactNode; ariaLabel?: string }) {
  return (
    <section
      aria-label={ariaLabel}
      className={cx(
        "w-full mx-auto flex flex-col items-center justify-center text-center",
        "px-3 py-4 sm:px-4 sm:py-6"
      )}
    >
      {children}
    </section>
  );
});

export interface ConsultationContentProps {
  consultation: Consultation;
}


export default function ConsultationContent({ consultation }: ConsultationContentProps) {
  const kind = useMemo(() => getKindFromType((consultation as any)?.type), [consultation]);
  const horoscope = kind === "horoscope_fallback" ? useHoroscopeSummary(consultation) : null;

  // Extraction avancée pour numérologie (pattern admin)
  const numerologyProps = useMemo(() => {
    if (kind !== "numerology") return null;
    return {
      themeDeNaissance: (consultation as any)?.themeDeNaissance,
      cyclesEnMouvement: (consultation as any)?.cyclesEnMouvement,
      syntheseEtTiming: (consultation as any)?.syntheseEtTiming,
      cyclesDeVieGrands: (consultation as any)?.cyclesDeVieGrands,
      sagesseAfricaine: (consultation as any)?.sagesseAfricaine,
    };
  }, [consultation, kind]);

  const content = useMemo(() => {
    if (kind === "numerology" && numerologyProps) {
      return (
        <NumerologyAnalysisSection
          themeDeNaissance={numerologyProps.themeDeNaissance}
          cyclesEnMouvement={numerologyProps.cyclesEnMouvement}
          syntheseEtTiming={numerologyProps.syntheseEtTiming}
          cyclesDeVieGrands={numerologyProps.cyclesDeVieGrands}
          sagesseAfricaine={numerologyProps.sagesseAfricaine}
        />
      );
    }
    if (kind === "astrology") {
      // Animation et découpage pour l’astrologie
      return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in">
          <AstrologyConsultationCardClient consultation={consultation} />
        </div>
      );
    }

    // Fallback horoscope : amélioration accessibilité et structure
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center animate-fade-in">
        <ConsultationHeader
          titre={(consultation as any).titre}
          title={(consultation as any).title}
          dateNaissance={(consultation as any).dateNaissance}
        />
        <div className="my-4 w-full max-w-4xl bg-white/10 dark:bg-zinc-900/60 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all">
          <HoroscopeSummary horoscope={horoscope} />
        </div>
        <div className="mt-3 w-full">
          <ConsultationDescription description={(consultation as any).description} />
        </div>
      </div>
    );
  }, [consultation, horoscope, kind, numerologyProps]);

  return <Shell ariaLabel="Contenu de la consultation">{content}</Shell>;
}