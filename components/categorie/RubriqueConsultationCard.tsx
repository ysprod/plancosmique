'use client';
import { ConsultationChoice, EnrichedChoice } from '@/lib/interfaces';
import { ConsultationChoiceStatusDto } from '@/lib/api/services/consultation-status.service';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Eye, Sparkles } from 'lucide-react';

interface RubriqueConsultationCardProps {
  enrichedChoice: EnrichedChoice;
  onSelect: () => void;
  index?: number;
}

export default function RubriqueConsultationCard({
  enrichedChoice,
  onSelect,
  index = 0,
}: RubriqueConsultationCardProps) {
  
  const renderButton = () => {
    switch (enrichedChoice.status.buttonStatus) {
      case 'CONSULTER':
        return (
          <motion.button
            onClick={onSelect}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full px-4 py-2.5 sm:py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:shadow-xl transition-shadow text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consulter</span>
          </motion.button>
        );
      
      case 'RÉPONSE EN ATTENTE':
        return (
          <button
            disabled
            className="w-full px-4 py-2.5 sm:py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-amber-500 to-orange-500 text-white opacity-75 cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Clock className="w-4 h-4 animate-pulse" />
            <span>En attente</span>
          </button>
        );
      
      case "VOIR L'ANALYSE":
        return (
          <motion.button
            onClick={() => {
              if (enrichedChoice.status.consultationId) {
                window.location.href = `/secured/consultations/${enrichedChoice.status.consultationId}`;
              }
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full px-4 py-2.5 sm:py-3 font-semibold rounded-xl shadow-md bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-xl transition-shadow text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            <span>Voir l'analyse</span>
          </motion.button>
        );
    }
  };

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        hover: { y: -4 }
      }}
      transition={{ duration: 0.2 }}
      className="group relative h-full flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-lg hover:shadow-2xl transition-shadow border border-purple-100 dark:border-purple-900 hover:border-purple-300 dark:hover:border-purple-700"
    >
      {/* Gradient background hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative flex-1 flex flex-col p-4 sm:p-5">
        {/* Title */}
        <h3 className="font-bold text-purple-800 dark:text-purple-300 text-base sm:text-lg leading-tight mb-2 sm:mb-3 line-clamp-3">
          {enrichedChoice.choice.title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
          {enrichedChoice.choice.description}
        </p>
        
        {/* Status badge */}
        {enrichedChoice.status.hasActiveConsultation && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-3 inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 self-start"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Active</span>
          </motion.div>
        )}
        
        {/* Button */}
        <div className="mt-auto">
          {renderButton()}
        </div>
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{
            x: ['-100%', '400%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
