"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { chipVariants } from "./animations";

const AlternativePill = memo(function AlternativePill({
  label,
  emoji,
  color,
  text,
}: {
  label: string;
  emoji: string;
  color: string;
  text: string;
}) {
  return (
    <motion.div
      variants={chipVariants}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-2 text-[12px] font-semibold text-slate-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
    >
      <span
        className={`inline-flex items-center rounded-full bg-gradient-to-r ${color} px-2 py-0.5 text-[11px] font-extrabold text-white`}
      >
        {emoji} {label}
      </span>
      <span className="truncate">{text}</span>
    </motion.div>
  );
});

export default AlternativePill;
