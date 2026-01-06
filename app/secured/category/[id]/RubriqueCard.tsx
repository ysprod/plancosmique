import { Rubrique } from "@/lib/interfaces";
import { motion } from "framer-motion";
import { memo } from "react";

const itemVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

function getRubriqueId(r: Rubrique): string {
    return String(r?._id ?? "");
}

function clampText(s: string, max = 120) {
    const x = String(s ?? "").replace(/\s+/g, " ").trim();
    return x.length > max ? x.slice(0, max - 1) + "…" : x;
}

export const RubriqueCard = memo(function RubriqueCard({
    rub,
    onOpen,
}: {
    rub: Rubrique;
    onOpen: (id: string) => void;
}) {
    const rid = getRubriqueId(rub);

    return (
        <motion.li variants={itemVariants} className="relative">
            <div
                className={[
                    "group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur transition-all",
                    "hover:bg-white active:scale-[0.99]",
                    "dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:bg-zinc-900/60",
                ].join(" ")}
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500/70" />
                <div className="pt-1">
                    <div className="flex items-start gap-2">
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[15px] font-extrabold text-slate-900 dark:text-white">
                                {rub.titre}
                            </h3>
                            <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-slate-600 dark:text-zinc-300">
                                {rub.description ? clampText(rub.description, 140) : "—"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                            type="button"
                            onClick={() => onOpen(rid)}
                            className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-[12px] font-extrabold text-white shadow-sm\n                         bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700\n                         focus:outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-900/40"
                            aria-label={`Découvrir ${rub.titre}`}
                        >
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-xl bg-white/15">
                                {/* eye */}
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                            Découvrir
                        </button>
                    </div>
                </div>
            </div>
        </motion.li>
    );
});