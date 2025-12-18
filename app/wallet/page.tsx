"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WalletCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Exemple: récupération des paramètres de paiement
    const status = searchParams.get("status");
    const transactionId = searchParams.get("transaction_id");
    const consultationId = searchParams.get("consultation_id");

    // Logique de traitement du retour de paiement wallet
    if (status === "success") {
      // Rediriger ou afficher un message de succès
      // Vous pouvez aussi appeler une API pour valider la transaction côté serveur
    } else {
      // Gérer l'échec ou l'annulation
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-2 text-amber-600 dark:text-amber-400">Retour de paiement Wallet</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Traitement de votre paiement en cours...</p>
        {/* Vous pouvez ajouter un indicateur de chargement ou afficher le statut */}
      </div>
    </div>
  );
}
