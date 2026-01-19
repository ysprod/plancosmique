"use client";
import CategoryConsulterClient from "@/components/categorie/CategoryConsulterClient";
import { getCategory } from "@/lib/api/services/categories.service";
import { useParams, useSearchParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import type { CategorieAdmin } from "@/lib/interfaces";

export default function CategoryConsulterPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const [category, setCategory] = useState<CategorieAdmin | null>(null);
    const [loading, setLoading] = useState(true);
    
    const id = params?.id as string;
    const consultationId = searchParams?.get('consultationId');
    
    useEffect(() => {
        if (!id || !consultationId) {
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
    }, [id, consultationId]);
    
    if (!id || !consultationId) return notFound();
    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
    if (!category || !category._id) return notFound();
    
    return <CategoryConsulterClient category={category} consultationId={consultationId} />;
}
