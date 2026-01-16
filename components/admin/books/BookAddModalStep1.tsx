'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BookFormData } from '@/hooks/books/useAdminBooks';

interface BookAddModalStep1Props {
  formData: BookFormData;
  setFormData: (data: BookFormData) => void;
  formErrors: Partial<BookFormData>;
  submitting: boolean;
  handleNextStep: () => void;
}

export default function BookAddModalStep1({ formData, setFormData, formErrors, submitting, handleNextStep }: BookAddModalStep1Props) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Titre du livre <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.title ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
          placeholder="Ex: Guide Complet du Développement Web"
          disabled={submitting}
        />
        {formErrors.title && <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Sous-titre <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all ${formErrors.subtitle ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
          placeholder="Ex: De débutant à expert en 30 jours"
          disabled={submitting}
        />
        {formErrors.subtitle && <p className="mt-1 text-sm text-red-600">{formErrors.subtitle}</p>}
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Description complète <span className="text-red-500">*</span><span className="text-gray-400 font-normal ml-2">(min. 50 caractères)</span></label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          rows={1}
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none font-medium transition-all resize-none ${formErrors.description ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'}`}
          placeholder="Décrivez le contenu du livre en détail, les sujets abordés, ce que les lecteurs apprendront..."
          disabled={submitting}
        />
        <div className="flex items-center justify-between mt-1">
          {formErrors.description ? (
            <p className="text-sm text-red-600">{formErrors.description}</p>
          ) : (
            <p className={`text-sm ${formData.description.length >= 50 ? 'text-green-600' : 'text-gray-500'}`}>{formData.description.length} / 50 caractères {formData.description.length >= 50 && '✓'}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end pt-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNextStep}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          Suivant
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
