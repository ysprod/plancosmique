"use client";
import { useAnalyseFormEditor } from "@/hooks/admin/genereanalyse/useAnalyseFormEditor";
import { AnalyseAstrologique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import FormActions from "./FormActions";
import FormErrorAlert from "./FormErrorAlert";
import FormHeader from "./FormHeader";
import FormTextArea from "./FormTextArea";
import FormTextField from "./FormTextField";

interface AnalyseFormEditorProps {
  analyseData: AnalyseAstrologique;
  onSave: (data: AnalyseAstrologique) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export default function AnalyseFormEditor({
  analyseData,
  onSave,
  onCancel,
  isSaving = false,
}: AnalyseFormEditorProps) {
  const {
    formData,
    errors,
    handleMissionChange,
    handleSubmit,
  } = useAnalyseFormEditor({ analyseData, onSave });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"
    >
      <FormHeader />

      {errors.submit && <FormErrorAlert message={errors.submit} />}

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormTextField
          label="Titre de la mission"
          value={formData.missionDeVie?.titre || ""}
          onChange={(value) => handleMissionChange("titre", value)}
          error={errors.titre}
          placeholder="Ex: Votre mission de vie"
          required
        />

        <FormTextArea
          label="Contenu de la mission"
          value={formData.missionDeVie?.contenu || ""}
          onChange={(value) => handleMissionChange("contenu", value)}
          error={errors.contenu}
          placeholder="Description détaillée de la mission de vie..."
          rows={10}
          required
        />

        <FormActions onCancel={onCancel} isSaving={isSaving} />
      </form>
    </motion.div>
  );
}