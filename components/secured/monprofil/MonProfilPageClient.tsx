"use client";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Moon } from "lucide-react";
import ErrorState from "@/components/carteduciel/ErrorState";
import LoadingState from "@/components/carteduciel/LoadingState";
import ProfileHeader from "@/components/carteduciel/ProfileHeader";
import SkyChart from "@/components/carteduciel/SkyChart";
import CinqPortesSection from "@/components/profil/CinqPortesSection";
import UserProgressSection from "@/components/profil/UserProgressSection";
import { useMonProfil } from '@/hooks/carteduciel/useMonProfil';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const HeaderSection = memo<{ userName: string }>(({ userName }) => (
  <motion.div
    variants={itemVariants}
    className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-6
      bg-gradient-to-br from-purple-600/20 via-indigo-600/20 to-pink-600/20
      dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-pink-900/30
      backdrop-blur-xl
      border border-purple-500/20 dark:border-purple-400/20
      shadow-2xl shadow-purple-500/10"
  >
    {/* Animated background stars */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: 360
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`
          }}
        >
          <Star className="w-4 h-4 text-purple-400/30" />
        </motion.div>
      ))}
    </div>

    <div className="relative flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 dark:text-purple-300" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 dark:from-purple-300 dark:via-pink-300 dark:to-indigo-300 bg-clip-text text-transparent truncate">
            Mon Profil
          </h1>
        </div>
        <p className="text-sm sm:text-base text-slate-300 dark:text-slate-400">
          Bienvenue, <span className="font-semibold text-purple-300 dark:text-purple-400">{userName}</span>
        </p>
      </div>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex-shrink-0"
      >
        <Moon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400/50 dark:text-purple-300/50" />
      </motion.div>
    </div>
  </motion.div>
));

HeaderSection.displayName = 'HeaderSection';

export default function MonProfilPageClient() {
  const { user, processedData, isLoading } = useMonProfil();

  const userName = useMemo(() => user?.prenom || 'Voyageur', [user?.prenom]);
  const isPremium = useMemo(() => !!user?.premium, [user?.premium]);
  
  const carteDuCielData = useMemo(() => {
    if (!processedData?.carteDuCiel) return null;
    return 'carteDuCiel' in processedData.carteDuCiel
      ? processedData.carteDuCiel.carteDuCiel
      : null;
  }, [processedData?.carteDuCiel]);

  if (isLoading) return <LoadingState />;
  if (!user || !processedData) return <ErrorState />;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 dark:from-black dark:via-purple-950/50 dark:to-indigo-950/50">
      <div className="relative w-full max-w-7xl">
        {/* Animated background effects */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 blur-3xl pointer-events-none"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6"
        >
          <HeaderSection userName={userName} />

          <motion.div variants={itemVariants} className="grid gap-4 sm:gap-6">
            <div className="bg-slate-900/50 dark:bg-slate-950/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 dark:border-slate-700/30 shadow-2xl overflow-hidden">
              <ProfileHeader userData={processedData} />
            </div>

            <div className="bg-slate-900/50 dark:bg-slate-950/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 dark:border-slate-700/30 shadow-2xl p-4 sm:p-6">
              <UserProgressSection
                userName={userName}
                showWelcomeMessage={false}
              />
            </div>

            <div className="bg-slate-900/50 dark:bg-slate-950/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 dark:border-slate-700/30 shadow-2xl p-4 sm:p-6">
              <CinqPortesSection
                carteDuCiel={carteDuCielData}
                isPremium={isPremium}
              />
            </div>

            <div className="bg-slate-900/50 dark:bg-slate-950/50 backdrop-blur-xl rounded-2xl border border-slate-800/50 dark:border-slate-700/30 shadow-2xl overflow-hidden">
              <SkyChart carteDuCiel={processedData.carteDuCiel} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
