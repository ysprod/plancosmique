"use client";
import { formatDateFR } from "@/components/admin/consultations/DisplayConsultationCard/helpers";
import { api } from "@/lib/api/client";
import { safeTrim, wordCount } from "@/lib/functions";
import type { Analysis } from "@/lib/interfaces";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

type ConsultationResultState = {
  loading: boolean;
  error: string | null;
  toast: ToastState | null;
};

const initialState: ConsultationResultState = {
  loading: true,
  error: null,
  toast: null,
};

function getConsultationIdFromParams(params: unknown): string | null {
  const raw = (params as any)?.id;
  if (!raw) return null;
  const v = Array.isArray(raw) ? raw[0] : raw;
  const s = typeof v === "string" ? v : String(v ?? "");
  return s.trim() ? s : null;
}

function shallowEqualState(a: ConsultationResultState, b: ConsultationResultState) {
  return a.loading === b.loading && a.error === b.error && a.toast === b.toast;
}

export function useConsultationResult() {
  const params = useParams();

  const reqSeqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [state, setState] = useState<ConsultationResultState>(initialState);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  const consultationId = useMemo(() => getConsultationIdFromParams(params), [params]);
  const searchParams = useSearchParams();


  const retour = useMemo(() => searchParams?.get("retour") || null, [searchParams]);

  const clearToastTimer = useCallback(() => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  }, []);

  const setToast = useCallback(
    (toast: ToastState | null) => {
      clearToastTimer();

      setState((s) => {
        const next = s.toast === toast ? s : { ...s, toast };
        return shallowEqualState(s, next) ? s : next;
      });

      if (toast) {
        toastTimerRef.current = window.setTimeout(() => {
          setState((s) => (s.toast ? { ...s, toast: null } : s));
          toastTimerRef.current = null;
        }, 2500);
      }
    },
    [clearToastTimer],
  );


  const derived = useMemo(() => {
    const dateGenRaw = analyse?.dateGeneration ?? null;
    const dateGenLabel = formatDateFR(dateGenRaw);
    const isNotified = Boolean(analyse?.analysisNotified);

    return { dateGenLabel, isNotified };
  }, [analyse?.dateGeneration, analyse?.analysisNotified]);

  const loadAnalysis = useCallback(async () => {
    if (!consultationId) {
      setState((s) => {
        if (!s.loading && s.error === "ID de consultation manquant") return s;
        const next: ConsultationResultState = {
          ...s,
          loading: false,
          error: "ID de consultation manquant",
        };
        return shallowEqualState(s, next) ? s : next;
      });
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const mySeq = ++reqSeqRef.current;

    setState((s) => (s.loading && s.error === null ? s : { ...s, loading: true, error: null }));

    try {
      // 1) tentative de récupération
      const res = await api.get(`/analyses/by-consultation/${consultationId}`, {
        signal: controller.signal,
      } as any);

      const data = res?.data ?? null;

      // Si analyse absente → on tente de générer
      let finalAnalyse: Analysis | null = data && data !== "" ? data : null;

      if (!finalAnalyse) {
        const generatedRes = await api.post(
          `/consultations/${consultationId}/generate-analysis`,
          {},
          { signal: controller.signal } as any,
        );

        const generatedData =
          generatedRes?.data?.analyse ?? generatedRes?.data ?? null;

        if (!generatedData || generatedData === "") {
          throw new Error("Analyse générée introuvable");
        }
        finalAnalyse = generatedData;
      }

      if (reqSeqRef.current !== mySeq) return;

      setAnalyse(finalAnalyse);

      setState((s) => {
        const next: ConsultationResultState = { ...s, loading: false, error: null };
        return shallowEqualState(s, next) ? s : next;
      });
    } catch (err: any) {
      const name = err?.name;
      if (name === "CanceledError" || name === "AbortError") return;
      if (reqSeqRef.current !== mySeq) return;

      setState((s) => {
        const next: ConsultationResultState = {
          ...s,
          loading: false,
          error: err?.message || "Impossible de récupérer l'analyse",
        };
        return shallowEqualState(s, next) ? s : next;
      });
    }
  }, [consultationId]);



  const handleBack = useCallback(() => {
    if (retour === "cinqportes") {
      window.location.href = "/star/cinqportes";
      return;
    }
    if (retour === "carteduciel") {
      window.location.href = "/star/carteduciel";
      return;
    }
    window.location.href = "/star/consultations";
  }, [retour]);


  const handleDownloadPDF = useCallback(() => {
    const downloadId = consultationId ?? (analyse?._id ? String(analyse._id) : null);
    if (!downloadId) return;
    window.open(`/api/consultations/${downloadId}/download-pdf`, "_blank");
  }, [consultationId, analyse?._id]);


  useEffect(() => {
    void loadAnalysis();
    return () => {
      abortRef.current?.abort();
      clearToastTimer();
    };
  }, [loadAnalysis, clearToastTimer]);


  const mdTexte = useMemo(() => safeTrim(analyse?.texte), [analyse?.texte]);
  const mdPrompt = useMemo(() => safeTrim(analyse?.prompt), [analyse?.prompt]);
  const mdTitle = useMemo(() => safeTrim(analyse?.title), [analyse?.title]);

  const metrics = useMemo(() => {
    return {
      wc: wordCount(mdTexte),
      pc: wordCount(mdPrompt),
    };
  }, [mdTexte, mdPrompt]);

  return {
    loading: state.loading,
    error: state.error,
    toast: state.toast,
    setToast,
    analyse,
    consultationId,
    derived,
    metrics,
    mdTexte,
    mdPrompt,
    mdTitle,
    handleDownloadPDF,
    handleBack,
  };
}
