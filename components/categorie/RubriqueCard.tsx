"use client";

import type { Rubrique } from "@/lib/interfaces";
import { motion, useReducedMotion } from "framer-motion";
import React, { memo, useCallback, useMemo } from "react";
import { ChevronRight, Sparkles, Eye } from "lucide-react";

const itemVariants = {
  initial: { opacity: 0, y: 14, scale: 0.985, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
  },
  hover: { scale: 1.015, transition: { duration: 0.18 } },
  tap: { scale: 0.99 },
} as const;

const borderGradients = [
  "from-red-500 via-orange-500 to-pink-500",
  "from-violet-600 via-indigo-600 to-blue-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-rose-500 via-fuchsia-500 to-purple-500",
  "from-amber-500 via-yellow-500 to-orange-500",
] as const;

function clampText(s: string, max = 120) {
  const x = String(s ?? "").replace(/\s+/g, " ").trim();
  return x.length > max ? x.slice(0, max - 1) + "…" : x;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Hash déterministe (rapide) */
function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** ID stable : _id si dispo, sinon basé sur contenu */
function getStableRubriqueId(r: Rubrique): string {
  const anyRub: any = r as any;
  const raw = String(anyRub?._id ?? "");
  if (raw) return raw;

  const t = String(anyRub?.titre ?? "");
  const d = String(anyRub?.description ?? "");
  const h = hashString(`${t}|${d}`);
  return `rub_${h.toString(16)}`; // stable
}

function getBorderGradientFromId(id: string): (typeof borderGradients)[number] {
  const h = hashString(id);
  return borderGradients[h % borderGradients.length];
}

/** Particules déterministes (positions “random” mais stables) */
function getParticlesFromId(id: string) {
  const h = hashString(id);
  // 3 particules : positions relatives stables
  const p1 = { left: 18 + (h % 22), top: 12 + ((h >> 3) % 18), d: 2.1 };
  const p2 = { left: 48 + ((h >> 6) % 22), top: 18 + ((h >> 9) % 18), d: 2.6 };
  const p3 = { left: 70 + ((h >> 12) % 18), top: 10 + ((h >> 15) % 20), d: 3.1 };
  return [p1, p2, p3];
}

export const RubriqueCard = memo(
  function RubriqueCard({
    rub,
    onOpen,
  }: {
    rub: Rubrique;
    onOpen: (id: string) => void;
  }) {
    const reduceMotion = useReducedMotion();

    const derived = useMemo(() => {
      const anyRub: any = rub as any;

      const id = getStableRubriqueId(rub);
      const title = String(anyRub?.titre ?? "Rubrique").trim();
      const descRaw = String(anyRub?.description ?? "").trim();
      const desc = descRaw ? clampText(descRaw, 140) : "—";

      const borderClass = getBorderGradientFromId(id);

      const choicesCount = Array.isArray(anyRub?.consultationChoices)
        ? anyRub.consultationChoices.length
        : undefined;

      const particles = getParticlesFromId(id);

      return { id, title, desc, borderClass, choicesCount, particles };
    }, [rub]);

    const handleOpen = useCallback(() => {
      if (derived.id) onOpen(derived.id);
    }, [derived.id, onOpen]);

    return (
      <motion.li
        variants={itemVariants}
        initial="initial"
        animate="animate"
        whileHover={reduceMotion ? undefined : "hover"}
        whileTap={reduceMotion ? undefined : "tap"}
        className="relative isolate"
        layoutId={`rubrique-${derived.id}`}
      >
        {/* Cadre gradient (moins d’overdraw, toujours premium) */}
        <div className="absolute inset-0 rounded-[28px] p-[2px]">
          <div
            className={cx(
              "absolute inset-0 rounded-[28px] bg-gradient-to-r opacity-60",
              derived.borderClass
            )}
          />
          {!reduceMotion ? (
            <div
              className={cx(
                "absolute inset-0 rounded-[28px] bg-gradient-to-r opacity-35 blur-[6px]",
                derived.borderClass
              )}
            />
          ) : null}
        </div>

        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label={`Ouvrir ${derived.title}`}
          className={cx(
            "group relative w-full overflow-hidden rounded-[24px] p-4 text-left",
            "bg-white/75 backdrop-blur-xl",
            "border border-white/50 shadow-sm shadow-black/5",
            "transition-all duration-300 ease-out",
            "hover:shadow-md hover:shadow-black/10",
            "dark:bg-zinc-950/45 dark:border-zinc-800/45 dark:shadow-black/20"
          )}
        >
          {/* Shine (désactivé si reduce motion) */}
          {!reduceMotion ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-40"
              animate={{ x: ["0%", "260%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
            />
          ) : null}

          {/* Particules (déterministes + légères) */}
          {!reduceMotion ? (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {derived.particles.map((p, i) => (
                <motion.span
                  key={i}
                  className="absolute h-[2px] w-[2px] rounded-full bg-gradient-to-r from-violet-500/40 to-pink-500/40"
                  style={{ left: `${p.left}%`, top: `${p.top}%` }}
                  animate={{ y: [0, -14, 0], x: [0, 8, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: p.d, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          ) : null}

          {/* Contenu */}
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">             
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-extrabold leading-tight text-slate-900 dark:text-white">
                    {derived.title}
                  </h3>
                  <p className="mt-1  text-slate-600/90 text-sm leading-relaxed text-slate-600/90 dark:text-zinc-300/90">
                    {derived.desc}
                  </p>
                </div>
              </div>

              <motion.span
                className={cx(
                  "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl",
                  "bg-white/70 text-slate-700 shadow-sm ring-1 ring-slate-200/70",
                  "transition-all group-hover:text-violet-700",
                  "dark:bg-zinc-900/70 dark:text-zinc-300 dark:ring-zinc-800/70 dark:group-hover:text-violet-300"
                )}
                whileHover={reduceMotion ? undefined : { rotate: 90 }}
                transition={{ duration: 0.18 }}
                aria-hidden="true"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              {typeof derived.choicesCount === "number" ? (
                <span
                  className={cx(
                    "inline-flex items-center rounded-full px-3 py-1.5",
                    "bg-white/70 ring-1 ring-slate-200/70",
                    "text-[11px] font-extrabold tracking-tight text-slate-700",
                    "dark:bg-zinc-900/70 dark:ring-zinc-800/70 dark:text-zinc-200"
                  )}
                >
                  <span className="mr-2 inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  {derived.choicesCount} consultation(s)
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                  Explorer la rubrique
                </span>
              )}

              <span
                className={cx(
                  "inline-flex items-center gap-2 rounded-2xl px-3.5 py-2",
                  "bg-gradient-to-r from-slate-900 to-black text-[12px] font-extrabold text-white shadow-sm",
                  "group-hover:from-violet-700 group-hover:to-indigo-800",
                  "dark:from-white/10 dark:to-white/5 dark:group-hover:from-violet-600/80 dark:group-hover:to-indigo-600/80"
                )}
                aria-hidden="true"
              >
                Explorer
                <Eye className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </motion.button>
      </motion.li>
    );
  },
  (prev, next) => {
    if (prev.onOpen !== next.onOpen) return false;

    const p: any = prev.rub;
    const n: any = next.rub;
    if (p === n) return true;

    const sameId = String(p?._id ?? "") === String(n?._id ?? "");
    const sameTitle = String(p?.titre ?? "") === String(n?.titre ?? "");
    const sameDesc = String(p?.description ?? "") === String(n?.description ?? "");

    const pLen = Array.isArray(p?.consultationChoices) ? p.consultationChoices.length : -1;
    const nLen = Array.isArray(n?.consultationChoices) ? n.consultationChoices.length : -1;

    return sameId && sameTitle && sameDesc && pLen === nLen;
  }
);
