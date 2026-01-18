'use client';
import { Loader2 } from 'lucide-react';

export default function BookSuccessLoading() {
  return (
    <div className=" bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" />
       
        <p className="text-gray-700 font-semibold">Vérification de votre achat...</p>
      </div>
    </div>
  );
}