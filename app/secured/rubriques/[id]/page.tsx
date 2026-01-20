import { getRubrique } from "@/lib/api/services/rubriques.service";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    params: { id: string };
}

export default async function RubriquePage({ params }: PageProps) {
    const id = params?.id;
    if (!id) return notFound();
    const rubrique = await getRubrique(id);
    if (!rubrique) return notFound();

    if (rubrique.categorieId) {
        redirect(`/secured/category/${rubrique.categorieId}`);
    }

    return notFound();
}
