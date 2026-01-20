import EditPromptPageClient from '@/components/admin/prompts/EditPromptPageClient';

interface PageProps {
    params: { id: string };
    searchParams?: { returnTo?: string };
}

export default function Page({ params, searchParams }: PageProps) {
    return (
        <EditPromptPageClient
            promptId={params.id}
            returnTo={searchParams?.returnTo}
        />
    );
}