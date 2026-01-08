import { useDomaines, usePlatformStats } from '@/hooks/commons/useRubriquesOverviewData';
import { useRubriquesOverviewState } from '@/hooks/commons/useRubriquesOverviewState';

export function useRubriquesOverview() {
    const {
        expandedDomaine, setExpandedDomaine,
        expandedRubrique, setExpandedRubrique,
        expandedSousRubrique, setExpandedSousRubrique
    } = useRubriquesOverviewState();

    const { domaines, loading: loadingDomaines, error: errorDomaines } = useDomaines();
    const { stats, loading: loadingStats, error: errorStats } = usePlatformStats();

    return {
        domaines,
        stats,
        loading: loadingDomaines || loadingStats,
        error: errorDomaines || errorStats,
        expandedDomaine, setExpandedDomaine,
        expandedRubrique, setExpandedRubrique,
        expandedSousRubrique, setExpandedSousRubrique
    };
}
