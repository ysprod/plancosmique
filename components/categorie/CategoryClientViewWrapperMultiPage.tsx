"use client";
import { useCategoryClientView } from "@/hooks/categorie/useCategoryClientViewMain";
import type { CategorieAdmin } from "@/lib/interfaces";
import CategoryEmptyState from "./CategoryEmptyState";
import CategoryHeader from "./CategoryHeader";
import CategoryRubriquesList from "./CategoryRubriquesList";
import { RubriqueViewMultiPage } from "./RubriqueViewMultiPage";

export default function CategoryClientViewWrapperMultiPage({ category }: { category: CategorieAdmin }) {
    const { rubriqueCourante, setRubriqueCourante, ui, handleOpenRubriqueById } = useCategoryClientView(category);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
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
                    category={category}
                    onOpen={handleOpenRubriqueById}
                />
            )}
        </div>
    );
}