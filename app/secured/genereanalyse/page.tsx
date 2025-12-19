"use client";
import React, { useState } from "react";
import { api } from '@/lib/api/client';
import InputField from '../vie-personnelle/slidesection/InputField';
import { Sparkles } from "lucide-react";

export default function GenereAnalysePage() {
  const [consultationId, setConsultationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConsultationId(e.target.value);
    setResult(null);
    setError(null);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      // Appel API pour générer l'analyse
      const res = await api.post(`/consultations/${consultationId}/generate-analysis`);
      if (res.status === 200 && res.data?.analysis) {
        setResult(res.data.analysis);
      } else {
        throw new Error(res.data?.message || "Aucune analyse générée");
      }
    } catch (err: any) {
      setError(err.message || "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-fuchsia-950/20 p-4">
      <div className="max-w-lg w-full bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl p-8 border border-purple-200/50 dark:border-purple-800/50">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-200">Générer une Analyse</h1>
        </div>
        <form onSubmit={handleGenerate} className="space-y-5">
          <InputField
            label="ID de la consultation"
            name="consultationId"
            value={consultationId}
            onChange={handleChange}
            placeholder="Entrez l'ID de la consultation"
          />
          <button
            type="submit"
            disabled={loading || !consultationId}
            className="w-full py-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            {loading ? "Génération..." : "Générer l'analyse"}
          </button>
        </form>
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <h2 className="text-lg font-bold text-green-700 mb-2">Analyse générée :</h2>
            <pre className="text-sm text-green-900 whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <h2 className="text-lg font-bold text-red-700 mb-2">Erreur :</h2>
            <p className="text-sm text-red-900">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
