'use client';
import { ConsultationChoice, DoneChoice } from '@/lib/interfaces';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Eye } from 'lucide-react';
import { useMemo } from 'react';

interface RubriqueConsultationCardProps {
  choice: ConsultationChoice;
  consultationCount: number;
  showButtons: boolean;
  doneChoices: DoneChoice[];
  onSelect: () => void;
}

type ButtonStatus = 'consult' | 'pending' | 'view';

export default function RubriqueConsultationCard({
  choice,
  consultationCount,
  showButtons,
  doneChoices,
  onSelect,
}: RubriqueConsultationCardProps) {
  
  // Déterminer le statut du bouton
  const buttonStatus = useMemo((): ButtonStatus => {
    if (consultationCount === 0) {
      return 'consult'; // Aucune consultation effectuée
    }
    
    // Trouver la dernière consultation pour ce choix
    const lastConsultation = doneChoices
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    
    if (!lastConsultation) {
      return 'consult';
    }
    
    // Ici on devrait vérifier le statut de la consultation
    // Pour l'instant, on suppose que si showButtons est false, c'est que l'analyse est prête
    // Sinon, elle est en attente
    return showButtons ? 'pending' : 'view';
  }, [consultationCount, doneChoices, showButtons]);

  const renderButton = () => {
    switch (buttonStatus) {
      case 'consult':
        return (
          <button
            onClick={onSelect}
            className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 hover:shadow-lg transition-all"
          >
            Consulter
          </button>
        );
      
      case 'pending':
        return (
          <button
            disabled
            className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-amber-500 to-orange-500 text-white opacity-75 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Clock className="w-5 h-5 animate-pulse" />
            Réponse en attente
          </button>
        );
      
      case 'view':
        const lastConsultation = doneChoices
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
        
        return (
          <button
            onClick={() => {
              if (lastConsultation?.consultationId) {
                window.location.href = `/secured/consultations/${lastConsultation.consultationId}`;
              }
            }}
            className="w-full px-4 py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Voir l'analyse
          </button>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white shadow-lg rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all text-center"
    >
      <h2 className="font-bold text-purple-700 text-lg mb-3">{choice.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{choice.description}</p>
      
      {/* Indicateur du nombre de consultations effectuées */}
      {consultationCount > 0 && (
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-slate-500">
          <CheckCircle className="w-4 h-4" />
          <span>{consultationCount} consultation{consultationCount > 1 ? 's' : ''} effectuée{consultationCount > 1 ? 's' : ''}</span>
        </div>
      )}
      
      {renderButton()}
    </motion.div>
  );
}
