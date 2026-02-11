import { api } from "@/lib/api/client";
import type { Analysis } from "@/lib/interfaces";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const ERROR_MISSING_ID = "ID de consultation manquant";
const ERROR_ANALYSIS_NOT_FOUND = "Impossible de récupérer l'analyse";

function getParamId(raw: unknown): string | null {
  if (!raw) return null;
  if (typeof raw === "string") return raw.trim() || null;
  if (Array.isArray(raw)) return String(raw[0] ?? "").trim() || null;
  return String(raw).trim() || null;
}

function isAbort(err: any) {
  return err?.name === "AbortError" || err?.name === "CanceledError";
}

export function useConsultationResult() {
  const params = useParams();
  const searchParams = useSearchParams();

  const reqSeqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  const consultationId = useMemo(() => getParamId((params as any)?.id), [params]);
  const retour = useMemo(() => searchParams?.get("retour") || "", [searchParams]);

  const hardNavigate = useCallback((url: string, mode: "assign" | "replace" = "assign") => {
    const finalUrl = url.includes("?") ? `${url}&r=${Date.now()}` : `${url}?r=${Date.now()}`;
    if (mode === "replace") window.location.replace(finalUrl);
    else window.location.replace(finalUrl);
  }, []);

  const loadAnalysis = useCallback(async () => {
    if (!consultationId) {
      setLoading(false);
      setError(ERROR_MISSING_ID);
      setAnalyse(null);
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const mySeq = ++reqSeqRef.current;
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<Analysis>(`/analyses/by-consultation/${consultationId}`, {
        signal: controller.signal,
      } as any);

      const data: Analysis = res?.data ?? null;
      if (reqSeqRef.current !== mySeq) return;
      setAnalyse(data);
      setLoading(false);
    } catch (err: any) {
      if (isAbort(err)) return;
      if (reqSeqRef.current !== mySeq) return;
      setAnalyse(null);
      setError(err?.response?.data?.message || err?.message || ERROR_ANALYSIS_NOT_FOUND);
      setLoading(false);
    }
  }, [consultationId]);

  const handleBack = useCallback(() => {
    const routes: Record<string, string> = {
      cinqportes: "/star/cinqportes",
      carteduciel: "/star/carteduciel",
    };

    const dest = routes[retour] || "/star/consultations";
    hardNavigate(dest, "assign");
  }, [retour, hardNavigate]);

  const handleDownloadPDF = useCallback(() => {
    const downloadId = consultationId || (analyse as any)?._id;
    if (!downloadId) return;
    window.open(`/api/consultations/${downloadId}/download-pdf`, "_blank", "noopener,noreferrer");
  }, [consultationId, analyse]);

  useEffect(() => {
    void loadAnalysis();
    return () => {
      abortRef.current?.abort();
    };
  }, [loadAnalysis]);

  return { loading, error, analyse, handleDownloadPDF, handleBack, reload: loadAnalysis };
}