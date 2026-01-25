"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import SkyChart from "@/components/carteduciel/SkyChart";
import CinqPortesSection from "@/components/profil/CinqPortesSection";
import UserProgressSection from "@/components/profil/UserProgressSection";
import { useMonProfil } from '@/hooks/carteduciel/useMonProfil';
import { useConsultationsByRubrique } from '@/hooks/consultations/useConsultationsByRubrique';
import RubriqueConsultationsList from './RubriqueConsultationsList';

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

export default function MonProfilPageClient() {
  const { user, processedData, isLoading } = useMonProfil();
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

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-5xl px-2 sm:px-4 py-4 sm:py-8 flex flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col items-center gap-4 sm:gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-cosmic-purple/20 dark:border-cosmic-pink/20 shadow-xl overflow-hidden animate-fade-in">
              <ProfileHeader userData={processedData} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl border border-cosmic-indigo/20 dark:border-cosmic-purple/20 shadow-lg p-3 sm:p-5 animate-fade-in">
              <UserProgressSection
                userName={userName}
                showWelcomeMessage={false}
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg rounded-2xl border border-cosmic-pink/20 dark:border-cosmic-indigo/20 shadow-lg p-3 sm:p-5 animate-fade-in">
              <CinqPortesSection
                carteDuCiel={carteDuCielData}
                isPremium={isPremium}
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl border border-cosmic-purple/20 dark:border-cosmic-pink/20 shadow-xl overflow-hidden animate-fade-in">
              <SkyChart carteDuCiel={processedData.carteDuCiel} />
            </div>
          </motion.div>

          {/* Section consultations rubrique */}
          <motion.div
            variants={itemVariants}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-xl bg-gradient-to-r from-cosmic-purple/10 via-cosmic-indigo/10 to-cosmic-pink/10 dark:from-cosmic-indigo/20 dark:to-cosmic-pink/20 rounded-2xl border border-cosmic-purple/10 dark:border-cosmic-pink/10 shadow p-3 sm:p-5 animate-fade-in mt-2">
              <div className="font-bold text-cosmic-indigo dark:text-cosmic-pink mb-2 text-center text-base sm:text-lg">Consultations de la rubrique</div>
              {loadingConsultations ? (
                <div className="text-center text-xs text-gray-400 py-4">Chargement des consultations...</div>
              ) : errorConsultations ? (
                <div className="text-center text-xs text-red-400 py-4">{errorConsultations}</div>
              ) : (
                <RubriqueConsultationsList consultations={consultations || []} />
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}