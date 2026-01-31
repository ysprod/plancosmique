"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { generateCarteDuCiel } from "@/lib/api/services/carteduciel.service";

export default function GenerateCarteDuCielPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await generateCarteDuCiel();
      setSuccess(true);
      setTimeout(() => router.push("/secured/profil"), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Erreur lors de la génération.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <h1 className="text-2xl font-bold mb-4 text-cosmic-indigo">Générer la carte du ciel</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Cliquez sur le bouton ci-dessous pour générer ou régénérer la carte du ciel de ce profil.</p>
      <button
        onClick={handleGenerate}
        disabled={isLoading || success}
        className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
      >
        {isLoading ? (
          <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Génération...</span>
        ) : success ? (
          "Carte du ciel générée !"
        ) : (
          "Générer la carte du ciel"
        )}
      </button>
      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
      {success && <div className="mt-4 text-green-600 font-medium">Carte du ciel générée avec succès. Redirection...</div>}
    </div>
  );
}
