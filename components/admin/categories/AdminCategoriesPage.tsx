"use client";
import { Banner } from "@/components/admin/categories/Banner";
import CategoriesErrorAlert from "@/components/admin/categories/CategoriesErrorAlert";
import CategoriesList from "@/components/admin/categories/CategoriesList";
import CreateCategoryButton from "@/components/admin/categories/CreateCategoryButton";
import ReloadButtons from "@/components/admin/categories/ReloadButtons";
import TopBar from "@/components/admin/categories/TopBar";
import { useAdminCategoriesView } from "@/hooks/admin/useAdminCategoriesView";

export default function AdminCategoriesPage() {
    const {
        rubriques, categories, categoriesLoading, categoriesError, editingId,
        rubriquesLoading, rubriquesError, counts, banner, startEdit, stopEdit,
        handleDeleteCategory, saveEdit, fetchCategories, fetchRubriques,
    } = useAdminCategoriesView();

    return (
        <div className="w-full mx-auto max-w-4xl px-3 py-5 sm:px-4 sm:py-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
            <TopBar counts={counts} />
            <ReloadButtons
                fetchCategories={fetchCategories}
                fetchRubriques={fetchRubriques}
                categoriesLoading={categoriesLoading}
                rubriquesLoading={rubriquesLoading}
            />
            <Banner banner={banner} />

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
    );
}