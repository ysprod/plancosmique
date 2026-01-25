"use client";

import type { Consultation } from "@/lib/interfaces";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/commons/Button";
import ConsultationContent from "@/components/consultations/ConsultationContent";
import { Copy, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

/* -------------------------------- helpers -------------------------------- */

function getConsultationId(c: any) {
  return String(c?._id ?? c?.id ?? c?.consultationId ?? "");
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

function formatDateFR(v: any) {
  if (!v) return "";
  try {
    return new Date(v).toLocaleString("fr-FR");
  } catch {
    return "";
  }
}

function cx(...c: Array<string | false | undefined | null>) {
  return c.filter(Boolean).join(" ");
}

interface ConsultationCardProps {
  consultation: Consultation;
  onModifyAnalysis: (id: string) => void;
  onNotifyUser: (id: string) => void;
  notifiedback: boolean;
  onBack?: () => void;
}

/* -------------------------------- motion -------------------------------- */

const shellVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.18 } },
};

const toastVariants = {
  initial: { opacity: 0, y: 8, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.14 } },
  exit: { opacity: 0, y: 8, scale: 0.99, transition: { duration: 0.12 } },
};
 function DisplayConsultationCard({ consultation, onModifyAnalysis, onNotifyUser, notifiedback, onBack }: ConsultationCardProps) {
    const reduceMotion = useReducedMotion();
console.log('Consultation :',consultation);
    // Dérivés stables (pas d’IIFE dans le render)
    const derived = useMemo(() => {
      const c: any = consultation;
      const id = getConsultationId(c);
      const markdown = extractMarkdown(c);
      const dateGenRaw = c?.dateGeneration ?? c?.updatedAt ?? c?.createdAt ?? null;
      const dateGenLabel = formatDateFR(dateGenRaw);

      // Backend + UI
      const isNotifiedBackend = Boolean(c?.analysisNotified);
      const isNotified = Boolean(notifiedback || isNotifiedBackend);

      return { id, markdown, dateGenLabel, isNotified };
    }, [consultation, notifiedback]);

    // Copy UX (auto reset)
    const [copied, setCopied] = useState(false);
    const copyTimerRef = useRef<number | null>(null);

    useEffect(() => {
      return () => {
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      };
    }, []);

    const handleCopy = useCallback(async () => {
      if (!derived.markdown) return;
      try {
        await navigator.clipboard.writeText(derived.markdown);
        setCopied(true);
        if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
        copyTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
      } catch {
        // option: tu peux afficher une erreur toast si tu veux
      }
    }, [derived.markdown]);

    const handleRefresh = useCallback(() => {
      if (!derived.id) return;
      onModifyAnalysis(derived.id);
    }, [derived.id, onModifyAnalysis]);

    const handleNotify = useCallback(() => {
      if (!derived.id || derived.isNotified) return;
      onNotifyUser(derived.id);
    }, [derived.id, derived.isNotified, onNotifyUser]);

    const handleBack = useCallback(() => {
      onBack?.();
    }, [onBack]);

    if (!consultation) return null;

    return (
      <motion.main
        variants={shellVariants}
        initial="initial"
        animate="animate"
        className={cx(
          "mx-auto w-full",
          "flex flex-col items-center justify-center text-center",
          "px-3 py-4 sm:px-4 sm:py-6"
        )}
      >
        <div className="mx-auto w-full max-w-3xl">
          {/* Shell premium centré */}
          <div
            className={cx(
              "relative overflow-hidden rounded-[28px] border",
              "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
              "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
            )}
          >
            <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />

            {/* Top bar centrée */}
            <div
              className={cx(
                "sticky top-0 z-10",
                "bg-white/70 dark:bg-zinc-950/35",
                "backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl",
                "border-b border-slate-200/60 dark:border-zinc-800/60"
              )}
            >
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-2 px-3 py-3 sm:flex-row sm:gap-3">
                {/* Back */}
                {onBack && (
                  <Button size="sm" variant="ghost" className="w-full sm:w-auto" onClick={handleBack} aria-label="Retour">
                    ← Retour
                  </Button>
                )}

                {/* Actions compactes */}
                <div className="flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={handleCopy}
                    disabled={!derived.markdown}
                    title="Copier l'analyse (Markdown)"
                    aria-label="Copier l'analyse"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? "Copié" : "Copier"}
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full sm:w-auto"
                    onClick={handleRefresh}
                    disabled={!derived.id}
                    title="Rafraîchir / Re-générer"
                    aria-label="Rafraîchir"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rafraîchir
                  </Button>

                  {/* Notif */}
                  <div className="flex w-full items-center justify-center gap-2 sm:w-auto">
                    <span
                      className={cx(
                        "inline-flex items-center justify-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold",
                        derived.isNotified
                          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-200"
                          : "bg-amber-50 text-amber-900 dark:bg-amber-900/25 dark:text-amber-200"
                      )}
                    >
                      {derived.isNotified ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Notifié
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4" />
                          Non notifié
                        </>
                      )}
                    </span>

                    {!derived.isNotified && (
                      <Button
                        size="sm"
                        variant="default"
                        className="w-full sm:w-auto"
                        onClick={handleNotify}
                        disabled={!derived.id}
                        aria-label="Notifier l'utilisateur"
                      >
                        Notifier
                      </Button>
                    )}
                  </div>
                </div>

                {/* Date generation */}
                {derived.dateGenLabel && (
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    Généré le {derived.dateGenLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Micro-toast “copié” centré */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  variants={toastVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={cx(
                    "pointer-events-none absolute left-1/2 top-16 z-20 -translate-x-1/2",
                    "rounded-full border px-3 py-1 text-[11px] font-extrabold shadow-sm",
                    "border-slate-200 bg-white/90 text-slate-800",
                    "dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100"
                  )}
                >
                  Analyse copiée
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content centré */}
            <div className="p-3 sm:p-5">
              <div className="mx-auto w-full max-w-3xl">
                <ConsultationContent 
                  consultation={consultation} 
                  onBack={onBack || (() => {})} 
                  onDownloadPDF={() => {}} 
                />
              </div>

              {/* Fine line animée (optionnelle) */}
              {!reduceMotion && (
                <motion.div
                  className="mx-auto mt-5 h-[2px] w-28 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/80"
                  animate={{ opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          </div>
        </div>
      </motion.main>
    );
  };

DisplayConsultationCard.displayName = "DisplayConsultationCard";
export default DisplayConsultationCard;
