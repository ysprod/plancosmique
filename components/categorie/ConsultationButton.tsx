'use client';
import { ConsultationChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Eye, LucideIcon } from 'lucide-react';
import { memo } from 'react';

type ButtonStatus = 'CONSULTER' | 'RÉPONSE EN ATTENTE' | "VOIR L'ANALYSE";

interface ConsultationButtonProps {
  enrichedChoice: ConsultationChoice;
  onConsult: () => void;
}

interface ButtonConfig {
  label: string;
  icon: LucideIcon;
  gradient: string;
  hoverEffect: boolean;
}

const BUTTON_CONFIGS: Record<ButtonStatus, ButtonConfig> = {
  'CONSULTER': {
    label: 'Consulter',
    icon: Sparkles,
    gradient: 'from-purple-600 via-fuchsia-600 to-purple-600',
    hoverEffect: true,
  },
  'RÉPONSE EN ATTENTE': {
    label: 'En attente',
    icon: Clock,
    gradient: 'from-amber-500 to-orange-500',
    hoverEffect: false,
  },
  "VOIR L'ANALYSE": {
    label: "Voir l'analyse",
    icon: Eye,
    gradient: 'from-emerald-600 to-teal-600',
    hoverEffect: true,
  },
};

export const ConsultationButton = memo<ConsultationButtonProps>(
  function ConsultationButton({ enrichedChoice, onConsult }) {
    const status = enrichedChoice.consultButtonStatus || enrichedChoice.buttonStatus;
    const config = BUTTON_CONFIGS[status as ButtonStatus] || BUTTON_CONFIGS['CONSULTER'];
    const Icon = config.icon;
    const isPending = status === 'RÉPONSE EN ATTENTE';
    const isViewAnalysis = status === "VOIR L'ANALYSE";
    const isRepeatable = enrichedChoice.frequence !== 'UNE_FOIS_VIE';
    console.log("ConsultationButton render - status:", status, "enrichedChoice:", enrichedChoice);
    const handleClick = () => {
      if (isPending) return;
      if (isRepeatable) {
        onConsult();
        return;
      }
      if (isViewAnalysis) {
        window.location.href = `/star/consultations/${enrichedChoice.consultationId}&r=${Date.now()}`;
      } else {
        onConsult();
      }
    };

    const baseClasses = `
      w-full px-3 py-2 sm:px-4 sm:py-2.5 font-semibold rounded-lg
      text-white text-sm flex items-center justify-center gap-2
      transition-all duration-300 bg-gradient-to-r ${config.gradient}
    `;

    return isRepeatable ? (
      <div className={enrichedChoice.consultationCount! > 0 ? "w-full flex items-end gap-2" : "w-full"}>
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`${baseClasses} shadow-md hover:shadow-lg`}
        >
          <Icon className="w-4 h-4" />
          <span>Consulter</span>
        </motion.button>
        {enrichedChoice.consultationCount! > 0 && (
          <button
            type="button"
            className="w-full px-3 py-2 sm:px-4 sm:py-2.5 font-semibold rounded-lg text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-amber-500 to-orange-500 shadow-md hover:shadow-lg"
            onClick={() => {
              if (enrichedChoice.consultationId) {
                window.location.href = `/star/consultations/history/${enrichedChoice._id}?r=${Date.now()}`;
              }
            }}
          >
            Historique ({enrichedChoice.consultationCount})
          </button>
        )}
      </div>
    ) : (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={`${baseClasses} shadow-md hover:shadow-lg`}
      >
        <Icon className="w-4 h-4" />
        <span>{config.label}</span>
      </motion.button>
    );
  }
);