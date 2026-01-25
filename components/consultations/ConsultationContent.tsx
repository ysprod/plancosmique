"use client";
import { useHoroscopeSummary } from "@/hooks/consultations/useHoroscopeSummary";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import React, { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ConsultationHeader from "./content/ConsultationHeader";
import HoroscopeSummary from "./content/HoroscopeSummary";

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

const shellVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.18 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 8, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 8, scale: 0.995, transition: { duration: 0.12 } },
};

const ShellCard = memo(function ShellCard({
  children,
}: {
  children: React.ReactNode;

}) {
  return (
    <motion.section
      variants={shellVariants}
      initial="initial"
      animate="animate"
      className={cx(
        "w-full mx-auto",
        "flex flex-col items-center justify-center text-center",
        "px-3 py-4 sm:px-4 sm:py-6"
      )}
      aria-label="Contenu de la consultation"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={cx(
            "relative overflow-hidden rounded-[28px] border",
            "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
            "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
          )}
        >
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
          <div className="p-3 sm:p-5">{children}</div>
        </div>
      </div>
    </motion.section>
  );
});

const MarkdownCard = memo(function MarkdownCard({ markdown }: { markdown: string }) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-2xl",
        "dark:border-zinc-800/70 dark:bg-zinc-900/40 mb-4"
      )}
    >
      <article className="prose prose-sm max-w-none text-left dark:prose-invert">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
});

export interface ConsultationContentProps {
  consultation: Consultation;
  onBack: () => void;
  onDownloadPDF: () => void;
}

function ConsultationContent({ consultation, onBack, onDownloadPDF }: ConsultationContentProps) {
  const reduceMotion = useReducedMotion();
  const kind = useMemo(() => getKindFromType((consultation as any)?.type), [consultation]);
  const markdown = useMemo(() => extractMarkdown(consultation as any), [consultation]);

  const horoscope = kind === "horoscope_fallback" ? useHoroscopeSummary(consultation) : null;

  return (
    <ShellCard>
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ scale: 1.06, x: -2 }}
          whileTap={{ scale: 0.97, x: -1 }}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-slate-900/80 to-slate-700/80 text-white/90 hover:text-white shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 transition-all backdrop-blur-md border border-white/10 dark:border-zinc-800/40"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-semibold">Retour</span>
        </motion.button>

        <motion.button
          type="button"
          onClick={onDownloadPDF}
          whileHover={{ scale: 1.07, rotate: 1 }}
          whileTap={{ scale: 0.96, rotate: -1 }}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 transition-all backdrop-blur-md border border-white/10 dark:border-zinc-800/40"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">PDF</span>
        </motion.button>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <ConsultationHeader
          titre={(consultation as any).titre}
          title={(consultation as any).title}
        />
      </div>

      <div className="mt-4">
        <AnimatePresence mode="wait">
          {/* 1) Si on a du markdown (numérologie / astrologie / horoscope texte) => on l’affiche */}
          {markdown ? (
            <motion.div key="md" variants={cardVariants} initial="initial" animate="animate" exit="exit">
              <MarkdownCard markdown={markdown} />
            </motion.div>
          ) : (
            <motion.div key="summary" variants={cardVariants} initial="initial" animate="animate" exit="exit">
              <div
                className={cx(
                  "mx-auto w-full max-w-2xl",
                  "rounded-3xl border p-4 sm:p-5",
                  "border-slate-200/70 bg-white/60",
                  "dark:border-zinc-800/70 dark:bg-zinc-900/40"
                )}
              >
                <HoroscopeSummary horoscope={horoscope} />
                {!reduceMotion && (
                  <motion.div
                    className="mx-auto mt-4 h-[2px] w-28 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/80"
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ShellCard>
  );
}

ConsultationContent.displayName = "ConsultationContent";

export default ConsultationContent;