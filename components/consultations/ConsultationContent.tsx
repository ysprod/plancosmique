"use client";
import { cardVariants } from "./content/variants";
import { useHoroscopeSummary } from "@/hooks/consultations/useHoroscopeSummary";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import { ArrowLeft, Download } from "lucide-react";
import React, { useMemo } from "react";
import ConsultationHeader from "./content/ConsultationHeader";
import HoroscopeSummary from "./content/HoroscopeSummary";
import ShellCard from "./content/ShellCard";
import MarkdownCard from "./content/MarkdownCard";

type Kind = "numerology" | "astrology" | "horoscope_fallback";

function normalizeType(t: any) {
  return String(t ?? "").trim().toLowerCase().replace(/_/g, "-");
}

function getKindFromType(typeRaw: any): Kind {
  const t = normalizeType(typeRaw);

  if (t === "nombres-personnels" || t === "cycles-personnels" || t === "numerologie" || t === "numerology") {
    return "numerology";
  }
  if (t === "vie-personnelle" || t === "astrologie-africaine" || t === "transits" || t === "astrologie" || t === "astro" || t === "carte-du-ciel") {
    return "astrology";
  }
  return "horoscope_fallback";
}

function extractMarkdown(c: any): string | null {
  const v =
    c?.analyse?.analyse?.texte ??
    c?.resultData?.analyse?.texte ??
    c?.analyse?.analyse ??
    c?.resultData?.analyse ??
    null;

  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}

export interface ConsultationContentProps {
  consultation: Consultation;
  onBack: () => void;
  onDownloadPDF: () => void;
}

function ConsultationContent({ consultation, onBack, onDownloadPDF }: ConsultationContentProps) {
  const kind = useMemo(() => getKindFromType((consultation as any)?.type), [consultation]);
  const markdown = useMemo(() => extractMarkdown(consultation as any), [consultation]);

  const horoscope = kind === "horoscope_fallback" ? useHoroscopeSummary(consultation) : null;

  return (
    <ShellCard>
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-slate-900/80 to-slate-700/80 text-white/90 hover:text-white shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 transition-all backdrop-blur-md border border-white/10 dark:border-zinc-800/40"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-semibold">Retour</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPDF}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 transition-all backdrop-blur-md border border-white/10 dark:border-zinc-800/40"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <ConsultationHeader
          titre={(consultation as any).titre}
          title={(consultation as any).title}
        />
      </div>

      <div className="mt-4">
        {markdown ? (
          <div key="md" >
            <MarkdownCard markdown={markdown} />
          </div>
        ) : (
          <div key="summary" >
            <div className={cx(
              "mx-auto w-full max-w-2xl",
              "rounded-3xl border p-4 sm:p-5",
              "border-slate-200/70 bg-white/60",
              "dark:border-zinc-800/70 dark:bg-zinc-900/40"
            )}
            >
              <HoroscopeSummary horoscope={horoscope} />
            </div>
          </div>
        )}
      </div>
    </ShellCard>
  );
}

ConsultationContent.displayName = "ConsultationContent";

export default ConsultationContent;