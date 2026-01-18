"use client";
import { clampText, cx, getStableRubriqueId, hashString } from "@/lib/functions";
import type { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: { duration: 0.2, ease: "easeOut" } 
  },
  tap: { scale: 0.98 },
} as const;

const glowVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const gradients = [
  { 
    border: "from-pink-500/60 via-rose-500/60 to-red-500/60",
    bg: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
    accent: "from-pink-600 to-rose-600",
    glow: "bg-pink-500/20 dark:bg-pink-500/10"
  },
  { 
    border: "from-violet-500/60 via-purple-500/60 to-indigo-500/60",
    bg: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    accent: "from-violet-600 to-purple-600",
    glow: "bg-violet-500/20 dark:bg-violet-500/10"
  },
  { 
    border: "from-cyan-500/60 via-teal-500/60 to-emerald-500/60",
    bg: "from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30",
    accent: "from-cyan-600 to-teal-600",
    glow: "bg-cyan-500/20 dark:bg-cyan-500/10"
  },
  { 
    border: "from-fuchsia-500/60 via-purple-500/60 to-violet-500/60",
    bg: "from-fuchsia-50 to-purple-50 dark:from-fuchsia-950/30 dark:to-purple-950/30",
    accent: "from-fuchsia-600 to-purple-600",
    glow: "bg-fuchsia-500/20 dark:bg-fuchsia-500/10"
  },
  { 
    border: "from-amber-500/60 via-orange-500/60 to-yellow-500/60",
    bg: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    accent: "from-amber-600 to-orange-600",
    glow: "bg-amber-500/20 dark:bg-amber-500/10"
  },
] as const;

function getGradientFromId(id: string) {
  const h = hashString(id);
  return gradients[h % gradients.length];
}

export const RubriqueCard = memo(
  function RubriqueCard({
    rub,
    onOpen,
  }: {
    rub: Rubrique;
    onOpen: (id: string) => void;
  }) {
    const derived = useMemo(() => {
      const id = getStableRubriqueId(rub);
      const title = typeof rub.titre === "string" ? rub.titre.trim() : "Rubrique";
      const desc = rub.description ? clampText(rub.description, 120) : "";
      const theme = getGradientFromId(id);
      const choicesCount = Array.isArray((rub as any)?.consultationChoices)
        ? (rub as any).consultationChoices.length : 0;
      return { id, title, desc, theme, choicesCount };
    }, [rub._id, rub.titre, rub.description, (rub as any)?.consultationChoices]);

    const handleClick = useCallback(() => {
      onOpen(derived.id);
    }, [derived.id, onOpen]);

    return (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={itemVariants}
        initial="initial"
        animate="animate"
        className={cx(
          "group relative overflow-hidden rounded-2xl cursor-pointer",
          "backdrop-blur-sm transition-all duration-300"
        )}
        onClick={handleClick}
        layoutId={`rubrique-${derived.id}`}
        role="button"
        tabIndex={0}
        aria-label={`Découvrir ${derived.title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Glow effect */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className={cx(
            "absolute inset-0 blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            derived.theme.glow
          )}
        />

        {/* Gradient border */}
        <div className={cx(
          "absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br",
          derived.theme.border,
          "opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        )}>
          <div className={cx(
            "h-full w-full rounded-2xl bg-gradient-to-br",
            derived.theme.bg
          )} />
        </div>

        {/* Content */}
        <div className="relative p-5 sm:p-6 flex flex-col items-center text-center gap-4 min-h-[180px] sm:min-h-[200px]">
          {/* Icon */}
          <div className={cx(
            "w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br flex items-center justify-center",
            derived.theme.accent,
            "shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
          )}>
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>

          {/* Title */}
          <h3 className={cx(
            "font-bold text-lg sm:text-xl leading-tight",
            "bg-gradient-to-br bg-clip-text text-transparent",
            derived.theme.accent,
            "group-hover:scale-105 transition-transform duration-300"
          )}>
            {derived.title}
          </h3>

          {/* Description */}
          {derived.desc && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 px-2">
              {derived.desc}
            </p>
          )}

          {/* Badge */}
          {derived.choicesCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={cx(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
                "bg-gradient-to-r text-white shadow-md",
                derived.theme.accent
              )}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{derived.choicesCount} consultation{derived.choicesCount > 1 ? 's' : ''}</span>
            </motion.div>
          )}

          {/* CTA shimmer */}
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
            <motion.div
              className={cx("h-full w-1/3 bg-gradient-to-r", derived.theme.accent)}
              animate={{
                x: ['-100%', '400%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
      </motion.div>
    );
  },
  (prev, next) => {
    if (prev.onOpen !== next.onOpen) return false;
    const p: any = prev.rub;
    const n: any = next.rub;
    if (p === n) return true;
    return (
      String(p?._id ?? "") === String(n?._id ?? "") &&
      String(p?.titre ?? "") === String(n?.titre ?? "") &&
      String(p?.description ?? "") === String(n?.description ?? "") &&
      (Array.isArray(p?.consultationChoices) ? p.consultationChoices.length : -1) ===
      (Array.isArray(n?.consultationChoices) ? n.consultationChoices.length : -1)
    );
  }
);