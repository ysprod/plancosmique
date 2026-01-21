"use client";
import { useSearchParams } from 'next/navigation';
import CreatePromptPageClient from '@/components/admin/prompts/CreatePromptPageClient';

export default function Page() {
    const searchParams = useSearchParams();
    const choiceId = searchParams?.get('choiceId');
    const returnTo = searchParams?.get('returnTo');
    return <CreatePromptPageClient choiceId={choiceId!} returnTo={returnTo!} />;
}