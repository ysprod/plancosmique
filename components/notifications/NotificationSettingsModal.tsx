'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface NotificationSettingsModalProps {
  show: boolean;
  onClose: () => void;
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-6 max-w-md w-full"
      >
        <h2 className="text-xl font-bold text-white mb-4">Paramètres de notifications</h2>
        <p className="text-gray-400 text-sm">
          Les paramètres de notifications seront disponibles prochainement.
          Vous pourrez choisir les types de notifications à recevoir et configurer les alertes.
        </p>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 rounded-xl bg-purple-500 text-white font-medium hover:bg-purple-600 transition-colors"
        >
          Fermer
        </button>
      </motion.div>
    </motion.div>
  );
};

export default NotificationSettingsModal;