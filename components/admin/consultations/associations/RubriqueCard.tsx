"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { shortDesc } from "@/hooks/admin/useAssociationsUtils";
import { gridItem } from "./animations";

const RubriqueCard = memo(function RubriqueCard({
  titre,
  description,
  count,
  onOpen,
}: {
  titre: string;
  description: string;
  count: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      variants={gridItem}
      onClick={onOpen}
      aria-label={`Ouvrir rubrique ${titre}`}
      className="group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-3 text-left shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-2xl" />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
            {titre}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[12px] text-slate-600 dark:text-zinc-300">
            {shortDesc(description || "—")}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-[10px] font-extrabold text-white dark:bg-white dark:text-zinc-900">
            {count} choix
          </span>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition group-hover:translate-x-0.5 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
});

export default RubriqueCard;
