"use client";
import type { CategorieAdmin } from "@/lib/interfaces";
import { memo } from "react";
import CategoryConsultationLoading from "./CategoryConsultationLoading";
import { CategoryBodyChoix } from "./clientviewchoix/CategoryBodyChoix";
import { CategoryHeaderChoix } from "./clientviewchoix/CategoryHeaderChoix";
import { useCategoryClientViewChoix } from "./clientviewchoix/useCategoryClientViewChoix";

const CategoryClientViewWrapperMultiPageChoix = memo(
    function CategoryClientViewWrapperMultiPageChoix({ category, }: { category: CategorieAdmin; }) {
        const { stats, rubriqueCourante, loading, handleSelectConsultation, handleBack, } = useCategoryClientViewChoix({ category });

        if (loading) { return <CategoryConsultationLoading />; }

        return (
            <main className="flex flex-col items-center justify-center px-2 py-4 sm:px-4 sm:py-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300"        >
                <CategoryHeaderChoix
                    category={category}
                    stats={stats}
                    onBack={handleBack}
                />
                <section className="mt-2 w-full max-w-3xl flex flex-col items-center justify-center">
                    <CategoryBodyChoix
                        rubriqueCourante={rubriqueCourante!}
                        handleSelectConsultation={handleSelectConsultation}
                    />
                </section>
            </main>
        );
    });

export default CategoryClientViewWrapperMultiPageChoix;