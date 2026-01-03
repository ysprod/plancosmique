'use client';
import { DOMAINES, getPlatformStats, type Domaine, type Rubrique, type SousRubrique, type ConsultationConfig } from '@/lib/config/rubriques.config';
import { motion } from 'framer-motion';
import { Book, Users, Briefcase, Star, Calendar, TrendingUp, Clock, User } from 'lucide-react';
import { useState } from 'react';

const FREQUENCE_LABELS = {
  UNE_FOIS_VIE: 'Une fois dans la vie',
  ANNUELLE: 'Chaque année',
  MENSUELLE: 'Chaque mois',
  QUOTIDIENNE: 'Chaque jour',
  LIBRE: 'À tout moment'
};

const PARTICIPANTS_LABELS = {
  SOLO: 'Solo (utilisateur seul)',
  AVEC_TIERS: 'Avec une personne tierce',
  GROUPE: 'En groupe (équipe)'
};

const FREQUENCE_COLORS = {
  UNE_FOIS_VIE: 'bg-purple-100 text-purple-700 border-purple-200',
  ANNUELLE: 'bg-blue-100 text-blue-700 border-blue-200',
  MENSUELLE: 'bg-green-100 text-green-700 border-green-200',
  QUOTIDIENNE: 'bg-orange-100 text-orange-700 border-orange-200',
  LIBRE: 'bg-gray-100 text-gray-700 border-gray-200'
};

export default function RubriquesOverviewPage() {
  const [expandedDomaine, setExpandedDomaine] = useState<string | null>(null);
  const [expandedRubrique, setExpandedRubrique] = useState<string | null>(null);
  const [expandedSousRubrique, setExpandedSousRubrique] = useState<string | null>(null);

  const stats = getPlatformStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
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

        {/* Stats globales */}
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

        {/* Domaines */}
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

// =============================================================================
// COMPONENTS
// =============================================================================

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    fuchsia: 'bg-fuchsia-100 text-fuchsia-600',
    orange: 'bg-orange-100 text-orange-600',
    cyan: 'bg-cyan-100 text-cyan-600'
  }[color];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
      <div className={`w-10 h-10 rounded-lg ${colorClasses} flex items-center justify-center mb-2`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function DomaineCard({
  domaine,
  isExpanded,
  onToggle,
  expandedRubrique,
  setExpandedRubrique,
  expandedSousRubrique,
  setExpandedSousRubrique
}: {
  domaine: Domaine,
  isExpanded: boolean,
  onToggle: () => void,
  expandedRubrique: string | null,
  setExpandedRubrique: (id: string | null) => void,
  expandedSousRubrique: string | null,
  setExpandedSousRubrique: (id: string | null) => void
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-purple-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white">
            <Book size={24} />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-800">{domaine.titre}</h2>
            <p className="text-gray-600 text-sm">{domaine.description}</p>
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 p-6 bg-gray-50 space-y-4"
        >
          {domaine.rubriques.map((rubrique) => (
            <RubriqueCard
              key={rubrique.id}
              rubrique={rubrique}
              isExpanded={expandedRubrique === rubrique.id}
              onToggle={() => setExpandedRubrique(expandedRubrique === rubrique.id ? null : rubrique.id)}
              expandedSousRubrique={expandedSousRubrique}
              setExpandedSousRubrique={setExpandedSousRubrique}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function RubriqueCard({
  rubrique,
  isExpanded,
  onToggle,
  expandedSousRubrique,
  setExpandedSousRubrique
}: {
  rubrique: Rubrique,
  isExpanded: boolean,
  onToggle: () => void,
  expandedSousRubrique: string | null,
  setExpandedSousRubrique: (id: string | null) => void
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-blue-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
            <Star size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">{rubrique.titre}</h3>
            <p className="text-gray-600 text-sm">{rubrique.description}</p>
            <p className="text-xs text-gray-500 mt-1">{rubrique.sousRubriques.length} sous-rubrique(s)</p>
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 p-4 bg-gray-50 space-y-3"
        >
          {rubrique.sousRubriques.map((sousRubrique) => (
            <SousRubriqueCard
              key={sousRubrique.id}
              sousRubrique={sousRubrique}
              isExpanded={expandedSousRubrique === sousRubrique.id}
              onToggle={() => setExpandedSousRubrique(expandedSousRubrique === sousRubrique.id ? null : sousRubrique.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function SousRubriqueCard({
  sousRubrique,
  isExpanded,
  onToggle
}: {
  sousRubrique: SousRubrique,
  isExpanded: boolean,
  onToggle: () => void
}) {
  return (
    <div className="bg-white rounded-lg shadow border border-green-100 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-3 flex items-center justify-between hover:bg-green-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
            <TrendingUp size={16} />
          </div>
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-800">{sousRubrique.titre}</h4>
            <p className="text-gray-600 text-xs">{sousRubrique.description}</p>
            <p className="text-xs text-gray-500 mt-1">{sousRubrique.consultations.length} consultation(s)</p>
          </div>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-gray-100 p-3 bg-gray-50 space-y-2"
        >
          {sousRubrique.consultations.map((consultation) => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function ConsultationCard({ consultation }: { consultation: ConsultationConfig }) {
  const frequenceColor = FREQUENCE_COLORS[consultation.frequence];
  const participantsIcon = consultation.typeParticipants === 'SOLO' ? <User size={14} /> :
    consultation.typeParticipants === 'AVEC_TIERS' ? <Users size={14} /> :
      <Briefcase size={14} />;

  return (
    <div className="bg-white rounded-lg p-4 shadow border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h5 className="font-bold text-gray-800 text-sm">{consultation.titre}</h5>
      </div>

      <p className="text-xs text-gray-600 mb-3">{consultation.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full border ${frequenceColor}`}>
          <Clock size={12} className="inline mr-1" />
          {FREQUENCE_LABELS[consultation.frequence]}
        </span>
        <span className="text-xs px-2 py-1 rounded-full border bg-indigo-100 text-indigo-700 border-indigo-200">
          {participantsIcon}
          <span className="ml-1">{PARTICIPANTS_LABELS[consultation.typeParticipants]}</span>
        </span>
        <span className="text-xs px-2 py-1 rounded-full border bg-pink-100 text-pink-700 border-pink-200">
          {consultation.typeTechnique}
        </span>
      </div>

      {/* Offrandes */}
      <div className="border-t border-gray-100 pt-2">
        <p className="text-xs font-semibold text-gray-700 mb-1">Offrandes alternatives :</p>
        <div className="flex gap-2">
          {consultation.offering.alternatives.map((alt, idx) => (
            <div key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200">
              {alt.category.charAt(0).toUpperCase() + alt.category.slice(1)} × {alt.quantity}
            </div>
          ))}
        </div>
      </div>

      {consultation.noteImplementation && (
        <div className="mt-2 text-xs bg-yellow-50 text-yellow-800 p-2 rounded border border-yellow-200">
          <strong>Note:</strong> {consultation.noteImplementation}
        </div>
      )}
    </div>
  );
}
