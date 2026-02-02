"use client";
import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import UserProgressSection from "@/components/profil/UserProgressSection";
import { useMonProfil } from "@/hooks/carteduciel/useMonProfil";
import { useConsultationsByRubrique } from "@/hooks/consultations/useConsultationsByRubrique";
import { memo, useMemo } from "react";
import ConsultationsPanel from "./ConsultationsPanel";
import GlassCard from "./GlassCard";
import { AspectsMarkdown } from "@/components/carteduciel/AspectsMarkdown";

const RUBRIQUE_ID = "694acf59bd12675f59e7a7f2" as const;

function MonProfilPageClientImpl() {
  const { user, processedData, isLoading } = useMonProfil();
  const {
    consultations, loading: loadingConsultations, error: errorConsultations,
  } = useConsultationsByRubrique(RUBRIQUE_ID);

  const vm = useMemo(() => {
    const userName = user?.prenoms?.trim() || "Voyageur";
    const isPremium = !!user?.premium;
    return { userName, isPremium};
  }, [user?.prenoms, user?.premium]);

  if (isLoading) return <LoadingState />;

  if (!user || !processedData) return <ErrorState />;

  return (
    <main className="w-full min-h-[100dvh] flex flex-col items-center justify-center px-2 py-4">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/60" />
      <div className="fixed inset-0 -z-10 [background:radial-gradient(60%_45%_at_50%_10%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(55%_40%_at_20%_85%,rgba(236,72,153,0.12),transparent_60%)]" />
      <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center gap-3 sm:gap-4">
        <GlassCard className="flex flex-col items-center justify-center text-center">
          <ProfileHeader userData={processedData} />
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center text-center">
          <UserProgressSection userName={vm.userName} showWelcomeMessage={false} />
        </GlassCard>
        <GlassCard className="p-0 overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="p-3 sm:p-4 flex flex-col items-center justify-center text-center">
           <AspectsMarkdown aspectsTexte={processedData.aspectsTexte} />
          </div>
        </GlassCard>
        <div className="w-full flex flex-col items-center justify-center text-center">
          <ConsultationsPanel
            loading={!!loadingConsultations}
            error={errorConsultations || null}
            consultations={consultations || []}
          />
        </div>
      </div>
    </main>
  );
}

const MonProfilPageClient = memo(MonProfilPageClientImpl);

export default MonProfilPageClient;