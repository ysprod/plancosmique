"use client";
import { api } from "@/lib/api/client";
import { cx } from "@/lib/functions";
import { AlertCircle, ArrowRight, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function getIdFromParams(params: any): string {
    const raw = params?.id;
    if (!raw) return "";
    const id = Array.isArray(raw) ? String(raw[0] ?? "") : String(raw);
    // Nettoie tout ce qui suit un & ou un ? (query string accidentelle)
    return id.split("&")[0].split("?")[0];
}

export default function GenerateAnalysePage() {
    const router = useRouter();
    const params = useParams();

    const id = useMemo(() => getIdFromParams(params), [params]);

    const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const lockRef = useRef(false);


    const handleGenerate = useCallback(async () => {
        if (!id) {
            setError("Identifiant de consultation manquant.");
            setStatus("error");
            return;
        }
        if (lockRef.current) return;
        lockRef.current = true;

        setStatus("loading");
        setError(null);
        console.log("Génération de l’analyse pour la consultation ID:", id);

        try {
            await api.post(`/consultations/${id}/generate-analysis`);
            // Redirection propre (pas de page “generate” dans l’historique)
            router.replace(`/secured/consultations/${id}&?retour=cinqportes`);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Erreur lors de la génération.";

            setError(msg);
            setStatus("error");
            lockRef.current = false; // on autorise retry
        }
    }, [id]);

    // Lance la génération au démarrage
    useEffect(() => {
        handleGenerate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRetry = useCallback(() => {
        if (status === "loading") return;
        setStatus("idle");
        setError(null);
        lockRef.current = false;
    }, [status]);

    const disabled = status === "loading";

    return (
        <main className="w-full min-h-[100dvh] grid place-items-center px-3 py-8">
            {/* Fond statique clean (sans animation) */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />

            <section
               
                className={cx(
                    "w-full max-w-md",
                    "rounded-3xl",
                    "border border-black/10 dark:border-white/10",
                    "bg-white/80 dark:bg-slate-950/60",
                    "backdrop-blur-xl",
                    "shadow-[0_18px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
                    "px-5 py-6 sm:px-7 sm:py-7",
                    "text-center"
                )}
            >
                <div className="mx-auto mb-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-80" />

                <div className="mx-auto mb-3 h-12 w-12 rounded-2xl grid place-items-center bg-black/5 dark:bg-white/10">
                    <Sparkles className="h-6 w-6 text-slate-900/80 dark:text-white" />
                </div>

                <h1 className="text-[18px] sm:text-[20px] font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    Générer l’analyse
                </h1>

                <p className="mt-1 text-[12px] leading-snug text-slate-600 dark:text-slate-300">
                    La génération peut prendre un moment. Laissez cette page ouverte, puis vous serez redirigé vers le résultat.
                </p>

                {/* Barre indéterminée pendant loading */}
    
                    {status === "loading" ? (
                        <div
                            key="loading-bar"
                            className="mt-4"
                            role="status"
                            aria-live="polite"
                        >
                           
                            <div className="h-2.5 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                                <div
                                    className="h-full w-[40%] rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
                                 />
                            </div>
                            <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                                Génération en cours…
                            </div>
                        </div>
                    ) : null}
  

        
                    {status === "error" && error ? (
                        <div
                            key="error"
                           
                            className="mt-4 rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-left"
                            role="alert"
                        >
                            <div className="flex items-start gap-2">
                                <span className="mt-0.5 h-8 w-8 rounded-xl grid place-items-center bg-rose-500/15 text-rose-700 dark:text-rose-300">
                                    <AlertCircle className="h-4 w-4" />
                                </span>
                                <div className="min-w-0">
                                    <div className="text-[12px] font-semibold text-rose-700 dark:text-rose-300">
                                        {error}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onRetry}
                                        className="mt-2 inline-flex items-center gap-2 text-[12px] font-semibold text-slate-900 dark:text-slate-100 hover:opacity-90"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                        Réessayer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : null}
        

                <div className="mt-5 grid gap-2">
                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={disabled}
                        aria-busy={status === "loading"}
                        className={cx(
                            "w-full rounded-2xl px-4 py-3",
                            "text-[13px] font-semibold text-white",
                            "bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500",
                            "shadow-lg shadow-fuchsia-500/20",
                            "transition",
                            disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-[0.97]"
                        )}
                    >
                        {status === "loading" ? (
                            <span className="inline-flex items-center justify-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Génération…
                            </span>
                        ) : (
                            <span className="inline-flex items-center justify-center gap-2">
                                Générer l’analyse <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </button>
                </div>
            </section>
        </main>
    );
}
