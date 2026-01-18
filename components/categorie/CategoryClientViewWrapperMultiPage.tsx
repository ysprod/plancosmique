"use client";
import { motion, AnimatePresence } from "framer-motion";
import CategoryHeader from "./CategoryHeader";
import { useCategoryClientView } from "@/hooks/categorie/useCategoryClientViewMain";
import CategoryNotSelected from "./CategoryNotSelected";
import CategoryRubriquesList from "./CategoryRubriquesList";
import CategoryEmptyState from "./CategoryEmptyState";
import { RubriqueViewMultiPage } from "./RubriqueViewMultiPage";
import type { CategorieAdmin } from "@/lib/interfaces";

const pageVariants = {
    initial: { opacity: 0, y: 10, filter: "blur(2px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.18 } },
} as const;

export default function CategoryClientViewWrapperMultiPage({ category }: { category: CategorieAdmin }) {
    const { rubriques, rubriqueCourante, setRubriqueCourante, ui, handleOpenRubriqueById } = useCategoryClientView(category);

    if (!category) return <CategoryNotSelected />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto px-3 sm:px-6">
                <CategoryHeader
                    category={category}
                    rubriqueCourante={rubriqueCourante}
                    closeRubrique={() => setRubriqueCourante(null)}
                />

                <AnimatePresence mode="wait" initial={false}>
                    {ui.hasCurrent ? (
                        <RubriqueViewMultiPage
                            rubrique={rubriqueCourante!}
                            categoryId={category._id}
                        />
                    ) : !ui.hasRubriques ? (
                    <CategoryEmptyState  />                       
                    ) : (
                         <CategoryRubriquesList
                                rubriques={rubriques}
                                onOpen={handleOpenRubriqueById}
                            />                       
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}