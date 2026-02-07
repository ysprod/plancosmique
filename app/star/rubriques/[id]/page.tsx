import { getRubrique } from "@/lib/api/services/rubriques.service";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function RubriquePage({ params }: PageProps) {
    const { id } = await params;
    if (!id) return notFound();
    
    const rubrique = await getRubrique(id);
    if (!rubrique) return notFound();

    if (rubrique.categorieId) {
        redirect(`/star/category/${rubrique.categorieId}`);
    }

    return notFound();
}