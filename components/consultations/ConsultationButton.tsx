'use client';

/**
 * Composant bouton de consultation avec 3 états gérés dynamiquement
 * États : CONSULTER | RÉPONSE EN ATTENTE | VOIR L'ANALYSE
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Clock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ConsultationButtonProps {
  /** Statut du bouton (détermine le label et le comportement) */
  status: 'CONSULTER' | 'RÉPONSE EN ATTENTE' | 'VOIR L\'ANALYSE';
  /** ID du choix de consultation */
  choiceId: string;
  /** ID de la consultation (requis pour VOIR_ANALYSE) */
  consultationId?: string;
  /** Callback pour gérer le clic sur CONSULTER */
  onConsult?: () => void;
  /** Classe CSS personnalisée */
  className?: string;
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Bouton de consultation avec gestion automatique des 3 états
 */
export default function ConsultationButton({
  status,
  choiceId,
  consultationId,
  onConsult,
  className = '',
  size = 'md'
}: ConsultationButtonProps) {
  const router = useRouter();

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const handleClick = () => {
    switch (status) {
      case 'CONSULTER':
        // Appeler le callback ou rediriger vers la page de consultation
        if (onConsult) {
          onConsult();
        }
        break;

      case 'RÉPONSE EN ATTENTE':
        // Bouton désactivé, ne rien faire
        break;

      case 'VOIR L\'ANALYSE':
        // Rediriger vers la page d'analyse
        if (consultationId) {
          router.push(`/star/consultations/${consultationId}`);
        }
        break;
    }
  };

  const getButtonConfig = () => {
    switch (status) {
      case 'CONSULTER':
        return {
          icon: <Sparkles className="w-5 h-5" />,
          label: 'Consulter',
          bgGradient: 'from-purple-600 to-fuchsia-600',
          hoverGradient: 'hover:from-purple-700 hover:to-fuchsia-700',
          disabled: false,
          animate: true
        };

      case 'RÉPONSE EN ATTENTE':
        return {
          icon: <Clock className="w-5 h-5 animate-pulse" />,
          label: 'Réponse en attente',
          bgGradient: 'from-amber-500 to-orange-500',
          hoverGradient: '',
          disabled: true,
          animate: false
        };

      case 'VOIR L\'ANALYSE':
        return {
          icon: <Eye className="w-5 h-5" />,
          label: "Voir l'analyse",
          bgGradient: 'from-emerald-600 to-teal-600',
          hoverGradient: 'hover:from-emerald-700 hover:to-teal-700',
          disabled: false,
          animate: true
        };
    }
  };

  const config = getButtonConfig();

  return (
    <motion.button
      onClick={handleClick}
      disabled={config.disabled}
      whileHover={config.animate ? { scale: 1.05 } : undefined}
      whileTap={config.animate ? { scale: 0.98 } : undefined}
      className={`
        w-full flex items-center justify-center gap-2
        font-semibold rounded-xl shadow-md
        bg-gradient-to-r ${config.bgGradient}
        ${config.hoverGradient}
        text-white transition-all
        ${config.disabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}
        ${sizeClasses[size]}
        ${className}
      `}
      aria-label={config.label}
      aria-disabled={config.disabled}
    >
      {config.icon}
      <span>{config.label}</span>
    </motion.button>
  );
}
