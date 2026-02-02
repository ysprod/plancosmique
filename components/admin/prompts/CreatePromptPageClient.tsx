'use client';
import CreatePromptPage from '@/components/admin/prompts/CreatePromptPage';
import { useSearchParams } from 'next/navigation';
 

export default function CreatePromptPageClient() {
        const searchParams = useSearchParams();
    const choiceId = searchParams?.get('choiceId');
    const returnTo = searchParams?.get('returnTo');
    return <CreatePromptPage choiceId={choiceId!} returnTo={returnTo!} />;
}
