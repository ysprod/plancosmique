"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import { cx } from "@/lib/functions";
import { Check, ChevronDown, Search, X } from "lucide-react";

export type ChoiceOption = {
  id: string;
  label: string;
  promptId?: string | null;
};

type Props = {
  value: string;
  onChange: (id: string) => void;
  options: ChoiceOption[];
  loading?: boolean;
  error?: string | null;
  placeholder?: string;
  helperText?: string;
};

const ROW_H = 44;         // hauteur item (px)
const VIEWPORT_H = 320;   // hauteur liste (px)
const OVERSCAN = 6;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export const ChoicePicker = memo(function ChoicePicker({
  value,
  onChange,
  options,
  loading = false,
  error = null,
  placeholder = "Rechercher un choix…",
  helperText = "Recherche instantanée • rendu optimisé • +100 éléments OK",
}: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const selected = useMemo(
    () => options.find((o) => o.id === value) || null,
    [options, value]
  );

  // Filtrage memo (sur deferredQ => moins de rerenders pendant la frappe)
  const filtered = useMemo(() => {
    const nq = norm(deferredQ);
    if (!nq) return options;

    // scoring simple: startsWith > includes
    const starts: ChoiceOption[] = [];
    const contains: ChoiceOption[] = [];

    for (const o of options) {
      const nl = norm(o.label);
      if (nl.startsWith(nq)) starts.push(o);
      else if (nl.includes(nq)) contains.push(o);
    }
    return [...starts, ...contains];
  }, [options, deferredQ]);

  // Virtualisation
  const total = filtered.length;
  const viewportCount = Math.ceil(VIEWPORT_H / ROW_H);

  const startIndex = useMemo(() => {
    const raw = Math.floor(scrollTop / ROW_H) - OVERSCAN;
    return clamp(raw, 0, Math.max(0, total - 1));
  }, [scrollTop, total]);

  const endIndex = useMemo(() => {
    return clamp(startIndex + viewportCount + OVERSCAN * 2, 0, total);
  }, [startIndex, viewportCount, total]);

  const visible = useMemo(() => filtered.slice(startIndex, endIndex), [filtered, startIndex, endIndex]);

  const padTop = startIndex * ROW_H;
  const padBottom = Math.max(0, (total - endIndex) * ROW_H);

  const close = useCallback(() => setOpen(false), []);
  const openAndFocus = useCallback(() => {
    setOpen(true);
    // focus input next tick
    queueMicrotask(() => inputRef.current?.focus());
  }, []);

  const onSelect = useCallback(
    (id: string) => {
      onChange(id);
      close();
      setQ("");
      // reset scroll
      setScrollTop(0);
      if (listRef.current) listRef.current.scrollTop = 0;
    },
    [onChange, close]
  );

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop((e.currentTarget as HTMLDivElement).scrollTop);
  }, []);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <section
      className={cx(
        "w-full",
        "rounded-3xl border",
        "border-slate-200/70 dark:border-white/10",
        "bg-white/75 dark:bg-slate-950/55",
        "backdrop-blur-xl",
        "shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]",
        "px-4 py-4 sm:px-5"
      )}
      aria-busy={loading}
    >
      <div className="text-center">
        <h2 className="text-[14px] sm:text-[15px] font-extrabold tracking-tight text-slate-900 dark:text-white">
          Choix de consultation
        </h2>
        <p className="mt-1 text-[12px] leading-snug text-slate-600 dark:text-slate-300/85">
          {helperText}
        </p>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-center text-[12px] text-slate-600 dark:text-slate-300">
            Chargement…
          </div>
        ) : error ? (
          <div className="w-full rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 py-3 text-[12px] text-rose-700 dark:text-rose-300 text-center">
            {error}
          </div>
        ) : (
          <>
            {/* Trigger */}
            <button
              type="button"
              onClick={openAndFocus}
              className={cx(
                "w-full",
                "rounded-2xl border",
                "border-black/10 dark:border-white/10",
                "bg-white/80 dark:bg-white/[0.06]",
                "px-3 py-3",
                "text-left",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60",
                "transition"
              )}
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {selected?.label || "Sélectionner un choix…"}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-300/80 truncate">
                    {selected?.id ? `ID: ${selected.id}` : "Tape pour rechercher (nom, titre…)"}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-300 shrink-0" />
              </div>
            </button>

            {/* Modal / Sheet */}
            {open ? (
              <div
                className={cx(
                  "fixed inset-0 z-50",
                  "grid place-items-center",
                  "px-3 py-6"
                )}
                role="dialog"
                aria-modal="true"
              >
                {/* overlay */}
                <button
                  type="button"
                  onClick={close}
                  className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                  aria-label="Fermer"
                />

                {/* sheet */}
                <div
                  className={cx(
                    "relative w-full max-w-lg",
                    "rounded-3xl border",
                    "border-slate-200/70 dark:border-white/10",
                    "bg-white/90 dark:bg-slate-950/80",
                    "backdrop-blur-xl",
                    "shadow-[0_24px_80px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]",
                    "overflow-hidden"
                  )}
                >
                  <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 opacity-90" />

                  {/* top bar */}
                  <div className="px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[13px] font-extrabold text-slate-900 dark:text-white">
                        Rechercher un choix
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300/80">
                        {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={close}
                      className="h-9 w-9 rounded-2xl grid place-items-center bg-black/5 dark:bg-white/10 text-slate-800 dark:text-slate-100"
                      aria-label="Fermer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* search input */}
                  <div className="px-4 pb-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 dark:text-slate-300" />
                      <input
                        ref={inputRef}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder={placeholder}
                        className={cx(
                          "w-full rounded-2xl",
                          "border border-black/10 dark:border-white/10",
                          "bg-white/80 dark:bg-white/[0.06]",
                          "pl-9 pr-9 py-3",
                          "text-[13px] font-semibold",
                          "text-slate-900 dark:text-slate-100",
                          "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/60"
                        )}
                      />
                      {q ? (
                        <button
                          type="button"
                          onClick={() => setQ("")}
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-xl grid place-items-center bg-black/5 dark:bg-white/10"
                          aria-label="Effacer"
                        >
                          <X className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* list viewport */}
                  <div
                    ref={listRef}
                    onScroll={onScroll}
                    className={cx(
                      "px-2 pb-2",
                      "overflow-auto",
                      "scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10"
                    )}
                    style={{ maxHeight: VIEWPORT_H }}
                  >
                    {/* virtual padding top */}
                    {padTop > 0 ? <div style={{ height: padTop }} /> : null}

                    {visible.length ? (
                      <div className="space-y-1">
                        {visible.map((o) => {
                          const active = o.id === value;
                          return (
                            <button
                              key={o.id}
                              type="button"
                              onClick={() => onSelect(o.id)}
                              className={cx(
                                "w-full rounded-2xl px-3 py-2.5",
                                "text-left",
                                "transition",
                                active
                                  ? "bg-gradient-to-r from-indigo-500/15 via-fuchsia-500/10 to-rose-500/10 border border-fuchsia-500/20"
                                  : "hover:bg-black/5 dark:hover:bg-white/5 border border-transparent"
                              )}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate">
                                    {o.label}
                                  </div>
                                  <div className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-300/80 truncate">
                                    {o.promptId ? `promptId: ${o.promptId}` : `id: ${o.id}`}
                                  </div>
                                </div>
                                {active ? (
                                  <span className="h-8 w-8 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 grid place-items-center shrink-0">
                                    <Check className="h-4 w-4" />
                                  </span>
                                ) : null}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="px-4 py-10 text-center text-[12px] text-slate-600 dark:text-slate-300/80">
                        Aucun résultat.
                      </div>
                    )}

                    {/* virtual padding bottom */}
                    {padBottom > 0 ? <div style={{ height: padBottom }} /> : null}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
});

ChoicePicker.displayName = "ChoicePicker";
