"use client";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import { useConsultationsByRubrique } from '@/hooks/consultations/useConsultationsByRubrique';
import { User } from "@/lib/interfaces";
import RubriqueConsultationsList from "../secured/monprofil/RubriqueConsultationsList";

interface CinqPortesMainProps {
  processedData: User;
  isLoading: boolean;
}

const CinqPortesMain = ({ processedData, isLoading }: CinqPortesMainProps) => {
  const { consultations, loading: loadingConsultations } = useConsultationsByRubrique('694acf59bd12675f59e7a7f2');
  if (isLoading || loadingConsultations) return <LoadingState />;

  return (
    <main className="w-full mx-auto  p-3 sm:p-6 space-y-4 sm:space-y-6">
      <ProfileHeader userData={processedData} />
      <div className="font-bold text-cosmic-indigo dark:text-cosmic-pink mb-2 text-center text-base sm:text-lg">Les 5 Portes de votre Étoile</div>
      <RubriqueConsultationsList consultations={consultations || []} />
    </main>
  );
};

export default CinqPortesMain;