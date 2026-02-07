import { CheckCircle } from 'lucide-react';
import { ConsultationChoicesSection } from './ConsultationChoicesSection';
import { useConsultationChoicesSection } from '@/hooks/admin/useConsultationChoicesSection';

interface AvecPromptTabProps {
    choicesWithPrompt: any[];
}

export function AvecPromptTab({ choicesWithPrompt }: AvecPromptTabProps) {
    const withPromptCards = useConsultationChoicesSection(choicesWithPrompt);
    return (
        choicesWithPrompt.length > 0 ? (
            <ConsultationChoicesSection
                icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                title={`Avec prompt (${choicesWithPrompt.length})`}
            >
                {withPromptCards}
            </ConsultationChoicesSection>
        ) : (
            <div className="text-center py-12 text-gray-500 dark:text-zinc-400">
                Aucune consultation avec prompt
            </div>
        )
    );
}
