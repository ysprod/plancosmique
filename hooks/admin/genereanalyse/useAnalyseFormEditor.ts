import { api } from "@/lib/api/client";
import { safeText } from "@/lib/functions";
import type { Analysis } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseAnalyseFormEditorProps {
  analyseData: Analysis;
}

type Errors = {
  analyse?: string;
  submit?: string;
};

function toStrId(v: unknown): string | null {
  if (!v) return null;
  if (typeof v === "string") return v.trim() || null;
  if (typeof v === "object") {
    const anyV = v as any;
    if (anyV._id?.toString) return anyV._id.toString();
    if (anyV.toString) return anyV.toString();
  }
  return null;
}

function getIdFromAnalysis(a: any): string | null {
  return (
    toStrId(a?.consultationID) ||
    toStrId(a?.consultationId) ||
    toStrId(a?.consultation) ||
    toStrId(a?._id) ||
    null
  );
}

export function useAnalyseFormEditor({ analyseData }: UseAnalyseFormEditorProps) {
  const searchParams = useSearchParams();
  const idFromUrl = searchParams?.get("id")?.trim() || "";

  const [errors, setErrors] = useState<Errors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Analysis>(analyseData);
  const [isDirty, setIsDirty] = useState(false);
  const [analysisText, setAnalysisText] = useState<string>(() => safeText(analyseData?.texte));

  const initialTextRef = useRef<string>(analysisText);
  const saveLockRef = useRef(false);

  const consultationId = useMemo(() => {
    return idFromUrl || getIdFromAnalysis(analyseData) || "";
  }, [idFromUrl, analyseData]);

  const hardNavigate = useCallback((url: string, mode: "replace" | "assign" = "replace") => {
    const finalUrl = url.includes("?") ? `${url}&r=${Date.now()}` : `${url}?r=${Date.now()}`;

    if (mode === "replace") window.location.replace(finalUrl);
    else window.location.replace(finalUrl);
  }, []);

  useEffect(() => {
    setFormData(analyseData);
    const nextText = safeText(analyseData?.texte);
    setAnalysisText(nextText);
    initialTextRef.current = nextText;
    setIsDirty(false);
    setErrors({});
  }, [analyseData]);

  const handleBack = useCallback(() => {
    if (!consultationId) {
      hardNavigate("/admin/consultations");
      return;
    }
    hardNavigate(`/admin/consultations/${consultationId}`);
  }, [consultationId, hardNavigate]);

  const validate = useCallback(() => {
    const txt = analysisText.trim();
    if (txt.length > 0) return true;

    setErrors((prev) => (prev.analyse ? prev : { ...prev, analyse: "Le texte d'analyse est requis" }));
    return false;
  }, [analysisText]);

  const setAnalysisTextSafe = useCallback((value: string) => {
    setAnalysisText(value);
    setIsDirty(value !== initialTextRef.current);
    setErrors((prev) => {
      if (!prev.analyse && !prev.submit) return prev;
      const next = { ...prev };
      if (next.analyse) delete next.analyse;
      return next;
    });
  }, []);

  const saveAnalysis = useCallback(async () => {
    if (!consultationId) {
      const msg = "ID consultation manquant";
      setErrors((prev) => ({ ...prev, submit: msg }));
      throw new Error(msg);
    }
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
      await api.patch(`/analyses/by-consultation/${consultationId}/texte`, {
        texte: analysisText,
      });

      initialTextRef.current = analysisText;
      setIsDirty(false);

      hardNavigate(`/admin/consultations/${consultationId}`, "replace");
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Erreur de sauvegarde";
      setErrors((prev) => ({ ...prev, submit: msg }));
      throw new Error(msg);
    } finally {
      setIsSaving(false);
      saveLockRef.current = false;
    }
  }, [consultationId, analysisText, hardNavigate]);

  const saveNow = useCallback(async () => {
    if (isSaving) return;
    if (!validate()) return;
    await saveAnalysis();
  }, [isSaving, validate, saveAnalysis]);

  const onChangeText = useCallback(
    (value: string) => {
      setAnalysisTextSafe(value);
    },
    [setAnalysisTextSafe]
  );

  const stats = useMemo(() => {
    const len = analysisText.length;
    const lines = analysisText ? analysisText.split("\n").length : 0;
    return { len, lines };
  }, [analysisText]);

  return {
    formData, analysisText, errors, isSaving, isDirty, stats,
    saveNow, handleBack, onChangeText,
  };
}