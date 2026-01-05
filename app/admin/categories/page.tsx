"use client";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import TopBar from "./components/TopBar";
import ReloadButtons from "./components/ReloadButtons";
import CreateCategoryButton from "./components/CreateCategoryButton";
import CategoriesList from "./components/CategoriesList";
import CategoriesErrorAlert from "./components/CategoriesErrorAlert";
import { Banner } from "@/components/admin/categories/Banner";
import { useAdminCategoriesView } from "./useAdminCategoriesView";

export default function AdminCategoriesPage() {
    const reducedMotion = useReducedMotion();
    const {
        rubriques,
        categories,
        categoriesLoading,
        categoriesError,
        rubriquesLoading,
        rubriquesError,
        banner,
        editingId,
        startEdit,
        stopEdit,
        handleDeleteCategory,
        saveEdit,
        fetchCategories,
        fetchRubriques,
        counts,
    } = useAdminCategoriesView();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
            <div className="mx-auto max-w-3xl px-3 py-5 sm:px-4 sm:py-8">
                <TopBar counts={counts} reducedMotion={reducedMotion!} />
                <ReloadButtons
                    fetchCategories={fetchCategories}
                    fetchRubriques={fetchRubriques}
                    categoriesLoading={categoriesLoading}
                    rubriquesLoading={rubriquesLoading}
                />

                <AnimatePresence>
                    <Banner banner={banner} />
                </AnimatePresence>

                {categoriesError && <CategoriesErrorAlert message={categoriesError} />}
                {rubriquesError && <CategoriesErrorAlert message={rubriquesError} />}

                <CreateCategoryButton />

                <CategoriesList
                    categories={categories}
                    rubriques={rubriques}
                    categoriesLoading={categoriesLoading}
                    rubriquesLoading={rubriquesLoading}
                    editingId={editingId}
                    startEdit={startEdit}
                    stopEdit={stopEdit}
                    saveEdit={saveEdit}
                    handleDeleteCategory={handleDeleteCategory}
                />
            </div>
        </div>
    );
}