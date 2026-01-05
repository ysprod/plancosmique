"use client";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowLeft, Tags } from "lucide-react";
import ViewSwitcher from "./components/ViewSwitcher";
import InvalidRubriquesAlert from "./components/InvalidRubriquesAlert";
import { useRouter } from "next/navigation";
import Banner from "./components/Banner";
import PreviewCard from "./components/PreviewCard";
import SuccessCard from "./components/SuccessCard";
import CreateCategoryForm from "./components/CreateCategoryForm";
import { useCreateCategoryView } from "./useCreateCategoryView";

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
  } = useCreateCategoryView();

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

          <ViewSwitcher view={view} />
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

        {invalidRubriquesCount > 0 && <InvalidRubriquesAlert count={invalidRubriquesCount} />}

        <Banner banner={banner} />

        <AnimatePresence mode="wait" initial={false}>
          {view === "create" && (
            <motion.div key="create" variants={viewVariants} initial="initial" animate="animate" exit="exit">
              <CreateCategoryForm
                nom={nom}
                setNom={setNom}
                description={description}
                setDescription={setDescription}
                rubriques={rubriques}
                rubriqueIds={rubriqueIds}
                selectedSet={selectedSet}
                rubriquesLoading={rubriquesLoading}
                toggleRubrique={toggleRubrique}
                clearSelection={clearSelection}
                selectionSummary={selectionSummary}
                goPreview={goPreview}
              />
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