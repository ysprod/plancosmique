import React from 'react';
import { motion } from 'framer-motion';

const PaymentProcessing: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center py-20"
  >
    <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Redirection en cours...
      </h3>
      <p className="text-gray-600">
        Vous allez être redirigé vers la page de paiement sécurisée.
      </p>
    </div>
  </motion.div>
);

export default PaymentProcessing;
