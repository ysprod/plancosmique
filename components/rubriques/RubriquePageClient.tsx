'use client';


import { ConsultationSection } from "@/components/vie-personnelle/ConsultationSection";
import type { Rubrique } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useRef } from "react";

interface RubriquePageClientProps {
  rubrique: Rubrique;
}


export default function RubriquePageClient({ rubrique }: RubriquePageClientProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  // Détection des rubriques à protéger
  const isProtectedRubrique = (rubrique.categorie?.toLowerCase?.().includes("rituel") || rubrique.categorie?.toLowerCase?.().includes("testament"))
    || (rubrique.titre?.toLowerCase?.().includes("rituel") || rubrique.titre?.toLowerCase?.().includes("testament"));

  // Désactive le copier-coller
  useEffect(() => {
    if (!isProtectedRubrique || !contentRef.current) return;
    const el = contentRef.current;
    const prevent = (e: Event) => e.preventDefault();
    el.addEventListener("copy", prevent);
    el.addEventListener("cut", prevent);
    el.addEventListener("paste", prevent);
    el.addEventListener("contextmenu", prevent);
    return () => {
      el.removeEventListener("copy", prevent);
      el.removeEventListener("cut", prevent);
      el.removeEventListener("paste", prevent);
      el.removeEventListener("contextmenu", prevent);
    };
  }, [isProtectedRubrique]);

  // Placeholder pour la logique d'accès (gratuit/offrande)
  const isGratuit = rubrique.consultationChoices?.[0]?.offering?.price === 0 || rubrique.consultationChoices?.[0]?.offering?.isFree;
  const needsOffrande = !isGratuit;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
        {rubrique.categorieId && (
          <button
            onClick={() => router.push(`/star/category/${rubrique.categorieId}`)}
            className="mb-4 flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à la catégorie
          </button>
        )}
        <h1 className="mb-4 text-2xl font-extrabold text-slate-900 dark:text-white">
          {rubrique.titre}
        </h1>
        {/* Texte protégé contre le copier-coller */}
        <div
          ref={contentRef}
          className={isProtectedRubrique ? "select-none pointer-events-auto cursor-default bg-gradient-to-br from-purple-50/80 to-indigo-50/80 dark:from-zinc-900/80 dark:to-zinc-800/80 p-4 rounded-lg border border-purple-200 dark:border-zinc-700" : "mb-6 text-slate-700 dark:text-zinc-200"}
          style={isProtectedRubrique ? { userSelect: "none" } : {}}
        >
          {rubrique.description}
        </div>

        {/* Affichage du bouton de téléchargement et accès */}
        {isProtectedRubrique && (
          <div className="mt-6 flex flex-col gap-3">
            {isGratuit ? (
              <button className="flex items-center gap-2 px-4 py-2 rounded bg-cosmic-indigo text-white font-semibold shadow hover:bg-cosmic-purple transition">
                <Download className="w-5 h-5" /> Télécharger le document
              </button>
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-cosmic-pink to-cosmic-indigo text-white font-semibold shadow hover:from-cosmic-indigo hover:to-cosmic-pink transition">
                <Download className="w-5 h-5" /> Faire une offrande pour télécharger
              </button>
            )}
            <div className="text-xs text-slate-500 dark:text-zinc-400 italic">La copie/coller est désactivée pour ce contenu. Vous pouvez uniquement le consulter ou le télécharger.</div>
          </div>
        )}

        {/* Consultation normale si non protégé */}
        {!isProtectedRubrique && <ConsultationSection rubrique={rubrique} />}
      </div>
    </div>
  );
}
