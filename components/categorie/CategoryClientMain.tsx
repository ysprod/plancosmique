'use client';
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RubriqueView } from "./RubriqueView";
import CategoryEmptyState from "./CategoryEmptyState";
import CategoryRubriquesList from "./CategoryRubriquesList";
import { Rubrique, RubriqueOrNone } from "@/lib/interfaces";

interface CategoryClientMainProps {
    ui: {
        hasCurrent: boolean;
        hasRubriques: boolean;
        rubriqueCount: number;
    };
    rubriqueCourante: RubriqueOrNone;
    rubriques: Rubrique[];
    openRubriqueById: (id: string, consultationId: string) => void;
    pageVariants: any;
}

const CategoryClientMain: React.FC<CategoryClientMainProps> = ({ ui, rubriqueCourante, rubriques, openRubriqueById, pageVariants }) => (
    <AnimatePresence mode="wait" initial={false}>
        {ui.hasCurrent ? (
            <motion.div
                key="rubriqueView"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-3"
            >
                <RubriqueView rubrique={rubriqueCourante!} />
            </motion.div>
        ) : !ui.hasRubriques ? (
            <motion.div
                key="empty"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-3"
            >
                <CategoryEmptyState />
            </motion.div>
        ) : (
            <motion.div
                key="list"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="mt-3"
            >
                <CategoryRubriquesList   onOpen={openRubriqueById} />
            </motion.div>
        )}
    </AnimatePresence>
);

export default CategoryClientMain;