"use client";
import ShellCard from "@/components/commons/ShellCard";
import ConsultationHeader from "@/components/consultations/content/ConsultationHeader";
import ErrorState from "@/components/consultations/ErrorState";
import LoadingSkeleton from "@/components/consultations/LoadingSkeleton";
import Toast from "@/components/consultations/Toast";
import { useAdminConsultationAnalysis } from "@/hooks/consultations/useAdminConsultationAnalysis";
import { AnimatePresence } from "framer-motion";
import { AnalysisMarkdownSection } from "./AdminConsultationAnalysisView/AnalysisMarkdownSection";
import { AnalysisMetrics } from "./AdminConsultationAnalysisView/AnalysisMetrics";
import { PromptCollapsibleSection } from "./AdminConsultationAnalysisView/PromptCollapsibleSection";
import CenterShell from "./DisplayConsultationCard/CenterShell";
import { TopBarActions } from "./DisplayConsultationCard/TopBarActions";

export default function AdminConsultationAnalysisView() {
    const {
        loading, error, toast, derived, mdTexte, mdPrompt, mdTitle, metrics,
        setToast, handleBack, handleRefresh, handleNotify,
    } = useAdminConsultationAnalysis();

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
                <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
                <TopBarActions
                    derived={derived}             
                    handleRefresh={handleRefresh}
                    handleNotify={handleNotify}
                    onBack={handleBack}
                />               

                <ShellCard>
                    <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center">
                        <ConsultationHeader title={mdTitle} />
                        <AnalysisMetrics metrics={metrics} mdPrompt={mdPrompt} />
                    </div>
                    <AnalysisMarkdownSection mdTexte={mdTexte} />
                    <PromptCollapsibleSection mdPrompt={mdPrompt} />
                </ShellCard>
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