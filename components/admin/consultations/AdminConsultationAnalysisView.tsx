"use client";
import ShellCard from "@/components/commons/ShellCard";
import ConsultationHeader from "@/components/consultations/content/ConsultationHeader";
import MarkdownCard from "@/components/consultations/content/MarkdownCard";
import ErrorState from "@/components/consultations/ErrorState";
import LoadingSkeleton from "@/components/consultations/LoadingSkeleton";
import Toast from "@/components/consultations/Toast";
import { useAdminConsultationAnalysis } from "@/hooks/consultations/useAdminConsultationAnalysis";
import { cx, safeTrim, wordCount } from "@/lib/functions";
import { useMemo } from "react";
import CenterShell from "./DisplayConsultationCard/CenterShell";
import Collapsible from "./DisplayConsultationCard/Collapsible";
import { CopyToast } from "./DisplayConsultationCard/CopyToast";
import SectionTitle from "./DisplayConsultationCard/SectionTitle";
import { TopBarActions } from "./DisplayConsultationCard/TopBarActions";
import { AnimatePresence } from "framer-motion";

export default function AdminConsultationAnalysisView() {
    const {
        loading, error, toast, derived, copied, markdown,
        setToast, handleBack, handleCopy, handleRefresh, handleNotify,
    } = useAdminConsultationAnalysis();

    const mdTexte = useMemo(() => safeTrim(markdown?.texte), [markdown?.texte]);
    const mdPrompt = useMemo(() => safeTrim(markdown?.prompt), [markdown?.prompt]);
    const mdTitle = useMemo(() => safeTrim(markdown?.title), [markdown?.title]);

    const metrics = useMemo(() => {
        const wc = wordCount(mdTexte);
        const pc = wordCount(mdPrompt);
        return { wc, pc };
    }, [mdTexte, mdPrompt]);

    if (loading) return <LoadingSkeleton />;

    if (error) {
        return (
            <CenterShell>
                <div className="w-full max-w-md">
                    <ErrorState error={error || "Aucune donnée disponible"} onRetry={handleBack} />
                </div>
            </CenterShell>
        );
    }

    return (
        <div>
            <CenterShell>
                <div
                    className={cx(
                        "relative overflow-hidden rounded-[28px] border",
                        "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
                        "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
                    )}
                >
                    <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />

                    <TopBarActions
                        derived={derived}
                        copied={copied}
                        handleCopy={handleCopy}
                        handleRefresh={handleRefresh}
                        handleNotify={handleNotify}
                        onBack={handleBack}
                    />

                    <CopyToast copied={copied} />

                    <ShellCard>
                        <div
                            className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center"
                        >
                            <ConsultationHeader title={mdTitle} />
                            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                                <span className="rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-200/90">
                                    Analyse : <span className="font-semibold">{metrics.wc}</span> mots
                                </span>
                                {mdPrompt ? (
                                    <span className="rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2.5 py-1 text-[11px] text-slate-700 dark:text-slate-200/90">
                                        Prompt : <span className="font-semibold">{metrics.pc}</span> mots
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-4">
                            {mdTexte ? (
                                <MarkdownCard markdown={mdTexte} />
                            ) : (
                                <div
                                    className={cx(
                                        "mx-auto w-full max-w-2xl",
                                        "rounded-2xl border border-amber-500/25 bg-amber-500/10",
                                        "px-4 py-3 text-left"
                                    )}
                                >
                                    <SectionTitle
                                        title="Analyse indisponible"
                                        subtitle="Le backend n’a pas renvoyé de texte d’analyse."
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-4">
                            <Collapsible
                                label="Prompt utilisé"
                                hint={mdPrompt ? "Afficher / masquer le prompt envoyé au modèle" : "Aucun prompt disponible"}
                                defaultOpen={true}
                            >
                                {mdPrompt ? (
                                    <MarkdownCard markdown={mdPrompt} />
                                ) : (
                                    <div className="px-3 py-3 text-center text-[12px] text-slate-600 dark:text-slate-300/80">
                                        Aucun prompt disponible.
                                    </div>
                                )}
                            </Collapsible>
                        </div>
                    </ShellCard>
                </div>
            </CenterShell>

            <AnimatePresence>
                {toast ? (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                ) : null}
            </AnimatePresence>
        </div>
    );
}