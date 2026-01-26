"use client";
import { useAnalyseFormEditor } from "@/hooks/admin/genereanalyse/useAnalyseFormEditor";
import { Consultation } from "@/lib/interfaces";
import { motion } from "framer-motion";
import FormActions from "./FormActions";
import FormErrorAlert from "./FormErrorAlert";
import FormHeader from "./FormHeader";
import FormTextArea from "./FormTextArea";

interface AnalyseFormEditorProps {
  analyseData: Consultation;
  onSave: (data: Consultation) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function AnalyseFormEditor({ analyseData, onSave, onCancel, isSaving = false, }: AnalyseFormEditorProps) {
  const { formData, errors, handleChange, handleSubmit, } = useAnalyseFormEditor({ analyseData, onSave });

  const client: any = formData.formData || {};
  const analyseTexte = formData.analyse?.analyse?.texte || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <FormHeader />

      {errors.submit && <FormErrorAlert message={errors.submit} />}

      <form className="space-y-5">
        <FormTextArea
          label="Texte d'analyse (Markdown)"
          value={analyseTexte}
          onChange={(value) => handleChange("analyse", { ...formData.analyse, analyse: { ...formData.analyse?.analyse, texte: value } })}
          error={errors.analyse}
          placeholder="Texte d'analyse généré..."
          rows={12}
          required
        />

        <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700">
          <div className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Informations du client</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Nom :</span> {client.nom || client.lastName || "-"}</div>
            <div><span className="font-medium">Prénom :</span> {client.prenoms || client.firstName || "-"}</div>
            <div><span className="font-medium">Date de naissance :</span> {client.dateNaissance || client.dateOfBirth || "-"}</div>
            <div><span className="font-medium">Ville :</span> {client.villeNaissance || client.cityOfBirth || "-"}</div>
            <div><span className="font-medium">Téléphone :</span> {client.phone || "-"}</div>
          </div>
        </div>
        <FormActions onCancel={onCancel} isSaving={isSaving} onSave={() => onSave(formData)} />
      </form>
    </motion.div>
  );
}