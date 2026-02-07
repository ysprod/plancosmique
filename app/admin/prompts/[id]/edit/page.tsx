import EditPromptPageClient from '@/components/admin/prompts/EditPromptPageClient';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ returnTo?: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
    const { id } = await params;
    const sp = await searchParams;
    
    return (
        <EditPromptPageClient
            choiceId={id}
            returnTo={sp?.returnTo}
        />
    );
}