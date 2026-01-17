'use client';
import { AnimatePresence, motion } from "framer-motion";
import { EditCategoryCardPro } from "@/components/admin/categories/EditCategoryCardPro";
import { ReadCategoryCardPro } from "@/components/admin/categories/ReadCategoryCardPro";
import { SkeletonList } from "@/components/admin/categories/SkeletonList";
import React, { useState, useMemo } from "react";
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

const CATEGORY_ICONS = ['📚', '🎯', '⚡', '🌟', '💼', '🎨', '🔮', '🌈', '💎', '🎭', '🏆', '🎪', '🎸', '🎬', '📱', '💡', '🚀', '🌸', '🎁', '⭐'];

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
    const [page, setPage] = useState(1);
    const perPage = 3;
    const totalPages = Math.ceil(categories.length / perPage);
    
    const paginatedCategories = useMemo(() => {
        const start = (page - 1) * perPage;
        return categories.slice(start, start + perPage);
    }, [categories, page]);
    
    const getCategoryIcon = (index: number) => {
        return CATEGORY_ICONS[index % CATEGORY_ICONS.length];
    };
    
    if (categoriesLoading) return <SkeletonList />;
    if (categories.length === 0)
        return (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                Aucune catégorie pour le moment. Créez-en une au-dessus.
            </div>
        );
    return (
        <div className="space-y-4 sm:space-y-6">
            <AnimatePresence initial={false}>
                {paginatedCategories.map((cat, index) => {
                    const actualIndex = (page - 1) * perPage + index;
                    return (
                        <motion.div
                            key={cat.id}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            layout
                            className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 relative"
                        >
                            <div className="absolute top-3 left-3 text-3xl opacity-80 select-none">
                                {getCategoryIcon(actualIndex)}
                            </div>
                            <div className="pl-12">
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
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
            
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                    >
                        ← Précédent
                    </button>

                    <span className="px-3 py-1 text-sm font-medium text-slate-700 dark:text-zinc-200">
                        {page} / {totalPages}
                    </span>
                    
                    <button
                        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                    >
                        Suivant →
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoriesList;