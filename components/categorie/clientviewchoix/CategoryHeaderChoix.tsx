'use client';
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CategoryTitle from "../CategoryTitle";
import CategoryDescription from "../CategoryDescription";
import { itemVariants } from "../../analysehoroscope/constants";
import React from "react";

interface CategoryHeaderChoixProps {
    category: { nom?: string; description?: string };
    onBack: () => void;
}

export const CategoryHeaderChoix = React.memo(function CategoryHeaderChoix({
    category,
    onBack,
}: CategoryHeaderChoixProps) {
    const reduceMotion = useReducedMotion();
    return (
        <section className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-2 sm:gap-4">
            <AnimatePresence mode="wait">
                <motion.div
                    variants={itemVariants}
                    className="w-full space-y-2 sm:space-y-3"
                >
                    <CategoryTitle title={category.nom!} />
                    <CategoryDescription description={category.description!} />
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