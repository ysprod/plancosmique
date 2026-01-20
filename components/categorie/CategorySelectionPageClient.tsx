"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import CategoryLoadingSpinner from "@/components/categorie/CategoryLoadingSpinner";

interface Category {
  _id: string;
  name: string;
  description?: string;
}

export default function CategorySelectionPageClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get("/categories").then(res => setCategories(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <CategoryLoadingSpinner />;

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-cosmic-indigo">Choisissez une catégorie</h1>
      <div className="grid gap-4">
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => router.push(`/secured/category/${cat._id}/selection`)}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cosmic-purple to-cosmic-indigo text-white font-bold shadow-lg hover:scale-105 transition-all text-lg"
          >
            {cat.name}
            {cat.description && <div className="text-xs text-cosmic-pink mt-1">{cat.description}</div>}
          </button>
        ))}
      </div>
    </div>
  );
}
