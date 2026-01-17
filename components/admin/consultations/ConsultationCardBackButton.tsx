"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const ConsultationCardBackButton = memo(function ConsultationCardBackButton() {
  return (
    <Link href="/admin/consultations">
      <motion.div
        className="relative z-10 mx-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 px-3 py-1.5 text-xs font-extrabold text-slate-700 shadow-md dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-200"
        whileHover={{ scale: 1.05, x: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          animate={{ x: [-2, 0, -2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </motion.div>
        Retour
      </motion.div>
    </Link>
  );
});

ConsultationCardBackButton.displayName = "ConsultationCardBackButton";

export default ConsultationCardBackButton;