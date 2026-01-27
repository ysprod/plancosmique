"use client";
import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import SkyChart from "@/components/carteduciel/SkyChart";
import CinqPortesSection from "@/components/profil/CinqPortesSection";
import UserProgressSection from "@/components/profil/UserProgressSection";
import { useMonProfil } from '@/hooks/carteduciel/useMonProfil';
import { useConsultationsByRubrique } from '@/hooks/consultations/useConsultationsByRubrique';
import { ProcessedUserData } from "@/lib/interfaces";
import { motion } from "framer-motion";
import RubriqueConsultationsList from "../secured/monprofil/RubriqueConsultationsList";


interface CinqPortesMainProps {
  user: any;
  processedData: ProcessedUserData | null;
  isLoading: boolean;
}


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};


const CinqPortesMain = ({ user, processedData, isLoading }: CinqPortesMainProps) => {

  const { user: userdata, processedData: processedDataj, isLoading: isLoadingj } = useMonProfil();
  // Only memoize where needed for perf
  const userName = user?.prenoms || 'Voyageur';
  const isPremium = !!user?.premium;
  const carteDuCielData = processedData?.carteDuCiel && 'carteDuCiel' in processedData.carteDuCiel
    ? processedData.carteDuCiel.carteDuCiel
    : null;


  const {
    consultations,
    loading: loadingConsultations,
    error: errorConsultations
  } = useConsultationsByRubrique('694acf59bd12675f59e7a7f2');

  if (isLoading) return <LoadingState />;
  if (!user || !processedData) return <ErrorState />;
  console.log('Rendered MonProfilPageClient with user:', consultations);


  if (isLoading) { return <LoadingState />; }

  if (!user || !processedData) { return <ErrorState />; }

  return (
    <main className=" bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="w-full mx-auto">
        <ProfileHeader userData={processedData} />
        <br /><br />
        {/* Section consultations rubrique */}
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-xl bg-gradient-to-r from-cosmic-purple/10 via-cosmic-indigo/10 to-cosmic-pink/10 dark:from-cosmic-indigo/20 dark:to-cosmic-pink/20 rounded-2xl border border-cosmic-purple/10 dark:border-cosmic-pink/10 shadow p-3 sm:p-5 animate-fade-in mt-2">
            <div className="font-bold text-cosmic-indigo dark:text-cosmic-pink mb-2 text-center text-base sm:text-lg">Les 5 Portes de votre Étoile</div>
            {loadingConsultations ? (
              <div className="text-center text-xs text-gray-400 py-4">Chargement des consultations...</div>
            ) : errorConsultations ? (
              <div className="text-center text-xs text-red-400 py-4">{errorConsultations}</div>
            ) : (
              <RubriqueConsultationsList consultations={consultations || []} />
            )}
          </div>
        </motion.div>

      </div>
    </main>
  );
};

export default CinqPortesMain;




