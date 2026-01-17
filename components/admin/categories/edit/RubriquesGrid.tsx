'use client';
import React from "react";
import { Check } from "lucide-react";
import { cx } from "@/lib/functions";

interface RubriquesGridProps {
    normalized: Array<{ id: string; label: string }>;
    selectedSet: Set<string>;
    onToggle: (id: string) => void;
}

const RubriquesGrid: React.FC<RubriquesGridProps> = ({ normalized, selectedSet, onToggle }) => {
    return (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {normalized.map(({ id, label }) => {
                const active = selectedSet.has(id);
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => onToggle(id)}
                        aria-label={`${label} ${active ? "sélectionnée" : "non sélectionnée"}`}
                        className={cx(
                            "relative overflow-hidden rounded-2xl border p-3 text-left transition-all",
                            "active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900/40",
                            active
                                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-900/20"
                                : "border-slate-200 bg-white hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800/40"
                        )}
                    >
                        <div
                            className={cx(
                                "absolute inset-x-0 top-0 h-1",
                                active
                                    ? "bg-gradient-to-r from-emerald-500 to-lime-500"
                                    : "bg-gradient-to-r from-violet-500/20 to-indigo-500/20"
                            )}
                        />
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                                <div
                                    className={cx(
                                        "text-[12px] font-extrabold leading-tight",
                                        active ? "text-emerald-950 dark:text-emerald-100" : "text-slate-900 dark:text-white"
                                    )}
                                >
                                    {label}
                                </div>
                                <div
                                    className={cx(
                                        "mt-1 text-[10px]",
                                        active
                                            ? "text-emerald-800/80 dark:text-emerald-200/80"
                                            : "text-slate-500 dark:text-zinc-400"
                                    )}
                                >
                                    {active ? "Sélectionnée" : "Toucher pour sélectionner"}
                                </div>
                            </div>
                            <div
                                className={cx(
                                    "grid h-7 w-7 place-items-center rounded-xl border text-xs font-black",
                                    active
                                        ? "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950 dark:text-emerald-200"
                                        : "border-slate-200 bg-slate-50 text-slate-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                                )}
                            >
                                {active ? <Check className="h-4 w-4" /> : "+"}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default RubriquesGrid;