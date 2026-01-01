import { Loader2 } from 'lucide-react';

export function EditUserLoading() {
  return (
    <div className=" bg-gradient-to-br from-slate-50 to-violet-50 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-violet-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Chargement de l'utilisateur...</p>
      </div>
    </div>
  );
}
