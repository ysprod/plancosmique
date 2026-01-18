import EditPromptPage from '@/components/admin/prompts/EditPromptPage';

interface PageProps {
    params: { id: string };
    searchParams?: { returnTo?: string };
}

export default function Page({ params, searchParams }: PageProps) {
    return (
        <EditPromptPage
            promptId={params.id}
            returnTo={searchParams?.returnTo}
        />
    );
}