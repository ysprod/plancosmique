"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { cx } from "@/lib/functions";

export type BannerType = "success" | "error" | "info";
export type Banner = { type: BannerType; message: string } | null;

const viewVariants: Variants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.16 } },
};

export default function Banner({ banner }: { banner: Banner }) {
  if (!banner) return null;
  
  return (
    <motion.div
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx(
        "mb-4 rounded-2xl border px-3 py-2 text-xs font-semibold",
        banner.type === "success" &&
        "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100",
        banner.type === "error" &&
        "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100",
        banner.type === "info" &&
        "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-900/20 dark:text-indigo-100"
      )}
      role="status"
      aria-live="polite"
    >
      {banner.message}
    </motion.div>
  );
}