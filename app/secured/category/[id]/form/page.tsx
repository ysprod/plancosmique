"use client";
import CategoryFormClient from "@/components/categorie/CategoryFormClient";
import { getCategory } from "@/lib/api/services/categories.service";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { CategorieAdmin } from "@/lib/interfaces";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";

export default function CategoryFormPage() {
    const params = useParams();
    const [category, setCategory] = useState<CategorieAdmin | null>(null);
    const [loading, setLoading] = useState(true);

    const id = params?.id as string;

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        getCategory(id)
            .then(cat => {
                setCategory(cat);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading category:', err);
                setLoading(false);
            });
    }, [id]);

    if (!id) return notFound();
    if (loading) return <CategoryLoadingSpinner />;
    if (!category || !category._id) return notFound();

    return <CategoryFormClient category={category} />;
}