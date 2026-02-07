"use client";
import { formatDateFR } from "@/components/admin/consultations/DisplayConsultationCard/helpers";
import { api } from "@/lib/api/client";
import { safeTrim, wordCount } from "@/lib/functions";
import type { Analysis } from "@/lib/interfaces";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

type AdminAnalysisState = {
  loading: boolean;
  error: string | null;
  toast: ToastState | null;
};

const initialState: AdminAnalysisState = {
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

function shallowEqualState(a: AdminAnalysisState, b: AdminAnalysisState) {
  return a.loading === b.loading && a.error === b.error && a.toast === b.toast;
}

export function useAdminConsultationAnalysis() {
  const params = useParams();

  const reqSeqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [state, setState] = useState<AdminAnalysisState>(initialState);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  const consultationId = useMemo(() => getConsultationIdFromParams(params), [params]);

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

  const showToast = useCallback(
    (message: string, type: ToastState["type"] = "info") => setToast({ message, type }),
    [setToast],
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
        const next: AdminAnalysisState = {
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
        const next: AdminAnalysisState = { ...s, loading: false, error: null };
        return shallowEqualState(s, next) ? s : next;
      });
    } catch (err: any) {
      const name = err?.name;
      if (name === "CanceledError" || name === "AbortError") return;
      if (reqSeqRef.current !== mySeq) return;

      setState((s) => {
        const next: AdminAnalysisState = {
          ...s,
          loading: false,
          error: err?.message || "Impossible de récupérer l'analyse",
        };
        return shallowEqualState(s, next) ? s : next;
      });
    }
  }, [consultationId]);


  const hardNavigate = useCallback((url: string, mode: "replace" | "assign" = "assign") => {
    const cacheBusted = url.includes("?") ? `${url}&r=${Date.now()}` : `${url}?r=${Date.now()}`;
    if (mode === "replace") window.location.replace(cacheBusted);
    else window.location.assign(cacheBusted);
  }, []);

  const handleBack = useCallback(() => {
    hardNavigate("/admin/consultations/", "assign");
  }, [hardNavigate]);

  const handleModifyAnalysis = useCallback(
    (id: string) => {
      hardNavigate(`/admin/genereanalyse?id=${encodeURIComponent(id)}`, "assign");
    },
    [hardNavigate],
  );


  const handleNotifyUser = useCallback(async () => {
    const notifyId = consultationId ?? (analyse?._id ? String(analyse._id) : null);

    if (!notifyId) {
      showToast("❌ ID de consultation manquant", "error");
      return;
    }

    try {
      const res = await api.post(`/consultations/${notifyId}/notify-user`);
      if (res.status === 200 || res.status === 201) {
        showToast("📧 Notification envoyée avec succès !", "success");

        // ✅ update immuable
        setAnalyse((prev) => (prev ? { ...prev, analysisNotified: true } : prev));
      } else {
        showToast("❌ Erreur lors de l'envoi", "error");
      }
    } catch {
      showToast("❌ Erreur lors de l'envoi", "error");
    }
  }, [analyse?._id, consultationId, showToast]);

  const handleNotify = useCallback(() => {
    if (!consultationId || derived.isNotified) return;
    void handleNotifyUser();
  }, [consultationId, derived.isNotified, handleNotifyUser]);


  const handleRefresh = useCallback(() => {
    if (!consultationId) return;
    handleModifyAnalysis(consultationId);
  }, [consultationId, handleModifyAnalysis]);


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
    analyse, // utile parfois côté UI (optionnel, retire si tu veux minimiser)
    consultationId,
    derived,
    metrics,
    mdTexte,
    mdPrompt,
    mdTitle,
    handleRefresh,
    handleNotify,
    handleBack,
  };
}
