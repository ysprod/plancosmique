"use client";

import React, { memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import type { Consultation } from "@/hooks/consultations/useConsultationsByRubrique";

interface Props {
  consultations: Consultation[];
}

/** Variants hors render = stabilité + perf */
const listVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (reduceMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.06, delayChildren: 0.02 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (reduceMotion: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 },
  }),
  exit: { opacity: 0, y: 8, transition: { duration: 0.12 } },
};

function formatDateFR(input?: string | Date | null) {
  if (!input) return null;
  const d = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

/** Card memoisée = rerenders minimaux */
const ConsultationCard = memo(function ConsultationCard({
  c,
  onView,
  reduceMotion,
}: {
  c: Consultation;
  onView: (id: string) => void;
  reduceMotion: boolean;
}) {
  const dateLabel = useMemo(() => formatDateFR((c as any).date || (c as any).dateGeneration || null), [c]);

  return (
    <motion.li
      layout
      custom={reduceMotion}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={[
        "w-full",
        "rounded-2xl",
        "border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-slate-950/55",
        "backdrop-blur-xl",
        "shadow-[0_16px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.32)]",
        "px-4 py-3",
      ].join(" ")}
    >
      {/* Contenu centré */}
      <div className="flex flex-col items-center justify-center text-center gap-1">
        <div className="inline-flex items-center justify-center gap-2">
          <span className="h-9 w-9 rounded-xl grid place-items-center bg-black/5 dark:bg-white/10">
            <BookOpen className="h-5 w-5 text-slate-900/80 dark:text-white" />
          </span>

          <div className="min-w-0">
            <div className="text-[14px] sm:text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-slate-50 truncate max-w-[18rem]">
              {c.title || "Consultation"}
            </div>
            {dateLabel ? (
              <div className="mt-0.5 inline-flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{dateLabel}</span>
              </div>
            ) : null}
          </div>
        </div>

        {(c as any).description ? (
          <p className="mt-1 text-[12px] leading-snug text-slate-600 dark:text-slate-300 line-clamp-2 max-w-[28rem]">
            {(c as any).description}
          </p>
        ) : (
          <p className="mt-1 text-[12px] leading-snug text-slate-500 dark:text-slate-400">
            Analyse disponible pour consultation.
          </p>
        )}

        {/* CTA ultra-compact, full-width mobile */}
        <div className="mt-3 w-full flex items-center justify-center">
          <button
            type="button"
            onClick={() => onView(String((c as any)._id || c.id))}
            className={[
              "w-full sm:w-auto",
              "inline-flex items-center justify-center gap-2",
              "rounded-2xl px-4 py-2.5",
              "text-[13px] font-semibold",
              "text-white",
              "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500",
              "shadow-lg shadow-fuchsia-500/20",
              "hover:opacity-[0.96] active:scale-[0.98] transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950",
            ].join(" ")}
            aria-label={`Consulter l'analyse : ${c.titre || "Consultation"}`}
          >
            Consulter l’analyse
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.li>
  );
});

ConsultationCard.displayName = "ConsultationCard";

function RubriqueConsultationsListImpl({ consultations }: Props) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  // Evite recalcul / rerender de handlers
  const onView = useCallback(
    (id: string) => {
      // À adapter selon ton routing exact:
      // - si c’est côté user: /secured/consultations/{id}
      // - si c’est admin: /admin/consultations/{id}
      router.push(`/secured/consultations/${id}`);
    },
    [router]
  );

  // Empty state centré premium
  if (!consultations?.length) {
    return (
      <div className="w-full grid place-items-center px-3 py-10">
        <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/55 backdrop-blur-xl px-5 py-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-2xl grid place-items-center bg-black/5 dark:bg-white/10">
            <BookOpen className="h-5 w-5 text-slate-900/70 dark:text-white/80" />
          </div>
          <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-50">
            Aucune consultation
          </div>
          <div className="mt-1 text-[12px] text-slate-600 dark:text-slate-300">
            Aucune consultation trouvée pour cette rubrique.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid place-items-center px-2">
      <motion.ul
        role="list"
        initial="hidden"
        animate="visible"
        custom={reduceMotion}
        variants={listVariants}
        className="w-full max-w-xl flex flex-col items-center justify-center gap-2"
      >
        <AnimatePresence initial={false}>
          {consultations.map((c) => (
            <ConsultationCard key={String((c as any).consultationId || c.id)} c={c} onView={onView} reduceMotion={!!reduceMotion} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

const RubriqueConsultationsList = memo(RubriqueConsultationsListImpl);
export default RubriqueConsultationsList;
