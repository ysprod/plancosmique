"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import axios from "axios";

const MONEYFUSION_CHECK_URL = "https://www.pay.moneyfusion.net/api/check";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const verifyPayment = async (t: string) => {
    setLoading(true);
    setError("");
    setStatus("pending");
    try {
      const response = await axios.post(
        MONEYFUSION_CHECK_URL,
        { token: t },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data?.statut === "success") {
        setStatus("success");
        setDetails(response.data);
        localStorage.setItem("monetoile_access_token_moneyfusion", t);
      } else {
        setStatus("error");
        setError(response.data?.message || "Paiement non validé");
        setDetails(response.data);
      }
    } catch (err: any) {
      setStatus("error");
      setError(err.response?.data?.message || "Erreur réseau ou API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = searchParams.get("token");
    setToken(t);
    if (t) {
      verifyPayment(t);
    } else {
      setStatus("error");
      setError("Aucun token reçu");
    }
    // Redirection automatique après 7s si succès
    let timer: NodeJS.Timeout;
    if (status === "success") {
      timer = setTimeout(() => {
        router.replace("/protected/profil");
      }, 7000);
    }
    return () => timer && clearTimeout(timer);
  }, [searchParams, router, status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-fuchsia-50">
      <div className="bg-white rounded-3xl shadow-xl p-10 border border-violet-100 max-w-md w-full text-center">
        {loading || status === "pending" ? (
          <>
            <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-purple-700 mb-2">
              Vérification du paiement...
            </h2>
            <p className="text-slate-700 mb-4">
              Merci de patienter pendant la validation.
            </p>
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">
              Paiement validé !
            </h2>
            <p className="text-slate-700 mb-4">
              Votre accès premium est activé.
              <br />
              Montant : {details?.montant} €
              <br />
              Référence : {details?.reference}
            </p>
            <p className="text-xs text-slate-400 break-all">Token : {token}</p>
            <p className="text-xs text-slate-400">
              Redirection dans quelques secondes...
            </p>
          </>
        ) : (
          <>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Paiement échoué
            </h2>
            <p className="text-slate-700 mb-4">
              {error || "Paiement non validé. Vous pouvez réessayer."}
            </p>
            <button
              onClick={() => token && verifyPayment(token)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-bold shadow-lg hover:shadow-xl transition-all mt-4"
            >
              <RefreshCw className="w-5 h-5" />
              Réessayer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
