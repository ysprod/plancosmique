"use client";
import { useAnalyseFormEditor } from "@/hooks/admin/genereanalyse/useAnalyseFormEditor";
import type { Analysis } from "@/lib/interfaces";
import { AlertTriangle, Save } from "lucide-react";
import { memo } from "react";
import FormActions from "./FormActions";
import FormErrorAlert from "./FormErrorAlert";
import FormHeader from "./FormHeader";
import FormTextArea from "./FormTextArea";

interface AnalyseFormEditorProps {
  analyseData: Analysis;
}

const AnalyseFormEditor = memo(function AnalyseFormEditor({ analyseData }: AnalyseFormEditorProps) {
  const { stats, errors, isSaving, isDirty, analysisText, onChangeText, handleBack, saveNow, } = useAnalyseFormEditor({ analyseData });

  return (
    <section
      className={[
        "w-full max-w-4xl mx-auto rounded-3xl",
        "border border-black/10 dark:border-white/10",
        "bg-white dark:bg-slate-950",
        "shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        "p-4 sm:p-6",
        "flex flex-col items-center justify-center text-center",
      ].join(" ")}
    >
      <div className="w-full flex flex-col items-center justify-center text-center gap-3">
        <FormHeader />

        {errors.submit ? <FormErrorAlert message={errors.submit} /> : null}

        <div className="w-full flex flex-wrap items-center justify-center gap-2">
          {isDirty ? (
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold border border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4" />
              Modifications non sauvegardées
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-200">
              <Save className="h-4 w-4" />
              Prêt à enregistrer
            </div>
          )}

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {stats.len} caractères • {stats.lines} lignes
          </div>
        </div>
      </div>

      <form className="w-full mt-4 flex flex-col items-center justify-center gap-4">
        <div className="w-full">
          <FormTextArea
            label="Analyse"
            value={analysisText}
            onChange={onChangeText}
            error={errors.analyse}
            placeholder="Texte d'analyse généré..."
            rows={20}
            required
          />
        </div>

        <FormActions onCancel={handleBack} isSaving={isSaving} onSave={saveNow} />
      </form>
    </section>
  );
});

AnalyseFormEditor.displayName = "AnalyseFormEditor";

export default AnalyseFormEditor;