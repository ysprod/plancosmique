"use client";
import { Banner } from "@/components/admin/categories/Banner";
import { EditCategoryCardPro } from "@/components/admin/categories/EditCategoryCardPro";
import { ReadCategoryCardPro } from "@/components/admin/categories/ReadCategoryCardPro";
import { SkeletonList } from "@/components/admin/categories/SkeletonList";
import { useAdminCategoriesPage } from "@/hooks/useAdminCategoriesPage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import CreateCategoryButton from "./components/CreateCategoryButton";
import ReloadButtons from "./components/ReloadButtons";
import TopBar from "./components/TopBar";

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
    } = useAdminCategoriesPage();
    console.log("Rendering AdminCategoriesPage with categories:", categories);

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

                {categoriesError && (
                    <div className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{categoriesError}</span>
                        </div>
                    </div>
                )}

                {rubriquesError && (
                    <div className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-900 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{rubriquesError}</span>
                        </div>
                    </div>
                )}

                <CreateCategoryButton />

                <div className="space-y-3">
                    {categoriesLoading ? (
                        <SkeletonList />
                    ) : categories.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                            Aucune catégorie pour le moment. Créez-en une au-dessus.
                        </div>
                    ) : (
                        <AnimatePresence initial={false}>
                            {categories.map((cat) => (
                                <motion.div
                                    key={cat.id}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    layout={!reducedMotion}
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
                    )}
                </div>
            </div>
        </div>
    );
}