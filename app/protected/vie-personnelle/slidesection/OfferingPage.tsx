'use client';

import { motion } from 'framer-motion';
import { Heart, Gift, ArrowRight } from 'lucide-react';
import { CONSULTATION_OFFERINGS, getCurrencySymbol } from './offrandes.constants';

interface OfferingPageProps {
  consultationType: string;
  onConfirm: () => void;
  loading: boolean;
  onBack: () => void;
}

export default function OfferingPage({
  consultationType,
  onConfirm,
  loading,
  onBack,
}: OfferingPageProps) {
  const offering = CONSULTATION_OFFERINGS[consultationType];

  if (!offering) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 text-red-600"
      >
        <p>Consultation non reconnue</p>
      </motion.div>
    );
  }

  const currency = getCurrencySymbol();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl border-2 border-amber-200 overflow-hidden shadow-xl">
        {/* Header spirituel */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Gift className="w-16 h-16 text-white mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-black text-white mb-2">
            Une Offrande Spirituelle
          </h1>
          <p className="text-amber-100 text-lg">
            Pour honorer votre demande de consultation
          </p>
        </div>

        {/* Contenu principal */}
        <div className="p-8 sm:p-12">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              {offering.description}
            </p>
          </motion.div>

          {/* Montant de l'offrande */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 mb-8 border-2 border-amber-300"
          >
            <div className="text-center">
              <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                Montant de l'offrande
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-black text-amber-700">
                  {offering.amount.toLocaleString('fr-FR')}
                </span>
                <span className="text-2xl font-bold text-amber-600">
                  {currency}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Cette offrande honore votre démarche spirituelle
              </p>
            </div>
          </motion.div>

          {/* Bénéfice spirituel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-l-4 border-purple-500"
          >
            <div className="flex items-start gap-4">
              <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Bénéfice Spirituel
                </h3>
                <p className="text-gray-700">
                  {offering.spiritualBenefit}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Engagement spirituel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200"
          >
            <p className="text-gray-700 text-center">
              <span className="font-semibold">Délai de réponse :</span> Un Maître Spirituel
              apportera une réponse complète à votre demande dans
              <span className="font-bold text-blue-700 mx-1">
                {offering.waitingTime} heures
              </span>
            </p>
          </motion.div>

          {/* Message informatif */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-gray-600 text-sm mb-8 italic"
          >
            <p>
              Votre offrande soutient notre communauté spirituelle et aide à
              maintenir ces services sacrés
            </p>
          </motion.div>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 flex-col sm:flex-row"
          >
            <button
              onClick={onBack}
              disabled={loading}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-400 text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Retour
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Traitement...
                </>
              ) : (
                <>
                  Faire l'offrande
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
