"use client";
import { useAnalyseFormEditor } from "@/hooks/admin/genereanalyse/useAnalyseFormEditor";
import type { Consultation } from "@/lib/interfaces";
import { AlertTriangle, Save } from "lucide-react";
import { memo, useCallback, useMemo } from "react";
import FormActions from "./FormActions";
import FormErrorAlert from "./FormErrorAlert";
import FormHeader from "./FormHeader";
import FormTextArea from "./FormTextArea";

interface AnalyseFormEditorProps {
  analyseData: Consultation;
}

function getClientInfo(fd: any) {
  const f = fd || {};
  return {
    nom: f.nom || f.lastName || "-",
    prenoms: f.prenoms || f.firstName || "-",
    dateNaissance: f.dateNaissance || f.dateOfBirth || "-",
    ville: f.villeNaissance || f.cityOfBirth || "-",
    phone: f.phone || "-",
  };
}

const AnalyseFormEditor = memo(function AnalyseFormEditor({ analyseData }: AnalyseFormEditorProps) {
  const { formData, errors, isSaving, isDirty, analysisText, handleBack, handleSubmit, setAnalysisText, saveNow } =
    useAnalyseFormEditor({ analyseData });

  const client = useMemo(() => getClientInfo((formData as any)?.formData), [(formData as any)?.formData]);

  const onChangeText = useCallback((value: string) => setAnalysisText(value), [setAnalysisText]);

  const stats = useMemo(() => {
    const len = analysisText.length;
    const lines = analysisText.split("\n").length;
    return { len, lines };
  }, [analysisText]);

  return (
    <section
      className={[
        "w-full max-w-3xl mx-auto rounded-3xl",
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

        <div className="w-full flex items-center justify-center gap-2">
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

      <form onSubmit={handleSubmit} className="w-full mt-4 flex flex-col items-center justify-center gap-4">
        <div className="w-full">
          <FormTextArea
            label="Texte d'analyse (Markdown)"
            value={analysisText}
            onChange={onChangeText}
            error={errors.analyse}
            placeholder="Texte d'analyse généré..."
            rows={20}
            required
          />
        </div>

        <div className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-left">
          <div className="text-[12px] font-extrabold text-slate-900 dark:text-slate-100 text-center">
            Informations du client
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-slate-700 dark:text-slate-200">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">Nom</span>
              <span className="text-right">{client.nom}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">Prénoms</span>
              <span className="text-right">{client.prenoms}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">Naissance</span>
              <span className="text-right">{client.dateNaissance}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">Ville</span>
              <span className="text-right">{client.ville}</span>
            </div>
            <div className="flex items-center justify-between gap-2 sm:col-span-2">
              <span className="font-semibold">Téléphone</span>
              <span className="text-right">{client.phone}</span>
            </div>
          </div>
        </div>

        <FormActions onCancel={handleBack} isSaving={isSaving} onSave={saveNow} />
      </form>
    </section>
  );
});

AnalyseFormEditor.displayName = "AnalyseFormEditor";

export default AnalyseFormEditor;