import { ArrowLeft, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface PromptHeaderProps {
  isEdit: boolean;
  loading: boolean;
  onBack: () => void;
}

export const PromptHeader: React.FC<PromptHeaderProps> = ({ isEdit, loading, onBack }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center justify-between px-2 py-3 sm:px-4 sm:py-4 rounded-xl shadow bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900"
  >
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        type="button"
        onClick={onBack}
        className="p-2 hover:bg-purple-700 dark:hover:bg-indigo-800 rounded-lg transition-colors"
        aria-label="Retour"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>
      <h1 className="text-lg sm:text-2xl font-bold text-white drop-shadow">
        {isEdit ? 'Modifier le Prompt' : 'Nouveau Prompt'}
      </h1>
    </div>
    <button
      type="submit"
      disabled={loading}
      className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-pink-500 dark:bg-pink-700 text-white rounded-lg hover:bg-pink-600 dark:hover:bg-pink-800 disabled:opacity-50 transition-colors shadow"
    >
      <Save className="w-5 h-5" />
      <span className="hidden sm:inline">{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
    </button>
  </motion.div>
);