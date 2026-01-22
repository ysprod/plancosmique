'use client';
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CategoryTitle from "../CategoryTitle";
import CategoryDescription from "../CategoryDescription";
import { itemVariants } from "../../analysehoroscope/constants";
import React from "react";

interface CategoryHeaderChoixProps {
    category: { nom?: string; description?: string };
    stats?: { total: number; completed: number; pending: number };
    onBack: () => void;
}

export const CategoryHeaderChoix = React.memo(function CategoryHeaderChoix({
    category,
    stats,
    onBack,
}: CategoryHeaderChoixProps) {
    const reduceMotion = useReducedMotion();
    return (
        <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center gap-2 sm:gap-4">
            <AnimatePresence mode="wait">
                <motion.div
                    variants={itemVariants}
                    className="w-full space-y-2 sm:space-y-3"
                >
                    <CategoryTitle title={category.nom!} />
                    <CategoryDescription description={category.description!} />
                    {stats && (
                        <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-[12px] font-extrabold text-slate-700 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-zinc-200 animate-fade-in">
                            <span>{stats.total} choix</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
                            <span className="text-emerald-700 dark:text-emerald-300">{stats.completed} terminés</span>
                            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-zinc-700" />
                            <span className="text-amber-700 dark:text-amber-300">{stats.pending} en attente</span>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
            <motion.button
                type="button"
                onClick={onBack}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                className="mt-1 mb-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-extrabold text-white shadow-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 dark:focus-visible:ring-violet-900/40 animate-fade-in"
                aria-label="Retour"
            >
                ← Retour
            </motion.button>
        </section>
    );
});