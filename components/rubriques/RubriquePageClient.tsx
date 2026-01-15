'use client';

import { ConsultationSection } from "@/components/vie-personnelle/ConsultationSection";
import type { Rubrique } from "@/lib/interfaces";

interface RubriquePageClientProps {
  rubrique: Rubrique;
}

export default function RubriquePageClient({ rubrique }: RubriquePageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
        <h1 className="mb-4 text-2xl font-extrabold text-slate-900 dark:text-white">
          {rubrique.titre}
        </h1>
        <p className="mb-6 text-slate-700 dark:text-zinc-200">{rubrique.description}</p>
        <ConsultationSection rubrique={rubrique} />
      </div>
    </div>
  );
}
