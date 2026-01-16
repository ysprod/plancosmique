'use client';

import { AlertTriangle } from "lucide-react";
import React from "react";

interface InvalidRubriquesAlertProps {
  count: number;
}

const InvalidRubriquesAlert: React.FC<InvalidRubriquesAlertProps> = ({ count }) => (
  <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-100">
    <div className="flex items-center gap-2">
      <AlertTriangle className="h-4 w-4" />
      <span>
        {count} rubrique(s) n’ont pas d’identifiant valide et ne seront pas sélectionnables.
      </span>
    </div>
  </div>
);

export default InvalidRubriquesAlert;