"use client";
import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Package,
  Calendar,
  DollarSign,
  Receipt,
  Loader2,
  ShoppingBag,
  AlertCircle,
  ArrowLeft,
  Download,
  Eye
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface OfferingItem {
  id: string;
  name: string;
  icon: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface WalletTransaction {
  _id: string;
  userId: string;
  transactionId: string;
  paymentToken: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  totalAmount: number;
  items: OfferingItem[];
  paymentMethod: string;
  createdAt: string;
  completedAt?: string;
}

export default function WalletCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"success" | "error" | "pending" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentTransaction, setCurrentTransaction] = useState<WalletTransaction | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  // Récupération des paramètres URL
  const status = searchParams.get("status");
  const transactionId = searchParams.get("transaction_id");
  const tokenPay = searchParams.get("tokenPay");

  /**
   * ✅ Enregistrement de la transaction dans le wallet
   */
  const saveTransactionToWallet = async (paymentData: any) => {
    try {
      console.log("[Wallet] 💾 Enregistrement de la transaction...");

      const response = await api.post("/wallet/transactions", {
        userId: user?._id,
        transactionId: paymentData.numeroTransaction || transactionId,
        paymentToken: paymentData.tokenPay || tokenPay,
        status: paymentData.statut === "paid" ? "completed" : "pending",
        totalAmount: paymentData.Montant,
        items: paymentData.personal_Info[0]?.items || [],
        paymentMethod: paymentData.moyen || "mobile_money",
        metadata: {
          numeroSend: paymentData.numeroSend,
          nomclient: paymentData.nomclient,
          frais: paymentData.frais,
          orderDate: paymentData.personal_Info[0]?.orderDate,
        },
      });

      console.log("[Wallet] ✅ Transaction enregistrée:", response.data);
      return response.data;
    } catch (error) {
      console.error("[Wallet] ❌ Erreur d'enregistrement:", error);
      throw error;
    }
  };

  /**
   * ✅ Vérification du statut du paiement MoneyFusion
   */
  const checkPaymentStatus = async (token: string) => {
    try {
      console.log("[MoneyFusion] 🔍 Vérification du statut...", token);

      const response = await fetch(
        `https://www.pay.moneyfusion.net/paiementNotif/${token}`
      );
      const data = await response.json();

      console.log("[MoneyFusion] 📥 Réponse statut:", data);

      if (data.statut && data.data) {
        // Enregistrer dans le wallet
        await saveTransactionToWallet(data.data);
        return data.data;
      }

      throw new Error(data.message || "Erreur lors de la vérification");
    } catch (error) {
      console.error("[MoneyFusion] ❌ Erreur vérification:", error);
      throw error;
    }
  };

  /**
   * ✅ Chargement des transactions du wallet
   */
  const loadWalletTransactions = async () => {
    if (!user?._id) return;

    try {
      console.log("[Wallet] 📂 Chargement des transactions...");

      const response = await api.get(`/wallet/transactions?userId=${user._id}`);
      setTransactions(response.data.transactions || []);

      console.log("[Wallet] ✅ Transactions chargées:", response.data.transactions?.length);
    } catch (error) {
      console.error("[Wallet] ❌ Erreur de chargement:", error);
    }
  };

  /**
   * ✅ Effet principal - Traitement du retour de paiement
   */
  useEffect(() => {
    const processPaymentReturn = async () => {
      setLoading(true);
      setProcessingPayment(true);

      try {
        // 1. Récupération du token depuis localStorage ou URL
        const savedToken = localStorage.getItem("offrandes_token");
        const paymentToken = tokenPay || savedToken;

        if (!paymentToken) {
          throw new Error("Token de paiement introuvable");
        }

        console.log("[Wallet] 🎫 Token:", paymentToken);

        // 2. Vérification du statut du paiement
        const paymentData = await checkPaymentStatus(paymentToken);

        // 3. Mise à jour de l'état selon le statut
        if (paymentData.statut === "paid") {
          setPaymentStatus("success");
          setCurrentTransaction({
            _id: paymentData._id,
            userId: user?._id || "",
            transactionId: paymentData.numeroTransaction,
            paymentToken: paymentData.tokenPay,
            status: "completed",
            totalAmount: paymentData.Montant,
            items: paymentData.personal_Info[0]?.items || [],
            paymentMethod: paymentData.moyen,
            createdAt: paymentData.createdAt,
            completedAt: new Date().toISOString(),
          });

          // Nettoyage du localStorage
          localStorage.removeItem("offrandes_cart");
          localStorage.removeItem("offrandes_total");
          localStorage.removeItem("offrandes_token");
          localStorage.removeItem("offrandes_timestamp");

          console.log("[Wallet] ✅ Paiement réussi");
        } else if (paymentData.statut === "pending") {
          setPaymentStatus("pending");
          setErrorMessage("Paiement en cours de traitement");
        } else {
          setPaymentStatus("error");
          setErrorMessage("Le paiement a échoué ou a été annulé");
        }

        // 4. Rechargement des transactions
        await loadWalletTransactions();
      } catch (error: any) {
        console.error("[Wallet] 💥 Erreur:", error);
        setPaymentStatus("error");
        setErrorMessage(error.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
        setProcessingPayment(false);
      }
    };

    processPaymentReturn();
  }, [tokenPay, user]);

  /**
   * ✅ Formatage de la date
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  /**
   * ✅ Icône de statut
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case "failed":
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  /**
   * ✅ Badge de statut
   */
  const getStatusBadge = (status: string) => {
    const styles = {
      completed: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800",
      failed: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
      cancelled: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800",
    };

    const labels = {
      completed: "Complété",
      pending: "En attente",
      failed: "Échoué",
      cancelled: "Annulé",
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {getStatusIcon(status)}
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  /**
   * ✅ Rendu de l'écran de chargement
   */
  if (loading || processingPayment) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-slate-800"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <Loader2 className="w-16 h-16 text-amber-600 dark:text-amber-500" />
          </motion.div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Traitement en cours
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vérification de votre paiement...
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/30 dark:from-slate-950 dark:via-gray-900 dark:to-amber-950/20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <button
            onClick={() => router.push("/secured/marcheoffrandes")}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Retour au marché</span>
          </button>

          <h1 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-500" />
            Mon Wallet
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Résultat du paiement actuel */}
        <AnimatePresence mode="wait">
          {paymentStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              {paymentStatus === "success" && currentTransaction && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 
                              rounded-3xl p-6 border-2 border-green-200 dark:border-green-800 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-black text-green-900 dark:text-green-100 mb-1">
                        Paiement réussi !
                      </h3>
                      <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                        Votre commande a été enregistrée dans votre wallet
                      </p>

                      {/* Détails de la transaction */}
                      <div className="bg-white/50 dark:bg-slate-900/50 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Receipt className="w-4 h-4" />
                            Transaction
                          </span>
                          <span className="font-mono font-semibold text-gray-900 dark:text-white">
                            {currentTransaction.transactionId}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Montant
                          </span>
                          <span className="font-bold text-lg text-green-600 dark:text-green-500">
                            {currentTransaction.totalAmount.toLocaleString()} F
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Articles
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {currentTransaction.items.length} article{currentTransaction.items.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 
                              rounded-3xl p-6 border-2 border-red-200 dark:border-red-800 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
                      <XCircle className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-black text-red-900 dark:text-red-100 mb-1">
                        Paiement échoué
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                        {errorMessage || "Une erreur est survenue lors du paiement"}
                      </p>

                      <button
                        onClick={() => router.push("/secured/marcheoffrandes")}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 
                                 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Réessayer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liste des transactions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              Historique des achats
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {transactions.length} transaction{transactions.length > 1 ? "s" : ""}
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800">
              <Package className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Aucune transaction pour le moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 
                           overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 sm:p-5">
                    {/* Header transaction */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl 
                                      flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                        </div>

                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                            {transaction.items.length} article{transaction.items.length > 1 ? "s" : ""}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        {getStatusBadge(transaction.status)}
                        <p className="text-lg font-black text-amber-600 dark:text-amber-500 mt-1">
                          {transaction.totalAmount.toLocaleString()} F
                        </p>
                      </div>
                    </div>

                    {/* Liste des articles */}
                    <div className="space-y-2 mb-3">
                      {transaction.items.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs sm:text-sm 
                                                  bg-gray-50 dark:bg-slate-800 rounded-lg p-2">
                          <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-lg">{item.icon}</span>
                            <span className="truncate max-w-[150px] sm:max-w-none">
                              {item.name} × {item.quantity}
                            </span>
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                            {item.totalPrice.toLocaleString()} F
                          </span>
                        </div>
                      ))}
                      {transaction.items.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic px-2">
                          + {transaction.items.length - 3} autre{transaction.items.length - 3 > 1 ? "s" : ""} article{transaction.items.length - 3 > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>

                    {/* Footer transaction */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                        #{transaction.transactionId}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Télécharger le reçu"
                        >
                          <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
}