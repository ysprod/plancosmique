"use client";
import { useAuth } from "@/lib/auth/AuthContext";
import { api } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { 
  ShoppingBag, 
  Package, 
  Calendar, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Wallet
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const statusConfig = {
  completed: {
    label: "Complété",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800"
  },
  pending: {
    label: "En attente",
    icon: Clock,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800"
  },
  failed: {
    label: "Échoué",
    icon: XCircle,
    gradient: "from-red-500 to-rose-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-800"
  },
  cancelled: {
    label: "Annulé",
    icon: XCircle,
    gradient: "from-gray-500 to-slate-500",
    bg: "bg-gray-50 dark:bg-gray-950/30",
    text: "text-gray-700 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-800"
  }
};

const categoryColors = {
  animal: { emoji: "🐓", color: "from-red-500 to-orange-500" },
  vegetal: { emoji: "🌾", color: "from-green-500 to-emerald-500" },
  beverage: { emoji: "🍷", color: "from-purple-500 to-pink-500" }
};

export default function SecuredWalletPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?._id) return;
      setLoading(true);
      try {
        const response = await api.get(`/wallet/transactions?userId=${user._id}`);
        setTransactions(response.data.transactions || []);
      } catch (err) {
        console.error('[Wallet] Erreur:', err);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const totalSpent = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const completedCount = transactions.filter(t => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header moderne avec statistiques */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 max-w-4xl">
          {/* Titre principal */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 
                       dark:from-amber-600 dark:to-orange-600 
                       rounded-xl flex items-center justify-center shadow-lg"
            >
              <Wallet className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-lg font-black text-gray-900 dark:text-white truncate">
                Panier d'Offrandes
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email || 'Utilisateur'}
              </p>
            </div>
          </div>

          {/* Stats compactes */}
          <div className="grid grid-cols-2 gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 
                       dark:from-emerald-950/30 dark:to-green-950/30 
                       rounded-xl p-3 border border-emerald-200 dark:border-emerald-800"
            >
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  Total dépensé
                </span>
              </div>
              <p className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-500">
                {totalSpent.toLocaleString()} F
              </p>
              <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70">
                ≈ ${(totalSpent / 563.5).toFixed(2)} USD
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 
                       dark:from-purple-950/30 dark:to-pink-950/30 
                       rounded-xl p-3 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-500" />
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400">
                  Transactions
                </span>
              </div>
              <p className="text-lg sm:text-xl font-black text-purple-600 dark:text-purple-500">
                {completedCount} / {transactions.length}
              </p>
              <p className="text-[10px] text-purple-600/70 dark:text-purple-400/70">
                {completedCount} complétées
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 max-w-4xl">
        <div className="space-y-3">
          {/* En-tête section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between"
          >
            <h2 className="text-base sm:text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-600 dark:text-amber-500" />
              Historique
            </h2>
            {transactions.length > 0 && (
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 
                           bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                {transactions.length}
              </span>
            )}
          </motion.div>

          {/* États de chargement et vide */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 
                       dark:from-gray-900 dark:to-gray-800 
                       rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4"
              >
                <Package className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </motion.div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Chargement du portefeuille...
              </p>
            </motion.div>
          ) : transactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 
                       dark:from-amber-950/20 dark:to-orange-950/20 
                       rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-800"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShoppingBag className="w-16 h-16 text-amber-400 dark:text-amber-600 mx-auto mb-4" />
              </motion.div>
              <p className="text-base font-bold text-gray-700 dark:text-gray-300 mb-2">
                Aucune offrande enregistrée
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Vos transactions apparaîtront ici
              </p>
            </motion.div>
          ) : (
            /* Liste des transactions */
            <div className="space-y-2.5">
              <AnimatePresence>
                {transactions.map((transaction, index) => {
                  const config = statusConfig[transaction.status];
                  const StatusIcon = config.icon;
                  const isExpanded = selectedTransaction === transaction._id;

                  return (
                    <motion.div
                      key={transaction._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.03 }}
                      className="bg-white dark:bg-gray-900 rounded-2xl 
                               border-2 border-gray-200 dark:border-gray-800 
                               overflow-hidden hover:border-amber-300 dark:hover:border-amber-700
                               hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Header de la transaction */}
                      <div 
                        className="p-3 sm:p-4 cursor-pointer"
                        onClick={() => setSelectedTransaction(isExpanded ? null : transaction._id)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icône status */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${config.gradient} 
                                     rounded-xl flex items-center justify-center shadow-lg`}
                          >
                            <StatusIcon className="w-5 h-5 text-white" />
                          </motion.div>

                          {/* Infos principales */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex-1 min-w-0">
                                <p className="font-black text-sm sm:text-base text-gray-900 dark:text-white truncate">
                                  {transaction.items.length} article{transaction.items.length > 1 ? "s" : ""}
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 
                                            flex items-center gap-1 truncate">
                                  <Calendar className="w-3 h-3 flex-shrink-0" />
                                  {formatDate(transaction.createdAt)}
                                </p>
                              </div>

                              {/* Montant */}
                              <div className="text-right flex-shrink-0">
                                <p className="text-base sm:text-lg font-black bg-gradient-to-r from-amber-600 to-orange-600 
                                            dark:from-amber-500 dark:to-orange-500 bg-clip-text text-transparent">
                                  {transaction.totalAmount.toLocaleString()} F
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                  ${(transaction.totalAmount / 563.5).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            {/* Badge status + expand indicator */}
                            <div className="flex items-center justify-between mt-2">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 
                                            rounded-full text-[10px] sm:text-xs font-bold 
                                            ${config.bg} ${config.text} ${config.border} border-2`}>
                                <StatusIcon className="w-3 h-3" />
                                {config.label}
                              </span>

                              <motion.div
                                animate={{ rotate: isExpanded ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-400 dark:text-gray-600"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        {/* Aperçu compact des articles (toujours visible) */}
                        {!isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-3 flex items-center gap-1.5 overflow-x-auto scrollbar-hide"
                          >
                            {transaction.items.slice(0, 4).map((item, idx) => (
                              <span 
                                key={idx}
                                className="flex-shrink-0 text-xl bg-gray-100 dark:bg-gray-800 
                                         w-9 h-9 rounded-lg flex items-center justify-center"
                              >
                                {item.icon}
                              </span>
                            ))}
                            {transaction.items.length > 4 && (
                              <span className="flex-shrink-0 text-xs font-bold text-gray-500 dark:text-gray-400 
                                           bg-gray-100 dark:bg-gray-800 px-2.5 h-9 rounded-lg 
                                           flex items-center justify-center">
                                +{transaction.items.length - 4}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </div>

                      {/* Détails étendus */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t-2 border-gray-100 dark:border-gray-800"
                          >
                            <div className="p-3 sm:p-4 space-y-2 bg-gray-50 dark:bg-gray-900/50">
                              {/* Liste complète des articles */}
                              {transaction.items.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className="flex items-center justify-between gap-3 
                                           bg-white dark:bg-gray-800 rounded-xl p-2.5 
                                           border border-gray-200 dark:border-gray-700
                                           hover:border-amber-300 dark:hover:border-amber-700
                                           transition-colors"
                                >
                                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white truncate">
                                        {item.name}
                                      </p>
                                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                        {item.unitPrice.toLocaleString()} F × {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-black text-gray-900 dark:text-white">
                                      {item.totalPrice.toLocaleString()} F
                                    </p>
                                  </div>
                                </motion.div>
                              ))}

                              {/* Footer avec infos techniques */}
                              <div className="flex items-center justify-between pt-3 mt-3 
                                            border-t border-gray-200 dark:border-gray-700">
                                <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 
                                             bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  #{transaction.transactionId.slice(0, 12)}...
                                </span>
                                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 
                                             bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {transaction.paymentMethod}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Padding bottom pour navigation mobile */}
      <div className="h-20" />
    </div>
  );
}
