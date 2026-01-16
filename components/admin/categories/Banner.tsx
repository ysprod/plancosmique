'use client';
import { motion, Variants } from "framer-motion";
import React from "react";
import { BannerState } from "@/hooks/categories/useAdminCategoriesPage";
import { cx } from "@/lib/functions";

const bannerVariants: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
}; 

export const Banner = ({ banner }: { banner: BannerState }) => {
  if (!banner) return null;
  const style =
    banner.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-900/20 dark:text-emerald-100"
      : banner.type === "error"
        ? "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100"
        : "border-indigo-200 bg-indigo-50 text-indigo-900 dark:border-indigo-900/40 dark:bg-indigo-900/20 dark:text-indigo-100";

  return (
    <motion.div
      variants={bannerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cx("mb-3 rounded-2xl border px-3 py-2 text-xs font-semibold", style)}
      role="status"
      aria-live="polite"
    >
      {banner.message}
    </motion.div>
  );
};
