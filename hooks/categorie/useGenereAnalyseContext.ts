import { useState, useEffect } from 'react';
import type { CategorieAdmin, EnrichedChoice } from '@/lib/interfaces';

interface ContextInfo {
    rubrique?: any;
    choix?: any;
}

export function useGenereAnalyseContext(category: CategorieAdmin): ContextInfo {
    const [contextInfo, setContextInfo] = useState<ContextInfo>({});

    useEffect(() => {
        const rubriqueId = sessionStorage.getItem('rubriqueId');
        const selectedChoiceId = sessionStorage.getItem('selectedChoiceId');
        
        const rubrique = category.rubriques?.find((r: any) => r._id === rubriqueId);
        
        // consultationChoices est un tableau de { choice, status } (EnrichedChoice)
        const enrichedChoice = rubrique?.consultationChoices?.find(
            (ec: any) => ec.choice._id === selectedChoiceId
        ) as EnrichedChoice | undefined;
        
        const choix = enrichedChoice?.choice;
        
        setContextInfo({ rubrique, choix });
    }, [category.rubriques]);

    return contextInfo;
}
