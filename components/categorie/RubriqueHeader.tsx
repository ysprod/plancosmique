'use client';
import { useRubriqueDerived } from "@/hooks/commons/useRubriqueDerived";
import { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import React, { memo } from "react";

interface RubriqueHeaderProps {
  rubrique: Rubrique;
}

const headerVariants = {
  initial: { opacity: 0, y: 18, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22, duration: 0.5 },
  },
  exit: { opacity: 0, y: -8, scale: 0.98 },
};

const RubriqueHeader: React.FC<RubriqueHeaderProps> = memo(({ rubrique }) => {
  const derived = useRubriqueDerived(rubrique);

  return (
    <motion.div
      variants={headerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex flex-col items-center justify-center w-full mb-6 sm:mb-8 lg:mb-10 px-4 sm:px-6 lg:px-8"
      layoutId="rubrique-header"
    >
      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <div className="flex items-center justify-center gap-2 w-full">
          <motion.h1
            className="text-xl xs:text-2xl sm:text-2xl md:text-2xl font-extrabold tracking-tight text-center text-slate-900 dark:text-white px-1 py-0.5 rounded select-none bg-gradient-to-r from-violet-600/10 via-indigo-500/10 to-amber-500/10 dark:from-violet-400/10 dark:to-indigo-400/10 shadow-sm"
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            style={{ letterSpacing: "-0.01em", WebkitTextStroke: "0.5px #a5b4fc33" }}
          >
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              {derived.title}
            </span>
          </motion.h1>

        </div>
        {derived.desc && (
          <motion.p
            className="text-base xs:text-base sm:text-base leading-relaxed text-center text-slate-600/90 dark:text-zinc-300/90 max-w-2xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {derived.desc}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
});

RubriqueHeader.displayName = "RubriqueHeader";

export default RubriqueHeader;