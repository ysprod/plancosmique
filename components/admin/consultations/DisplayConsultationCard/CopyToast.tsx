import { AnimatePresence, motion } from "framer-motion";
import { toastVariants } from "./motionVariants";
import { cx } from "@/lib/functions";

export function CopyToast({ copied }: { copied: boolean }) {
  return (
    <AnimatePresence>
      {copied && (
        <motion.div
          variants={toastVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cx(
            "pointer-events-none absolute left-1/2 top-16 z-20 -translate-x-1/2",
            "rounded-full border px-3 py-1 text-[11px] font-extrabold shadow-sm",
            "border-slate-200 bg-white/90 text-slate-800",
            "dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100"
          )}
        >
          Analyse copiée
        </motion.div>
      )}
    </AnimatePresence>
  );
}
