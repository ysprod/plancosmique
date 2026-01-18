'use client';
import { useSearchParams } from 'next/navigation';
import CreatePromptPage from '@/components/admin/prompts/CreatePromptPage';

export default function Page() {
    const searchParams = useSearchParams();
    const choiceId = searchParams?.get('choiceId');
    const returnTo = searchParams?.get('returnTo');

    return (
        <CreatePromptPage
            choiceId={choiceId!}
            returnTo={returnTo!}
        />
    );
}