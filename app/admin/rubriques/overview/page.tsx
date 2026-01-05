'use client';
import { useRubriquesOverviewState } from '@/hooks/useRubriquesOverviewState';
import { DOMAINES, getPlatformStats } from '@/lib/config/rubriques.config';
import { motion } from 'framer-motion';
import { Book, Calendar, Clock, Star, TrendingUp } from 'lucide-react';
import DomaineCard from './DomaineCard';
import StatCard from './StatCard';

export default function RubriquesOverviewPage() {
  const {
    expandedDomaine,
    setExpandedDomaine,
    expandedRubrique,
    setExpandedRubrique,
    expandedSousRubrique,
    setExpandedSousRubrique
  } = useRubriquesOverviewState();

  const stats = getPlatformStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2">
            Vue d'Ensemble - Mon Étoile
          </h1>
          <p className="text-gray-600">
            Architecture complète de tous les services proposés sur la plateforme
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          <StatCard icon={<Book />} label="Domaines" value={stats.totalDomaines} color="purple" />
          <StatCard icon={<Star />} label="Rubriques" value={stats.totalRubriques} color="blue" />
          <StatCard icon={<TrendingUp />} label="Sous-rubriques" value={stats.totalSousRubriques} color="green" />
          <StatCard icon={<Calendar />} label="Consultations" value={stats.totalConsultations} color="fuchsia" />
          <StatCard icon={<Clock />} label="Uniques" value={stats.consultationsUneFoisVie} color="orange" />
          <StatCard icon={<TrendingUp />} label="Cycliques" value={stats.consultationsCycliques} color="cyan" />
        </motion.div>
        <div className="space-y-6">
          {DOMAINES.map((domaine, dIndex) => (
            <motion.div
              key={domaine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + dIndex * 0.1 }}
            >
              <DomaineCard
                domaine={domaine}
                isExpanded={expandedDomaine === domaine.id}
                onToggle={() => setExpandedDomaine(expandedDomaine === domaine.id ? null : domaine.id)}
                expandedRubrique={expandedRubrique}
                setExpandedRubrique={setExpandedRubrique}
                expandedSousRubrique={expandedSousRubrique}
                setExpandedSousRubrique={setExpandedSousRubrique}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}