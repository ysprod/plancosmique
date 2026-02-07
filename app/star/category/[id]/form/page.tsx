import CategoryFormPageWrapper from "@/components/categorie/CategoryFormPageWrapper";
import { notFound } from "next/navigation";

export default async function CategoryFormPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
    const { id } = await params;
    const sp = await searchParams;
    const consultationId = sp?.consultationId;

    if (!id || !consultationId) return notFound();

    return <CategoryFormPageWrapper id={id} consultationId={consultationId} />;
}