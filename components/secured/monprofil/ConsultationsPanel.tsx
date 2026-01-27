"use client";
import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "./GlassCard";
import RubriqueConsultationsList from "./RubriqueConsultationsList";

const ConsultationsPanel = memo(function ConsultationsPanel({
  loading,
  error,
  consultations,
}: {
  loading: boolean;
  error: string | null;
  consultations: any[];
}) {
  return (
    <GlassCard className="relative overflow-hidden">
      {/* halos décoratifs light/dark */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(55%_40%_at_20%_10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(60%_45%_at_80%_90%,rgba(236,72,153,0.14),transparent_60%)]" />
      <div className="relative flex flex-col items-center justify-center text-center gap-1">
        <div className="inline-flex items-center justify-center rounded-full px-3 py-1 text-[11px] font-semibold border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-700 dark:text-slate-200">
          Consultations
        </div>
        <h2 className="text-[14px] sm:text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Les 5 Portes de votre Étoile
        </h2>
        <p className="text-[12px] text-slate-600 dark:text-slate-300 max-w-md">
          Ouvrez une consultation pour lire l’analyse complète.
        </p>
        <div className="mt-3 w-full">
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.div
                key="loading-cons"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="text-center text-[12px] text-slate-500 dark:text-slate-400 py-3"
                role="status"
                aria-live="polite"
              >
                Chargement des consultations…
              </motion.div>
            ) : error ? (
              <motion.div
                key="error-cons"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="text-center text-[12px] text-rose-600 dark:text-rose-400 py-3"
              >
                {error}
              </motion.div>
            ) : (
              <motion.div
                key="list-cons"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <RubriqueConsultationsList consultations={consultations || []} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
});
ConsultationsPanel.displayName = "ConsultationsPanel";
export default ConsultationsPanel;
