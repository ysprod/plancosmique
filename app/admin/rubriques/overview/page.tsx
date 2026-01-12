'use client';
import { RubriquesOverviewDomaines } from '@/components/admin/rubriques/overview/RubriquesOverviewDomaines';
import { RubriquesOverviewStats } from '@/components/admin/rubriques/overview/RubriquesOverviewStats';
import { useRubriquesOverview } from '@/hooks/rubriques/useRubriquesOverview';

export default function RubriquesOverviewPage() {
  const {
    domaines, stats, loading, error, expandedDomaine, expandedSousRubrique,
    expandedRubrique, setExpandedSousRubrique, setExpandedRubrique, setExpandedDomaine,
  } = useRubriquesOverview();

  if (loading) {
    return <div className="p-8 text-center text-lg text-gray-500">Chargement de l'architecture...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Erreur de chargement : {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-gray-600">
            Architecture complète de tous les services proposés sur la plateforme
          </p>
        </div>
        <RubriquesOverviewStats stats={stats} />

        <RubriquesOverviewDomaines
          domaines={domaines}
          expandedDomaine={expandedDomaine}
          setExpandedDomaine={setExpandedDomaine}
          expandedRubrique={expandedRubrique}
          setExpandedRubrique={setExpandedRubrique}
          expandedSousRubrique={expandedSousRubrique}
          setExpandedSousRubrique={setExpandedSousRubrique}
        />
      </div>
    </div>
  );
}