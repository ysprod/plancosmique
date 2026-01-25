
import { api } from "@/lib/api/client";
import type { Consultation } from "@/lib/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface ToastState {
  message: string;
  type: "success" | "error" | "info";
}

type AdminAnalysisState = {
  consultation: Consultation | null;
  loading: boolean;
  error: string | null;
  toast: ToastState | null;
};


const initialState: AdminAnalysisState = {
  consultation: null,
  loading: true,
  error: null,
  toast: null,
};


function getConsultationIdFromParams(params: unknown): string | null {
  const raw = (params as any)?.id;
  if (!raw) return null;
  return Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
}


export function useAdminConsultationAnalysis() {
  const params = useParams();
  const router = useRouter();
  const consultationId = useMemo(() => getConsultationIdFromParams(params), [params]);
  const [state, setState] = useState<AdminAnalysisState>(initialState);
  const reqSeqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // Toast helpers
  const setToast = useCallback((toast: ToastState | null) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setState((s) => (s.toast === toast ? s : { ...s, toast }));
    if (toast) {
      toastTimerRef.current = window.setTimeout(() => {
        setState((s) => (s.toast ? { ...s, toast: null } : s));
        toastTimerRef.current = null;
      }, 2500);
    }
  }, []);
  const showToast = useCallback((message: string, type: ToastState["type"] = "info") => {
    setToast({ message, type });
  }, [setToast]);

  // Memo for notified
  const notified = useMemo(() => state.consultation?.analysisNotified === true, [state.consultation]);

  // Main loader
  const loadAnalysis = useCallback(async () => {
    const id = consultationId;
    if (!id) {
      setState((s) => {
        const next: AdminAnalysisState = { ...s, loading: false, error: "ID de consultation manquant" };
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
      const consultationRes = await api.get(`/consultations/${id}`, { signal: controller.signal } as any);
      const payload = consultationRes?.data;
      const base: Consultation | null = payload?.consultation ?? payload ?? null;
      if (!base) throw new Error("Consultation introuvable");
      if (base.status !== "COMPLETED") {
        router.push(`/admin/consultations/${id}/generate`);
        return;
      }
      if (reqSeqRef.current !== mySeq) return;
      setState((s) => {
        const next: AdminAnalysisState = {
          ...s,
          consultation: base,
          loading: false,
          error: null,
        };
        return shallowEqualState(s, next) ? s : next;
      });
    } catch (err: any) {
      if (err?.name === "CanceledError" || err?.name === "AbortError") return;
      if (reqSeqRef.current !== mySeq) return;
      setState((s) => {
        const next: AdminAnalysisState = {
          ...s,
          loading: false,
          error: err?.message || "Impossible de récupérer la consultation",
        };
        return shallowEqualState(s, next) ? s : next;
      });
    }
  }, [consultationId, router]);

  useEffect(() => {
    loadAnalysis();
    return () => {
      abortRef.current?.abort();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, [loadAnalysis]);

  // Navigation handlers
  const handleBack = useCallback(() => {
    router.push("/admin/consultations/");
  }, [router]);

  const handleModifyAnalysis = useCallback((id: string) => {
    router.push(`/admin/genereanalyse?id=${id}`);
  }, [router]);
  
  const handleNotifyUser = useCallback(async (_id?: string) => {
    const loaded = state.consultation;
    const notifyId = (loaded && (loaded.consultationId || loaded._id)) || consultationId;
    if (!notifyId) {
      showToast("❌ ID de consultation manquant", "error");
      return;
    }
    try {
      const res = await api.post(`/consultations/${notifyId}/notify-user`);
      if (res.status === 200 || res.status === 201) {
        showToast("📧 Notification envoyée avec succès !", "success");
        setState((s) => {
          if (!s.consultation) return s;
          if (s.consultation.analysisNotified === true) return s;
          return { ...s, consultation: { ...s.consultation, analysisNotified: true } as Consultation };
        });
      } else {
        showToast("❌ Erreur lors de l'envoi", "error");
      }
    } catch {
      showToast("❌ Erreur lors de l'envoi", "error");
    }
  }, [consultationId, showToast, state.consultation]);

  return {
    consultation: state.consultation,
    loading: state.loading,
    notified,
    error: state.error,
    toast: state.toast,
    setToast,
    showToast,
    reload: loadAnalysis,
    handleBack,
    handleModifyAnalysis,
    handleNotifyUser,
  };
}

/** shallow equality sur le state pour éviter setState inutiles */
function shallowEqualState(a: AdminAnalysisState, b: AdminAnalysisState) {
  return (
    a.loading === b.loading &&
    a.error === b.error &&
    a.toast === b.toast &&
    a.consultation === b.consultation
  );
}
