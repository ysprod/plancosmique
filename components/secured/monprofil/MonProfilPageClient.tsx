"use client";

import React, { memo, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import SkyChart from "@/components/carteduciel/SkyChart";
import CinqPortesSection from "@/components/profil/CinqPortesSection";
import UserProgressSection from "@/components/profil/UserProgressSection";

import { useMonProfil } from "@/hooks/carteduciel/useMonProfil";
import { useConsultationsByRubrique } from "@/hooks/consultations/useConsultationsByRubrique";
import RubriqueConsultationsList from "./RubriqueConsultationsList";

const RUBRIQUE_ID = "694acf59bd12675f59e7a7f2" as const;

/** Variants hors render = stabilité, zéro churn */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (reduceMotion: boolean) => ({
    opacity: 1,
    transition: reduceMotion ? { duration: 0 } : { staggerChildren: 0.06, delayChildren: 0.06 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.99 },
  visible: (reduceMotion: boolean) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: reduceMotion
      ? { duration: 0 }
      : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
  }),
  exit: { opacity: 0, y: 10, transition: { duration: 0.12 } },
};

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

/** Card glass premium réutilisable */
const GlassCard = memo(function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx(
        "w-full rounded-3xl",
        "border border-black/10 dark:border-white/10",
        "bg-white/70 dark:bg-slate-950/55",
        "backdrop-blur-xl",
        "shadow-[0_18px_56px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_56px_rgba(0,0,0,0.30)]",
        "px-3 py-3 sm:px-4 sm:py-4",
        className
      )}
    >
      {children}
    </section>
  );
});
GlassCard.displayName = "GlassCard";

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

function MonProfilPageClientImpl() {
  const reduceMotion = useReducedMotion();

  const { user, processedData, isLoading } = useMonProfil();

  const {
    consultations,
    loading: loadingConsultations,
    error: errorConsultations,
  } = useConsultationsByRubrique(RUBRIQUE_ID);

  /** Dérivations regroupées = moins de calculs + dépendances propres */
  const vm = useMemo(() => {
    const userName = user?.prenoms?.trim() || "Voyageur";
    const isPremium = !!user?.premium;

    const cd: any = processedData?.carteDuCiel;
    const carteDuCielData = cd && typeof cd === "object" && "carteDuCiel" in cd ? cd.carteDuCiel : null;

    return { userName, isPremium, carteDuCielData };
  }, [user?.prenoms, user?.premium, processedData?.carteDuCiel]);

  if (isLoading) return <LoadingState />;
  if (!user || !processedData) return <ErrorState />;

  return (
    <main className="w-full min-h-[100dvh] grid place-items-center px-2 py-4">
      {/* Fond premium global */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/60" />
      <div className="fixed inset-0 -z-10 [background:radial-gradient(60%_45%_at_50%_10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(55%_40%_at_20%_85%,rgba(236,72,153,0.12),transparent_60%)]" />

      <motion.div
        className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center gap-3 sm:gap-4"
        custom={!!reduceMotion}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div custom={!!reduceMotion} variants={itemVariants} className="w-full">
          <GlassCard>
            <ProfileHeader userData={processedData} />
          </GlassCard>
        </motion.div>

        <motion.div custom={!!reduceMotion} variants={itemVariants} className="w-full">
          <GlassCard>
            <UserProgressSection userName={vm.userName} showWelcomeMessage={false} />
          </GlassCard>
        </motion.div>

        <motion.div custom={!!reduceMotion} variants={itemVariants} className="w-full">
          <GlassCard>
            <CinqPortesSection carteDuCiel={vm.carteDuCielData} isPremium={vm.isPremium} />
          </GlassCard>
        </motion.div>

        <motion.div custom={!!reduceMotion} variants={itemVariants} className="w-full">
          <GlassCard className="p-0 overflow-hidden">
            <div className="p-3 sm:p-4">
              <SkyChart carteDuCiel={processedData.carteDuCiel} />
            </div>
          </GlassCard>
        </motion.div>

        <motion.div custom={!!reduceMotion} variants={itemVariants} className="w-full">
          <ConsultationsPanel
            loading={!!loadingConsultations}
            error={errorConsultations || null}
            consultations={consultations || []}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}

const MonProfilPageClient = memo(MonProfilPageClientImpl);

export default MonProfilPageClient;
