import { redirect } from "next/navigation";

interface PageProps {
    params: { id: string };
}

export default async function CategoryPage({ params }: PageProps) {
    const id = params?.id;
    if (!id) { redirect('/secured/profil'); }

    redirect(`/secured/category/${id}/selection`);
}
