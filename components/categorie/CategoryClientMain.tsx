import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RubriqueView } from "./RubriqueView";
import CategoryEmptyState from "./CategoryEmptyState";
import CategoryRubriquesList from "./CategoryRubriquesList";

interface CategoryClientMainProps {
    ui: {
        hasCurrent: boolean;
        hasRubriques: boolean;
        rubriqueCount: number;
    };
    rubriqueCourante: any;
    rubriques: any[];
    openRubriqueById: (id: string) => void;
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
                <RubriqueView rubrique={rubriqueCourante} />
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
                <CategoryEmptyState variants={pageVariants} />
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
                <CategoryRubriquesList rubriques={rubriques} onOpen={openRubriqueById} />
            </motion.div>
        )}
    </AnimatePresence>
);

export default CategoryClientMain;