"use client";
import type { Analysis } from "@/lib/interfaces";
import { ArrowLeft, Download } from "lucide-react";
import { useMemo } from "react";
import ConsultationHeader from "./content/ConsultationHeader";
import MarkdownCard from "./content/MarkdownCard";
import ShellCard from "./content/ShellCard";

function extractMarkdown(c: Analysis): string | null {
  const v = c?.texte ?? null;
  const s = typeof v === "string" ? v.trim() : "";
  return s ? s : null;
}

export interface ConsultationContentProps {
  analyse: Analysis;
  onBack: () => void;
  onDownloadPDF: () => void;
}

function ConsultationContent({ analyse, onBack, onDownloadPDF }: ConsultationContentProps) {
  const markdown = useMemo(() => extractMarkdown(analyse), [analyse]);

  return (
    <ShellCard>
      <div className="flex items-center justify-between gap-3 sm:gap-4">

        <button
          type="button"
          onClick={onBack}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-slate-900/80 to-slate-700/80 text-white/90 hover:text-white shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70 transition-all backdrop-blur-md border border-white/10 dark:border-zinc-800/40"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline font-semibold">Retour</span>
        </button>

        <button
          type="button"
          onClick={onDownloadPDF}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white shadow-md hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/70 transition-all backdrop-blur-md border border-white/10 dark:border-zinc-800/40"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">PDF</span>
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center text-center">
        <ConsultationHeader
          titre={analyse.titre}
          title={analyse.title}
        />
      </div>

      <div className="mt-4">
        <MarkdownCard markdown={markdown!} />
      </div>
    </ShellCard>
  );
}

ConsultationContent.displayName = "ConsultationContent";

export default ConsultationContent;