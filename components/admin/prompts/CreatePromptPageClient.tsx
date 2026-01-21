'use client';
import CreatePromptPage from '@/components/admin/prompts/CreatePromptPage';

interface Props {
    choiceId?: string;
    returnTo?: string;
}

export default function CreatePromptPageClient({ choiceId, returnTo }: Props) {
    return <CreatePromptPage choiceId={choiceId!} returnTo={returnTo!} />;
}
