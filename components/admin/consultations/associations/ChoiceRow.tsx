"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { shortDesc } from "@/hooks/admin/useAssociationsUtils";
import { gridItem } from "./animations";

const ChoiceRow = memo(function ChoiceRow({
  title,
  description,
  onOpen,
}: {
  title: string;
  description: string;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Ouvrir choix ${title}`}
      className="w-full rounded-3xl border border-slate-200 bg-white/70 p-3 text-left shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40"
      variants={gridItem}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-extrabold text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[12px] text-slate-600 dark:text-zinc-300">
            {shortDesc(description || "—", 140)}
          </div>
        </div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
});

export default ChoiceRow;
