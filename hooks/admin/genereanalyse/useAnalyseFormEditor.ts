import { api } from "@/lib/api/client";
import type { Analysis } from "@/lib/interfaces";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseAnalyseFormEditorProps {
  analyseData: Analysis;
}

type Errors = Record<string, string>;

function getIdFromConsultation(c: any): string | null {
  const v = c?.consultationId || c?.id || c?._id;
  return v ? String(v) : null;
}

function safeText(v: any) {
  return typeof v === "string" ? v : "";
}



export function useAnalyseFormEditor({ analyseData }: UseAnalyseFormEditorProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const consultationIdFromUrl = searchParams?.get("id");
  const fallbackId = useMemo(() => getIdFromConsultation(analyseData), [analyseData]);
  const consultationId = analyseData.consultationID;

  const [errors, setErrors] = useState<Errors>({});
  const [isSaving, setIsSaving] = useState(false);

  // On conserve formData pour l’affichage (client info etc.)
  const [formData, setFormData] = useState<Analysis>(analyseData);

  // Texte d’analyse isolé : update très léger à chaque frappe
  const [analysisText, setAnalysisText] = useState<string>(analyseData.texte || "");

  // “dirty” minimal
  const initialTextRef = useRef<string>(analysisText);
  const [isDirty, setIsDirty] = useState(false);

  // Lock de sauvegarde
  const saveLockRef = useRef(false);

  useEffect(() => {
    setFormData(analyseData);

    const nextText = analyseData ? safeText(analyseData.texte) : "";
    setAnalysisText(nextText);
    initialTextRef.current = nextText;
    setIsDirty(false);

    // pas d'abort à faire
    return undefined;
  }, [analyseData]);

  const handleBack = useCallback(() => {
    if (!consultationId) {
      router.push("/admin/consultations");
      return;
    }
    router.push(`/admin/consultations/${consultationId}`);
  }, [router, consultationId]);

  const validate = useCallback(() => {
    const txt = analysisText.trim();
    if (txt) return true;

    setErrors((prev) => {
      if (prev.analyse) return prev; // bail-out
      return { ...prev, analyse: "Le texte d'analyse est requis" };
    });
    return false;
  }, [analysisText]);

  const setAnalysisTextSafe = useCallback((value: string) => {
    setAnalysisText(value);

    // dirty check (bail-out)
    setIsDirty(value !== initialTextRef.current);

    // clear field error only if present
    setErrors((prev) => {
      if (!prev.analyse) return prev;
      const next = { ...prev };
      delete next.analyse;
      return next;
    });
  }, []);

  const saveAnalysis = useCallback(async () => {
    if (!consultationId) throw new Error("ID consultation manquant");
    if (saveLockRef.current) return;
    saveLockRef.current = true;



    setIsSaving(true);
    setErrors((prev) => {
      if (!prev.submit) return prev;
      const next = { ...prev };
      delete next.submit;
      return next;
    });

    try {
      // Payload minimal : à aligner avec ton backend
      // Ici on envoie le bloc "analyse" complet que tu peux persister en resultData
      const payload = {
        texte: analysisText,

      };
      // ✅ Route la plus logique selon ton controller
      await api.patch(`/consultations/${consultationId}/analyse-texte`, payload);

      // marquer proprement “clean” AVANT redirection
      initialTextRef.current = analysisText;
      setIsDirty(false);

      router.push(`/admin/consultations/${consultationId}`);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Erreur de sauvegarde";
      setErrors((prev) => ({ ...prev, submit: msg }));
      throw new Error(msg);
    } finally {
      setIsSaving(false);
      saveLockRef.current = false;
    }
  }, [consultationId, analysisText, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSaving) return;
      if (!validate()) return;
      await saveAnalysis();
    },
    [isSaving, validate, saveAnalysis]
  );

  const saveNow = useCallback(async () => {
    alert("Sauvegarde immédiate");
    if (isSaving) return;
    if (!validate()) return;
    await saveAnalysis();
  }, [isSaving, validate, saveAnalysis]);

  // Pour gérer d’autres champs d'analyse plus tard
  const handleChange = useCallback((field: keyof Analysis, value: any) => {
    setFormData((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });
    setErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }, []);

  return {
    formData,
    analysisText,
    setAnalysisText: setAnalysisTextSafe,
    errors,
    isSaving,
    isDirty,
    handleChange,
    handleSubmit,
    saveNow,
    handleBack,
  };
}
