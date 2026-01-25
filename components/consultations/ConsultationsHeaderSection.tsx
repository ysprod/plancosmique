"use client";
import { memo } from "react";
import ConsultationsHeader from "@/components/consultations/ConsultationsHeader";
import ConsultationsFilters from "@/components/consultations/ConsultationsFilters";
import ConsultationsError from "@/components/consultations/ConsultationsError";
import { motion } from "framer-motion";
import { cx } from "@/lib/functions";

const ConsultationsHeaderSection = memo(function ConsultationsHeaderSection({
  count,
  searchQuery,
  setSearchQuery,
  error
}: {
  count: number;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  error: any;
}) {
  return (
    <div className={cx(
      "relative overflow-hidden rounded-2xl border ",
      "border-slate-200/80 bg-blue shadow-lg shadow-black/10 backdrop-blur-md",
      "dark:border-zinc-800/80 dark:bg-zinc-950/70 dark:shadow-black/40"
    )}>
      {/* Fond animé moderne */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-400/20 to-emerald-400/20 blur-2xl opacity-60 dark:from-violet-800/30 dark:via-fuchsia-700/30 dark:to-emerald-700/30" />
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-emerald-500/70 animate-gradient-x relative z-10" />
      <div className="p-2 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-emerald-500/70 animate-gradient-x sm:p-4 text-center flex flex-col items-center gap-2 relative z-10">
        <ConsultationsHeader consultationsCount={count} filteredCount={count} />
        <div className="w-full">
          <ConsultationsFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            consultationsLength={count}
          />
        </div>
        <div className="w-full">
          <ConsultationsError error={error} />
        </div>
      </div>
    </div>
  );
});

export default ConsultationsHeaderSection;
