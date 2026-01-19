"use client";
import { useCategoryClientView } from "@/hooks/categorie/useCategoryClientViewMain";
import type { CategorieAdmin } from "@/lib/interfaces";
import CategoryEmptyState from "./CategoryEmptyState";
import CategoryHeader from "./CategoryHeader";
import CategoryNotSelected from "./CategoryNotSelected";
import CategoryRubriquesList from "./CategoryRubriquesList";
import { RubriqueViewMultiPage } from "./RubriqueViewMultiPage";

export default function CategoryClientViewWrapperMultiPage({ category }: { category: CategorieAdmin }) {
    const { rubriques, rubriqueCourante, setRubriqueCourante, ui, handleOpenRubriqueById } = useCategoryClientView(category);
console.log("CategoryClientViewWrapperMultiPage rendered with category:", category);

    if (!category) return <CategoryNotSelected />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto px-3 sm:px-6">
                <CategoryHeader
                    category={category}
                    rubriqueCourante={rubriqueCourante}
                    closeRubrique={() => setRubriqueCourante(null)}
                />
                {ui.hasCurrent ? (
                    <RubriqueViewMultiPage
                        rubrique={rubriqueCourante!}
                        categoryId={category._id}
                    />
                ) : !ui.hasRubriques ? (
                    <CategoryEmptyState />
                ) : (
                    <CategoryRubriquesList
                        rubriques={rubriques}
                        onOpen={handleOpenRubriqueById}
                    />
                )}
            </div>
        </div>
    );
}