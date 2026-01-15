"use client";
import React, { memo, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, PackageOpen } from "lucide-react";
import { useAdminRubriquesPage } from "@/hooks/admin/useAdminRubriquesPage";
import { useAdminConsultations } from "@/hooks/consultations/useAdminConsultations";
import { useAdminOffrandes } from "@/hooks/admin/useAdminOffrandes";

type View =
  | { name: "rubriques" }
  | { name: "choices"; rubriqueId: string }
  | { name: "details"; rubriqueId: string; choiceId: string };

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

function getId(x: any): string | null {
  const raw = x?._id ?? x?.id;
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object" && typeof raw.$oid === "string") return raw.$oid;
  if (typeof raw?.toString === "function") {
    const s = raw.toString();
    return s && s !== "[object Object]" ? s : null;
  }
  return null;
}

function safeText(v: any): string {
  return String(v ?? "").trim();
}

function shortDesc(desc: string, max = 110) {
  const d = desc.replace(/\s+/g, " ").trim();
  return d.length > max ? d.slice(0, max - 1) + "…" : d;
}

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

const gridItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

const chipVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
};

const RubriqueCard = memo(function RubriqueCard({
  titre,
  description,
  count,
  onOpen,
}: {
  titre: string;
  description: string;
  count: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      variants={gridItem}
      onClick={onOpen}
      aria-label={`Ouvrir rubrique ${titre}`}
      className="group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-3 text-left shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40"
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-2xl" />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
            {titre}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[12px] text-slate-600 dark:text-zinc-300">
            {shortDesc(description || "—")}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-[10px] font-extrabold text-white dark:bg-white dark:text-zinc-900">
            {count} choix
          </span>

          <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition group-hover:translate-x-0.5 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
});

const ChoiceRow = memo(function ChoiceRow({
  title,
  description,
  onOpen,
}: {
  title: string;
  description: string;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Ouvrir choix ${title}`}
      className="w-full rounded-3xl border border-slate-200 bg-white/70 p-3 text-left shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40"
      variants={gridItem}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-extrabold text-slate-900 dark:text-white">
            {title}
          </div>
          <div className="mt-0.5 line-clamp-2 text-[12px] text-slate-600 dark:text-zinc-300">
            {shortDesc(description || "—", 140)}
          </div>
        </div>
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </motion.button>
  );
});

const AlternativePill = memo(function AlternativePill({
  label,
  emoji,
  color,
  text,
}: {
  label: string;
  emoji: string;
  color: string;
  text: string;
}) {
  return (
    <motion.div
      variants={chipVariants}
      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-2 text-[12px] font-semibold text-slate-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100"
    >
      <span
        className={`inline-flex items-center rounded-full bg-gradient-to-r ${color} px-2 py-0.5 text-[11px] font-extrabold text-white`}
      >
        {emoji} {label}
      </span>
      <span className="truncate">{text}</span>
    </motion.div>
  );
});

function AssociationsConsultationsOffrandes() {
  const { rubriques } = useAdminRubriquesPage();
  const { consultations } = useAdminConsultations();
  const { offerings } = useAdminOffrandes();

  const [view, setView] = useState<View>({ name: "rubriques" });

  /**
   * ✅ Index offrandes: offeringId => offering
   * Corrige le bug o.id vs o._id
   */
  const offeringsById = useMemo(() => {
    const m = new Map<string, any>();
    for (const o of offerings ?? []) {
      const id = getId(o);
      if (id) m.set(id, o);
    }
    return m;
  }, [offerings]);

  /**
   * ✅ Index consultations par rubrique (O(n))
   * NOTE: ton dataset montre plutôt "consultationChoices" sur les rubriques,
   * MAIS ton hook useAdminConsultations semble renvoyer des consultations séparées,
   * donc on garde les 2 stratégies:
   * - si c.rubrique existe => association par rubrique
   * - sinon, l’écran reste utile pour "consultations" séparées
   */
  const consultationsByRubriqueId = useMemo(() => {
    const m = new Map<string, any[]>();
    for (const c of consultations ?? []) {
      const rid = String(c?.rubrique ?? "");
      if (!rid) continue;
      const arr = m.get(rid);
      if (arr) arr.push(c);
      else m.set(rid, [c]);
    }
    return m;
  }, [consultations]);

  /**
   * ✅ Rubriques filtrées (uniquement celles qui ont des consultations)
   * + On sécurise les IDs partout
   */
  const rubriquesWithConsultations = useMemo(() => {
    const out: Array<{ id: string; titre: string; description: string; count: number; raw: any }> = [];
    for (const r of rubriques ?? []) {
      const id = getId(r);
      if (!id) continue;
      const titre = safeText(r?.titre ?? "Rubrique");
      const description = safeText(r?.description ?? "");
      const count = (consultationsByRubriqueId.get(id)?.length ?? 0);

      // Si ton hook consultations n’a pas de liaison rubrique, on ne “hide” pas tout:
      // mais ici on suit ta logique initiale: n’afficher que celles qui matchent.
      if (count === 0) continue;

      out.push({ id, titre, description, count, raw: r });
    }
    // tri stable: les plus “riches” d’abord
    out.sort((a, b) => b.count - a.count || a.titre.localeCompare(b.titre));
    return out;
  }, [rubriques, consultationsByRubriqueId]);

  const openRubrique = useCallback((rubriqueId: string) => {
    setView({ name: "choices", rubriqueId });
  }, []);

  const openChoice = useCallback((rubriqueId: string, choiceId: string) => {
    setView({ name: "details", rubriqueId, choiceId });
  }, []);

  const goBack = useCallback(() => {
    setView((prev) => {
      if (prev.name === "details") return { name: "choices", rubriqueId: prev.rubriqueId };
      if (prev.name === "choices") return { name: "rubriques" };
      return prev;
    });
  }, []);

  const currentRubrique = useMemo(() => {
    if (view.name === "rubriques") return null;
    return rubriquesWithConsultations.find((r) => r.id === view.rubriqueId) ?? null;
  }, [view, rubriquesWithConsultations]);

  const currentChoices = useMemo(() => {
    if (view.name !== "choices" && view.name !== "details") return [];
    return consultationsByRubriqueId.get(view.rubriqueId) ?? [];
  }, [view, consultationsByRubriqueId]);

  const currentChoice = useMemo(() => {
    if (view.name !== "details") return null;
    const cid = view.choiceId;
    return currentChoices.find((c: any) => String(getId(c) ?? c?.id ?? "") === cid) ?? null;
  }, [view, currentChoices]);

  /**
   * ✅ Résolution des alternatives
   * - supporte soit `c.alternatives` (ex: array {offeringId, quantity, category})
   * - soit `c.offering.alternatives` (comme dans ton JSON rubriques)
   * - soit `c.offrandes` (ancienne forme: [offeringId])
   */
  const resolvedAlternatives = useMemo(() => {
    if (!currentChoice) return [];

    const alts =
      currentChoice?.alternatives ??
      currentChoice?.offering?.alternatives ??
      null;

    // Ancienne forme: offrandes: string[]
    if (!alts && Array.isArray(currentChoice?.offrandes)) {
      return currentChoice.offrandes.map((offeringId: string) => ({
        category: "animal" as CategoryKey, // fallback
        offeringId,
        quantity: 1,
      }));
    }

    if (!Array.isArray(alts)) return [];

    return alts
      .map((a: any) => ({
        category: String(a?.category ?? "") as CategoryKey,
        offeringId: String(a?.offeringId ?? ""),
        quantity: Number(a?.quantity ?? 1),
      }))
      .filter((a: any) => a.offeringId);
  }, [currentChoice]);

  return (
    <div className="min-h-[70vh] rounded-3xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/40">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">
            Associations · Rubriques → Consultations → Offrandes
          </div>
          <div className="mt-0.5 text-[12px] text-slate-600 dark:text-zinc-300">
            Navigation interne ultra-compacte, indexation O(n), rendu fluide.
          </div>
        </div>

        {view.name !== "rubriques" ? (
          <button
            type="button"
            onClick={goBack}
            aria-label="Retour"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            <PackageOpen className="h-4 w-4" />
            {rubriquesWithConsultations.length} rubriques
          </span>
        )}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {/* VIEW 1: Rubriques */}
        {view.name === "rubriques" && (
          <motion.div
            key="rubriques"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18 }}
          >
            {rubriquesWithConsultations.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6 text-center text-[12px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300">
                Aucune rubrique associée (vérifie que <code>consultation.rubrique</code> contient bien l’ID de la rubrique).
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 gap-2 sm:gap-3"
                initial="initial"
                animate="animate"
                transition={{ staggerChildren: 0.04 }}
              >
                {rubriquesWithConsultations.map((r) => (
                  <RubriqueCard
                    key={r.id}
                    titre={r.titre}
                    description={r.description}
                    count={r.count}
                    onOpen={() => openRubrique(r.id)}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* VIEW 2: Choices */}
        {view.name === "choices" && (
          <motion.div
            key={`choices-${view.rubriqueId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18 }}
            className="space-y-2"
          >
            <div className="rounded-3xl border border-slate-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="text-[13px] font-extrabold text-slate-900 dark:text-white">
                {currentRubrique?.titre ?? "Rubrique"}
              </div>
              <div className="mt-0.5 text-[12px] text-slate-600 dark:text-zinc-300">
                {shortDesc(currentRubrique?.description ?? "—", 180)}
              </div>
            </div>

            <motion.div
              className="space-y-2"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.03 }}
            >
              {currentChoices.map((c: any) => {
                const cid = String(getId(c) ?? c?.id ?? "");
                const title = safeText(c?.titre ?? c?.title ?? "Consultation");
                const desc = safeText(c?.description ?? "");
                return (
                  <ChoiceRow
                    key={cid}
                    title={title}
                    description={desc}
                    onOpen={() => openChoice(view.rubriqueId, cid)}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {/* VIEW 3: Details */}
        {view.name === "details" && (
          <motion.div
            key={`details-${view.rubriqueId}-${view.choiceId}`}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18 }}
            className="space-y-2"
          >
            <div className="rounded-3xl border border-slate-200 bg-white/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="text-[13px] font-extrabold text-slate-900 dark:text-white">
                {safeText(currentChoice?.titre ?? currentChoice?.title ?? "Détails")}
              </div>
              <div className="mt-0.5 text-[12px] text-slate-600 dark:text-zinc-300">
                {shortDesc(safeText(currentChoice?.description ?? ""), 220)}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="mb-2 text-[12px] font-extrabold text-slate-900 dark:text-white">
                Alternatives (résolution offeringId → offering)
              </div>

              <motion.div
                className="flex flex-col gap-2"
                initial="initial"
                animate="animate"
                transition={{ staggerChildren: 0.04 }}
              >
                {resolvedAlternatives.length === 0 ? (
                  <div className="text-[12px] text-slate-600 dark:text-zinc-300">
                    Aucune alternative trouvée sur ce choix (vérifie <code>alternatives</code> ou <code>offering.alternatives</code>).
                  </div>
                ) : (
                  resolvedAlternatives.map((a: any, idx: number) => {
                    const cat = CATEGORIES.find((c) => c.value === a.category);
                    const off = offeringsById.get(a.offeringId);

                    const name = off?.name ?? `Offrande ${a.offeringId}`;
                    const icon = off?.icon ?? cat?.emoji ?? "🎁";
                    const price = typeof off?.price === "number" ? `${off.price} XOF` : "";
                    const priceUSD = typeof off?.priceUSD === "number" ? `($${off.priceUSD})` : "";

                    const label = cat?.label ?? a.category ?? "Catégorie";
                    const emoji = cat?.emoji ?? "🎁";
                    const color = cat?.color ?? "from-slate-500 to-slate-700";

                    return (
                      <AlternativePill
                        key={`${a.category}-${a.offeringId}-${idx}`}
                        label={label}
                        emoji={emoji}
                        color={color}
                        text={`${icon} ${name} · x${a.quantity}${price ? ` · ${price} ${priceUSD}` : ""}`}
                      />
                    );
                  })
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AssociationsConsultationsOffrandes;
