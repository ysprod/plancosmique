'use client';

import React from 'react';

interface Offering {
  id: string;
  name: string;
}

interface OffrandesDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  offering?: Offering | null;
  deleting?: boolean;
}

const OffrandesDeleteModal: React.FC<OffrandesDeleteModalProps> = ({ show, onClose, onDelete, offering, deleting }) => {
  if (!show || !offering) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" onClick={onClose} />
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-red-200 dark:border-red-800 max-h-[90vh] overflow-y-auto relative z-[9999]" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-5 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center mb-4">
            <span className="text-2xl text-red-600">🗑️</span>
          </div>
          <h2 className="text-xl font-black text-red-700 dark:text-red-300 mb-2">Supprimer l'offrande ?</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
            Voulez-vous vraiment supprimer <span className="font-bold">{offering.name}</span> ? Cette action est irréversible.
          </p>
          <div className="flex gap-3 w-full pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={deleting}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black shadow-xl transition-all active:scale-95 disabled:opacity-50"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffrandesDeleteModal;
