"use client";
import CategoryClientViewWrapperMultiPage from "@/components/categorie/CategoryClientViewWrapperMultiPage";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";
import { useCategory } from "@/hooks/categorie/useCategory";
import { useParams, notFound } from "next/navigation";

export default function CategorySelectionPage() {
    const params = useParams();
    const id = params?.id as string;
    const { category, loading } = useCategory(id);

    if (!id) return notFound();
    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryClientViewWrapperMultiPage category={category} />;
}
