import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, Home, Gift, Heart } from 'lucide-react';
import { CONSULTATION_OFFERINGS, getCurrencySymbol } from './offrandes.constants';

interface Props {
  resetSelection: () => void;
  consultationId: string;
  offeringType?: string;
}

const PaymentSuccess: React.FC<Props> = ({ resetSelection, consultationId, offeringType }) => {
  // Récupérer les infos de l'offrande
  const offering = offeringType ? CONSULTATION_OFFERINGS[offeringType] : null;
  const currency = getCurrencySymbol();

  const confettiVariants = {
    initial: { opacity: 0, y: -50, rotate: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: [0, 100, 200],
      rotate: [0, 360],
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 1,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6 max-w-2xl mx-auto relative"
    >
      {/* Confettis animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={confettiVariants}
            initial="initial"
            animate="animate"
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              background: ['#9333ea', '#ec4899', '#f59e0b', '#10b981'][i % 4],
            }}
          />
        ))}
      </div>

      {/* Card principale */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200 relative z-10">
        {/* Header succès */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Gift className="w-12 h-12 text-amber-600" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">
              Merci pour votre Offrande ! 🙏
            </h2>
            <p className="text-amber-100 text-lg">
              Votre demande de consultation a été reçue
            </p>
          </motion.div>
        </div>

        {/* Corps */}
        <div className="p-8 space-y-6">
          {/* Message de félicitations et confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200"
          >
            <div className="flex items-start gap-4">
              <Heart className="w-8 h-8 text-amber-600 flex-shrink-0 animate-pulse" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Votre offrande a été acceptée
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Nous vous remercions sincèrement pour votre offrande. Celle-ci honore votre démarche spirituelle et soutient notre communauté.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Affichage du montant de l'offrande si disponible */}
          {offering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border-2 border-amber-300"
            >
              <div className="text-center">
                <p className="text-gray-700 text-sm font-semibold mb-2 uppercase tracking-wide">
                  Offrande reçue
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-black text-amber-700">
                    {offering.amount.toLocaleString('fr-FR')}
                  </span>
                  <span className="text-2xl font-bold text-amber-600">
                    {currency}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Informations sur l'attente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border-2 border-purple-200"
          >
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-purple-600 flex-shrink-0 animate-pulse" />
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Délai de traitement
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Un Maître Spirituel apportera une réponse complète à votre demande de consultation dans
                  <span className="font-bold text-purple-700 mx-1">
                    {offering?.waitingTime || '24'} heures
                  </span>
                  environ.
                </p>
                <p className="text-gray-600 text-sm mt-3">
                  Vous serez notifié dès que votre consultation sera prête.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Numéro de consultation */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Numéro de consultation</p>
                <p className="font-mono font-bold text-blue-900">
                  #{consultationId.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(consultationId)}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Copier
              </button>
            </div>
          </div>

          {/* Message d'attente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200"
          >
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 animate-pulse" />
              <div>
                <p className="text-gray-700 font-semibold mb-2">
                  Ce qu'il se passe maintenant :
                </p>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Votre demande a été transmise à un Maître Spirituel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Une analyse spirituelle complète est en cours
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Vous recevrez une notification dès que votre réponse est prête
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Support */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-700 text-center">
              <strong>Besoin d'aide ?</strong> Consultez vos consultations pour suivre la progression
            </p>
          </div>

          {/* Bouton retour */}
          <button
            onClick={resetSelection}
            className="w-full py-3 text-gray-600 hover:text-gray-900 font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
