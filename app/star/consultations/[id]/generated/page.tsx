"use client";

import { CosmicLoader } from "@/components/admin/consultations/CosmicLoader";
import ConsultationContent from "@/components/consultations/ConsultationContent";
import ConsultationError from "@/components/consultations/ConsultationError";
import { api } from "@/lib/api/client";
import { cx } from "@/lib/functions";
import type { Analysis } from "@/lib/interfaces";
import { AlertCircle, ArrowRight, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Status = "idle" | "loading" | "error" | "success";

function getIdFromParams(params: ReturnType<typeof useParams>): string {
  const raw = (params as { id?: string | string[] } | null)?.id;
  if (!raw) return "";
  const id = Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
  // Nettoie tout ce qui ressemble à une query string accidentelle
  return id.split("&")[0].split("?")[0];
}

function getErrorMessage(err: unknown): string {
  const anyErr = err as any;
  return (
    anyErr?.response?.data?.message ||
    anyErr?.message ||
    "Erreur lors de la génération."
  );
}

export default function GenerateAnalysePage() {
  const router = useRouter();
  const params = useParams();

  const id = useMemo(() => getIdFromParams(params), [params]);

  // URL cible (stable)
  const resultUrl = useMemo(() => {
    if (!id) return "/star/consultations";
    // Tu peux changer "cinqportes" si besoin
    return `/star/consultations/${id}?retour=cinqportes`;
  }, [id]);

  // État minimal (évite loading + status en double)
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [analyse, setAnalyse] = useState<Analysis | null>(null);

  // Verrous anti double-run (StrictMode + double clic + rerenders)
  const didRunForIdRef = useRef<string | null>(null);
  const lockRef = useRef(false);


  const handleBack = useCallback(() => {
    if (typeof window !== "undefined") {
      const qs = new URLSearchParams(window.location.search);
      const retour = qs.get("retour");
      if (retour === "cinqportes") {
        window.location.href = "/star/cinqportes";
        return;
      }
      if (retour === "carteduciel") {
        window.location.href = "/star/carteduciel";
        return;
      }
    }
    window.location.href = "/star/consultations";
  }, [router]);

  const handleDownloadPDF = useCallback(() => {
    if (!id) return;
    window.open(`/api/consultations/${id}/download-pdf`, "_blank", "noopener,noreferrer");
  }, [id]);

  const runGeneration = useCallback(async () => {
    if (!id) {
      setError("Identifiant de consultation manquant.");
      setStatus("error");
      return;
    }

    // Lock synchro: empêche double POST (clic rapide / StrictMode / rerun)
    if (lockRef.current) return;
    lockRef.current = true;



    setStatus("loading");
    setError(null);

    try {
      await api.post(`/consultations/${id}/generate-analysis`);
      const res = await api.get(`/analyses/by-consultation/${id}`);
      const data = res?.data ?? null;
      if (!data || data === "") {
        throw new Error("Analyse indisponible. Veuillez réessayer.");
      }
      setAnalyse(data);
      setStatus("success");
    } catch (err) {
      setAnalyse(null);
      setError(getErrorMessage(err));
      setStatus("error");
    } finally {
      lockRef.current = false;
    }
  }, [id]);

  // Auto-run: 1 seule fois par id (même en React 18 StrictMode)
  useEffect(() => {
    if (!id) return;
    if (didRunForIdRef.current === id) return;
    didRunForIdRef.current = id;

    runGeneration();

    // Pas d'abort nécessaire
    return undefined;
  }, [id, runGeneration]);

  const onRetry = useCallback(() => {
    if (status === "loading") return;
    setError(null);
    setStatus("idle");
    runGeneration();
  }, [status, runGeneration]);

  // UI: si succès et analyse => affiche la page résultat (ton composant existant)
  if (status === "success" && analyse) {
    return (
      <main className="w-full min-h-[100dvh] grid place-items-center px-3 py-8">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
        <ConsultationContent analyse={analyse} onBack={handleBack} onDownloadPDF={handleDownloadPDF} />
      </main>
    );
  }

  // Si erreur: on garde ton composant d’erreur, mais on peut aussi afficher la carte “retry”
  // Ici: on conserve ton UX (ConsultationError) + carte retry dessous si tu veux.
  if (status === "error") {
    return (
      <main className="w-full min-h-[100dvh] grid place-items-center px-3 py-8">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
        <ConsultationError error={error} onBack={handleBack} />
      </main>
    );
  }

  // idle / loading => carte de génération centrée (plus besoin de loading séparé)
  return (
    <main className="w-full min-h-[100dvh] grid place-items-center px-3 py-8">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

      <section
        className={cx(
          "w-full max-w-md",
          "rounded-3xl",
          "border border-black/10 dark:border-white/10",
          "bg-white/85 dark:bg-slate-950/70",
          "backdrop-blur-xl",
          "shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
          "px-5 py-6 sm:px-7 sm:py-7",
          "text-center"
        )}
        aria-busy={status === "loading"}
      >
        <div className="mx-auto mb-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-80" />

        <div className="mx-auto mb-3 h-12 w-12 rounded-2xl grid place-items-center bg-black/5 dark:bg-white/10">
          <Sparkles className="h-6 w-6 text-slate-900/80 dark:text-white" />
        </div>

        <h1 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Génération de l’analyse
        </h1>

        <p className="mt-1 text-[12px] leading-snug text-slate-600 dark:text-slate-300">
          Patientez quelques instants. Vous serez redirigé automatiquement vers le résultat.
        </p>

        {/* Loading */}
        {status === "loading" ? (
          <div className="mt-4" role="status" aria-live="polite">
            <div className="h-2.5 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 animate-pulse" />
            </div>

            <div className="mt-3 inline-flex items-center justify-center gap-2 text-[12px] text-slate-600 dark:text-slate-300">
              <Loader2 className="h-4 w-4 animate-spin" />
              Génération en cours…
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={runGeneration}
              className={cx(
                "w-full rounded-2xl px-4 py-3",
                "text-[13px] font-semibold text-white",
                "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500",
                "shadow-lg shadow-fuchsia-500/20",
                "hover:opacity-[0.97] transition"
              )}
            >
              Relancer la génération
            </button>

            <button
              type="button"
              onClick={() => { window.location.href = resultUrl; }}
              className={cx(
                "w-full rounded-2xl px-4 py-3",
                "text-[13px] font-semibold",
                "border border-black/10 dark:border-white/10",
                "bg-white/70 dark:bg-white/5",
                "text-slate-800 dark:text-slate-200",
                "hover:bg-white dark:hover:bg-white/10 transition"
              )}
            >
              <span className="inline-flex items-center justify-center gap-2">
                Voir la consultation <ArrowRight className="h-4 w-4" />
              </span>
            </button>
          </div>
        )}

        {/* Error inline (optionnel, utile si tu préfères garder la carte plutôt que ConsultationError) */}
        {status === "idle" && !id ? (
          <div className="mt-4 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-left">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-8 w-8 rounded-xl grid place-items-center bg-rose-500/15 text-rose-700 dark:text-rose-300">
                <AlertCircle className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-rose-700 dark:text-rose-300">
                  Identifiant de consultation manquant.
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
