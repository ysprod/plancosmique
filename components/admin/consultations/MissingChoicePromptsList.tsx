"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/api/client";

type MissingChoice = {
  _id: string;
  title?: string;
  description?: string;
  participants?: string;
  frequence?: string;
  offering?: { alternatives: any[] };
  rubriqueId?: string;
  rubriqueTitle?: string;
};

export default function MissingChoicePromptsList() {
  const [missingIds, setMissingIds] = useState<string[]>([]);
  const [missingChoices, setMissingChoices] = useState<MissingChoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get("/consultations/missing-choice-prompts")
      .then(res => {
        const data = res.data || {};
        setMissingIds(Array.isArray(data.missingChoiceIds) ? data.missingChoiceIds : []);
        setMissingChoices(Array.isArray(data.missingChoices) ? data.missingChoices : []);
      })
      .catch(err => {
        setError(err?.response?.data?.message || err?.message || "Erreur lors de la récupération des choix manquants");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto my-6 p-4 rounded-xl border bg-white/80 dark:bg-zinc-900/80">
      <h2 className="text-lg font-bold mb-2">Choix de consultation sans prompt associé</h2>
      {loading && <div className="text-sm text-gray-500">Chargement…</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}
      {!loading && !error && (
        missingIds.length === 0 ? (
          <div className="text-green-600">Aucun choiceId manquant 🎉</div>
        ) : (
          <>
            <div className="mb-2 text-sm text-slate-700 dark:text-slate-200">
              <b>{missingIds.length}</b> choix sans prompt&nbsp;:
            </div>
            <ul className="space-y-4">
              {missingChoices.map((choice) => (
                <li key={choice._id} className="p-3 rounded-lg border bg-white/90 dark:bg-zinc-800/80">
                  <div className="font-semibold text-indigo-700 dark:text-indigo-300 text-[15px] mb-1">
                    {choice.title || <span className="italic text-slate-400">(Titre manquant)</span>}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mb-1">
                    <span className="font-mono text-xs text-slate-500">ID: {choice._id}</span>
                  </div>
                  {choice.description && (
                    <div className="text-[13px] text-slate-700 dark:text-slate-200 mb-1 whitespace-pre-line">
                      {choice.description}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-300 mb-1">
                    {choice.participants && <span>👥 <b>Participants:</b> {choice.participants}</span>}
                    {choice.frequence && <span>⏳ <b>Fréquence:</b> {choice.frequence}</span>}
                  </div>

                </li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-slate-500 dark:text-slate-300">
              <b>IDs bruts:</b> {missingIds.join(", ")}
            </div>
          </>
        )
      )}
    </section>
  );
}