"use client";
import React from "react";

export default function GestionEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center animate-fade-in">
      <span className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4 text-5xl">🛍️</span>
      <p className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">Aucune offrande</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Commencez par ajouter votre première offrande</p>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-bold shadow-lg transition-all active:scale-95"
      >
        <span className="w-4 h-4">➕</span>Ajouter une offrande
      </button>
    </div>
  );
}
