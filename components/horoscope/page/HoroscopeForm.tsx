import { Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface HoroscopeFormProps {
  loadingUser: boolean;
  activeTab: string;
  filteredHoroscopesLength: number;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

export default function HoroscopeForm({ loadingUser, activeTab, filteredHoroscopesLength, error, onSubmit }: HoroscopeFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-md">
          <Sparkles className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          {filteredHoroscopesLength > 0
            ? 'Générer un nouvel horoscope'
            : 'Prêt à découvrir votre destinée ?'}
        </h3>
        <p className="text-gray-600 text-sm">
          Cliquez sur le bouton ci-dessous pour obtenir votre horoscope personnalisé
        </p>
      </div>
      <button
        type="submit"
        disabled={loadingUser}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loadingUser ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Chargement...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Voir mon horoscope {activeTab}
          </>
        )}
      </button>
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-medium"
        >
          {error}
        </motion.div>
      )}
    </form>
  );
}
