import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

const PaymentProcessing: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center py-20"
  >
    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Star className="w-20 h-20 text-purple-600" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sparkles className="w-10 h-10 text-yellow-400" />
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        🔮 Génération de votre analyse...
      </h3>
      <p className="text-gray-600 mb-4">
        Notre intelligence artificielle génère votre carte du ciel et analyse astrologique complète.
      </p>
      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <p className="text-sm text-purple-800">
          ⏱️ Cela prend généralement 2 à 5 minutes
        </p>
      </div>
      <p className="text-xs text-gray-500">
        Une fois l'analyse prête, vous serez redirigé vers le paiement sécurisé.
      </p>
    </div>
  </motion.div>
);

export default PaymentProcessing;
