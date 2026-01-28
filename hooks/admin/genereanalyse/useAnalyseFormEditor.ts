import { Consultation } from "@/lib/interfaces";
import { useState } from "react";

interface UseAnalyseFormEditorProps {
  analyseData: Consultation;
  onSave: (data: Consultation) => Promise<void>;
}
export function useAnalyseFormEditor({ analyseData, onSave }: UseAnalyseFormEditorProps) {
  const [formData, setFormData] = useState<Consultation>(analyseData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Consultation, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  };

  const handleMissionChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      missionDeVie: {
        ...prev.missionDeVie,
        [field]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.missionDeVie?.titre?.trim()) {
      newErrors.titre = "Le titre est requis";
    }
    if (!formData.missionDeVie?.contenu?.trim()) {
      newErrors.contenu = "Le contenu est requis";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
    } catch (err: any) {
      setErrors({ submit: err.message || "Erreur lors de la sauvegarde" });
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleMissionChange,
    handleSubmit,
  };
}
