import { getCategory } from "@/lib/api/services/categories.service";
import { notFound } from "next/navigation";
import CategoryGenereAnalyseClient from "@/components/categorie/CategoryGenereAnalyseClient";

interface PageProps {
    params: { id: string };
    searchParams: { consultationId?: string };
}

export default async function CategoryGenereAnalysePage({ params, searchParams }: PageProps) {
    const id = params?.id;
    const consultationId = searchParams?.consultationId;
    
    if (!id) return notFound();
    if (!consultationId) return notFound();
    
    const category = await getCategory(id);
    if (!category || !category._id) return notFound();
    
    return <CategoryGenereAnalyseClient category={category} consultationId={consultationId} />;
}
