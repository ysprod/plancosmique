"use client";
import CategoryClientViewWrapperMultiPage from "@/components/categorie/CategoryClientViewWrapperMultiPage";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";
import { useCategory } from "@/hooks/categorie/useCategory";
import { notFound, useParams } from "next/navigation";

export default function CategorySelectionPage() {
    const params = useParams();
    const id = params?.id as string;
    if (!id) return notFound();

    const { category, loading } = useCategory(id);
    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryClientViewWrapperMultiPage category={category} />;
}