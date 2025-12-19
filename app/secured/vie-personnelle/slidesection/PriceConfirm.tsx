import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';

interface Props {
  handlePay: () => void;
  paymentLoading: boolean;
  paymentError?: string;
  onBack: () => void;
}

const PriceConfirm: React.FC<Props> = ({ handlePay, paymentLoading, paymentError, onBack }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="mt-6 max-w-2xl mx-auto"
  >
    {/* Card principale */}
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-200">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="relative"
        >
          <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-2">
            Confirmation de Paiement
          </h2>
          <p className="text-purple-100 text-lg">
            Votre voyage spirituel commence maintenant
          </p>
        </motion.div>
      </div>

      {/* Corps */}
      <div className="p-8 space-y-6">
        {/* Prix en vedette */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-purple-200"
        >
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2 uppercase tracking-wide font-semibold">
              Montant total
            </p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-6xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                200
              </span>
              <div className="text-left">
                <span className="text-2xl font-bold text-gray-700">F</span>
                <br />
                <span className="text-sm text-gray-500">CFA</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avantages */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Ce que vous recevrez :
          </h3>
          
          {[
            'Analyse astrologique personnalisée détaillée',
            'Rapport PDF de 15-20 pages',
            'Interprétations des planètes et maisons',
            'Guidance sur votre mission de vie',
            'Réponse sous 24-48 heures',
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-green-50 rounded-xl"
            >
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{benefit}</span>
            </motion.div>
          ))}
        </div>

        {/* Sécurité */}
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">
                Paiement 100% sécurisé
              </p>
              <p className="text-blue-700 text-sm leading-relaxed">
                Vous serez redirigé vers <strong>MoneyFusion</strong>, notre partenaire de paiement sécurisé. 
                Vos données bancaires sont protégées par cryptage SSL.
              </p>
            </div>
          </div>
        </div>

        {/* Message d'erreur */}
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 border-2 border-red-200 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium">{paymentError}</p>
            </div>
          </motion.div>
        )}

        {/* Boutons d'action */}
        <div className="space-y-3 pt-4">
          <motion.button
            onClick={handlePay}
            disabled={paymentLoading}
            whileHover={{ scale: paymentLoading ? 1 : 1.02 }}
            whileTap={{ scale: paymentLoading ? 1 : 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {paymentLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                Redirection en cours...
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                Procéder au paiement
              </>
            )}
          </motion.button>

          <button
            onClick={onBack}
            className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Modifier mes informations
          </button>
        </div>

        {/* Note légale */}
        <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
          En validant, vous acceptez nos{' '}
          <a href="/terms" className="text-purple-600 hover:underline">
            conditions générales
          </a>{' '}
          et notre{' '}
          <a href="/privacy" className="text-purple-600 hover:underline">
            politique de confidentialité
          </a>
        </p>
      </div>
    </div>
  </motion.div>
);

export default PriceConfirm;
