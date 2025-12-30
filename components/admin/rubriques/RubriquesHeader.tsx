import { Package, Plus } from "lucide-react";
import React from "react";

interface RubriquesHeaderProps {
  rubriquesCount: number;
  offeringsCount: number;
  onCreate: () => void;
}

export function RubriquesHeader({ rubriquesCount, offeringsCount, onCreate }: RubriquesHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gestion des rubriques</h1>
          <p className="text-sm text-slate-600">
            {rubriquesCount} rubriques • {offeringsCount} offrandes
          </p>
        </div>
      </div>
      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg"
      >
        <Plus className="w-5 h-5" />
        Nouvelle rubrique
      </button>
    </div>
  );
}
