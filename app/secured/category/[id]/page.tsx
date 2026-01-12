import { notFound } from "next/navigation";
import { getCategory } from "@/lib/api/services/categories.service";
import CategoryClientView from "@/components/categorie/CategoryClientView";

interface PageProps {
    params: { id: string };
}

export default async function CategoryPage({ params }: PageProps) {
    const id = params?.id;
    if (!id) return notFound();
    const category = await getCategory(id);
    if (!category?._id) return notFound();

    return <CategoryClientView category={category} />;
}