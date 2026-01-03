import { Loader2 } from 'lucide-react';

export default function ConsultationsListLoading() {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Chargement de vos consultations...</p>
      </div>
    </div>
  );
}
