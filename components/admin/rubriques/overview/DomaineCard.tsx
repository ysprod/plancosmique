"use client";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DomaineCardHeader } from './DomaineCardHeader';
import { RubriquesView } from './RubriquesView';
import { RubriqueDetailView } from './RubriqueDetailView';
import { ChoiceDetailView } from './ChoiceDetailView';
import { useDomaineCardNavigation } from '@/hooks/admin/rubriques/useDomaineCardNavigation';

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

export default function DomaineCardPremium({ domaine }: { domaine: any; }) {
  const rubriques = useMemo(() =>
    Array.isArray(domaine?.rubriques) ? domaine.rubriques : [],
    [domaine]
  );

  const {
    view, currentRubrique, currentChoice, choices,
    openRubrique, openChoice, goBack,
  } = useDomaineCardNavigation(rubriques);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
      <DomaineCardHeader
        domaine={domaine}
        rubriquesCount={rubriques.length}
        showBackButton={view.name !== "rubriques"}
        onBack={goBack}
      />

      <div className="border-t border-slate-200 dark:border-zinc-800" />

      <div className="p-3 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          {view.name === "rubriques" && (
            <motion.div
              key="view-rubriques"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RubriquesView rubriques={rubriques} onOpenRubrique={openRubrique} />
            </motion.div>
          )}

          {view.name === "rubrique" && (
            <motion.div
              key={`view-rubrique-${view.rubriqueId}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <RubriqueDetailView
                rubrique={currentRubrique}
                choices={choices}
                onOpenChoice={openChoice}
              />
            </motion.div>
          )}

          {view.name === "choice" && (
            <motion.div
              key={`view-choice-${view.rubriqueId}-${view.choiceId}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ChoiceDetailView choice={currentChoice} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}