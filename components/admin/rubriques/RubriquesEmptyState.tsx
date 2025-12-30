import { Package } from "lucide-react";
import React from "react";

export function RubriquesEmptyState() {
  return (
    <div className="text-center py-12 text-slate-400">
      <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
      <p className="text-sm">Aucune rubrique</p>
    </div>
  );
}
