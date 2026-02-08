import CategoryChoixPageWrapper from "@/components/categorie/CategoryChoixPageWrapper";
import { notFound } from "next/navigation";

export default async function CategoryChoixPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) return notFound();

    return <CategoryChoixPageWrapper id={id} />;
}