"use client";
import { Loader2 } from "lucide-react";

export default function EditOffrandeLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full animate-fade-in">
      <Loader2 className="w-10 h-10 animate-spin text-violet-500 mb-4" />
      <span className="text-lg font-bold text-gray-700 dark:text-gray-200">Chargement de l'offrande...</span>
    </div>
  );
}
