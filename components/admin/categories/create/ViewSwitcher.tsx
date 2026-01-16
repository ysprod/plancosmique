'use client';

import { Layers } from "lucide-react";
import React from "react";

interface ViewSwitcherProps {
  view: string;
}

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({ view }) => (
  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
    <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
    Vue :{" "}
    <span className="font-extrabold">
      {view === "create" ? "Création" : view === "preview" ? "Aperçu" : "Succès"}
    </span>
  </div>
);

export default ViewSwitcher;
