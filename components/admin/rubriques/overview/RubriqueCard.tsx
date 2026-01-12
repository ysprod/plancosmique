import { memo } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

function cleanText(s: any) {
  return String(s ?? "").replace(/\s+/g, " ").trim();
}
function clamp(s: string, max = 140) {
  const t = cleanText(s);
  return t.length > max ? t.slice(0, max - 1) + "…" : t;
}
function getId(x: any): string {
  return String(x?._id ?? x?.id ?? "");
}

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

export { RubriqueCard };

