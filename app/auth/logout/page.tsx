"use client";

import { authService } from "@/lib/api/services/auth.service";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, LogOut, Shield, Sparkles, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// =====================================================
// TYPES
// =====================================================
type LogoutStatus = "loading" | "success" | "error";

// =====================================================
// CONSTANTS
// =====================================================
const PROGRESS_INTERVAL = 100; // ms
const PROGRESS_STEP = 10; // %
const SUCCESS_REDIRECT_DELAY = 1500; // ms (réduit de 2000 à 1500)
const ERROR_REDIRECT_DELAY = 800; // ms (réduit de 1000 à 800)
const STARS_COUNT = 20; // Réduit de 30 à 20 pour performance
const CELEBRATION_STARS = 5;

// =====================================================
// ANIMATION VARIANTS
// =====================================================
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

const checkVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: { delay: 0.2, type: "spring", stiffness: 200 }
  }
};

// =====================================================
// BACKGROUND COMPONENT (Memoized)
// =====================================================
const AnimatedBackground = memo(() => (
  <>
    {/* Gradient blobs */}
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute top-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        rotate: [90, 0, 90],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        y: [0, -50, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"
    />
  </>
));
AnimatedBackground.displayName = 'AnimatedBackground';

// =====================================================
// STARS COMPONENT (Optimized)
// =====================================================
const StarField = memo(() => {
  // Générer positions une seule fois
  const stars = useMemo(() => 
    Array.from({ length: STARS_COUNT }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3
    })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: star.top,
            left: star.left,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
});
StarField.displayName = 'StarField';

// =====================================================
// LOADING STATE COMPONENT
// =====================================================
const LoadingState = memo(({ progress }: { progress: number }) => (
  <motion.div
    key="loading"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 text-center"
  >
    {/* Logo animé */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl shadow-violet-500/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <LogOut className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
      </div>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
      >
        <Sparkles className="w-20 h-20 sm:w-24 sm:h-24 text-fuchsia-500" />
      </motion.div>
    </motion.div>

    {/* Titre */}
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
      Déconnexion en cours
    </h2>
    <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg">
      Sécurisation de votre session...
    </p>

    {/* Barre de progression */}
    <div className="mb-6 sm:mb-8">
      <div className="h-2.5 sm:h-3 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
        {progress}%
      </p>
    </div>

    {/* Icônes de sécurité */}
    <div className="flex items-center justify-center gap-3 sm:gap-4 text-slate-400">
      {[Shield, Zap, Star].map((Icon, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
      ))}
    </div>
  </motion.div>
));
LoadingState.displayName = 'LoadingState';

// =====================================================
// SUCCESS STATE COMPONENT
// =====================================================
const SuccessState = memo(() => (
  <motion.div
    key="success"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 text-center"
  >
    {/* Icône de succès */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-2xl shadow-green-500/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div variants={checkVariants} initial="hidden" animate="visible">
          <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[3]" />
        </motion.div>
      </div>
      {/* Cercles d'onde */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-4 border-green-400 rounded-full"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.div>

    {/* Titre */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4"
    >
      Déconnexion réussie !
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-slate-600 text-base sm:text-lg"
    >
      À bientôt sur Mon Étoile ✨
    </motion.p>

    {/* Étoiles de célébration */}
    <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
      {Array.from({ length: CELEBRATION_STARS }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.5 + i * 0.1,
            type: "spring",
            stiffness: 200
          }}
        >
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
        </motion.div>
      ))}
    </div>
  </motion.div>
));
SuccessState.displayName = 'SuccessState';

// =====================================================
// ERROR STATE COMPONENT
// =====================================================
const ErrorState = memo(() => (
  <motion.div
    key="error"
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-12 text-center"
  >
    {/* Icône d'erreur */}
    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-2xl shadow-orange-500/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
        >
          <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </motion.div>
      </div>
    </div>

    {/* Titre */}
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
      Petite erreur...
    </h2>
    <p className="text-slate-600 text-base sm:text-lg mb-4 sm:mb-6">
      Redirection en cours...
    </p>

    {/* Loader */}
    <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-violet-600 animate-spin mx-auto" />
  </motion.div>
));
ErrorState.displayName = 'ErrorState';

// =====================================================
// SECURITY BADGE COMPONENT
// =====================================================
const SecurityBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="mt-6 text-center"
  >
    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 
                  bg-white/10 backdrop-blur-md rounded-full border border-white/20 
                  text-white/90 text-xs sm:text-sm font-medium">
      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      Vos données sont protégées
    </div>
  </motion.div>
));
SecurityBadge.displayName = 'SecurityBadge';

// =====================================================
// MAIN COMPONENT
// =====================================================
export default function LogoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<LogoutStatus>("loading");
  const [progress, setProgress] = useState(0);
  
  // Refs pour cleanup
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function mémorisée
  const cleanup = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current);
      redirectTimeoutRef.current = null;
    }
  }, []);

  // Logout logic optimisée
  useEffect(() => {
    const performLogout = async () => {
      try {
        // Démarrer progression
        progressIntervalRef.current = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
              return 90;
            }
            return prev + PROGRESS_STEP;
          });
        }, PROGRESS_INTERVAL);

        // Appel API logout
        await authService.logout();

        // Compléter progression
        cleanup();
        setProgress(100);
        setStatus("success");

        // Redirection après succès
        redirectTimeoutRef.current = setTimeout(() => {
          router.replace("/auth/login");
        }, SUCCESS_REDIRECT_DELAY);

      } catch (error) {
        console.error("❌ Logout error:", error);
        cleanup();
        setStatus("error");

        // Redirection après erreur
        redirectTimeoutRef.current = setTimeout(() => {
          router.replace("/auth/login");
        }, ERROR_REDIRECT_DELAY);
      }
    };

    performLogout();

    // Cleanup on unmount
    return cleanup;
  }, [router, cleanup]);

  // Render du status actuel
  const renderContent = useMemo(() => {
    switch (status) {
      case "loading":
        return <LoadingState progress={progress} />;
      case "success":
        return <SuccessState />;
      case "error":
        return <ErrorState />;
    }
  }, [status, progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 
                  relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      {/* Star field */}
      <StarField />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {renderContent}
        </AnimatePresence>

        {/* Security badge */}
        <SecurityBadge />
      </div>
    </div>
  );
}
