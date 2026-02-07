"use client";
import type { ConsultationChoiceWithRubrique } from "@/hooks/admin/useConsultationChoiceFromRubriques";
import { usePromptForm } from "@/hooks/admin/usePromptForm";
import { cx } from "@/lib/functions";
import { AlertTriangle, Save } from "lucide-react";
import React, { useCallback, useMemo, useRef } from "react";
import PromptFormBasicInfo from "./PromptFormBasicInfo";
import PromptFormHeader from "./PromptFormHeader";
import PromptFormStatPill from "./PromptFormStatPill";

interface PromptFormProps {
  initialData?: ConsultationChoiceWithRubrique;
  choiceId: string;
  returnTo?: string;
}

function safeStr(v: unknown) {
  return typeof v === "string" ? v : "";
}

function countLines(s: string) {
  if (!s) return 0;
  return s.split("\n").length;
}



export default function PromptForm({ initialData, choiceId, returnTo }: PromptFormProps) {
  const {
    formData, loading, error, updateField, handleSubmit,
  } = usePromptForm({ initialData: initialData as any, choiceId, returnTo });

  // Gère le cas où prompt peut être un objet ou une string
  function extractPrompt(val: any): string {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object" && typeof val.title === "string") return val.title;
    return "";
  }
  const initialPromptRef = useRef<string>(extractPrompt((formData as any)?.prompt));
  const promptValue = extractPrompt((formData as any)?.prompt);

  const stats = useMemo(() => {
    const len = promptValue.length;
    const lines = countLines(promptValue);
    return { len, lines };
  }, [promptValue]);

  const isDirty = useMemo(() => promptValue !== initialPromptRef.current, [promptValue]);

  const onChangePrompt = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateField("prompt" as any, e.target.value);
    },
    [updateField]
  );

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateField("title" as any, e.target.value);
    },
    [updateField]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await handleSubmit();
      initialPromptRef.current = safeStr((formData as any)?.prompt);
    },
    [handleSubmit, formData]
  );

  return (
    <div className="w-full grid place-items-center px-3 py-6 sm:px-4 sm:py-8">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

      <form onSubmit={onSubmit} className="w-full max-w-6xl">
        <div className="mt-4 space-y-4 max-w-6xl mx-auto">
          <PromptFormHeader
            title={initialData?.title || "Consultation"}
            isSaving={loading}
            onSave={undefined}
          />

          {/* Error */}
          {error ? (
            <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-left">
              <div className="text-[12px] font-semibold text-rose-700 dark:text-rose-300">
                {error}
              </div>
            </div>
          ) : null}

          {/* Card principale */}
          <section
            className={cx(
              "rounded-3xl border",
              "border-slate-200/70 dark:border-white/10",
              "bg-white/80 dark:bg-slate-950/60",
              "backdrop-blur-xl",
              "shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.40)]",
              "p-4 sm:p-6"
            )}
          >

            {/* Infos consultation */}
            {initialData && (
              <PromptFormBasicInfo consultation={initialData as any} />
            )}

            <div className="mt-4 grid gap-3 text-left">
              {initialData?.description ? (
                <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] px-4 py-3">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-300/80">
                    Description
                  </div>
                  <div className="mt-1 text-[13px] text-slate-800 dark:text-slate-200 whitespace-pre-line">
                    {initialData.description}
                  </div>
                </div>
              ) : null}


              <div className="flex flex-wrap items-center justify-center gap-2">
                {isDirty ? (
                  <PromptFormStatPill kind="warn">
                    <AlertTriangle className="h-4 w-4" />
                    Modifications non sauvegardées
                  </PromptFormStatPill>
                ) : (
                  <PromptFormStatPill kind="ok">
                    <Save className="h-4 w-4" />
                    Prêt à enregistrer
                  </PromptFormStatPill>
                )}
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {stats.len} caractères • {stats.lines} lignes
                </div>
              </div>
            
              <div>
                <div className="flex items-end justify-between gap-2 mb-2">
                  <label className="block text-[12px] font-semibold text-slate-700 dark:text-slate-200">
                    Prompt   <span className="text-rose-600">*</span>
                  </label>
                 
                </div>

                <textarea
                  value={promptValue}
                  onChange={onChangePrompt}
                  required
                  rows={14}
                  spellCheck={false}
                  className={cx(
                    "w-full rounded-2xl border",
                    "border-black/10 dark:border-white/10",
                    "bg-white/80 dark:bg-white/[0.06]",
                    "px-3 py-3",
                    "text-[12px] sm:text-[13px]",
                    "text-slate-900 dark:text-slate-100",
                    "font-mono leading-relaxed",
                    "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60",
                    "min-h-[220px]"
                  )}
                  placeholder={[
                    "Ex:",
                    "Tu es un expert astrologue. Rédige une analyse structurée…",
                    "",
                    "Contraintes :",
                    "- Ton chaleureux, clair",
                    "- Chapitres ##, listes, synthèse",
                    "- Ne pas inventer les données",
                  ].join("\n")}
                />
              </div>

              {/* Actions */}
              <div className="pt-1 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className={cx(
                    "inline-flex items-center justify-center gap-2",
                    "h-12 w-full sm:w-auto",
                    "px-5 rounded-2xl",
                    "bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600",
                    "text-white font-semibold",
                    "shadow-lg shadow-fuchsia-500/15",
                    "hover:opacity-[0.98] transition",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Enregistrement…
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>
            </div>
          </section> 
        </div>
      </form>
    </div>
  );
}
