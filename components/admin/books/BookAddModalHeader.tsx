'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X, CheckCircle } from 'lucide-react';

interface BookAddModalHeaderProps {
  currentStep: number;
  onClose: () => void;
  submitting: boolean;
}

export default function BookAddModalHeader({ currentStep, onClose, submitting }: BookAddModalHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900">Ajouter un nouveau livre</h3>
            <p className="text-sm text-gray-600">Étape {currentStep} sur 2</p>
          </div>
        </div>
        <button
          onClick={onClose}
          disabled={submitting}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 1 ? 'bg-indigo-600 text-white' : 'bg-green-100 text-green-700'}`}>
            {currentStep === 1 ? '1' : <CheckCircle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                initial={{ width: '0%' }}
                animate={{ width: currentStep >= 1 ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs font-semibold text-gray-600 mt-1">Informations principales</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-1">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className="flex-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                initial={{ width: '0%' }}
                animate={{ width: currentStep === 2 ? '100%' : '0%' }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs font-semibold text-gray-600 mt-1">Détails & Prix</p>
          </div>
        </div>
      </div>
    </div>
  );
}
