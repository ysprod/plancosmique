"use client";
import { cx } from "@/lib/functions";
import { Check, ChevronDown, Loader2, Sparkles } from "lucide-react";
import React, { memo } from "react";

export type ChoiceOption = {
  id: string;
  label: string;
  promptId?: string | null;
};

interface ChoiceSelectCardProps {
  value: string;
  onChange: (v: string) => void;
  options: ChoiceOption[];
  loading: boolean;
  error: string | null;
}

const ChoiceSelectCard = memo(function ChoiceSelectCard({
  value,
  onChange,
  options,
  loading,
  error,
}: ChoiceSelectCardProps) {
  return (
    <section
      className={cx(
        "w-full",
        "rounded-3xl border",
        "border-slate-200/70 dark:border-white/10",
        "bg-white/75 dark:bg-slate-950/55",
        "backdrop-blur-xl",
        "shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        "px-4 py-4 sm:px-5"
      )}
      aria-busy={loading}
    >
      <div className="flex items-start justify-center gap-3 text-center">
        <div className="mt-0.5 h-10 w-10 rounded-2xl grid place-items-center bg-black/5 dark:bg-white/10">
          <Sparkles className="h-5 w-5 text-slate-900/80 dark:text-white" />
        </div>
        <div className="min-w-0">
          <h2 className="text-[14px] sm:text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-white">
            Choix de consultation
          </h2>
          <p className="mt-0.5 text-[12px] leading-snug text-slate-600 dark:text-slate-300/85">
            Sélection automatique basée sur <span className="font-semibold">promptId</span> puis fallback sur l’ID.
          </p>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="inline-flex items-center justify-center gap-2 text-[12px] text-slate-600 dark:text-slate-300 w-full">
            <Loader2 className="h-4 w-4 animate-spin" />
            Chargement des choix…
          </div>
        ) : error ? (
          <div className="w-full rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-[12px] text-rose-700 dark:text-rose-300 text-center">
            {error}
          </div>
        ) : (
          <div className="relative">
            <select
              className={cx(
                "w-full appearance-none",
                "rounded-2xl border",
                "border-black/10 dark:border-white/10",
                "bg-white/80 dark:bg-white/[0.06]",
                "text-slate-900 dark:text-slate-100",
                "px-3 py-3 pr-10",
                "text-[13px] font-semibold",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
              )}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              <option value="">Sélectionner un choix…</option>
              {options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center gap-2">
              {value ? (
                <span className="h-6 w-6 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 grid place-items-center">
                  <Check className="h-4 w-4" />
                </span>
              ) : null}
              <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-300" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

ChoiceSelectCard.displayName = "ChoiceSelectCard";
export default ChoiceSelectCard;
