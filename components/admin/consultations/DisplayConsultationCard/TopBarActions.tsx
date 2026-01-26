import { Button } from "@/components/commons/Button";
import { Copy, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cx } from "@/lib/functions";
import { useDisplayConsultationCard } from "@/hooks/admin/consultations/useDisplayConsultationCard";
import { shellVariants, toastVariants } from "./motionVariants";
import type { Consultation } from "@/lib/interfaces";
import { useReducedMotion } from "framer-motion";
import { useCallback } from "react";

interface TopBarActionsProps {
  derived: any;
  copied: boolean;
  handleCopy: () => void;
  handleRefresh: () => void;
  handleNotify: () => void;
  onBack?: () => void;
}

export function TopBarActions({ derived, copied, handleCopy, handleRefresh, handleNotify, onBack }: TopBarActionsProps) {
  return (
    <div className="sticky top-0 z-10 bg-white/70 dark:bg-zinc-950/35 backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl border-b border-slate-200/60 dark:border-zinc-800/60">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-2 px-3 py-3 sm:flex-row sm:gap-3">
        {onBack && (
          <Button size="sm" variant="ghost" className="w-full sm:w-auto" onClick={onBack} aria-label="Retour">
            ← Retour
          </Button>
        )}
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
            Modifier
          </Button>
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
        {derived.dateGenLabel && (
          <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
            Généré le {derived.dateGenLabel}
          </span>
        )}
      </div>
    </div>
  );
}
