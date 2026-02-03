"use client";

import React, { memo, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import ConsultationHeader from "@/components/consultations/content/ConsultationHeader";
import MarkdownCard from "@/components/consultations/content/MarkdownCard";
import ErrorState from "@/components/consultations/ErrorState";
import LoadingSkeleton from "@/components/consultations/LoadingSkeleton";
import Toast from "@/components/consultations/Toast";
import ShellCard from "@/components/commons/ShellCard";

import { useAdminConsultationAnalysis } from "@/hooks/consultations/useAdminConsultationAnalysis";
import { cx } from "@/lib/functions";

import { CopyToast } from "./DisplayConsultationCard/CopyToast";
import { TopBarActions } from "./DisplayConsultationCard/TopBarActions";

// ---------------------------------------------------------------------
// Animations (hors render => refs stables => moins de rerenders)
// ---------------------------------------------------------------------
const pageVariants = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const softIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

function safeTrim(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function wordCount(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).filter(Boolean).length;
}

// ---------------------------------------------------------------------
// UI atoms memo (anti-rerenders)
// ---------------------------------------------------------------------
const CenterShell = memo(function CenterShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-[100dvh] grid place-items-center px-3 py-6 sm:px-4 sm:py-8">
      {/* fond premium, statique (pas de layer animé) */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
      {children}
    </main>
  );
});

const SectionTitle = memo(function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="text-center">
      <h2 className="text-[13px] sm:text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-1 text-[12px] leading-snug text-slate-600 dark:text-slate-300/85">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
});

const Collapsible = memo(function Collapsible({
  label,
  hint,
  defaultOpen = false,
  children,
}: {
  label: string;
  hint?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  // pas de state ici => ultra stable; on s’appuie sur <details>
  return (
    <details
      className={cx(
        "group w-full",
        "rounded-2xl border",
        "border-slate-200/70 dark:border-white/10",
        "bg-white/60 dark:bg-white/[0.04]",
        "backdrop-blur-xl"
      )}
      open={defaultOpen}
    >
      <summary
        className={cx(
          "list-none cursor-pointer select-none",
          "px-4 py-3",
          "flex items-center justify-between gap-3",
          "text-left"
        )}
      >
        <div className="min-w-0">
          <div className="text-[12px] sm:text-[13px] font-semibold text-slate-900 dark:text-white">
            {label}
          </div>
          {hint ? (
            <div className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-300/80">
              {hint}
            </div>
          ) : null}
        </div>

        <span
          className={cx(
            "shrink-0",
            "h-8 w-8 rounded-xl grid place-items-center",
            "bg-black/5 dark:bg-white/10",
            "text-slate-800 dark:text-slate-200",
            "transition-transform duration-300",
            "group-open:rotate-180"
          )}
          aria-hidden="true"
        >
          ▾
        </span>
      </summary>

      <div className="px-3 pb-3">
        {children}
      </div>
    </details>
  );
});

// ---------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------
export default function AdminConsultationAnalysisView() {
  const reduceMotion = useReducedMotion();

  const {
    consultation,
    loading,
    error,
    toast,
    derived,
    copied,
    markdown,
    setToast,
    handleBack,
    handleCopy,
    handleRefresh,
    handleNotify,
  } = useAdminConsultationAnalysis();

  // ✅ Derivations mémorisées (zéro recalcul inutile)
  const mdTexte = useMemo(() => safeTrim(markdown?.texte), [markdown?.texte]);
  const mdPrompt = useMemo(() => safeTrim(markdown?.prompt), [markdown?.prompt]);
  const mdTitle = useMemo(() => safeTrim(markdown?.title), [markdown?.title]);

  const metrics = useMemo(() => {
    const wc = wordCount(mdTexte);
    const pc = wordCount(mdPrompt);
    return { wc, pc };
  }, [mdTexte, mdPrompt]);

  if (loading) return <LoadingSkeleton />;

  if (error || !consultation) {
    return (
      <CenterShell>
        <div className="w-full max-w-md">
          <ErrorState error={error || "Aucune donnée disponible"} onRetry={handleBack} />
        </div>
      </CenterShell>
    );
  }

  return (
    <>
      <CenterShell>
        <motion.section
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
          variants={pageVariants}
          className={cx(
            "w-full max-w-3xl",
            "relative overflow-hidden rounded-[28px] border",
            "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
            "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
          )}
        >
          {/* Accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />

          {/* Top actions (déjà existant) */}
          <TopBarActions
            derived={derived}
            copied={copied}
            handleCopy={handleCopy}
            handleRefresh={handleRefresh}
            handleNotify={handleNotify}
            onBack={handleBack}
          />

          <CopyToast copied={copied} />

          {/* Body */}
          <ShellCard>
            <motion.div
              variants={softIn}
              className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center"
            >
              <ConsultationHeader titre={consultation.titre} title={mdTitle || consultation.title} />
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-200/90">
                  Analyse : <span className="font-semibold">{metrics.wc}</span> mots
                </span>
                {mdPrompt ? (
                  <span className="rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-200/90">
                    Prompt : <span className="font-semibold">{metrics.pc}</span> mots
                  </span>
                ) : null}
              </div>
            </motion.div>

            {/* Analyse */}
            <motion.div variants={softIn} className="mt-4">
              {mdTexte ? (
                <MarkdownCard markdown={mdTexte} />
              ) : (
                <div
                  className={cx(
                    "mx-auto w-full max-w-2xl",
                    "rounded-2xl border border-amber-500/25 bg-amber-500/10",
                    "px-4 py-3 text-left"
                  )}
                >
                  <SectionTitle
                    title="Analyse indisponible"
                    subtitle="Le backend n’a pas renvoyé de texte d’analyse."
                  />
                </div>
              )}
            </motion.div>

            {/* Prompt utilisé (repliable = compact + pro) */}
            <motion.div variants={softIn} className="mt-4">
              <Collapsible
                label="Prompt utilisé"
                hint={mdPrompt ? "Afficher / masquer le prompt envoyé au modèle" : "Aucun prompt disponible"}
                defaultOpen={true}
              >
                {mdPrompt ? (
                  <MarkdownCard markdown={mdPrompt} />
                ) : (
                  <div className="px-3 py-3 text-center text-[12px] text-slate-600 dark:text-slate-300/80">
                    Aucun prompt disponible.
                  </div>
                )}
              </Collapsible>
            </motion.div>
          </ShellCard>
        </motion.section>
      </CenterShell>

      {/* Toast (AnimatePresence conservé) */}
      <AnimatePresence>
        {toast ? (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
