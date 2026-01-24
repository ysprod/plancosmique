"use client";

import React, { memo, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useHoroscopeSummary } from "@/hooks/consultations/useHoroscopeSummary";
import { cx } from "@/lib/functions";
import type { Consultation } from "@/lib/interfaces";

import AlternativesList from "./content/AlternativesList";
import ConsultationDescription from "./content/ConsultationDescription";
import ConsultationHeader from "./content/ConsultationHeader";
import HoroscopeSummary from "./content/HoroscopeSummary";
import { Hash, Sparkles } from "lucide-react";

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

/** Centralise la récupération du markdown (ton backend peut varier) */
function extractMarkdown(c: any): string | null {
  // Tu avais .texte, mais ton payload montre souvent directement une string (analyse.analyse).
  // On supporte les 2 sans casser :
  const v =
    c?.analyse?.analyse?.texte ??
    c?.resultData?.analyse?.texte ??
    c?.analyse?.analyse ??
    c?.resultData?.analyse ??
    null;

  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}

/* ------------------------------ Animations légères ------------------------------ */

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
  badge,
}: {
  children: React.ReactNode;
  badge?: React.ReactNode;
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

          {badge && (
            <div className="px-4 pt-4 sm:px-6 sm:pt-5">
              <div className="mx-auto flex w-full items-center justify-center">{badge}</div>
            </div>
          )}

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
        "rounded-3xl border p-4 sm:p-5",
        "border-slate-200/70 bg-white/70",
        "dark:border-zinc-800/70 dark:bg-zinc-900/40"
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
}

const ConsultationContent = memo(function ConsultationContent({ consultation }: ConsultationContentProps) {
  const reduceMotion = useReducedMotion();

  const kind = useMemo(() => getKindFromType((consultation as any)?.type), [consultation]);

  // ✅ Markdown résolu UNE seule fois, de manière uniforme
  const markdown = useMemo(() => extractMarkdown(consultation as any), [consultation]);

  // ✅ Horoscope summary uniquement si fallback (coût évité sinon)
  const horoscope = kind === "horoscope_fallback" ? useHoroscopeSummary(consultation) : null;

  const badge = useMemo(() => {
    if (kind === "numerology") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-[11px] font-extrabold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200">
          <Hash className="h-3.5 w-3.5 text-fuchsia-600 dark:text-fuchsia-300" />
          Numérologie • Analyse
        </span>
      );
    }
    if (kind === "astrology") {
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-[11px] font-extrabold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200">
          <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-300" />
          Astrologie • Analyse
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-[11px] font-extrabold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-200">
        <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
        Horoscope • Résumé
      </span>
    );
  }, [kind]);

  return (
    <ShellCard badge={badge}>
      {/* Header toujours centré */}
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <ConsultationHeader
          titre={(consultation as any).titre}
          title={(consultation as any).title}
          dateNaissance={(consultation as any).dateNaissance}
         // prenoms={(consultation as any).prenoms}
         // nom={(consultation as any).nom}
        />
      </div>

      {/* Corps — switch ultra simple */}
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

      {/* Description + alternatives centrées */}
      <div className="mx-auto mt-4 w-full max-w-2xl space-y-3">
        <ConsultationDescription description={(consultation as any).description} />
        <AlternativesList alternatives={(consultation as any).alternatives || []} />
      </div>
    </ShellCard>
  );
},
// Comparator robuste : évite rerender si le parent recrée l’objet sans changement réel
(prev, next) => {
  const p: any = prev.consultation;
  const n: any = next.consultation;

  if (p === n) return true;

  const pid = String(p?._id ?? p?.id ?? p?.consultationId ?? "");
  const nid = String(n?._id ?? n?.id ?? n?.consultationId ?? "");
  if (pid && nid && pid !== nid) return false;

  const pupd = String(p?.updatedAt ?? p?.dateGeneration ?? "");
  const nupd = String(n?.updatedAt ?? n?.dateGeneration ?? "");
  if (!pupd || !nupd) return false;

  return pupd === nupd;
});

ConsultationContent.displayName = "ConsultationContent";
export default ConsultationContent;
