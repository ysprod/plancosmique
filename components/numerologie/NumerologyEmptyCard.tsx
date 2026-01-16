'use client';
import { Hash } from 'lucide-react';

export function NumerologyEmptyCard() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 flex flex-col items-center justify-center h-full min-h-[400px]">
      <Hash className="w-16 h-16 text-gray-300 mb-4" />
      <p className="text-gray-500 text-center">
        Remplissez le formulaire pour découvrir<br />votre profil numérologique complet
      </p>
    </div>
  );
}
