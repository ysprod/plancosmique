import React from "react";
import { cx } from "@/lib/functions";
import { AlertTriangle, Save } from "lucide-react";

interface PromptFormStatPillProps {
  kind: "warn" | "ok";
  children: React.ReactNode;
}

const PromptFormStatPill: React.FC<PromptFormStatPillProps> = ({ kind, children }) => (
  <div
    className={cx(
      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold border",
      kind === "warn"
        ? "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-200"
    )}
  >
    {children}
  </div>
);

export default PromptFormStatPill;
