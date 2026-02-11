'use client';
import { ArrowLeft } from "lucide-react";
import ViewSwitcher from "@/components/admin/categories/create/ViewSwitcher";
import React from "react";

interface CreateCategoryHeaderProps {
  view: string;
}

const CreateCategoryHeader: React.FC<CreateCategoryHeaderProps> = ({ view }) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-3">
      <button
        onClick={() => { window.location.href = `/admin/categories/?r=${Date.now()}`; }}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800/60"
        aria-label="Retour à la liste"
      >
        <ArrowLeft className="h-4 w-4" /> Retour
      </button>
      <ViewSwitcher view={view} />
    </div>
  );
};

export default CreateCategoryHeader;
