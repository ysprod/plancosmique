"use client";
import React from "react";
import { Plus } from "lucide-react";

export default function CreateCategoryButton() {
  
  return (
    <div className="mb-4 flex justify-end">
      <a
        href={`/admin/categories/create?r=${Date.now()}`}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Nouvelle catégorie
      </a>
    </div>
  );
}