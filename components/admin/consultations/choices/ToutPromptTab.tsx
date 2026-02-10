'use client';
import { useConsultationChoicesSection } from '@/hooks/admin/useConsultationChoicesSection';
import { AlertCircle } from 'lucide-react';

interface ToutPromptTabProps {
    choicesWithoutPrompt: any[];
    onEditPrompt?: (choice: any) => void;
}

export function ToutPromptTab({ choicesWithoutPrompt, onEditPrompt }: ToutPromptTabProps) {
     const withoutPromptCards = useConsultationChoicesSection(choicesWithoutPrompt, onEditPrompt);

    return (
        choicesWithoutPrompt.length > 0 ? (
            <div className="w-full max-w-3xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">{`Sans prompt (${choicesWithoutPrompt.length})`}</h2>
                </div>
                <div className="flex flex-col gap-3 items-center">
                    {withoutPromptCards}
                </div>
            </div>
        ) : (
            <div className="text-center py-12 text-gray-500 dark:text-zinc-400">
                Aucune consultation sans prompt
            </div>
        )
    );
}