"use client";
import type { CategorieAdmin } from "@/lib/interfaces";
import { memo } from "react";
import { CategoryBodyChoix } from "./clientviewchoix/CategoryBodyChoix";
import { CategoryHeaderChoix } from "./clientviewchoix/CategoryHeaderChoix";
import { useCategoryClientViewChoix } from "./clientviewchoix/useCategoryClientViewChoix";
import CategoryConsultationLoading from "./CategoryConsultationLoading";

const CategoryClientViewWrapperMultiPageChoix = memo(
    function CategoryClientViewWrapperMultiPageChoix({ category, }: { category: CategorieAdmin; }) {
        const { rubriqueCourante, loading, handleSelectConsultation, handleBack, } = useCategoryClientViewChoix({ category });
       if (loading) { return <CategoryConsultationLoading />; }

        return (
            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
                <CategoryHeaderChoix
                    category={category}
                    onBack={handleBack}
                />
                <CategoryBodyChoix
                    rubriqueCourante={rubriqueCourante!}
                    handleSelectConsultation={handleSelectConsultation}
                />
            </div>
        );
    });

export default CategoryClientViewWrapperMultiPageChoix;