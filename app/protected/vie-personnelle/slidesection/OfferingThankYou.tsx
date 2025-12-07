'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CONSULTATION_OFFERINGS } from './offrandes.constants';

interface OfferingThankYouProps {
  consultationId: string;
  consultationType: string;
  waitingTime: number;
  onClose: () => void;
}

export default function OfferingThankYou({
  consultationId,
  consultationType,
  waitingTime,
  onClose,
}: OfferingThankYouProps) {
  const offering = CONSULTATION_OFFERINGS[consultationType];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto"
    >
      {/* Cœur animé en haut */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-20 h-20 text-red-500 mx-auto fill-red-500" />
        </motion.div>
      </motion.div>

      {/* Carte principale */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl border-2 border-green-300 overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-12 text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-black text-white mb-2"
          >
            Merci & Bravo !
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-green-100 text-lg"
          >
            Votre offrande a été reçue avec gratitude
          </motion.p>
        </div>

        {/* Contenu */}
        <div className="p-8 sm:p-12 space-y-8">
          {/* Message de remerciement */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-xl text-gray-800 leading-relaxed">
              Nous vous remercions de votre générosité et de votre confiance
              spirituelle.
            </p>
          </motion.div>

          {/* Détails de la consultation */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-green-200"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">Type de Consultation</p>
                <p className="font-bold text-gray-900 text-lg">
                  {offering?.description.replace('Offrande pour votre ', '')}
                </p>
              </div>
              <div className="text-center">
                <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">Délai de Réponse</p>
                <p className="font-bold text-gray-900 text-lg">
                  {waitingTime} heures
                </p>
              </div>
            </div>
          </motion.div>

          {/* Message principal */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border-l-4 border-purple-600"
          >
            <h2 className="font-bold text-gray-900 mb-4 text-lg">
              📩 Votre Demande est Transmise
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4">
              Un Maître Spirituel a reçu votre demande et apportera une réponse
              complète et personnalisée à votre consultation dans
              <span className="font-bold text-purple-700 mx-1">
                {waitingTime} heures
              </span>
              environ.
            </p>
            <p className="text-gray-700 text-sm italic">
              Soyez attentif à vos messages et à votre intuition durant cette
              période.
            </p>
          </motion.div>

          {/* ID de consultation */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-100 rounded-lg p-4 text-center"
          >
            <p className="text-gray-600 text-sm mb-2">Numéro de consultation</p>
            <p className="font-mono text-lg font-bold text-gray-900 break-all">
              {consultationId}
            </p>
          </motion.div>

          {/* Points importants */}
          <motion.div
            variants={itemVariants}
            className="space-y-3"
          >
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="text-green-600">✓</span> Prochaines étapes
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl">1.</span>
                <span>Consultez votre email et vos messages régulièrement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl">2.</span>
                <span>
                  La réponse spirituelle arrivera sous forme d'analyse détaillée
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-xl">3.</span>
                <span>
                  Accédez à vos consultations depuis votre espace personnel
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Boutons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 flex-col sm:flex-row pt-4"
          >
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
            >
              Fermer
            </button>
            <Link
              href="/protected/consultations"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              Voir mes Consultations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Message de confiance */}
      <motion.p
        variants={itemVariants}
        className="text-center text-gray-600 mt-8 text-sm"
      >
        Vous avez des questions ? Consultez notre
        <Link href="/protected/knowledge" className="text-purple-600 font-semibold hover:underline ml-1">
          centre de ressources
        </Link>
      </motion.p>
    </motion.div>
  );
}
