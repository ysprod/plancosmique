"use client";
import { getCategory } from "@/lib/api/services/categories.service";
import { notFound } from "next/navigation";
import CategoryClientViewWrapper from "@/components/categorie/CategoryClientViewWrapper";

interface PageProps {
    params: { id: string };
}

export default async function CategoryPage({ params }: PageProps) {
    const id = params?.id;
    if (!id) return notFound();
    const category = await getCategory(id);
    if (!category || !category._id) return notFound();
    return <CategoryClientViewWrapper category={category} />;
}