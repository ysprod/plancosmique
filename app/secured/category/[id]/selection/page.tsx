"use client";
import CategoryClientViewWrapperMultiPage from "@/components/categorie/CategoryClientViewWrapperMultiPage";
import { getCategory } from "@/lib/api/services/categories.service";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { CategorieAdmin } from "@/lib/interfaces";

export default function CategorySelectionPage() {
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
    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
    if (!category || !category._id) return notFound();

    return <CategoryClientViewWrapperMultiPage category={category} />;
}
