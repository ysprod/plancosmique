"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import RubriqueCard from "./RubriqueCard";
import { pageVariants, gridItem } from "./animations";

const RubriquesView = memo(function RubriquesView({
  rubriques,
  onOpenRubrique,
}: {
  rubriques: Array<{ id: string; titre: string; description: string; count: number }>;
  onOpenRubrique: (id: string) => void;
}) {
  return (
    <motion.div
      key="rubriques"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.18 }}
    >
      {rubriques.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-center text-[12px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
          Aucune rubrique associée (vérifie que <code>consultation.rubrique</code> contient bien l'ID de la rubrique).
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-2 sm:gap-3"
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.04 }}
        >
          {rubriques.map((r) => (
            <RubriqueCard
              key={r.id}
              titre={r.titre}
              description={r.description}
              count={r.count}
              onOpen={() => onOpenRubrique(r.id)}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
});

export default RubriquesView;
