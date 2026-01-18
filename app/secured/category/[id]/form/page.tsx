import CategoryFormClient from "@/components/categorie/CategoryFormClient";
import { getCategory } from "@/lib/api/services/categories.service";
import { notFound } from "next/navigation";
 

interface PageProps {
    params: { id: string };
}

export default async function CategoryFormPage({ params }: PageProps) {
    const id = params?.id;
    if (!id) return notFound();
    
    const category = await getCategory(id);
    if (!category || !category._id) return notFound();
    
    return <CategoryFormClient category={category} />;
}
