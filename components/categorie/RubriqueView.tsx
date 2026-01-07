import { ConsultationSection } from "@/components/vie-personnelle/ConsultationSection";
import { Rubrique } from "@/lib/interfaces";
import React from "react";

export function RubriqueView({ rubrique }: { rubrique: Rubrique }) {
  return (
    <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
      <h1 className="mb-4 text-2xl font-extrabold text-slate-900 dark:text-white">
        {rubrique.titre}
      </h1>
      <p className="mb-6 text-slate-700 dark:text-zinc-200">{rubrique.description}</p>
      <ConsultationSection rubrique={rubrique} />
    </div>
  );
}
