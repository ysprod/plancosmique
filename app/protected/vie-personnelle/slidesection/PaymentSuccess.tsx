import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Download, Calendar, Sparkles, Home } from 'lucide-react';

interface Props {
  resetSelection: () => void;
  consultationId: string;
}

const PaymentSuccess: React.FC<Props> = ({ resetSelection, consultationId }) => {
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
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">
              Paiement Confirmé ! 🎉
            </h2>
            <p className="text-green-100 text-lg">
              Votre consultation est en cours de préparation
            </p>
          </motion.div>
        </div>

        {/* Corps */}
        <div className="p-8 space-y-6">
          {/* Message principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-purple-200"
          >
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-purple-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Merci pour votre confiance !
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Notre équipe d'astrologues professionnels va analyser votre thème astral 
                  en profondeur. Vous recevrez votre rapport complet sous{' '}
                  <strong className="text-purple-700">24 à 48 heures</strong>.
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

          {/* Prochaines étapes */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Prochaines étapes :</h3>
            
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                title: 'Email de confirmation',
                desc: 'Vous recevrez un email de confirmation dans les prochaines minutes',
                color: 'blue',
              },
              {
                icon: <Calendar className="w-5 h-5" />,
                title: 'Préparation du rapport',
                desc: 'Nos astrologues analysent votre thème (24-48h)',
                color: 'purple',
              },
              {
                icon: <Download className="w-5 h-5" />,
                title: 'Réception du PDF',
                desc: 'Vous recevrez votre rapport par email + téléchargement direct',
                color: 'green',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex items-start gap-4 p-4 bg-${step.color}-50 rounded-xl border border-${step.color}-200`}
              >
                <div className={`w-10 h-10 bg-${step.color}-100 rounded-full flex items-center justify-center flex-shrink-0 text-${step.color}-600`}>
                  {step.icon}
                </div>
                <div>
                  <p className={`font-bold text-${step.color}-900 mb-1`}>{step.title}</p>
                  <p className={`text-sm text-${step.color}-700`}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-700 text-center">
              <strong>Besoin d'aide ?</strong> Contactez-nous à 
              {/* <a href="mailto:support@monetoile.org" className="text-purple-600 hover:underline font-semibold">
                support@monetoile.org
              </a> */}
            </p>
          </div>

          {/* Bouton retour */}
          <motion.button
            onClick={resetSelection}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
