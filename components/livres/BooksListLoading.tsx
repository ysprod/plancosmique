'use client';
import { Loader2 } from 'lucide-react';

export default function BooksListLoading() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-700 font-semibold">Chargement des livres...</p>
      </div>
    </div>
  );
}