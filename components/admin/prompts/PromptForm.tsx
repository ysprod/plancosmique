"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePromptForm } from "@/hooks/admin/usePromptForm";
import { PromptHeader } from './PromptHeader';
import { PromptBasicInfo } from './PromptBasicInfo';
import { PromptStructure } from './PromptStructure';
import { PromptTags } from './PromptTags';
import { PromptVariables } from './PromptVariables';
import type { Prompt } from "@/lib/types/prompt.types";
import { api } from "@/lib/api/client";
import { cx } from "@/lib/functions";
import { Check, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { ChoicePicker } from "./ChoicePicker";

interface PromptFormProps {
  initialData?: Prompt;
  choiceId: string;      // <-- ton choiceId “courant”
  returnTo?: string;
}

type RawChoice = Record<string, any>;

type ChoiceOption = {
  id: string;
  label: string;
  promptId?: string | null;
};

function getChoiceId(choice: RawChoice): string {
  return String(choice?.id ?? choice?.choiceId ?? choice?._id ?? "").trim();
}

function getChoicePromptId(choice: RawChoice): string | null {
  const v = choice?.promptId ?? choice?.prompt?._id ?? choice?.prompt?._id ?? null;
  if (!v) return null;
  return String(v).trim();
}

function getChoiceLabel(choice: RawChoice): string {
  return (
    String(choice?.title ?? choice?.name ?? choice?.titre ?? choice?.label ?? "").trim() ||
    getChoiceId(choice) ||
    "Choix"
  );
}

/**
 * Sous-composant memoisé => ne rerender pas quand formData change.
 */
const ChoiceSelectCard = memo(function ChoiceSelectCard({
  value,
  onChange,
  options,
  loading,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  options: ChoiceOption[];
  loading: boolean;
  error: string | null;
}) {
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

export default function PromptForm({ initialData, choiceId, returnTo }: PromptFormProps) {

  const {
    formData,
    loading,
    error,
    updateField,
    addSection,
    updateSection,
    removeSection,
    addVariable,
    removeVariable,
    handleSubmit,
  } = usePromptForm({ initialData, choiceId, returnTo });

  const [rawChoices, setRawChoices] = useState<RawChoice[]>([]);
  const [choicesLoading, setChoicesLoading] = useState(false);
  const [choicesError, setChoicesError] = useState<string | null>(null);

  // Valeur affichée dans le select
  const [selectedChoiceId, setSelectedChoiceId] = useState<string>(() => choiceId || "");

  // Empêche un auto-set multiple quand les données arrivent
  const didAutoSelectRef = useRef(false);

  // Normalise une seule fois (anti rerenders)
  const options: ChoiceOption[] = useMemo(() => {
    return (Array.isArray(rawChoices) ? rawChoices : [])
      .map((c) => {
        const id = getChoiceId(c);
        if (!id) return null;
        return { id, label: getChoiceLabel(c), promptId: getChoicePromptId(c) };
      })
      .filter(Boolean) as ChoiceOption[];
  }, [rawChoices]);

  const fetchChoices = useCallback(async () => {
    setChoicesLoading(true);
    setChoicesError(null);
    try {
      const response = await api.get("/consultation-choices/with-prompts");
      const data = Array.isArray(response?.data) ? response.data : [];
      setRawChoices(data);
    } catch (err: any) {
      setChoicesError(err?.response?.data?.message || "Erreur lors du chargement");
    } finally {
      setChoicesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChoices();
  }, [fetchChoices]);

  /**
   * ✅ Auto-selection WAOUH:
   * priorité = choice.promptId === choiceId
   * fallback = choiceId (si présent)
   * fallback2 = premier choix
   *
   * On ne fait le set qu'une seule fois (didAutoSelectRef).
   */
  useEffect(() => {
    if (didAutoSelectRef.current) return;
    if (!options.length) return;

    const preferred = options.find((o) => (o.promptId || "") === String(choiceId));
    const next =
      preferred?.id ||
      (options.some((o) => o.id === String(choiceId)) ? String(choiceId) : "") ||
      options[0]?.id ||
      "";

    if (next && next !== selectedChoiceId) {
      setSelectedChoiceId(next);
    }

    didAutoSelectRef.current = true;
  }, [options, choiceId, selectedChoiceId]);

  // Stable setter
  const handleSelectChoice = useCallback((v: string) => {
    setSelectedChoiceId(v);
    // Si tu veux aussi synchroniser dans le hook (optionnel):
    // updateField("choiceId", v)  // seulement si ton formData contient ce champ
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await handleSubmit(); // erreurs déjà gérées par le hook
    },
    [handleSubmit]
  );

  return (
    <main className="w-full min-h-[100dvh] grid place-items-center px-3 py-6 sm:px-4 sm:py-8">
      {/* fond premium */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

      <form onSubmit={onSubmit} className="w-full max-w-3xl">
        <div className="mx-auto mb-3 h-[3px] w-24 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-80" />



        {/* Shell existant (inchangé) */}
        <div className="mt-4">
          <div className="space-y-6 max-w-2xl mx-auto px-2 sm:px-0">
            <PromptHeader isEdit={!!initialData} loading={loading} onBack={() => window.history.back()} />
            <ChoicePicker
              value={selectedChoiceId}
              onChange={handleSelectChoice}
              options={options}
              loading={choicesLoading}
              error={choicesError}
            />

            {error && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-lg">
                {error}
              </div>
            )}
            <PromptBasicInfo formData={formData} updateField={updateField} />
            <PromptStructure
              structure={formData.structure}
              updateField={updateField}
              addSection={addSection}
              updateSection={updateSection}
              removeSection={removeSection}
            />
            <PromptTags tags={formData.tags!} updateField={updateField} />
            <PromptVariables variables={formData.variables!} addVariable={addVariable} removeVariable={removeVariable} />
            {/* Duplicate save button at the bottom */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 dark:bg-pink-700 text-white rounded-lg hover:bg-pink-600 dark:hover:bg-pink-800 disabled:opacity-50 transition-colors shadow"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
