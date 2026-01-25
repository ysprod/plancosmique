import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import React from 'react';
import type { Consultation } from '@/hooks/consultations/useConsultationsByRubrique';

interface Props {
  consultations: Consultation[];
}

export default function RubriqueConsultationsList({ consultations }: Props) {
    console.log('[RubriqueConsultationsList] Consultations reçues:', consultations);
  if (!consultations?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500 dark:text-gray-400">
        <BookOpen className="w-8 h-8 mb-2 opacity-60" />
        <span>Aucune consultation trouvée pour cette rubrique.</span>
      </div>
    );
  }
  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
      }}
      className="flex flex-col gap-2 w-full"
    >
      {consultations.map((c) => (
        <motion.li
          key={c.id}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          className="bg-white/80 dark:bg-slate-900/80 border border-cosmic-purple/10 dark:border-cosmic-pink/10 rounded-xl px-4 py-3 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-1"
        >
          {/* Affichage enrichi pour la consultation Cinq Étoiles */}
          {c.type === 'CINQ_ETOILES' ? (
            <>
              <div className="font-bold text-cosmic-indigo dark:text-cosmic-pink text-base">
                ✦ Les 5 Portes de votre Étoile
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                Découvrez la cartographie intime de votre destinée à travers les cinq portes fondamentales de votre étoile : signe solaire, signe lunaire, ascendant, descendant et Milieu du Ciel. Cette analyse révèle comment ces axes structurent votre identité, influencent vos émotions, vos relations et votre trajectoire de vie. Harmonisez ces énergies pour révéler votre plein potentiel.
              </div>
              {/* Affichage des offrandes alternatives */}
              {Array.isArray(c.alternatives) && c.alternatives.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.alternatives.map((alt, idx) => (
                    <span key={alt.offeringId || idx} className="px-2 py-1 rounded-full bg-cosmic-purple/10 text-[11px] text-cosmic-purple border border-cosmic-purple/20">
                      {alt.category === 'animal' && 'Animal'}
                      {alt.category === 'vegetal' && 'Végétal'}
                      {alt.category === 'beverage' && 'Boisson'}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="font-semibold text-cosmic-indigo dark:text-cosmic-pink text-base truncate">{c.titre}</div>
              {c.description && (
                <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">{c.description}</div>
              )}
            </>
          )}
          {c.date && (
            <div className="text-[10px] text-gray-400 mt-1">{new Date(c.date).toLocaleDateString('fr-FR')}</div>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}
