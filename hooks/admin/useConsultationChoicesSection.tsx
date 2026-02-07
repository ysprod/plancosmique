import { useMemo, ReactNode } from 'react';
import ConsultationChoiceCard from '@/components/admin/consultations/ConsultationChoiceCard';

export function useConsultationChoicesSection(
    choices: any[]): ReactNode[] | null {
    return useMemo(() => {
        if (!choices || choices.length === 0) return null;
        return choices.map((choice) => (
            <ConsultationChoiceCard
                key={choice._id}
                choice={choice}
            />
        ));
    }, [choices]);
}
