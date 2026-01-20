"use client";
import CategoryGenereAnalyseClient from "@/components/categorie/CategoryGenereAnalyseClient";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";
import { useCategory } from "@/hooks/categorie/useCategory";
import { notFound, useParams, useSearchParams } from "next/navigation";

export default function CategoryGenereAnalysePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params?.id as string;
    const consultationId = searchParams?.get('consultationId');

    const { category, loading } = useCategory(id);

    if (!id || !consultationId) return notFound();
    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryGenereAnalyseClient category={category} consultationId={consultationId} />;
}