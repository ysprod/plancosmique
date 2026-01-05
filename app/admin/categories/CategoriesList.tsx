import { AnimatePresence, motion } from "framer-motion";
import { EditCategoryCardPro } from "@/components/admin/categories/EditCategoryCardPro";
import { ReadCategoryCardPro } from "@/components/admin/categories/ReadCategoryCardPro";
import { SkeletonList } from "@/components/admin/categories/SkeletonList";
import React from "react";
import { Rubrique } from "@/lib/interfaces";

interface CategoriesListProps {
    categories: any[];
    rubriques: Rubrique[];
    categoriesLoading: boolean;
    rubriquesLoading: boolean;
    editingId: string | null;
    startEdit: (id: string) => void;
    stopEdit: () => void;
    saveEdit: (id: string, patch: any) => void;
    handleDeleteCategory: (id: string) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
    categories,
    rubriques,
    categoriesLoading,
    rubriquesLoading,
    editingId,
    startEdit,
    stopEdit,
    saveEdit,
    handleDeleteCategory,
}) => {
    if (categoriesLoading) return <SkeletonList />;
    if (categories.length === 0)
        return (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                Aucune catégorie pour le moment. Créez-en une au-dessus.
            </div>
        );
    return (
        <AnimatePresence initial={false}>
            {categories.map((cat) => (
                <motion.div
                    key={cat.id}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                    {editingId === cat.id ? (
                        <EditCategoryCardPro
                            cat={cat}
                            rubriques={rubriques ?? []}
                            loadingRubriques={rubriquesLoading}
                            onCancel={stopEdit}
                            onSave={saveEdit}
                        />
                    ) : (
                        <ReadCategoryCardPro
                            cat={cat}
                            onEdit={startEdit}
                            onDelete={handleDeleteCategory}
                        />
                    )}
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export default CategoriesList;