'use client';

import { ConsultationSection } from "@/components/vie-personnelle/ConsultationSection";
import type { Rubrique } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface RubriqueDetailPageProps {
  rubrique: Rubrique;
}

export default function RubriqueDetailPage({ rubrique }: RubriqueDetailPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
        {rubrique.categorieId && (
          <button
            onClick={() => router.push(`/secured/category/${rubrique.categorieId}`)}
            className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la catégorie
          </button>
        )}
        <h1 className="mb-4 text-2xl font-extrabold text-slate-900 dark:text-white">
          {rubrique.titre}
        </h1>
        <p className="mb-6 text-slate-700 dark:text-zinc-200">{rubrique.description}</p>
        <ConsultationSection rubrique={rubrique} />
      </div>
    </div>
  );
}
