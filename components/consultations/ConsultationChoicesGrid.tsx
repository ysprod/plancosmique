'use client';

/**
 * Composant pour afficher plusieurs choix de consultation avec leurs statuts
 * Utilise un seul appel API pour récupérer tous les statuts à la fois
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ConsultationChoice } from '@/lib/interfaces';
import { useAuth } from '@/lib/auth/AuthContext';
import { useMultipleConsultationChoicesStatus } from '@/hooks/consultations/useConsultationChoiceStatus';
import ConsultationButton from '@/components/consultations/ConsultationButton';
import { ConsultationButtonStatus } from '@/lib/types/consultation-status.types';
import { Loader2 } from 'lucide-react';

interface ConsultationChoicesGridProps {
  /** Liste des choix de consultation à afficher */
  choices: ConsultationChoice[];
  /** Callback pour gérer la sélection d'un choix */
  onSelectChoice: (choice: ConsultationChoice) => void;
  /** Titre de la section (optionnel) */
  title?: string;
}

/**
 * Grille de choix de consultation avec gestion optimisée des statuts
 * Récupère tous les statuts en une seule requête pour meilleures performances
 */
export default function ConsultationChoicesGrid({
  choices,
  onSelectChoice,
  title
}: ConsultationChoicesGridProps) {
  const { user } = useAuth();
  const choiceIds = choices.map(c => c._id).filter(Boolean) as string[];
  
  const { statuses, loading, error, getStatusByChoiceId } = useMultipleConsultationChoicesStatus(
    user?._id,
    choiceIds
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des consultations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-800 font-semibold mb-2">Erreur de chargement</p>
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-purple-700 mb-6">{title}</h2>
      )}
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {choices.map((choice, idx) => {
          const choiceStatus = choice._id ? getStatusByChoiceId(choice._id) : null;
          
          return (
            <motion.div
              key={choice._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white shadow-lg rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all"
            >
              <h3 className="font-bold text-purple-700 text-lg mb-3">
                {choice.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {choice.description}
              </p>
              
              {choiceStatus ? (
                <ConsultationButton
                  status={choiceStatus.buttonStatus}
                  choiceId={choice._id || ''}
                  consultationId={choiceStatus.consultationId}
                  onConsult={() => onSelectChoice(choice)}
                />
              ) : (
                // Fallback si le statut n'est pas disponible
                <ConsultationButton
                  status={ConsultationButtonStatus.CONSULTER}
                  choiceId={choice._id || ''}
                  onConsult={() => onSelectChoice(choice)}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
