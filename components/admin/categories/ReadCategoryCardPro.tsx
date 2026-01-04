"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FolderTree, Pencil, Trash2, Copy, Check } from "lucide-react";
import { MiniPill } from "./MiniPill";
import { Rubrique } from "@/lib/interfaces";
import { Categorie } from "@/hooks/useAdminCategoriesPage";

function getCategoryId(cat: any): string {
  // Backend: souvent _id
  return String(cat?._id ?? cat?.id ?? "");
}

function rubriqueLabel(r: any): string {
  return String(r?.titre ?? r?.nom ?? "");
}

const cardVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.12 } },
};

export const ReadCategoryCardPro = memo(function ReadCategoryCardPro({
  cat,
  onEdit,
  onDelete,
}: {
  cat: Categorie;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const catId = useMemo(() => getCategoryId(cat), [cat]);
  const rubriquesMeta = useMemo(() => {
    const list = (cat?.rubriques ?? []).filter(Boolean);
    const names = list.map(rubriqueLabel).filter(Boolean);
    const max = 8;
    const visible = list.slice(0, max);
    const remaining = Math.max(0, list.length - max);
    return { list, names, visible, remaining, count: list.length };
  }, [cat?.rubriques]);

  // Utilise le router pour naviguer vers la page d'édition
  const router = require('next/navigation').useRouter();
  const handleEdit = useCallback(() => {
    if (!catId) return;
    router.push(`/admin/categories/${catId}/edit`);
  }, [catId, router]);

  const handleDelete = useCallback(() => {
    if (!catId) return;
    onDelete(catId);
  }, [catId, onDelete]);

  const handleCopyId = useCallback(async () => {
    if (!catId) return;
    try {
      await navigator.clipboard.writeText(catId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op: clipboard permissions
    }
  }, [catId]);

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-emerald-500 via-lime-500 to-violet-500/80" />

      <div className="pt-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <motion.div
                className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 text-white shadow-sm"
                whileHover={reducedMotion ? undefined : { scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <FolderTree className="h-5 w-5" />
              </motion.div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-sm font-extrabold text-slate-900 dark:text-white">
                    {cat.nom || "—"}
                  </h3>

                  {/* Counter badge */}
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-bold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                    {rubriquesMeta.count}
                  </span>
                </div>

                {/* ID + Copy */}
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                    ID: <span className="ml-1 font-mono text-[10px] opacity-80">{catId || "—"}</span>
                  </span>

                  {catId && (
                    <button
                      type="button"
                      onClick={handleCopyId}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
                      aria-label="Copier l'identifiant"
                    >
                      <AnimatePresence initial={false} mode="wait">
                        {copied ? (
                          <motion.span
                            key="copied"
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -2 }}
                            className="inline-flex items-center gap-1"
                          >
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                            Copié
                          </motion.span>
                        ) : (
                          <motion.span
                            key="copy"
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -2 }}
                            className="inline-flex items-center gap-1"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Copier
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  )}
                </div>

                {/* Description */}
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-600 dark:text-zinc-300">
                  {cat.description || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800/60 dark:focus:ring-violet-900/40"
              aria-label={`Modifier la catégorie ${cat.nom}`}
            >
              <Pencil className="h-4 w-4" />
              Modifier
            </motion.button>

            <motion.button
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-900 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:border-rose-900/40 dark:bg-rose-900/20 dark:text-rose-100 dark:hover:bg-rose-900/30 dark:focus:ring-rose-900/40"
              aria-label={`Supprimer la catégorie ${cat.nom}`}
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </motion.button>
          </div>
        </div>

        {/* Rubriques */}
        <div className="mt-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white">
              Rubriques associées
            </span>
            <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-300">
              {rubriquesMeta.count}
            </span>
          </div>

          {rubriquesMeta.count === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              Aucune rubrique associée.
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {rubriquesMeta.visible.map((r: any, idx: number) => {
                const rid = String(r?._id ?? r?.id ?? idx);
                const label = rubriqueLabel(r) || "—";
                return <MiniPill key={`${rid}-${idx}`}>{label}</MiniPill>;
              })}

              {rubriquesMeta.remaining > 0 && (
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                  +{rubriquesMeta.remaining}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
