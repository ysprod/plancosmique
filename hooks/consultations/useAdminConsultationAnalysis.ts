import { extractMarkdown, formatDateFR, getConsultationId } from "@/components/admin/consultations/DisplayConsultationCard/helpers";
import { api } from "@/lib/api/client";
import type { Analysis, Consultation } from "@/lib/interfaces";
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

  const reqSeqRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<AdminAnalysisState>(initialState);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  const consultationId = useMemo(() => getConsultationIdFromParams(params), [params]);
  const notified = useMemo(() => state.consultation?.analysisNotified === true, [state.consultation]);

  const derived = useMemo(() => {
    const c = state.consultation;
    if (!c) {
      return {
        id: "",
        markdown: { texte: "", prompt: "", title: "" },
        dateGenLabel: "",
        isNotified: false,
      };
    }
    const id = getConsultationId(c);
    const markdown = extractMarkdown(c);
    const dateGenRaw = c?.dateGeneration ?? c?.updatedAt ?? c?.createdAt ?? null;
    const dateGenLabel = formatDateFR(dateGenRaw);
    const isNotifiedBackend = Boolean(c?.analysisNotified);
    const isNotified = Boolean(notified || isNotifiedBackend);
    return { id, markdown, dateGenLabel, isNotified };
  }, [state.consultation, notified]);

  const setToast = useCallback((toast: ToastState | null) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setState((s) => (s.toast === toast ? s : { ...s, toast }));
    if (toast) {
      toastTimerRef.current = window.setTimeout(() => {
        setState((s) => (s.toast ? { ...s, toast: null } : s));
        toastTimerRef.current = null;
      }, 2500);
    }
  }, []);

  const showToast = useCallback((message: string, type: ToastState["type"] = "info") => setToast({ message, type }), [setToast]);

  const loadAnalysis = useCallback(async () => {
    if (!consultationId) {
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
      const consultationRes = await api.get(`/consultations/${consultationId}`, { signal: controller.signal } as any);
      const payload = consultationRes?.data;
      const base: Consultation | null = payload?.consultation ?? payload ?? null;
      if (!base) throw new Error("Consultation introuvable");

      let finalConsultation = base;
      if (base.status !== "COMPLETED") {
        try {
          const generatedRes = await api.post(`/consultations/${consultationId}/generate-analysis`);
          finalConsultation = generatedRes?.data?.consultation ?? generatedRes?.data ?? null;
          if (!finalConsultation) throw new Error("Consultation générée introuvable");
        } catch (err: any) {
          throw new Error("Erreur lors de la génération de l'analyse");
        }
      }
      if (reqSeqRef.current !== mySeq) return;

      const res = await api.get(`/analyses/by-consultation/${consultationId}`);
      const data = res?.data ?? null;
      if (!data || data === "") {
        throw new Error("Analyse indisponible. Veuillez réessayer.");
      }
      setAnalyse(data);
      setState((s) => {
        const next: AdminAnalysisState = {
          ...s,
          consultation: finalConsultation,
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

  const handleBack = useCallback(() => {
    window.location.href = "/admin/consultations/";
  }, [router]);

  const handleModifyAnalysis = useCallback((id: string) => {
    window.location.href = `/admin/genereanalyse?id=${id}`;
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

  const handleCopy = useCallback(async () => {
    if (!analyse) return;
    try {
      await navigator.clipboard.writeText(analyse?.texte || "");
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
    } catch { }
  }, [analyse]);

  const handleRefresh = useCallback(() => {
    if (!derived.id) return;
    handleModifyAnalysis(derived.id);
  }, [derived.id, handleModifyAnalysis]);

  const handleNotify = useCallback(() => {
    if (!derived.id || derived.isNotified) return;
    handleNotifyUser(derived.id);
  }, [derived.id, derived.isNotified, handleNotifyUser]);

  useEffect(() => {
    loadAnalysis();
    return () => {
      abortRef.current?.abort();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, [loadAnalysis]);

  return {
    loading: state.loading,
    error: state.error,
    toast: state.toast,
    setToast,
    showToast,
    reload: loadAnalysis,
    handleBack,
    copied,
    setCopied,
    derived,
    handleCopy,
    handleRefresh,
    handleNotify,
    markdown: analyse ?? { texte: "", prompt: "", title: "" },
  };
}

function shallowEqualState(a: AdminAnalysisState, b: AdminAnalysisState) {
  return (
    a.loading === b.loading &&
    a.error === b.error &&
    a.toast === b.toast
  );
}