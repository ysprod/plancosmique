"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  LogOut, 
  Check, 
  Star, 
  Sparkles,
  Shield,
  Zap
} from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const logout = async () => {
      try {
        // Animation de progression
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 100);

        await authService.logout();
        
        clearInterval(progressInterval);
        setProgress(100);
        setStatus("success");

        // Attendre un peu pour l'animation de succès
        setTimeout(() => {
          router.replace("/auth/login");
        }, 1500);
      } catch (error) {
        console.error("Logout error:", error);
        setStatus("error");
        // Rediriger quand même après une erreur
        setTimeout(() => {
          router.replace("/auth/login");
        }, 2000);
      }
    };
    logout();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-900 relative overflow-hidden flex items-center justify-center p-6">
      {/* Décorations d'arrière-plan animées */}
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      {/* Étoiles scintillantes */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center"
            >
              {/* Logo animé */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-24 h-24 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl shadow-violet-500/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <LogOut className="w-12 h-12 text-white" />
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
                  <Sparkles className="w-24 h-24 text-fuchsia-500" />
                </motion.div>
              </motion.div>

              {/* Titre */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Déconnexion en cours
              </h2>
              <p className="text-slate-600 mb-8 text-lg">
                Nous sécurisons votre session...
              </p>

              {/* Barre de progression */}
              <div className="mb-8">
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-slate-500 mt-2 font-medium">
                  {progress}%
                </p>
              </div>

              {/* Icônes de sécurité */}
              <div className="flex items-center justify-center gap-4 text-slate-400">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Shield className="w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                >
                  <Zap className="w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                >
                  <Star className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center"
            >
              {/* Icône de succès */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 mx-auto mb-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-2xl shadow-green-500/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-12 h-12 text-white stroke-[3]" />
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
                className="text-3xl font-bold text-slate-900 mb-4"
              >
                Déconnexion réussie !
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-600 text-lg"
              >
                À bientôt sur Mon Étoile ✨
              </motion.p>

              {/* Étoiles de célébration */}
              <div className="mt-8 flex items-center justify-center gap-2">
                {[...Array(5)].map((_, i) => (
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
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center"
            >
              {/* Icône d'erreur */}
              <div className="w-24 h-24 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-2xl shadow-orange-500/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Titre */}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Petite erreur...
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Mais pas d'inquiétude, nous vous redirigeons !
              </p>

              {/* Loader */}
              <Loader2 className="w-8 h-8 text-violet-600 animate-spin mx-auto" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message de sécurité */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white/90 text-sm font-medium">
            <Shield className="w-4 h-4" />
            Vos données sont protégées
          </div>
        </motion.div>
      </div>
    </div>
  );
}
