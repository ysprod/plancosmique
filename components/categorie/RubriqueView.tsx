"use client";
import { ConsultationSection } from "@/components/vie-personnelle/ConsultationSection";
import type { Rubrique } from "@/lib/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const borderGradients = [
  "from-red-500 via-orange-500 to-pink-500",
  "from-violet-600 via-indigo-600 to-blue-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-rose-500 via-fuchsia-500 to-purple-500",
  "from-amber-500 via-yellow-500 to-orange-500",
];

function getBorderGradient(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return borderGradients[hash % borderGradients.length];
}

export function RubriqueView({ rubrique }: { rubrique: Rubrique }) {

  const [isVisible, setIsVisible] = useState(false);

  const derived = useMemo(() => {
    const id = String((rubrique as any)?._id ?? Math.random().toString(36));
    const title = String(rubrique.titre ?? "Rubrique").trim();
    const description = String(rubrique.description ?? "").trim();
    const borderClass = getBorderGradient(id);

    return { id, title, description, borderClass };
  }, [rubrique]);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative mt-8"
        >
          {/* Éléments décoratifs de fond */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-violet-500/5 to-fuchsia-500/10 blur-2xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-500/5 to-cyan-500/10 blur-2xl" />
          </div>

          {/* Conteneur principal avec bordure animée */}
          <div className="relative mx-auto max-w-4xl">
             
            {/* Carte de contenu */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl shadow-2xl shadow-black/10 dark:from-zinc-900/95 dark:to-zinc-900/90 dark:shadow-black/30"
            >
              {/* En-tête avec effets */}
              <div className="relative overflow-hidden rounded-t-3xl p-8 pb-6 sm:p-10 sm:pb-8">
                {/* Particules flottantes */}
                <div className="pointer-events-none absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-[2px] w-[2px] rounded-full bg-gradient-to-r from-violet-500/30 to-pink-500/30"
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.sin(i) * 20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + i,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + i * 10}%`,
                      }}
                    />
                  ))}
                </div>

                {/* En-tête de la rubrique */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <motion.div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30"
                      whileHover={{ rotate: 15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <BookOpen className="h-7 w-7 text-white" />
                    </motion.div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                          {derived.title}
                        </h1>
                        <motion.span
                          animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Sparkles className="h-5 w-5 text-amber-500" />
                        </motion.span>
                      </div>

                      {derived.description && (
                        <motion.p
                          className="mt-3 text-lg leading-relaxed text-slate-600/90 dark:text-zinc-300/90"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {derived.description}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="border-t border-slate-200/50 dark:border-zinc-700/50"
              >
            
                  {/* Titre de section avec animation */}
                  <motion.div
                    className="mb-4 flex items-center gap-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="h-1 w-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Consultation
                    </h2>
                    <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20" />
                  </motion.div>

                  {/* Section de consultation avec animation d'entrée */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <ConsultationSection rubrique={rubrique} />
                  </motion.div>
               
              </motion.div>
            </motion.div>

            {/* Call to Action flottant */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                Tous les choix sont enregistrés automatiquement
              </p>
              <motion.div
                className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 mx-auto"
                animate={{
                  scaleX: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}