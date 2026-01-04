"use client";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { AlertTriangle, ArrowLeft, Eye, Layers, Tags } from "lucide-react";
import { useRouter } from "next/navigation";
import Banner from "./components/Banner";
import PreviewCard from "./components/PreviewCard";
import RubriquesPickerSimple from "./components/RubriquesPickerSimple";
import SuccessCard from "./components/SuccessCard";
import { useCreateCategoryPage } from "./useCreateCategoryPage";

const viewVariants: Variants = {
  initial: { opacity: 0, y: 10, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, filter: "blur(2px)", transition: { duration: 0.16 } },
};

export default function CreateCategoryPage() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const {
    rubriques,
    rubriquesLoading,
    view,
    setView,
    nom,
    setNom,
    description,
    setDescription,
    rubriqueIds,
    setRubriqueIds,
    selectedSet,
    busy,
    banner,
    showBanner,
    selectedRubriques,
    invalidRubriquesCount,
    toggleRubrique,
    clearSelection,
    goPreview,
    goCreate,
    selectionSummary,
    handleCreate,
  } = useCreateCategoryPage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      <div className="mx-auto max-w-2xl px-3 py-6 sm:px-4 sm:py-10">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => router.push("/admin/categories")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
            aria-label="Retour à la liste"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>

          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <Layers className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            Vue :{" "}
            <span className="font-extrabold">
              {view === "create" ? "Création" : view === "preview" ? "Aperçu" : "Succès"}
            </span>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
            <Tags className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              Nouvelle catégorie
            </h1>
          </div>
        </div>

        {invalidRubriquesCount > 0 && (
          <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>
                {invalidRubriquesCount} rubrique(s) n’ont pas d’identifiant valide et ne seront pas sélectionnables.
              </span>
            </div>
          </div>
        )}

        <Banner banner={banner} />

        <AnimatePresence mode="wait" initial={false}>
          {view === "create" && (
            <motion.div key="create" variants={viewVariants} initial="initial" animate="animate" exit="exit">
              <div className="grid gap-3">
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-700 dark:focus:ring-violet-900/40"
                  placeholder="Nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  aria-label="Nom de la catégorie"
                />

                <textarea
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300 focus:ring-2 focus:ring-violet-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-violet-700 dark:focus:ring-violet-900/40"
                  placeholder="Description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-label="Description de la catégorie"
                />

                <RubriquesPickerSimple
                  rubriques={rubriques ?? []}
                  selectedIds={rubriqueIds}
                  selectedSet={selectedSet}
                  loading={rubriquesLoading}
                  onToggle={toggleRubrique}
                  onRemove={toggleRubrique}
                  onClear={clearSelection}
                />

                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-600 dark:text-zinc-300">
                    <span className="font-semibold">{selectionSummary}</span>
                  </div>

                  <button
                    onClick={goPreview}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    aria-label="Aller à l'aperçu"
                  >
                    <Eye className="h-4 w-4" />
                    Aperçu
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === "preview" && (
            <motion.div key="preview" variants={viewVariants} initial="initial" animate="animate" exit="exit">
              <PreviewCard
                nom={nom}
                description={description}
                selectedRubriques={selectedRubriques}
                onBack={goCreate}
                onConfirm={handleCreate}
                busy={busy}
              />
            </motion.div>
          )}

          {view === "success" && (
            <motion.div key="success" variants={viewVariants} initial="initial" animate="animate" exit="exit">
              <SuccessCard
                nom={nom.trim()}
                onGoList={() => router.push("/admin/categories")}
                onCreateAnother={() => {
                  setNom("");
                  setDescription("");
                  setRubriqueIds([]);
                  setView("create");
                  showBanner({ type: "info", message: "Prêt pour une nouvelle catégorie." });
                }}
                reducedMotion={!!reducedMotion}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}