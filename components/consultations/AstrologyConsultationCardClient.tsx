import { formatDate } from '@/lib/functions';
import { Consultation } from '@/lib/interfaces';
import MarkdownContent from './MarkdownContent';
import React from 'react';

interface AstrologyConsultationCardClientProps {
  consultation: Consultation;
}

const AstrologyConsultationCardClient: React.FC<AstrologyConsultationCardClientProps> = ({ consultation }) => {
  // Extraction des données astrologiques
  const analyse = consultation.analyse?.analyse ;
  const missionDeVie = analyse?.missionDeVie?.contenu || analyse?.missionDeVie || '';
  const carteDuCiel = analyse?.carteDuCiel || analyse?.carte || null;
  const aspectsTexte = carteDuCiel?.aspectsTexte || '';

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-2">{consultation.titre || consultation.title || 'Analyse Astrologique'}</h3>
      <div className="mb-2 text-purple-200 text-sm">{consultation.description}</div>
      <div className="mb-4 text-xs text-purple-300">Créé le {formatDate(consultation.createdAt)}</div>

      {/* Carte du Ciel - aspects */}
      {aspectsTexte && (
        <div className="mb-4">
          <div className="font-semibold text-amber-400 mb-1">Aspects principaux :</div>
          <MarkdownContent content={aspectsTexte.replace(/\n/g, '  \n')} />
        </div>
      )}

      {/* Mission de Vie */}
      {missionDeVie && (
        <div className="mb-4">
          <div className="font-semibold text-pink-400 mb-1">Mission de Vie :</div>
          <MarkdownContent content={missionDeVie} />
        </div>
      )}

      {/* Analyse complète (markdown) */}
      {typeof analyse === 'string' && (
        <div className="mb-4">
          <MarkdownContent content={analyse} />
        </div>
      )}
    </div>
  );
};

export default AstrologyConsultationCardClient;
