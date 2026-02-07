import { memo } from "react";
import { cx } from "@/lib/functions";

const ShellCard = memo(function ShellCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cx(
        "w-full mx-auto",
        "flex flex-col items-center justify-center text-center",
        "px-3 py-4 sm:px-4 sm:py-6"
      )}
      aria-label="Contenu de la consultation"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={cx(
            "relative overflow-hidden rounded-[28px] border",
            "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
            "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
          )}
        >
          <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
          <div className="p-3 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default ShellCard;
