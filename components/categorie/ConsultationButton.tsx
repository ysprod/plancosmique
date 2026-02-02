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

    if (enrichedChoice.consultationId) {  

    console.log("Rendu du ConsultationButton avec le statut :", enrichedChoice);
    }

    const config = BUTTON_CONFIGS[enrichedChoice.buttonStatus];
    const Icon = config.icon;
    const isPending = enrichedChoice.buttonStatus === 'RÉPONSE EN ATTENTE';
    const isViewAnalysis = enrichedChoice.buttonStatus === "VOIR L'ANALYSE";
    const isRepeatable = enrichedChoice.frequence !== 'UNE_FOIS_VIE';

    const handleClick = () => {
      if (isPending) return;
      // Si consultation répétable, toujours lancer une nouvelle consultation
      if (isRepeatable) {
        onConsult();
        return;
      }
      if (isViewAnalysis) {
        window.location.href = `/star/consultations/${enrichedChoice.consultationId}`;
      } else {
        onConsult();
      }
    };

    const baseClasses = `
      w-full px-3 py-2 sm:px-4 sm:py-2.5
      font-semibold rounded-lg
      text-white text-sm
      flex items-center justify-center gap-2
      transition-all duration-300
      bg-gradient-to-r ${config.gradient}
    `;


    // Si consultation répétable, afficher les deux boutons : Consulter et Historique
    if (isRepeatable) {
      const showHistory = enrichedChoice.consultationCount! > 0;
      return (
        <div className={showHistory ? "w-full flex items-end gap-2" : "w-full"}>
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
          {showHistory && (
            <button
              type="button"
              className="w-full px-3 py-2 sm:px-4 sm:py-2.5 font-semibold rounded-lg text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-gradient-to-r from-amber-500 to-orange-500 shadow-md hover:shadow-lg"
              onClick={() => {
                window.location.href = `/star/consultations/history/${enrichedChoice.consultationId}`;
              }}
            >
              Historique ({enrichedChoice.consultationCount})
            </button>
          )}
        </div>
      );
    } else {
      return (
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
  }
);