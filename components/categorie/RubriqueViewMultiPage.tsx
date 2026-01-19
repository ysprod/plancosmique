"use client";
import { useRubriqueSelection } from "@/hooks/categorie/useRubriqueSelection";
import type { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { memo, useMemo } from "react";
import RubriqueConsultationCard from "./RubriqueConsultationCard";
import RubriqueErrorDisplay from "./RubriqueErrorDisplay";
import RubriqueHeader from "./RubriqueHeader";
import RubriqueLoadingState from "./RubriqueLoadingState";

interface RubriqueViewMultiPageProps {
  rubrique: Rubrique;
  categoryId: string;
}

export const RubriqueViewMultiPage = memo<RubriqueViewMultiPageProps>(
  function RubriqueViewMultiPage({ rubrique, categoryId }) {
    const {
      enrichedChoices, loading, apiError, creatingConsultation,
      handleSelectConsultation
    } = useRubriqueSelection(rubrique, categoryId);

    // Trier par ordre et calculer les stats
    const sortedChoices = useMemo(() => {
      return [...enrichedChoices].sort((a, b) => {
        const orderA = a.choice.order ?? 999;
        const orderB = b.choice.order ?? 999;
        return orderA - orderB;
      });
    }, [enrichedChoices]);

    const stats = useMemo(() => {
      const total = sortedChoices.length;
      const consulted = sortedChoices.filter(c => c.status.buttonStatus !== 'CONSULTER').length;
      const pending = sortedChoices.filter(c => c.status.buttonStatus === 'RÉPONSE EN ATTENTE').length;
      const completed = sortedChoices.filter(c => c.status.buttonStatus === "VOIR L'ANALYSE").length;
      return { total, consulted, pending, completed };
    }, [sortedChoices]);

    if (loading || creatingConsultation) {
      return (
        <div className="relative mx-auto max-w-4xl">
          <RubriqueHeader rubrique={rubrique} />
          <RubriqueLoadingState isCreating={creatingConsultation} />
        </div>
      );
    }

    if (apiError) {
      return (
        <div className="relative mx-auto max-w-4xl">
          <RubriqueHeader rubrique={rubrique} />
          <RubriqueErrorDisplay error={apiError} />
        </div>
      );
    }

    return (
      <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <RubriqueHeader rubrique={rubrique} />
        
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-950/50 dark:to-purple-950/50 border border-violet-200 dark:border-violet-800">
            <BookOpen className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-sm font-semibold text-violet-900 dark:text-violet-100">
              {stats.total} consultation{stats.total > 1 ? 's' : ''}
            </span>
          </div>
          
          {stats.completed > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                {stats.completed} terminée{stats.completed > 1 ? 's' : ''}
              </span>
            </div>
          )}
          
          {stats.pending > 0 && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 border border-amber-200 dark:border-amber-800">
              <span className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                {stats.pending} en attente
              </span>
            </div>
          )}
        </motion.div>

        {/* Grid avec animations stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2
              }
            }
          }}
          className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
        >
          {sortedChoices.map((enriched, idx) => (
            <motion.div
              key={enriched.choice._id || idx}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 24
                  }
                }
              }}
            >
              <RubriqueConsultationCard
                enrichedChoice={enriched}
                onSelect={() => handleSelectConsultation(enriched.choice)}
                index={idx}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);