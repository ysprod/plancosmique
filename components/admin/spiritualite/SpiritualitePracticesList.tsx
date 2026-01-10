import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Loader, Sparkles, List, Target, Lightbulb, Clock, ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';
import type { Practice } from '@/hooks/spiritualite/useSpiritualitePage';

interface SpiritualitePracticesListProps {
  practices: Practice[];
  expandedPractices: Set<string>;
  loading: boolean;
  deletingId?: string;
  onExpand: (id: string) => void;
  onEdit: (practice: Practice) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export function SpiritualitePracticesList({
  practices,
  expandedPractices,
  loading,
  deletingId,
  onExpand,
  onEdit,
  onDelete,
  onRefresh,
}: SpiritualitePracticesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          <span>Pratiques spirituelles ({practices.length})</span>
        </h2>
        <motion.button
          whileHover={{ rotate: 180 }}
          onClick={onRefresh}
          disabled={loading}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          <Loader className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <Loader className="w-6 h-6 animate-spin text-amber-600" />
          <span className="ml-2 text-sm sm:text-base text-gray-600">Chargement...</span>
        </div>
      ) : practices.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-base sm:text-lg font-semibold">Aucune pratique trouvée</p>
          <p className="text-xs sm:text-sm mt-2">Cliquez sur "Nouvelle Pratique" pour commencer</p>
        </div>
      ) : (
        <div className="space-y-3">
          {practices.map((practice, index) => (
            <motion.div
              key={practice._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-2 border-amber-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header de la carte */}
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                    {practice.order || index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-sm sm:text-base truncate">
                      {practice.title}
                    </div>
                    <div className="text-xs text-gray-600 flex flex-wrap gap-2 mt-1">
                      <span className="flex items-center gap-1">
                        <List className="w-3 h-3" />
                        {practice.keyElements?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {practice.benefits?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Lightbulb className="w-3 h-3" />
                        {practice.practicalSteps?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${practice.published
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                    }`}>
                    {practice.published ? 'Publié' : 'Brouillon'}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onExpand(practice._id!)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    {expandedPractices.has(practice._id!) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </motion.button>
                </div>
              </div>
              {/* Détails expandables */}
              <AnimatePresence>
                {expandedPractices.has(practice._id!) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-amber-100"
                  >
                    <div className="p-3 sm:p-4 space-y-3 text-xs sm:text-sm">
                      <p className="text-gray-700">{practice.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                          {practice.category}
                        </span>
                        {practice.bestTiming && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {practice.bestTiming}
                          </span>
                        )}
                      </div>
                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onEdit(practice)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Modifier
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onDelete(practice._id!)}
                          disabled={deletingId === practice._id}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === practice._id ? (
                            <>
                              <Loader className="w-4 h-4 animate-spin" />
                              Suppression...
                            </>
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4" />
                              Supprimer
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
