"use client";
import CategoryFormClientGroupe from "@/components/categorie/CategoryFormClientGroupe";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";
import { useCategory } from "@/hooks/categorie/useCategory";
import { notFound } from "next/navigation";

export default function CategoryFormGroupePageWrapper({ id, consultationId }: { id: string; consultationId: string }) {
    if (!id || !consultationId) return notFound();

    const { category, loading } = useCategory(id);
    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryFormClientGroupe category={category} consultationId={consultationId} />;
}
