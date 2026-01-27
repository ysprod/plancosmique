"use client";

import React, { memo, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export type ProgressStage =
  | "idle"
  | "update_user"
  | "sky_chart"
  | "choices"
  | "consultations"
  | "finalizing"
  | "done"
  | "error";

export type ProgressState = {
  stage: ProgressStage;
  message: string;
  total: number;
  done: number;
  percent: number; // 0..100
  startedAt: number; // Date.now()
  lastUpdatedAt: number;
  logs: string[]; // compact
};

const shell = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 420, damping: 34 } },
  exit: { opacity: 0, y: 10, scale: 0.985, transition: { duration: 0.12 } },
};

const STAGES: Array<{ key: ProgressStage; label: string }> = [
  { key: "update_user", label: "Profil" },
  { key: "sky_chart", label: "Carte du ciel" },
  { key: "choices", label: "Analyses" },
  { key: "finalizing", label: "Finalisation" },
  { key: "consultations", label: "Consultations" },
  { key: "done", label: "Terminé" },
];

function fmtEta(ms: number) {
  if (!Number.isFinite(ms) || ms <= 0) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${r}s`;
}

export const PaymentProcessingProgress = memo(function PaymentProcessingProgress({
  progress,
}: {
  progress: ProgressState;
}) {
  const reduceMotion = useReducedMotion();

  const meta = useMemo(() => {
    const now = Date.now();
    const elapsed = Math.max(0, now - progress.startedAt);
    // ETA basique : extrapolation sur percent
    const eta =
      progress.percent > 2 ? (elapsed * (100 - progress.percent)) / Math.max(1, progress.percent) : Infinity;

    return {
      elapsed: fmtEta(elapsed),
      eta: fmtEta(eta),
      isDone: progress.stage === "done",
      isError: progress.stage === "error",
    };
  }, [progress.percent, progress.startedAt, progress.stage]);

  return (
    <div className="min-h-[100dvh] w-full grid place-items-center px-3 py-6">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/60" />
      <div className="fixed inset-0 -z-10 [background:radial-gradient(60%_45%_at_50%_10%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(50%_40%_at_20%_80%,rgba(236,72,153,0.18),transparent_55%)]" />

      <AnimatePresence mode="wait">
        <motion.section
          key="progress"
          role="status"
          aria-live="polite"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={shell}
          className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/55 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] px-5 py-6 sm:px-7 sm:py-7 text-center"
        >
          <div className="mx-auto mb-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-80" />

          <div className="mx-auto mb-4 grid place-items-center">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-gradient-to-r from-indigo-500/50 via-fuchsia-500/45 to-rose-500/45" />
              {!meta.isDone ? (
                <motion.div
                  className="absolute inset-0 grid place-items-center"
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-8 w-8 text-slate-900/80 dark:text-white" strokeWidth={2.4} />
                </motion.div>
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" strokeWidth={2.4} />
                </div>
              )}
            </div>
          </div>

          <div className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {meta.isError ? "Une erreur est survenue" : meta.isDone ? "Analyse prête" : "Génération en cours…"}
          </div>

          <div className="mt-1 text-[12.5px] leading-snug text-slate-600 dark:text-slate-300">
            {progress.message}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2.5 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
                animate={{ width: `${Math.min(100, Math.max(0, progress.percent))}%` }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 28 }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>{progress.done}/{progress.total || 0} traités</span>
              <span>{progress.percent.toFixed(0)}%</span>
            </div>
          </div>

          {/* Stage pills */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {STAGES.map((s) => {
              const active = progress.stage === s.key;
              const done =
                (s.key === "update_user" && (progress.stage !== "idle" && progress.stage !== "update_user")) ||
                (s.key === "sky_chart" && (progress.stage === "choices" || progress.stage === "finalizing" || progress.stage === "done")) ||
                (s.key === "choices" && (progress.stage === "finalizing" || progress.stage === "done")) ||
                (s.key === "finalizing" && progress.stage === "done");

              return (
                <span
                  key={s.key}
                  className={[
                    "px-2.5 py-1 rounded-full border text-[11px] font-semibold",
                    done
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : active
                      ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                      : "border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300",
                  ].join(" ")}
                >
                  {s.label}
                </span>
              );
            })}
          </div>

          {/* Timing */}
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span>Écoulé: {meta.elapsed}</span>
            <span>Reste: {meta.eta}</span>
          </div>

          {/* Logs (compact, centered) */}
          {progress.logs?.length ? (
            <div className="mt-4 text-left mx-auto max-w-sm">
              <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 mb-2 text-center">
                Journal
              </div>
              <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 max-h-28 overflow-auto">
                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  {progress.logs.slice(-6).map((l, i) => (
                    <li key={`${i}-${l}`} className="leading-snug">
                      • {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </motion.section>
      </AnimatePresence>
    </div>
  );
});
