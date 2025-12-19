/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  XCircle
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

type PaymentStatus = "success" | "failure" | "pending" | "loading";
type TransactionFilter = "all" | "simulation" | "real";
type SortOrder = "newest" | "oldest" | "amount_high" | "amount_low";

interface Transaction {
  _id: string;
  transactionId: string;
  paymentToken: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  completedAt: string;
  items: Array<{
    offeringId: string;
    name: string;
    quantity: number;
    price: number;
    category: string;
    icon: string;
  }>;
}

interface Stats {
  totalTransactions: number;
  simulatedTransactions: number;
  totalSpent: number;
  totalSimulated: number;
}

// =====================================================
// STATUS CONFIG
// =====================================================
const statusConfig = {
  success: {
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-900/20",
    border: "border-green-200 dark:border-green-800",
    label: "Paiement réussi",
  },
  failure: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
    label: "Paiement échoué",
  },
  pending: {
    icon: Clock,
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-800",
    label: "En attente",
  },
  loading: {
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    label: "Traitement en cours...",
  },
};

// =====================================================
// SUB-COMPONENTS
// =====================================================
const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex flex-col items-center justify-center p-4 
               bg-gradient-to-br from-purple-50 via-pink-50 to-white 
               dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 rounded-full border-4 border-purple-200 dark:border-purple-800 
                 border-t-purple-600 dark:border-t-purple-400"
    />
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 
                 flex items-center gap-2"
    >
      <Sparkles className="w-4 h-4 text-purple-500" />
      <span>Traitement de votre transaction simulée...</span>
    </motion.p>
  </motion.div>
);

const StatsCard = ({ label, value, icon: Icon, trend }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 
               shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between mb-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 
                     flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      {trend && (
        <span className="text-xs font-semibold text-green-600 dark:text-green-400 
                       flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
  </motion.div>
);

const FilterBar = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  sortOrder,
  onSortChange,
}: any) => (
  <div className="space-y-3">
    {/* Barre de recherche */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Rechercher par ID, nom d'offrande..."
        className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-sm 
                 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 
                 focus:border-transparent transition-all"
      />
    </div>

    {/* Filtres et tri */}
    <div className="flex flex-wrap gap-2">
      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as TransactionFilter)}
        className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-sm font-medium 
                 focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="all">Toutes les transactions</option>
        <option value="simulation">Simulations uniquement</option>
        <option value="real">Réelles uniquement</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as SortOrder)}
        className="h-9 px-3 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 text-sm font-medium 
                 focus:ring-2 focus:ring-purple-500 transition-all"
      >
        <option value="newest">Plus récent</option>
        <option value="oldest">Plus ancien</option>
        <option value="amount_high">Montant décroissant</option>
        <option value="amount_low">Montant croissant</option>
      </select>
    </div>
  </div>
);

const TransactionCard = ({ transaction, index }: { transaction: Transaction; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isSimulated = transaction.paymentMethod === "simulation";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 
                 shadow-sm hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-mono font-semibold text-gray-900 dark:text-gray-100">
              {transaction.transactionId}
            </p>
            {isSimulated && (
              <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 
                             text-purple-700 dark:text-purple-300 text-xs font-semibold 
                             flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Simulé
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(transaction.completedAt).toLocaleString("fr-FR")}
          </p>
        </div>
        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
          {transaction.totalAmount} FCFA
        </p>
      </div>

      {/* Items Preview */}
      <div className="space-y-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm font-medium 
                   text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 
                   transition-colors"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            {transaction.items.length} offrande(s)
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 overflow-hidden"
            >
              {transaction.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg 
                           bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Qté: {item.quantity} × {item.price} FCFA
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {item.quantity * item.price} FCFA
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// =====================================================
// MAIN COMPONENT (wrapped in Suspense)
// =====================================================
function WalletCallbackContent() {
  const router = useRouter();
    const { user } = useAuth();
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("loading");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // =====================================================
  // FETCH TRANSACTIONS
  // =====================================================
  const fetchTransactions = useCallback(async () => {
    try {

        const response = await api.get(`/wallet/transactions?userId=${user?._id}`);
      setTransactions(response.data.transactions || []);
      // const response = await api.get("/wallet/transactions");
      // if (response.status === 200 && Array.isArray(response.data)) {
      //   setTransactions(response.data);
      // }
    } catch (err) {
      console.error("❌ Erreur fetch transactions:", err);
    }
  }, []);

  // =====================================================
  // PROCESS PAYMENT (SIMULATION)
  // =====================================================
  useEffect(() => {
    if (!isMounted) return;

    const processPayment = async () => {
      const token = searchParams.get("token");
      const transactionId = searchParams.get("transaction_id");

      // Mode simulation : délai 1s
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (token?.startsWith("SIM-")) {
        try {
          const lastPurchase = localStorage.getItem("last_simulated_purchase");
          if (lastPurchase) {
            const purchaseData = JSON.parse(lastPurchase);
            await api.post("/wallet/transactions", purchaseData);
          }
          setPaymentStatus("success");
          await fetchTransactions();
        } catch (err) {
          console.error("❌ Erreur simulation:", err);
          setPaymentStatus("failure");
        }
      } else {
        setPaymentStatus("failure");
      }
    };

    processPayment();
  }, [isMounted, searchParams, fetchTransactions]);

  // =====================================================
  // STATS & FILTERING
  // =====================================================
  const stats = useMemo<Stats>(() => {
    const simulated = transactions.filter((t) => t.paymentMethod === "simulation");
    return {
      totalTransactions: transactions.length,
      simulatedTransactions: simulated.length,
      totalSpent: transactions.reduce((sum, t) => sum + t.totalAmount, 0),
      totalSimulated: simulated.reduce((sum, t) => sum + t.totalAmount, 0),
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filtre par type
    if (filter === "simulation") {
      filtered = filtered.filter((t) => t.paymentMethod === "simulation");
    } else if (filter === "real") {
      filtered = filtered.filter((t) => t.paymentMethod !== "simulation");
    }

    // Recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.transactionId.toLowerCase().includes(query) ||
          t.items.some((item) => item.name.toLowerCase().includes(query))
      );
    }

    // Tri
    filtered = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
        case "oldest":
          return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
        case "amount_high":
          return b.totalAmount - a.totalAmount;
        case "amount_low":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [transactions, filter, searchQuery, sortOrder]);

  // =====================================================
  // RENDER
  // =====================================================
  if (paymentStatus === "loading") {
    return <LoadingScreen />;
  }

  const config = statusConfig[paymentStatus];
  const StatusIcon = config.icon;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-white 
                    dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Payment Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-6 border ${config.bg} ${config.border}`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center`}>
              <StatusIcon className={`w-6 h-6 ${config.color}`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-xl font-bold ${config.color} mb-1`}>{config.label}</h2>
              {paymentStatus === "success" && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Votre commande <strong>simulée</strong> a été enregistrée avec succès dans votre
                  wallet.
                </p>
              )}
              {paymentStatus === "failure" && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Une erreur est survenue lors du traitement de votre paiement.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Total transactions"
            value={stats.totalTransactions}
            icon={ShoppingBag}
          />
          <StatsCard
            label="Simulations"
            value={stats.simulatedTransactions}
            icon={Sparkles}
          />
          <StatsCard
            label="Total dépensé"
            value={`${stats.totalSpent.toLocaleString()} F`}
            icon={TrendingUp}
          />
          <StatsCard
            label="Total simulé"
            value={`${stats.totalSimulated.toLocaleString()} F`}
            icon={Sparkles}
            trend="+12%"
          />
        </div>

        {/* Filters */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filter={filter}
          onFilterChange={setFilter}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        {/* Transactions List */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 
                       flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Historique ({filteredTransactions.length})
          </h3>

          {filteredTransactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 dark:text-gray-400">Aucune transaction trouvée</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction, index) => (
                <TransactionCard key={transaction._id} transaction={transaction} index={index} />
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/secured/marcheoffrandes")}
            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 
                     hover:from-purple-700 hover:to-pink-700 
                     text-white font-semibold shadow-lg transition-all"
          >
            Retour au marché
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/secured/profil")}
            className="flex-1 h-12 rounded-xl bg-white dark:bg-gray-800 
                     border border-gray-300 dark:border-gray-600 
                     text-gray-700 dark:text-gray-300 font-semibold 
                     hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Mon profil
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// Wrapper avec Suspense
export default function WalletCallbackPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <WalletCallbackContent />
    </Suspense>
  );
}
