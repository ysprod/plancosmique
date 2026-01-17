"use client";
import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import AlternativePill from "./AlternativePill";
import { pageVariants } from "./animations";
import { CATEGORIES, CategoryKey } from "./constants";
import { shortDesc, safeText } from "@/hooks/admin/useAssociationsUtils";

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

const DetailsView = memo(function DetailsView({
  rubriqueId,
  choiceId,
  choice,
  offeringsById,
}: {
  rubriqueId: string;
  choiceId: string;
  choice: any;
  offeringsById: Map<string, any>;
}) {
  const resolvedAlternatives = useMemo(() => {
    if (!choice) return [];

    const alts =
      choice?.alternatives ??
      choice?.offering?.alternatives ??
      null;

    if (!alts && Array.isArray(choice?.offrandes)) {
      return choice.offrandes.map((offeringId: string) => ({
        category: "animal" as CategoryKey,
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
  }, [choice]);

  return (
    <motion.div
      key={`details-${rubriqueId}-${choiceId}`}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.18 }}
      className="space-y-2"
    >
      <div className="rounded-3xl border border-slate-200 bg-white/70 p-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="text-[13px] font-extrabold text-slate-900 dark:text-white">
          {safeText(choice?.titre ?? choice?.title ?? "Détails")}
        </div>
        <div className="mt-0.5 text-[12px] text-slate-600 dark:text-zinc-300">
          {shortDesc(safeText(choice?.description ?? ""), 220)}
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
  );
});

export default DetailsView;
