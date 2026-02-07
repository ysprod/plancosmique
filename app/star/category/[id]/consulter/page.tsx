import CategoryConsulterPageWrapper from "@/components/categorie/CategoryConsulterPageWrapper";
import { notFound } from "next/navigation";

export default async function CategoryConsulterPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
    const { id } = await params;
    const sp = await searchParams;
    const consultationId = sp?.consultationId;

    if (!id || !consultationId) return notFound();

    return <CategoryConsulterPageWrapper id={id} consultationId={consultationId} />;
}