"use client";
import { cx } from "@/lib/functions";
import type { CategorieAdmin } from "@/lib/interfaces";
import { memo } from "react";
import CategoryDescription from "./CategoryDescription";
import CategoryRubriquesList from "./CategoryRubriquesList";
import CategoryTitle from "./CategoryTitle";
import { useCategoryClientViewWrapper } from "./clientview/useCategoryClientViewWrapper";

const CategoryClientViewWrapperMultiPage = memo(
    function CategoryClientViewWrapperMultiPage({ category, }: { category: CategorieAdmin; }) {
        const { handleOpenRubriqueById, title, description } = useCategoryClientViewWrapper(category);

        return (
            <main
                className={cx(
                    "w-full flex items-center justify-center",
                    "bg-gradient-to-br from-white via-gray-50 to-gray-100",
                    "dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
                    "transition-colors duration-100"
                )}
            >
                <div className="mx-auto w-full max-w-4xl">
                    <div
                        className={cx(
                            "relative overflow-hidden rounded-[28px] border",
                            "border-slate-200/70 bg-white/70 shadow-xl shadow-black/5 backdrop-blur",
                            "dark:border-zinc-800/70 dark:bg-zinc-950/50 dark:shadow-black/35"
                        )}
                    >
                        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500/70" />

                        <header
                            className={cx(
                                "px-4 pt-5 pb-3 sm:px-6 sm:pt-7 sm:pb-4",
                                "flex flex-col items-center justify-center text-center gap-2"
                            )}
                        >
                            <CategoryTitle title={title} />
                            <CategoryDescription description={description} />
                        </header>

                        <section className="px-3 pb-4 sm:px-6 sm:pb-6">
                            <div className="mx-auto flex w-full flex-col items-center justify-center">
                                <div className="w-full flex flex-col items-center justify-center animate-fade-in">
                                    <CategoryRubriquesList category={category} onOpen={handleOpenRubriqueById} />
                                </div>
                            </div>
                        </section>
                        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />
                        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                    </div>
                </div>
            </main>
        );
    });

export default CategoryClientViewWrapperMultiPage;