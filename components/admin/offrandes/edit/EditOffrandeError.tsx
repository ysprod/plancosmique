"use client";
import React from "react";

export default function EditOffrandeError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full bg-gradient-to-r from-red-900 via-rose-900 to-pink-900 text-white p-6 rounded-xl shadow-lg animate-fade-in">
      <span className="font-bold mb-2 text-lg">Erreur :</span>
      <span className="mb-4 text-base">{error}</span>
      <button
        type="button"
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold shadow hover:from-violet-600 hover:to-purple-600 transition-all"
        onClick={onRetry}
      >
        Réessayer
      </button>
    </div>
  );
}
