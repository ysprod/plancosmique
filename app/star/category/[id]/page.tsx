import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { id } = await params;
    console.log("CategoryPage - id:", id);
    if (!id) { redirect('/star/profil'); }
    redirect(`/star/category/${id}/selection`);
}