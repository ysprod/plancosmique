import React, { useState } from "react";
import { Clock, User, Users, Briefcase } from "lucide-react";
import { ConsultationConfig } from "@/lib/config/rubriques.config";
import ConsultationEditModal from "./ConsultationEditModal";

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

const ConsultationCard: React.FC<{ consultation: ConsultationConfig }> = ({ consultation }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const frequenceColor = FREQUENCE_COLORS[consultation.frequence];
  const participantsIcon = consultation.typeParticipants === 'SOLO' ? <User size={14} /> :
    consultation.typeParticipants === 'AVEC_TIERS' ? <Users size={14} /> :
      <Briefcase size={14} />;

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <h5 className="font-bold text-gray-800 text-sm">{consultation.titre}</h5>
          <button
            className="ml-2 px-3 py-1 text-xs font-semibold rounded bg-violet-600 text-white hover:bg-violet-700 transition"
            onClick={() => setEditOpen(true)}
          >
            Générer consultation
          </button>
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
        {sent && (
          <div className="mt-2 text-xs bg-green-50 text-green-800 p-2 rounded border border-green-200">
            Consultation envoyée !
          </div>
        )}
      </div>
      <ConsultationEditModal
        consultation={consultation}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSend={() => { setEditOpen(false); setSent(true); }}
      />
    </>
  );
};

export default ConsultationCard;