"use client";
import CategoryFormClient from "@/components/categorie/CategoryFormClient";
import CategoryFormClientGroupe from "@/components/categorie/CategoryFormClientGroupe";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";
import { useCategory } from "@/hooks/categorie/useCategory";
import { notFound, useParams, useSearchParams } from "next/navigation";

export default function CategoryFormPage() {
    const params = useParams();
    const searchParams = useSearchParams();

    const id = params?.id as string;
    const consultationId = searchParams?.get('consultationId');

    if (!id || !consultationId) return notFound();

    const { category, loading } = useCategory(id);

    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryFormClientGroupe category={category} consultationId={consultationId} />;
}
