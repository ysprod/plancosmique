import CategoryGenereAnalysePageWrapper from "@/components/categorie/CategoryGenereAnalysePageWrapper";
import { notFound } from "next/navigation";

export default async function CategoryGenereAnalysePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string>> }) {
    const { id } = await params;
    const sp = await searchParams;
    const consultationId = sp?.consultationId;

    if (!id || !consultationId) return notFound();

    return <CategoryGenereAnalysePageWrapper id={id} consultationId={consultationId} />;
}