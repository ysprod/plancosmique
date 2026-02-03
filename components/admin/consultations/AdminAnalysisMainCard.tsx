import React from "react";
import { cx } from '@/lib/functions';

export default function AdminAnalysisMainCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px] border",
        "border-slate-200/70 bg-white/75 shadow-xl shadow-black/5 backdrop-blur",
        "dark:border-zinc-800/70 dark:bg-zinc-950/45 dark:shadow-black/35"
      )}
    >
      <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70" />
      {children}
    </div>
  );
}
