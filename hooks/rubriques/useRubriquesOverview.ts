import { useDomaines, usePlatformStats } from '@/hooks/rubriques/useRubriquesOverviewData';

export function useRubriquesOverview() { 

    const { domaines, loading: loadingDomaines, error: errorDomaines } = useDomaines();
    const { stats, loading: loadingStats, error: errorStats } = usePlatformStats();

    return {
        domaines,
        stats,
        loading: loadingDomaines || loadingStats,
        error: errorDomaines || errorStats,    
    };
}
