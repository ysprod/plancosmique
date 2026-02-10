'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Zap, Shield, Clock } from 'lucide-react';
import React, { memo } from 'react';
import type { Consultation } from '@/lib/interfaces';
import { ConsultationStatus } from '@/lib/interfaces';

const STATUS_CONFIG: Record<string, { 
  gradient: string;
  text: string;
  icon: typeof CheckCircle;
  pulse: boolean;
}> = {
  [ConsultationStatus.COMPLETED]: { 
    gradient: 'from-emerald-500 to-green-500',
    text: 'Complété',
    icon: CheckCircle,
    pulse: false
  },
  [ConsultationStatus.PROCESSING]: { 
    gradient: 'from-amber-500 to-orange-500',
    text: 'En cours',
    icon: Zap,
    pulse: true
  },
  [ConsultationStatus.FAILED]: { 
    gradient: 'from-red-500 to-rose-500',
    text: 'Échec',
    icon: Shield,
    pulse: false
  },
  [ConsultationStatus.PENDING]: { 
    gradient: 'from-slate-500 to-gray-500',
    text: 'En attente',
    icon: Clock,
    pulse: false
  },
  [ConsultationStatus.ERROR]: { 
    gradient: 'from-red-500 to-rose-500',
    text: 'Erreur',
    icon: Shield,
    pulse: false
  },
  [ConsultationStatus.GENERATING]: { 
    gradient: 'from-purple-500 to-indigo-500',
    text: 'Génération',
    icon: Zap,
    pulse: true
  },
  [ConsultationStatus.AWAITING_PAYMENT]: { 
    gradient: 'from-yellow-500 to-amber-500',
    text: 'Paiement en attente',
    icon: Clock,
    pulse: false
  },
  [ConsultationStatus.CANCELLED]: { 
    gradient: 'from-gray-500 to-slate-500',
    text: 'Annulé',
    icon: Shield,
    pulse: false
  },
  [ConsultationStatus.REFUNDED]: { 
    gradient: 'from-blue-500 to-cyan-500',
    text: 'Remboursé',
    icon: CheckCircle,
    pulse: false
  }
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const StatusIndicator = memo(({ status }: { status: Consultation['status'] }) => {
  const normalizedStatus = typeof status === 'string' ? status.toUpperCase() : status;
  const config = STATUS_CONFIG[normalizedStatus] || STATUS_CONFIG[ConsultationStatus.PENDING];
  const Icon = config.icon;
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cx(
        'relative inline-flex items-center gap-2 rounded-full px-3 py-1.5',
        'bg-gradient-to-r shadow-lg', config.gradient
      )}
    >
      {config.pulse && (
        <motion.span
          className="absolute inset-0 rounded-full bg-current"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
      <Icon className="h-3 w-3 text-white" />
      <span className="text-xs font-extrabold text-white">{config.text}</span>
    </motion.div>
  );
});
StatusIndicator.displayName = 'StatusIndicator';
export default StatusIndicator;
