"use client";
import { cx } from "@/lib/functions";
import { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

const itemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

interface RubriqueCardProps {
  rub: Rubrique;
}

export const RubriqueCard = memo(function RubriqueCard({ rub }: RubriqueCardProps) {
  return (
    <motion.li variants={itemVariants} className="relative">
      <div
        className={cx(
          "group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition-all",
          "hover:bg-slate-50 active:scale-[0.99]",
          "dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/60"
        )}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500/70" />

        <div className="pt-1">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-xl font-extrabold text-slate-900 dark:text-white">
                {rub.titre}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-base leading-snug text-slate-600 dark:text-zinc-300">
                {rub.description || "—"}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <Link
              href={`/secured/rubriques/${rub._id}`}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-lg font-extrabold text-white shadow-sm
                         bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700
                         focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900/40"
              aria-label={`Découvrir ${rub.titre}`}
            >
              <Eye className="h-5 w-5" />
              Découvrir
            </Link>
          </div>
        </div>
      </div>
    </motion.li>
  );
});
