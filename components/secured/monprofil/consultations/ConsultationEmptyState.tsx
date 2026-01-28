"use client";
import { BookOpen } from "lucide-react";

const ConsultationEmptyState = () => (
  <div className="w-full grid place-items-center px-3 py-10">
    <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-950/55 backdrop-blur-xl px-5 py-6 text-center">
      <div className="mx-auto mb-3 h-10 w-10 rounded-2xl grid place-items-center bg-black/5 dark:bg-white/10">
        <BookOpen className="h-5 w-5 text-slate-900/70 dark:text-white/80" />
      </div>
      <div className="text-[14px] font-semibold text-slate-900 dark:text-slate-50">
        Aucune consultation
      </div>
      <div className="mt-1 text-[12px] text-slate-600 dark:text-slate-300">
        Aucune consultation trouvée pour cette rubrique.
      </div>
    </div>
  </div>
);
export default ConsultationEmptyState;
