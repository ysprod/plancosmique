"use client";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { memo } from "react";
import ConsultationCardBackButton from "./ConsultationCardBackButton";
import { cx } from "@/lib/functions";

interface ConsultationCardHeaderProps {
  nomComplet: string;
  retrogradeCount: number;
  isNotified: boolean;
}

const ConsultationCardHeader = memo(function ConsultationCardHeader({
  nomComplet,
  retrogradeCount,
  isNotified,
}: ConsultationCardHeaderProps) {
  return (
    <header className="relative z-10 mx-auto flex w-full flex-col items-center justify-center gap-2">
      <ConsultationCardBackButton />
      
      <motion.div 
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div 
          className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 shadow-2xl shadow-violet-500/40"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <User className="h-7 w-7 text-white" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[11px] font-black text-white">{retrogradeCount}</span>
        </motion.div>
      </motion.div>

      <motion.div 
        className="min-w-0 text-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-black tracking-tight text-white">
          {nomComplet}
        </h2>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          <motion.span 
            className="inline-flex items-center justify-center gap-1 rounded-full bg-gradient-to-r from-slate-100 to-slate-50 px-2.5 py-1 text-[10px] font-extrabold text-slate-700 shadow-sm dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="h-3 w-3" />
            </motion.div>
            Analyse astrologique
          </motion.span>

          <motion.span
            className={cx(
              "rounded-full px-2.5 py-1 text-[10px] font-extrabold shadow-sm",
              isNotified
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white dark:from-emerald-600 dark:to-teal-600"
                : "bg-gradient-to-r from-amber-500 to-orange-500 text-white dark:from-amber-600 dark:to-orange-600"
            )}
            animate={{ scale: isNotified ? 1 : [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: isNotified ? 0 : Infinity }}
          >
            {isNotified ? "✓ NOTIFIÉ" : "À NOTIFIER"}
          </motion.span>
        </div>
      </motion.div>
    </header>
  );
});

ConsultationCardHeader.displayName = "ConsultationCardHeader";

export default ConsultationCardHeader;