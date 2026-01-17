'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface BookDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const BookDeleteModal: React.FC<BookDeleteModalProps> = ({ show, onClose, onConfirm }) => {
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
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Confirmer la suppression</h3>
          <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer ce livre ? Cette action est irréversible.</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-all"
          >
            Annuler
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all"
          >
            Supprimer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};