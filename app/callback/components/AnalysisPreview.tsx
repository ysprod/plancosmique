/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { BookOpen, Heart, Sparkles, Star, TrendingUp } from 'lucide-react';

interface AnalysisPreviewProps {
  consultationId?: string | null;
  downloadUrl?: string | null;
  itemVariants: any;
}

/**
 * Composant pour afficher un aperçu de l'analyse générée
 */
export function AnalysisPreview({ consultationId, downloadUrl, itemVariants }: AnalysisPreviewProps) {
  // Ne pas afficher si pas de consultation ou livre
  if (!consultationId && !downloadUrl) return null;

  const previewItems = [
    {
      icon: Sparkles,
      title: 'Thème Natal',
      description: 'Votre carte du ciel personnalisée avec positions planétaires',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Star,
      title: 'Mission de Vie',
      description: 'Découvrez votre chemin karmique et votre potentiel',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'Personnalité',
      description: 'Analyse approfondie de vos traits et caractéristiques',
      gradient: 'from-red-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Prévisions',
      description: 'Tendances et opportunités pour votre avenir',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-purple-200/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-full p-2 sm:p-3">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">
            Aperçu de votre analyse
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Votre rapport astrologique complet est prêt
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {previewItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className={`bg-gradient-to-br ${item.gradient} rounded-lg p-2 flex-shrink-0`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 sm:mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 sm:p-4 border border-purple-200"
      >
        <div className="flex items-center gap-2 text-purple-800">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <p className="text-xs sm:text-sm font-medium">
            ✨ Plus de <span className="font-bold">15+ pages</span> d'analyse détaillée vous attendent !
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
