"use client";
import { Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryConsultationLoading() {
  return (
    <main className="min-h-[80vh] w-full flex flex-col items-center justify-center px-3 py-5 sm:px-4 sm:py-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      <motion.div
        className="flex flex-col items-center justify-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 180 }}
      >
        <span className="relative flex items-center justify-center mb-3">
          <motion.span
            className="absolute inline-block rounded-full bg-gradient-to-br from-violet-400/30 via-fuchsia-400/20 to-indigo-400/30 blur-xl w-16 h-16 animate-pulse"
            animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <Loader2 className="h-10 w-10 text-violet-600 dark:text-violet-300 animate-spin" />
          <Sparkles className="h-5 w-5 text-fuchsia-400 dark:text-fuchsia-300 absolute -top-2 -right-2 animate-bounce" />
        </span>
        <span className="text-base font-extrabold text-cosmic-indigo dark:text-white tracking-tight mb-1">Chargement des consultations…</span>
        <span className="mt-1 text-xs text-slate-500 dark:text-zinc-400 text-center max-w-xs">
          Nous préparons les choix de consultations personnalisés pour votre catégorie.<br />Merci de patienter quelques instants.
        </span>
      </motion.div>
    </main>
  );
}
