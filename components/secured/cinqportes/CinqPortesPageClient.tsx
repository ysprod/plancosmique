"use client";
import LoadingState from "@/components/admin/dashboard/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import { useCinqPortesPage } from "@/hooks/commons/useCinqPortesPage";
import { useConsultationsByRubrique } from "@/hooks/consultations/useConsultationsByRubrique";
import RubriqueConsultationsList from "../monprofil/RubriqueConsultationsList";

export default function CinqPortesPageClient() {
  const { processedData, isLoading } = useCinqPortesPage();
   const { consultations, loading: loadingConsultations } = useConsultationsByRubrique('694acf59bd12675f59e7a7f2');
  if (isLoading || loadingConsultations) return <LoadingState />;

  return (
    <main className="w-full mx-auto  p-3 sm:p-6 space-y-4 sm:space-y-6">
      <ProfileHeader userData={processedData!} />
      <div className="font-bold text-cosmic-indigo dark:text-cosmic-pink mb-2 text-center text-base sm:text-lg">Les 5 Portes de votre Étoile</div>
      <RubriqueConsultationsList consultations={consultations || []} />
    </main>
  );
}
