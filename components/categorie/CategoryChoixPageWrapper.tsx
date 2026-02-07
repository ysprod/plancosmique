"use client";
import CategoryClientViewWrapperMultiPageChoix from "@/components/categorie/CategoryClientViewWrapperMultiPageChoix";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";
import { useCategory } from "@/hooks/categorie/useCategory";
import { notFound } from "next/navigation";

export default function CategoryChoixPageWrapper({ id }: { id: string }) {
    if (!id) return notFound();

    const { category, loading } = useCategory(id);
    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryClientViewWrapperMultiPageChoix category={category} />;
}
