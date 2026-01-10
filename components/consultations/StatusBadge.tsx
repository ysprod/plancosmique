import { CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';
import React from 'react';
import { ConsultationStatus } from '@/lib/interfaces';

const STATUS_CONFIG: Record<ConsultationStatus, { label: string; color: string; icon: typeof CheckCircle }> = {
  completed: { label: 'Complète', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  processing: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: Loader2 },
  pending: { label: 'En attente', color: 'bg-gray-100 text-gray-800', icon: Clock },
  failed: { label: 'Erreur', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  generating: { label: 'Génération', color: 'bg-yellow-100 text-yellow-800', icon: Loader2 },
  error: { label: 'Erreur', color: 'bg-red-100 text-red-800', icon: AlertCircle },
  awaiting_payment: { label: 'En attente de paiement', color: 'bg-orange-100 text-orange-800', icon: Clock },
  cancelled: { label: 'Annulée', color: 'bg-gray-200 text-gray-700', icon: Clock },
  refunded: { label: 'Remboursée', color: 'bg-blue-100 text-blue-800', icon: Clock },
};
const DEFAULT_STATUS_CONFIG = { label: 'Inconnu', color: 'bg-gray-100 text-gray-800', icon: Clock };

export interface StatusBadgeProps {
  status: ConsultationStatus | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status as ConsultationStatus] || DEFAULT_STATUS_CONFIG;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${config.color} rounded-full text-xs font-semibold`}>
      <Icon className={`w-3.5 h-3.5 ${status === 'PROCESSING' ? 'animate-spin' : ''}`} />
      {config.label}
    </span>
  );
};
export default StatusBadge;
