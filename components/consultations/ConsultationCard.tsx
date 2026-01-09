import { formatDate } from '@/lib/functions';
import { Consultation } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, Download, Eye, MapPin, User } from 'lucide-react';
import React from 'react';
import StatusBadge from './StatusBadge';
import TypeBadge from './TypeBadge';

export interface ConsultationCardProps {
  consultation: Consultation;
  index: number;
  onView: (id: string) => void;
  onDownload: (id: string) => void;
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({ consultation, index, onView, onDownload }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* <div className={`w-12 h-12 bg-gradient-to-br  rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
            {consultation.type && React.createElement(TYPE_LABELS[consultation.type].icon, { className: 'w-6 h-6 text-white' })}
          </div> */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{consultation.title}</h3>
            <p className="text-purple-200 text-sm line-clamp-2">{consultation.description}</p>
          </div>
        </div>
        <StatusBadge status={consultation.status} />
      </div>
      <div className="mb-4">
        <TypeBadge type={consultation.type} />
      </div>
      <div className="space-y-2 mb-4 p-4 bg-black/20 rounded-xl">
        <div className="flex items-center gap-2 text-sm text-purple-200">
          <User className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">
            {consultation.formData?.prenoms || '-'} {consultation.formData?.nom || '-'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-purple-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            Né(e) le {consultation.formData?.dateNaissance ? formatDate(consultation.formData.dateNaissance) : '-'}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            à {consultation.formData?.heureNaissance || '-'}
          </div>
          <div className="flex items-center gap-2 col-span-1 sm:col-span-2">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {consultation.formData?.villeNaissance || '-'}, {consultation.formData?.paysNaissance || '-'}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-purple-300 mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          Créé le {formatDate(consultation.createdAt)}
        </div>
        {consultation.completedDate && (
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Complété le {formatDate(consultation.completedDate)}
          </div>
        )}
      </div>
      {consultation.status === 'COMPLETED' && (
        <div className="flex gap-2">
          <button
            onClick={() => onView(consultation._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all font-semibold"
          >
            <Eye className="w-4 h-4" />
            Voir l'analyse
          </button>
          <button
            onClick={() => onDownload(consultation._id)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg text-white rounded-xl transition-all font-semibold"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      )}
      {consultation.status === 'PROCESSING' && (
        <div className="text-center py-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <p className="text-blue-200 text-sm font-medium">Génération en cours... Revenez dans quelques instants</p>
        </div>
      )}
      {consultation.status === 'FAILED' && (
        <div className="text-center py-3 bg-red-500/20 rounded-xl border border-red-500/30">
          <p className="text-red-200 text-sm font-medium">Une erreur est survenue. Contactez le support.</p>
        </div>
      )}
    </motion.div>
  );
};
export default ConsultationCard;