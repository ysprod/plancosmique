import EditPromptPage from '@/components/admin/prompts/EditPromptPage';

interface PageProps {
    promptId: string;
    returnTo?: string;
}

export default function EditPromptPageClient({ promptId, returnTo }: PageProps) {
    return <EditPromptPage promptId={promptId} returnTo={returnTo} />;
}
