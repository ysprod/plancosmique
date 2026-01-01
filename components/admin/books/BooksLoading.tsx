import { Loader2 } from "lucide-react";

export function BooksLoading() {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 font-semibold">Chargement des livres...</p>
      </div>
    </div>
  );
}
