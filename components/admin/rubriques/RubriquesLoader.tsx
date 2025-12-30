import { Loader2 } from "lucide-react";
import React from "react";

interface RubriquesLoaderProps {
  loading: boolean;
  offeringsLoading: boolean;
}

export function RubriquesLoader({ loading, offeringsLoading }: RubriquesLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      <p className="text-sm text-slate-600">
        {loading ? "Chargement rubriques..." : "Chargement offrandes..."}
      </p>
    </div>
  );
}
