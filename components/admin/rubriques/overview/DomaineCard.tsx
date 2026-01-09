"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Book, ChevronRight, Sparkles } from "lucide-react";

type CategoryKey = "animal" | "vegetal" | "beverage";

const CATEGORIES: Array<{
  value: CategoryKey;
  label: string;
  emoji: string;
  color: string;
}> = [
    { value: "animal", label: "Animaux", emoji: "🐓", color: "from-red-500 to-orange-500" },
    { value: "vegetal", label: "Végétaux", emoji: "🌾", color: "from-green-500 to-emerald-500" },
    { value: "beverage", label: "Boissons", emoji: "🥤", color: "from-blue-500 to-indigo-500" },
  ];

type View =
  | { name: "rubriques" }
  | { name: "rubrique"; rubriqueId: string }
  | { name: "choice"; rubriqueId: string; choiceId: string };

function getId(x: any): string {
  return String(x?._id ?? x?.id ?? "");
}

function cleanText(s: any) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}

function clamp(s: string, max = 140) {
  const t = cleanText(s);
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

const listVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

const RubriqueCard = memo(function RubriqueCard({
  rubrique,
  onOpen,
}: {
  rubrique: any;
  onOpen: (rubriqueId: string) => void;
}) {
  const rid = getId(rubrique);
  const count = Array.isArray(rubrique?.consultationChoices) ? rubrique.consultationChoices.length : 0;

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={() => onOpen(rid)}
      aria-label={`Ouvrir la rubrique ${rubrique?.titre}`}
      className={[
        "group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-3 text-left shadow-sm backdrop-blur transition",
        "hover:bg-white active:scale-[0.99]",
        "dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/50",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500/70" />
      <div className="pt-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-[14px] font-extrabold text-slate-900 dark:text-white">
              {rubrique?.titre ?? "Rubrique"}
            </div>
            <div className="mt-0.5 line-clamp-2 text-[12px] text-slate-600 dark:text-zinc-300">
              {rubrique?.description ? clamp(rubrique.description, 160) : "—"}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-[10px] font-extrabold text-white dark:bg-white dark:text-zinc-900">
              {count} choix
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
});

const ChoiceCard = memo(function ChoiceCard({
  choice,
  onOpen,
}: {
  choice: any;
  onOpen: (choiceId: string) => void;
}) {
  const cid = getId(choice);
  const frequence = cleanText(choice?.frequence || "");
  const participants = cleanText(choice?.participants || "");

  return (
    <motion.button
      type="button"
      variants={itemVariants}
      onClick={() => onOpen(cid)}
      aria-label={`Ouvrir le choix ${choice?.title}`}
      className={[
        "w-full rounded-3xl border border-slate-200 bg-white/70 p-3 text-left shadow-sm backdrop-blur transition",
        "hover:bg-white active:scale-[0.99]",
        "dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/50",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-extrabold text-slate-900 dark:text-white">
            {choice?.title ?? "Choix"}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[12px] text-slate-600 dark:text-zinc-300">
            {choice?.description ? clamp(choice.description, 180) : "—"}
          </div>

          {(frequence || participants) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {frequence ? (
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-extrabold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  {frequence}
                </span>
              ) : null}
              {participants ? (
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-extrabold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  {participants}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
});

const AlternativePill = memo(function AlternativePill({
  category,
  offeringId,
  quantity,
}: {
  category: CategoryKey;
  offeringId: string;
  quantity: number;
}) {
  const c = CATEGORIES.find((x) => x.value === category);
  return (
    <motion.div
      variants={itemVariants}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-2.5 py-2 text-[12px] font-semibold text-slate-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
    >
      <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${c?.color ?? "from-slate-500 to-slate-700"} px-2 py-0.5 text-[11px] font-extrabold text-white`}>
        {c?.emoji ?? "🎁"} {c?.label ?? category}
      </span>
      <span className="truncate">
        ID: {offeringId.slice(0, 6)}… · x{quantity}
      </span>
    </motion.div>
  );
});

export default function DomaineCardPremium({
  domaine,
  isExpanded,
  onToggle,
  expandedRubrique,
  setExpandedRubrique,
  expandedSousRubrique,
  setExpandedSousRubrique
}: {
  domaine: any; // backend payload: { _id, nom, description, rubriques: [...] }
  isExpanded?: boolean;
  onToggle?: () => void;
  expandedRubrique?: string | null;
  setExpandedRubrique?: (id: string | null) => void;
  expandedSousRubrique?: string | null;
  setExpandedSousRubrique?: (id: string | null) => void;
}) {
  const [view, setView] = useState<View>({ name: "rubriques" });

  const rubriques = useMemo(() => (Array.isArray(domaine?.rubriques) ? domaine.rubriques : []), [domaine]);

  const rubriquesById = useMemo(() => {
    const m = new Map<string, any>();
    for (const r of rubriques) m.set(getId(r), r);
    return m;
  }, [rubriques]);

  const currentRubrique = useMemo(() => {
    if (view.name === "rubrique" || view.name === "choice") return rubriquesById.get(view.rubriqueId) ?? null;
    return null;
  }, [view, rubriquesById]);

  const choices = useMemo(() => {
    const r = currentRubrique;
    return Array.isArray(r?.consultationChoices) ? r.consultationChoices : [];
  }, [currentRubrique]);

  const choicesById = useMemo(() => {
    const m = new Map<string, any>();
    for (const c of choices) m.set(getId(c), c);
    return m;
  }, [choices]);

  const currentChoice = useMemo(() => {
    if (view.name !== "choice") return null;
    return choicesById.get(view.choiceId) ?? null;
  }, [view, choicesById]);

  const openRubrique = useCallback((rubriqueId: string) => setView({ name: "rubrique", rubriqueId }), []);
  const openChoice = useCallback(
    (choiceId: string) => setView((prev) => (prev.name === "rubrique" ? { name: "choice", rubriqueId: prev.rubriqueId, choiceId } : prev)),
    []
  );

  const goBack = useCallback(() => {
    setView((prev) => {
      if (prev.name === "choice") return { name: "rubrique", rubriqueId: prev.rubriqueId };
      if (prev.name === "rubrique") return { name: "rubriques" };
      return prev;
    });
  }, []);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
      {/* Header domaine */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-1 text-[11px] font-extrabold text-white">
              <Book className="h-4 w-4" />
                   {domaine?.nom ?? "Domaine"}
            </div>

            <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {domaine?.nom ?? "Domaine"}
            </h2>

            {domaine?.description ? (
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-zinc-300">
                {clamp(domaine.description, 260)}
              </p>
            ) : null}
          </div>

          {view.name !== "rubriques" ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-extrabold text-slate-900 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Retour"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-[12px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <Sparkles className="h-4 w-4" />
              {rubriques.length} rubriques
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-zinc-800" />

      <div className="p-3 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          {/* VIEW 1: rubriques */}
          {view.name === "rubriques" && (
            <motion.div
              key="view-rubriques"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {rubriques.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-center text-[12px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
                  Aucune rubrique trouvée pour ce domaine.
                </div>
              ) : (
                <motion.div variants={listVariants} initial="initial" animate="animate" className="grid grid-cols-2 gap-3 sm:gap-4">
                  {rubriques.map((r: any) => (
                    <RubriqueCard key={getId(r)} rubrique={r} onOpen={openRubrique} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* VIEW 2: rubrique */}
          {view.name === "rubrique" && (
            <motion.div
              key={`view-rubrique-${view.rubriqueId}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <div className="rounded-3xl border border-slate-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="text-[11px] font-extrabold text-slate-500 dark:text-zinc-400">RUBRIQUE</div>
                <div className="mt-1 text-[15px] font-extrabold text-slate-900 dark:text-white">
                  {currentRubrique?.titre ?? "—"}
                </div>
                <div className="mt-1 text-[12px] text-slate-600 dark:text-zinc-300">
                  {currentRubrique?.description ? clamp(currentRubrique.description, 260) : "—"}
                </div>
              </div>

              <motion.div variants={listVariants} initial="initial" animate="animate" className="space-y-2">
                {choices.map((c: any) => (
                  <ChoiceCard key={getId(c)} choice={c} onOpen={openChoice} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* VIEW 3: choice */}
          {view.name === "choice" && (
            <motion.div
              key={`view-choice-${view.rubriqueId}-${view.choiceId}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <div className="rounded-3xl border border-slate-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="text-[11px] font-extrabold text-slate-500 dark:text-zinc-400">CHOIX</div>
                <div className="mt-1 text-[15px] font-extrabold text-slate-900 dark:text-white">
                  {currentChoice?.title ?? "—"}
                </div>
                <div className="mt-1 text-[12px] text-slate-600 dark:text-zinc-300">
                  {currentChoice?.description ? clamp(currentChoice.description, 320) : "—"}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/60 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="text-[12px] font-extrabold text-slate-900 dark:text-white">
                  Offrandes alternatives
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  {Array.isArray(currentChoice?.offering?.alternatives) && currentChoice.offering.alternatives.length > 0 ? (
                    <motion.div variants={listVariants} initial="initial" animate="animate" className="flex flex-col gap-2">
                      {currentChoice.offering.alternatives.map((a: any) => (
                        <AlternativePill
                          key={getId(a)}
                          category={String(a.category) as CategoryKey}
                          offeringId={String(a.offeringId)}
                          quantity={Number(a.quantity ?? 1)}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-[12px] text-slate-600 dark:text-zinc-300">
                      Aucune alternative configurée pour ce choix.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
