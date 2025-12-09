/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import type { PaymentStatus, StatusConfig } from './types';

/**
 * Hook custom pour obtenir la configuration visuelle selon le statut
 */
export function useStatusConfig(status: PaymentStatus, error: string, downloadUrl: string | null) {
  return useMemo<StatusConfig>(() => {
    const configs: Record<PaymentStatus, StatusConfig> = {
      pending: {
        icon: Clock,
        title: 'Paiement en cours',
        description: 'Votre paiement est en cours de traitement. Veuillez patienter...',
        color: 'text-yellow-600',
        gradient: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        showDetails: true,
      },
      paid: {
        icon: CheckCircle2,
        title: 'Paiement réussi !',
        description: downloadUrl
          ? 'Votre livre est maintenant disponible dans votre bibliothèque.'
          : 'Votre consultation a été créée avec succès !',
        color: 'text-green-600',
        gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        showDetails: true,
      },
      failure: {
        icon: XCircle,
        title: 'Paiement échoué',
        description: 'Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.',
        color: 'text-red-600',
        gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        showDetails: true,
      },
      'no paid': {
        icon: AlertTriangle,
        title: 'Paiement non effectué',
        description: "Le paiement n'a pas été complété. Vous pouvez réessayer depuis votre profil.",
        color: 'text-orange-600',
        gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        showDetails: false,
      },
      already_used: {
        icon: ShieldAlert,
        title: 'Transaction déjà traitée',
        description: 'Ce paiement a déjà été traité. Consultez vos consultations pour la retrouver.',
        color: 'text-indigo-600',
        gradient: 'from-indigo-500/20 via-purple-500/20 to-violet-500/20',
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
        showDetails: false,
      },
      error: {
        icon: XCircle,
        title: 'Erreur',
        description: error || 'Une erreur inattendue est survenue.',
        color: 'text-red-600',
        gradient: 'from-red-500/20 via-rose-500/20 to-pink-500/20',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        showDetails: false,
      },
    };

    return configs[status];
  }, [status, error, downloadUrl]);
}
