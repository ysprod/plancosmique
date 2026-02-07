import CategoryFormGroupePageWrapper from "@/components/categorie/CategoryFormGroupePageWrapper";
import { notFound } from "next/navigation";

export default async function CategoryFormGroupePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
    const { id } = await params;
    const sp = await searchParams;
    const consultationId = sp?.consultationId;

    if (!id || !consultationId) return notFound();

    return <CategoryFormGroupePageWrapper id={id} consultationId={consultationId} />;
}
